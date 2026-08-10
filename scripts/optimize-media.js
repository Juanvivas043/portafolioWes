const fs = require('fs');
const path = require('path');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.error('Sharp not found yet, retrying after install...');
    process.exit(1);
  }

  const baseDir = path.join(__dirname, '..', 'public', 'media', 'imagenes');
  console.log('Optimizing images in:', baseDir);

  const subdirs = ['artistas', 'conciertos', 'deportes', 'destinos', 'lifestyle', 'marcas'];
  let count = 0;
  let savedBytes = 0;

  for (const sub of subdirs) {
    const dirPath = path.join(baseDir, sub);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.startsWith('.') || file.endsWith('.webp')) continue;
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) continue;

      const inputPath = path.join(dirPath, file);
      const nameWithoutExt = path.basename(file, ext);
      const outputPath = path.join(dirPath, `${nameWithoutExt}.webp`);

      try {
        const inputStat = fs.statSync(inputPath);
        const originalSize = inputStat.size;

        // Convert to optimized WebP with sharp
        await sharp(inputPath)
          .rotate() // Auto-orient from EXIF
          .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
          // Conserva EXIF: los .webp actuales lo perdieron, por eso los datos de
          // camara/lente/ISO del modal no se pueden contrastar con el archivo.
          .withMetadata()
          .webp({ quality: 85, effort: 4 })
          .toFile(outputPath);

        const newStat = fs.statSync(outputPath);
        const newSize = newStat.size;
        const reduction = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        savedBytes += (originalSize - newSize);
        count++;

        console.log(`[OPTIMIZED] ${sub}/${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB) -> ${nameWithoutExt}.webp (${(newSize / 1024 / 1024).toFixed(2)} MB) [↓ ${reduction}%]`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err.message);
      }
    }
  }

  console.log(`\nDONE! Optimized ${count} images. Total saved space: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
