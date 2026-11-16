import { NextRequest, NextResponse } from 'next/server';
import { EdgeTTS } from '@andresaya/edge-tts';

export const runtime = 'nodejs';

// In-memory cache for ultra-fast repeated word/phrase audio playback
const audioCache = new Map<string, { buffer: Buffer; mimeType: string }>();

// Voice mappings for Microsoft Edge Neural Studio voices
const EDGE_VOICE_MAP: Record<string, string> = {
  Puck: 'en-US-GuyNeural', // Warm, authentic, natural American male
  Kore: 'en-US-JennyNeural', // Soft, melodious, friendly American female
  Aoede: 'en-US-AriaNeural', // Expressive, crystal clear American female
  Charon: 'en-US-ChristopherNeural', // Deep, authoritative male teacher
  Fenrir: 'en-US-EricNeural', // Energetic, articulate business male
  'Google-UK': 'en-GB-SoniaNeural', // Authentic BBC/Oxford British female
  British: 'en-GB-SoniaNeural',
  'British-Male': 'en-GB-RyanNeural', // Distinguished British male
  'Google-US': 'en-US-MichelleNeural', // Natural American female
  'Google-AU': 'en-AU-NatashaNeural', // Australian English female
  Australian: 'en-AU-NatashaNeural',
};

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

// Edge TTS Neural audio generation with automatic retry
async function fetchEdgeTTS(text: string, voiceName: string, retries = 1): Promise<Buffer> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const tts = new EdgeTTS();
      const res = await tts.generate(text, voiceName);
      if (res?.audio && res.audio.length > 0) {
        return res.audio;
      }
    } catch (err: any) {
      if (attempt < retries && (err.message?.includes('429') || err.message?.includes('403'))) {
        await new Promise((r) => setTimeout(r, 350 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw new Error('Edge TTS returned empty audio');
}

// Google Gemini Studio Neural TTS (Puck, Kore, Charon, Aoede, Fenrir)
async function fetchGeminiTTS(text: string, targetVoice: string): Promise<Buffer> {
  const keys = [
    process.env.GEMINI_API_KEY?.trim(),
    process.env.GEMINI_API_KEY_BACKUP?.trim(),
    process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim(),
  ].filter((k): k is string => Boolean(k && k.length > 10));

  const uniqueKeys = Array.from(new Set(keys));
  // Prefer flash-lite-tts for 2x faster response and higher rate limits
  const models = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts', 'gemini-3.1-flash-tts-preview'];

  for (const key of uniqueKeys) {
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }],
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
            return addWavHeader(rawPcm, 24000, 1, 16);
          }
        }
      } catch {
        // try next key or model
      }
    }
  }

  throw new Error('All Gemini TTS models/keys exhausted');
}

// Fallback: Google Natural Audio with automatic sentence chunking
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
        'Content-Length': cached.buffer.length.toString(),
      },
    });
  }

  const edgeVoiceName = EDGE_VOICE_MAP[voice] || 'en-US-GuyNeural';

  // Strategy 1: For British or Australian voices, or long dialogues (> 180 chars),
  // Edge Neural TTS is 5-10x faster and has native regional accents.
  const isRegionalOrLong =
    voice.includes('UK') ||
    voice.includes('British') ||
    voice.includes('AU') ||
    voice.includes('Australian') ||
    cleanText.length > 180;

  if (isRegionalOrLong) {
    try {
      const buffer = await fetchEdgeTTS(cleanText, edgeVoiceName);
      if (audioCache.size < 1000) {
        audioCache.set(cacheKey, { buffer, mimeType: 'audio/mpeg' });
      }
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, immutable',
          'Content-Length': buffer.length.toString(),
        },
      });
    } catch {
      // Fall through to Gemini or Google fallback
    }
  }

  // Strategy 2: For standard Studio voices (Puck, Kore, Aoede, Charon, Fenrir), try Gemini first
  const geminiVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Aoede'];
  if (geminiVoices.includes(voice)) {
    try {
      const wavBuffer = await fetchGeminiTTS(cleanText, voice);
      if (audioCache.size < 1000) {
        audioCache.set(cacheKey, { buffer: wavBuffer, mimeType: 'audio/wav' });
      }
      return new NextResponse(new Uint8Array(wavBuffer), {
        headers: {
          'Content-Type': 'audio/wav',
          'Cache-Control': 'public, max-age=86400, immutable',
          'Content-Length': wavBuffer.length.toString(),
        },
      });
    } catch {
      // Fall through to Edge TTS
    }
  }

  // Strategy 3: Edge Neural TTS fallback for any voice
  try {
    const buffer = await fetchEdgeTTS(cleanText, edgeVoiceName);
    if (audioCache.size < 1000) {
      audioCache.set(cacheKey, { buffer, mimeType: 'audio/mpeg' });
    }
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch {
    // Fall through to Google Natural TTS
  }

  // Strategy 4: Seamless final fallback: Google Natural TTS (always works)
  try {
    const lang = voice.includes('UK') || voice.includes('British')
      ? 'en-GB'
      : voice.includes('AU') || voice.includes('Australian')
      ? 'en-AU'
      : 'en-US';

    const fallbackBuffer = await fetchGoogleTTS(cleanText, lang);
    if (audioCache.size < 1000) {
      audioCache.set(cacheKey, { buffer: fallbackBuffer, mimeType: 'audio/mpeg' });
    }
    return new NextResponse(new Uint8Array(fallbackBuffer), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
        'Content-Length': fallbackBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'TTS_GENERATION_FAILED', details: err.message },
      { status: 502 }
    );
  }
}
