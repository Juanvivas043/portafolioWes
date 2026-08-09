const fs = require('fs');
const path = require('path');

const srcBase = 'C:/Users/Juanv/OneDrive/Documents/PORTFOLIO WES';
const destBase = path.join(__dirname, '..', 'public', 'media');

const photoDest = path.join(destBase, 'imagenes');
const videoDest = path.join(destBase, 'videos');

[
  photoDest,
  videoDest,
  path.join(photoDest, 'artistas'),
  path.join(photoDest, 'conciertos'),
  path.join(photoDest, 'deportes'),
  path.join(photoDest, 'destinos'),
  path.join(photoDest, 'lifestyle'),
  path.join(photoDest, 'marcas'),
  path.join(videoDest, 'videoclips'),
  path.join(videoDest, 'conciertos'),
  path.join(videoDest, 'deportes'),
  path.join(videoDest, 'marcas'),
  path.join(videoDest, 'redes'),
  path.join(videoDest, 'documental'),
  path.join(videoDest, 'destinos')
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function copyValidFiles(srcDir, destDir, maxCount = 12, filterFn = null) {
  if (!fs.existsSync(srcDir)) {
    console.log('Dir does not exist:', srcDir);
    return [];
  }
  const entries = fs.readdirSync(srcDir);
  const valid = entries.filter(name => {
    if (name.startsWith('.') || name.startsWith('._')) return false;
    const lower = name.toLowerCase();
    return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.heic');
  });

  const selected = filterFn ? valid.filter(filterFn).slice(0, maxCount) : valid.slice(0, maxCount);
  const copied = [];
  for (const filename of selected) {
    const srcPath = path.join(srcDir, filename);
    // Sanitize filename for safe web URLs (remove special chars, spaces, @)
    const cleanName = filename
      .replace(/[@#%&{}\/\\<>*?$!'":+`|=]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');
    const targetPath = path.join(destDir, cleanName);
    try {
      fs.copyFileSync(srcPath, targetPath);
      const sizeMB = (fs.statSync(targetPath).size / 1024 / 1024).toFixed(2);
      console.log(`Copied: ${filename} -> ${cleanName} (${sizeMB} MB)`);
      copied.push({ original: filename, file: cleanName, path: targetPath, sizeMB });
    } catch (err) {
      console.error(`Error copying ${filename}:`, err.message);
    }
  }
  return copied;
}

console.log('--- COPYING PHOTOGRAPHY ASSETS ---');
copyValidFiles(path.join(srcBase, 'FOTOS', 'ARTISTAS'), path.join(photoDest, 'artistas'), 10);
copyValidFiles(path.join(srcBase, 'FOTOS', 'CONCIERTOS Y FIESTAS'), path.join(photoDest, 'conciertos'), 10);
copyValidFiles(path.join(srcBase, 'FOTOS', 'DEPORTES'), path.join(photoDest, 'deportes'), 10);
copyValidFiles(path.join(srcBase, 'FOTOS', 'DESTINOS NACIONALES'), path.join(photoDest, 'destinos'), 10);
copyValidFiles(path.join(srcBase, 'FOTOS', 'LIFESTYLE'), path.join(photoDest, 'lifestyle'), 10);
copyValidFiles(path.join(srcBase, 'FOTOS', 'MARCAS'), path.join(photoDest, 'marcas'), 10);

console.log('--- COPYING VIDEO SAMPLES ---');
// Select moderate sized videos for fast local streaming & smooth playback
copyValidFiles(path.join(srcBase, 'VIDEOS', 'CONCIERTOS Y FIESTAS'), path.join(videoDest, 'conciertos'), 2);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'DEPORTES'), path.join(videoDest, 'deportes'), 2);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'DESTINOS NACIONALES'), path.join(videoDest, 'destinos'), 2);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'DOCUMENTAL'), path.join(videoDest, 'documental'), 2);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'MARCAS'), path.join(videoDest, 'marcas'), 2);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'REDES SOCIALES'), path.join(videoDest, 'redes'), 3);
copyValidFiles(path.join(srcBase, 'VIDEOS', 'VIDEOCLIPS'), path.join(videoDest, 'videoclips'), 2);

console.log('Done copying media assets!');
