/**
 * Extrae un fotograma real de cada video y lo guarda como poster .webp.
 *
 * Antes cada video usaba como portada una fotografia sin relacion con la pieza
 * (un retrato de estudio como poster de un aftermovie, por ejemplo). Este script
 * genera portadas que si corresponden al contenido.
 *
 * Uso: node scripts/generate-video-posters.js
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, spawnSync } = require('child_process');

let ffmpegPath;
let sharp;
try {
  ffmpegPath = require('ffmpeg-static');
  sharp = require('sharp');
} catch (e) {
  console.error('Faltan dependencias (ffmpeg-static / sharp):', e.message);
  process.exit(1);
}

const videosRoot = path.join(__dirname, '..', 'public', 'media', 'videos');
const postersRoot = path.join(__dirname, '..', 'public', 'media', 'imagenes', 'posters');
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wes-posters-'));

// El hero no necesita poster de galeria: ya usa su propio frame de arranque.
const SKIP_DIRS = new Set(['hero']);

/** Lee la duracion en segundos parseando la salida de ffmpeg. */
function probeDuration(file) {
  const res = spawnSync(ffmpegPath, ['-i', file], { encoding: 'utf8' });
  const output = `${res.stdout || ''}${res.stderr || ''}`;
  const match = output.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  if (!match) return null;
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: 'ignore' });
    proc.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg salio con codigo ${code}`))
    );
    proc.on('error', reject);
  });
}

async function main() {
  const categories = fs
    .readdirSync(videosRoot)
    .filter((d) => fs.statSync(path.join(videosRoot, d)).isDirectory())
    .filter((d) => !SKIP_DIRS.has(d));

  const generated = [];

  for (const category of categories) {
    const catDir = path.join(videosRoot, category);
    const outDir = path.join(postersRoot, category);
    fs.mkdirSync(outDir, { recursive: true });

    const files = fs
      .readdirSync(catDir)
      .filter((f) => ['.webm', '.mp4', '.mov'].includes(path.extname(f).toLowerCase()));

    for (const file of files) {
      const input = path.join(catDir, file);
      const base = path.basename(file, path.extname(file));
      const outputWebp = path.join(outDir, `${base}.webp`);
      const tmpFrame = path.join(tmpDir, `${category}-${base}.png`);

      const duration = probeDuration(input);
      // Un 15% dentro del video evita fundidos a negro y placas de titulo.
      const seekTo = duration ? Math.max(0.5, duration * 0.15) : 1;

      try {
        await runFfmpeg([
          '-y',
          '-ss', seekTo.toFixed(2),
          '-i', input,
          '-frames:v', '1',
          '-q:v', '2',
          tmpFrame,
        ]);

        await sharp(tmpFrame)
          .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toFile(outputWebp);

        fs.unlinkSync(tmpFrame);

        const kb = (fs.statSync(outputWebp).size / 1024).toFixed(0);
        const publicPath = `/media/imagenes/posters/${category}/${base}.webp`;
        generated.push({ video: `${category}/${file}`, poster: publicPath, duration });
        console.log(`[OK] ${category}/${file} -> ${publicPath} (${kb} KB, frame @ ${seekTo.toFixed(1)}s)`);
      } catch (err) {
        console.error(`[ERROR] ${category}/${file}:`, err.message);
      }
    }
  }

  console.log(`\nPortadas generadas: ${generated.length}\n`);
  console.log('Rutas para mediaData.ts:');
  for (const g of generated) {
    const mins = g.duration ? Math.floor(g.duration / 60) : 0;
    const secs = g.duration ? Math.floor(g.duration % 60) : 0;
    const stamp = g.duration ? `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}` : 'N/A';
    console.log(`  ${g.video}  |  ${g.poster}  |  duracion real ${stamp}`);
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
