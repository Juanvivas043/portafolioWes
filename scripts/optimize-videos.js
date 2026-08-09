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

const baseDir = path.join(__dirname, '..', 'public', 'media', 'videos');
console.log('Using ffmpeg binary at:', ffmpegPath);
console.log('Scanning videos in:', baseDir);

function convertToWebm(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    // Fast & high quality VP9 / Opus WebM encoder
    // -deadline good -cpu-used 8 -row-mt 1 -threads 0
    const args = [
      '-y',
      '-i', inputPath,
      '-vf', "scale='min(1920,iw)':-2",
      '-c:v', 'libvpx-vp9',
      '-crf', '32',
      '-b:v', '0',
      '-threads', '0',
      '-row-mt', '1',
      '-cpu-used', '8',
      '-deadline', 'good',
      '-pix_fmt', 'yuv420p',
      '-c:a', 'libopus',
      '-b:a', '96k',
      outputPath
    ];

    // stdio ignore prevents Node.js OS pipe buffer from filling up and stalling
    const proc = spawn(ffmpegPath, args, { stdio: 'ignore' });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function main() {
  const subdirs = ['conciertos', 'deportes', 'destinos', 'documental', 'marcas', 'redes', 'videoclips'];
  let convertedCount = 0;
  let deletedCount = 0;
  let totalSavedBytes = 0;

  for (const sub of subdirs) {
    const dirPath = path.join(baseDir, sub);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.mp4', '.mov'].includes(ext)) continue;

      const nameWithoutExt = path.basename(file, path.extname(file));
      const inputPath = path.join(dirPath, file);
      const outputPath = path.join(dirPath, `${nameWithoutExt}.webm`);

      const inStat = fs.statSync(inputPath);
      const inMB = (inStat.size / (1024 * 1024)).toFixed(2);

      // If webm already exists and is valid, just delete the old format
      if (fs.existsSync(outputPath)) {
        const outStat = fs.statSync(outputPath);
        if (outStat.size > 1000) {
          console.log(`\n[ALREADY CONVERTED] ${sub}/${file} -> ${nameWithoutExt}.webm exists (${(outStat.size / (1024 * 1024)).toFixed(2)} MB)`);
          try {
            fs.unlinkSync(inputPath);
            deletedCount++;
            totalSavedBytes += inStat.size;
            console.log(`[DELETED OLD FORMAT] Removed ${file} (${inMB} MB)`);
          } catch (err) {
            console.log(`[LOCKED] Could not delete ${file}: ${err.message}`);
          }
          continue;
        }
      }

      console.log(`\n[CONVERTING] ${sub}/${file} (${inMB} MB) -> ${nameWithoutExt}.webm ...`);

      try {
        const startTime = Date.now();
        await convertToWebm(inputPath, outputPath);
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        const outStat = fs.statSync(outputPath);
        const outMB = (outStat.size / (1024 * 1024)).toFixed(2);
        const ratio = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);

        console.log(`[SUCCESS] ${nameWithoutExt}.webm (${outMB} MB) [Saved ${ratio}% in ${duration}s]`);
        convertedCount++;

        // Delete source old format
        try {
          fs.unlinkSync(inputPath);
          deletedCount++;
          totalSavedBytes += inStat.size;
          console.log(`[DELETED OLD FORMAT] Removed ${file}`);
        } catch (err) {
          console.log(`Could not delete ${file}: ${err.message}`);
        }
      } catch (err) {
        console.error(`[ERROR] Failed to convert ${file}:`, err.message);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`ALL VIDEOS PROCESSED!`);
  console.log(`Newly Converted: ${convertedCount}`);
  console.log(`Old Format Files Deleted: ${deletedCount}`);
  console.log(`Total Disk Space Freed: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`========================================\n`);
}

main().catch(console.error);
