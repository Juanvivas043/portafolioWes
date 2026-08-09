const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch (e) {
  console.error('ffmpeg-static not found.');
  process.exit(1);
}

const inputVideo = path.join(__dirname, '..', 'public', 'media', 'videos', 'marcas', '2_reel_furia_gear.webm');
const outputDir = path.join(__dirname, '..', 'public', 'media', 'videos', 'hero');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputWebm = path.join(outputDir, 'hero_bg_loop.webm');
const outputMp4 = path.join(outputDir, 'hero_bg_loop.mp4');

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: 'ignore' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  console.log('Generating ultra-lightweight Hero Background Loop...');
  console.log('Source:', inputVideo);

  // 1. WebM VP9 (Stripped audio, 1080p, keyframes every 24 frames = 1s, high compression)
  console.log('\n[1/2] Encoding hero_bg_loop.webm...');
  const webmArgs = [
    '-y',
    '-i', inputVideo,
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libvpx-vp9',
    '-crf', '36',
    '-b:v', '1400k',
    '-threads', '0',
    '-row-mt', '1',
    '-cpu-used', '8',
    '-deadline', 'good',
    '-g', '24',
    '-pix_fmt', 'yuv420p',
    '-an', // No audio needed for background hero loop
    outputWebm
  ];
  await runFfmpeg(webmArgs);
  const webmSize = (fs.statSync(outputWebm).size / (1024 * 1024)).toFixed(2);
  console.log(`[SUCCESS] hero_bg_loop.webm generated: ${webmSize} MB`);

  // 2. MP4 H.264 FastStart (Instant hardware decode & fallback)
  console.log('\n[2/2] Encoding hero_bg_loop.mp4 (FastStart)...');
  const mp4Args = [
    '-y',
    '-i', inputVideo,
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '26',
    '-movflags', '+faststart',
    '-g', '24',
    '-pix_fmt', 'yuv420p',
    '-an',
    outputMp4
  ];
  await runFfmpeg(mp4Args);
  const mp4Size = (fs.statSync(outputMp4).size / (1024 * 1024)).toFixed(2);
  console.log(`[SUCCESS] hero_bg_loop.mp4 generated: ${mp4Size} MB`);

  console.log('\n========================================');
  console.log('HERO BACKGROUND LOOP READY!');
  console.log(`WebM: ${webmSize} MB | MP4: ${mp4Size} MB`);
  console.log('========================================\n');
}

main().catch(console.error);
