import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for ultra-fast repeated word/phrase audio playback
const audioCache = new Map<string, { buffer: Buffer; mimeType: string }>();

// Add 44-byte RIFF/WAV header to raw linear 16-bit PCM buffer so standard HTML5 audio can play it
function addWavHeader(
  pcmBuffer: Buffer,
  sampleRate = 24000,
  numChannels = 1,
  bitsPerSample = 16
): Buffer {
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // SubChunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

// Fetch natural MP3 audio from Google Neural Voice service with automatic sentence chunking
async function fetchGoogleTTS(text: string, lang = 'en-US'): Promise<Buffer> {
  const chunks: string[] = [];
  let remaining = text.trim();
  while (remaining.length > 0) {
    if (remaining.length <= 150) {
      chunks.push(remaining);
      break;
    }
    let sliceIdx = remaining.lastIndexOf('.', 150);
    if (sliceIdx < 30) sliceIdx = remaining.lastIndexOf('!', 150);
    if (sliceIdx < 30) sliceIdx = remaining.lastIndexOf('?', 150);
    if (sliceIdx < 30) sliceIdx = remaining.lastIndexOf(',', 150);
    if (sliceIdx < 30) sliceIdx = remaining.lastIndexOf(' ', 150);
    if (sliceIdx < 30) sliceIdx = 150;
    chunks.push(remaining.slice(0, sliceIdx + 1).trim());
    remaining = remaining.slice(sliceIdx + 1).trim();
  }

  const buffers: Buffer[] = [];
  for (const chunk of chunks) {
    if (!chunk) continue;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      lang
    )}&q=${encodeURIComponent(chunk)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) {
      throw new Error(`Google TTS request failed with status: ${res.status}`);
    }
    const arr = await res.arrayBuffer();
    buffers.push(Buffer.from(arr));
  }

  return Buffer.concat(buffers);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || 'Puck';

  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
  }

  return generateAudioResponse(text.trim(), voice);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voice = 'Puck' } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    return generateAudioResponse(text.trim(), voice);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function generateAudioResponse(text: string, voice: string) {
  // Clean text from markdown formatting, asterisks, brackets, or code symbols
  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    return NextResponse.json({ error: 'Clean text is empty' }, { status: 400 });
  }

  const cacheKey = `${voice}_${cleanText.toLowerCase()}`;
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    return new NextResponse(new Uint8Array(cached.buffer), {
      headers: {
        'Content-Type': cached.mimeType,
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  }

  // Handle direct Google Natural voice choices
  if (voice === 'Google-UK' || voice === 'British') {
    try {
      const buffer = await fetchGoogleTTS(cleanText, 'en-GB');
      if (audioCache.size < 1000) {
        audioCache.set(cacheKey, { buffer, mimeType: 'audio/mpeg' });
      }
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, immutable',
        },
      });
    } catch (e: any) {
      console.warn('Google UK TTS error:', e);
    }
  }

  if (voice === 'Google-AU' || voice === 'Australian') {
    try {
      const buffer = await fetchGoogleTTS(cleanText, 'en-AU');
      if (audioCache.size < 1000) {
        audioCache.set(cacheKey, { buffer, mimeType: 'audio/mpeg' });
      }
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, immutable',
        },
      });
    } catch (e: any) {
      console.warn('Google AU TTS error:', e);
    }
  }

  // 1. Try Gemini Studio Neural TTS (Puck, Kore, Charon, Aoede, Fenrir)
  const geminiVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede'];
  const targetVoice = geminiVoices.includes(voice) ? voice : 'Puck';

  const keys = [
    process.env.GEMINI_API_KEY?.trim(),
    process.env.GEMINI_API_KEY_BACKUP?.trim(),
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim(),
  ].filter((k): k is string => Boolean(k && k.length > 10));

  const uniqueKeys = Array.from(new Set(keys));
  const models = ['gemini-2.5-flash-preview-tts', 'gemini-3.8-flash-tts'];

  // Try Gemini API keys
  for (const key of uniqueKeys) {
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: cleanText }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: targetVoice,
                  },
                },
              },
            },
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const part = data.candidates?.[0]?.content?.parts?.[0];
          if (part?.inlineData?.data) {
            const rawPcm = Buffer.from(part.inlineData.data, 'base64');
            // Convert raw PCM to proper standard 24kHz 16-bit Mono WAV format
            const wavBuffer = addWavHeader(rawPcm, 24000, 1, 16);

            if (audioCache.size < 1000) {
              audioCache.set(cacheKey, { buffer: wavBuffer, mimeType: 'audio/wav' });
            }

            return new NextResponse(new Uint8Array(wavBuffer), {
              headers: {
                'Content-Type': 'audio/wav',
                'Cache-Control': 'public, max-age=86400, immutable',
              },
            });
          }
        }
      } catch (e: any) {
        // Fall through to try next key/model or fallback
      }
    }
  }

  // 2. Seamless Fallback: Google Natural Audio (fluent, non-robotic, zero rate limit)
  try {
    const fallbackBuffer = await fetchGoogleTTS(cleanText, 'en-US');
    if (audioCache.size < 1000) {
      audioCache.set(cacheKey, { buffer: fallbackBuffer, mimeType: 'audio/mpeg' });
    }
    return new NextResponse(new Uint8Array(fallbackBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'TTS_GENERATION_FAILED', details: err.message },
      { status: 502 }
    );
  }
}
