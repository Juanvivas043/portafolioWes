const fs = require('fs');
const path = require('path');

const mediaRoot = path.join(__dirname, '..', 'public', 'media');
let deletedCount = 0;
let freedBytes = 0;

function cleanupImages() {
  const imgDir = path.join(mediaRoot, 'imagenes');
  if (!fs.existsSync(imgDir)) return;

  const subdirs = fs.readdirSync(imgDir);
  for (const sub of subdirs) {
    const subPath = path.join(imgDir, sub);
    if (!fs.statSync(subPath).isDirectory()) continue;

    const files = fs.readdirSync(subPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
        const filePath = path.join(subPath, file);
        const nameWithoutExt = path.basename(file, path.extname(file));

        // Check if webp equivalent exists (either name.webp or name.ext.webp)
        const webpCandidate1 = path.join(subPath, `${nameWithoutExt}.webp`);
        const webpCandidate2 = path.join(subPath, `${file}.webp`);

        if (fs.existsSync(webpCandidate1) || fs.existsSync(webpCandidate2)) {
          const stat = fs.statSync(filePath);
          freedBytes += stat.size;
          fs.unlinkSync(filePath);
          deletedCount++;
          console.log(`[DELETED OLD IMAGE] ${sub}/${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
        }
      }
    }
  }
}

function cleanupVideos() {
  const vidDir = path.join(mediaRoot, 'videos');
  if (!fs.existsSync(vidDir)) return;

  const subdirs = fs.readdirSync(vidDir);
  for (const sub of subdirs) {
    const subPath = path.join(vidDir, sub);
    if (!fs.statSync(subPath).isDirectory()) continue;

    const files = fs.readdirSync(subPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.mp4', '.mov'].includes(ext)) {
        const filePath = path.join(subPath, file);
        const nameWithoutExt = path.basename(file, path.extname(file));
        const webmCandidate = path.join(subPath, `${nameWithoutExt}.webm`);

        if (fs.existsSync(webmCandidate)) {
          const stat = fs.statSync(filePath);
          if (stat.size > 0 && fs.statSync(webmCandidate).size > 0) {
            try {
              fs.unlinkSync(filePath);
              freedBytes += stat.size;
              deletedCount++;
              console.log(`[DELETED OLD VIDEO] ${sub}/${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
            } catch (err) {
              console.log(`[LOCKED - SKIPPING FOR NOW] ${sub}/${file} is currently being converted`);
            }
          }
        }
      }
    }
  }
}

console.log('--- CLEANING UP OLD FORMAT MEDIA FILES ---');
cleanupImages();
cleanupVideos();

console.log(`\n========================================`);
console.log(`DELETED ${deletedCount} OLD FORMAT FILES`);
console.log(`TOTAL DISK SPACE FREED: ${(freedBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`========================================\n`);
