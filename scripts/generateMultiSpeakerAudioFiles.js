const fs = require('fs');
const path = require('path');
const { EdgeTTS } = require('@andresaya/edge-tts');

const tracks = JSON.parse(fs.readFileSync('./src/data/listening/allListeningTracks.json', 'utf8'));
const outDir = path.join(__dirname, '../public/audio/listening');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateTrackAudio(track, retryCount = 1) {
  const fileName = `${track.topicId || track.id}-listen.mp3`;
  const outPath = path.join(outDir, fileName);

  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
    console.log(`[Skip] Already exists: ${fileName}`);
    return;
  }

  const buffers = [];

  for (const line of track.dialogue) {
    let success = false;
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const tts = new EdgeTTS();
        const res = await tts.generate(line.textEn, line.voice || 'en-GB-SoniaNeural');
        if (res?.audio) {
          buffers.push(res.audio);
          success = true;
          break;
        }
      } catch (err) {
        if (attempt < retryCount) {
          await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
        }
      }
    }
    // Pause between speakers to avoid rapid websocket handshake
    await new Promise(r => setTimeout(r, 150));
  }

  if (buffers.length > 0) {
    const combined = Buffer.concat(buffers);
    fs.writeFileSync(outPath, combined);
    console.log(`[Success] Generated ${fileName} (${combined.length} bytes)`);
  }
}

async function run() {
  console.log(`Starting audio generation for ${tracks.length} tracks...`);
  // Generate first batch of tracks across levels
  const targetTracks = tracks.slice(0, 20); // First 20 core tracks
  for (let i = 0; i < targetTracks.length; i++) {
    const t = targetTracks[i];
    console.log(`Processing [${i + 1}/${targetTracks.length}] ${t.id} (${t.accent})...`);
    try {
      await generateTrackAudio(t);
    } catch (e) {
      console.warn(`Error on track ${t.id}:`, e.message);
    }
  }
  console.log('Batch audio generation finished successfully!');
}

run().catch(console.error);
