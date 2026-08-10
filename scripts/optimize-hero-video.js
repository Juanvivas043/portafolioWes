/**
 * Genera el loop de fondo del Hero a partir de un video del catalogo.
 *
 * IMPORTANTE: conserva la pista de audio. La version anterior encodeaba con
 * -an, asi que el boton de sonido del Hero no podia funcionar: no habia audio
 * que activar. Tambien usaba -crf 36 junto a un techo de -b:v 1400k, lo que
 * dejaba la imagen visiblemente blanda; ahora va en modo calidad constante.
 *
 * Uso: node scripts/optimize-hero-video.js
 */
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
  console.log('Generando el loop de fondo del Hero...');
  console.log('Fuente:', inputVideo);

  // 1. WebM VP9 en modo calidad constante (-b:v 0), con audio Opus.
  console.log('\n[1/2] Codificando hero_bg_loop.webm...');
  const webmArgs = [
    '-y',
    '-i', inputVideo,
    '-c:v', 'libvpx-vp9',
    '-crf', '38',
    '-b:v', '0',          // CQ puro: sin techo de bitrate que aplaste el detalle
    '-threads', '0',
    '-row-mt', '1',
    '-cpu-used', '3',
    '-deadline', 'good',
    '-g', '48',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'libopus',
    '-b:a', '128k',
    outputWebm
  ];
  await runFfmpeg(webmArgs);
  const webmSize = (fs.statSync(outputWebm).size / (1024 * 1024)).toFixed(2);
  console.log(`[OK] hero_bg_loop.webm: ${webmSize} MB`);

  // 2. MP4 H.264 con faststart, para navegadores sin VP9. Tambien con audio.
  console.log('\n[2/2] Codificando hero_bg_loop.mp4...');
  const mp4Args = [
    '-y',
    '-i', inputVideo,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '28',
    '-movflags', '+faststart',
    '-g', '48',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    outputMp4
  ];
  await runFfmpeg(mp4Args);
  const mp4Size = (fs.statSync(outputMp4).size / (1024 * 1024)).toFixed(2);
  console.log(`[OK] hero_bg_loop.mp4: ${mp4Size} MB`);

  console.log('\n========================================');
  console.log(`WebM: ${webmSize} MB | MP4: ${mp4Size} MB (ambos con audio)`);
  console.log('========================================\n');
}

main().catch(console.error);
