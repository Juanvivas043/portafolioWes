/**
 * Importa los originales que se dejan caer en public/media y los convierte al
 * formato canonico del sitio.
 *
 *   public/media/images/<CATEGORIA>/foto.jpg  ->  public/media/imagenes/<slug>/foto.webp
 *   public/media/videos/<CATEGORIA>/clip.mp4  ->  public/media/videos/<slug>/clip.webm
 *
 * Los originales se dejan donde estan: .gitignore ya los excluye del repo.
 * El script es reanudable: si el destino existe y es mas nuevo que el origen,
 * lo salta. Asi se puede cortar y volver a lanzar sin rehacer todo.
 *
 * Uso:
 *   node scripts/import-media.js            # fotos y videos
 *   node scripts/import-media.js --fotos    # solo fotos
 *   node scripts/import-media.js --videos   # solo videos
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let ffmpegPath;
let sharp;
try {
  ffmpegPath = require('ffmpeg-static');
  sharp = require('sharp');
} catch (e) {
  console.error('Faltan dependencias (ffmpeg-static / sharp):', e.message);
  process.exit(1);
}

const mediaRoot = path.join(__dirname, '..', 'public', 'media');
const photoSrcRoot = path.join(mediaRoot, 'images');
const photoOutRoot = path.join(mediaRoot, 'imagenes');
const videoRoot = path.join(mediaRoot, 'videos');

/** Carpetas de origen (como vienen del disco) -> categoria del catalogo. */
const CATEGORY_MAP = {
  ARTISTAS: 'artistas',
  'CONCIERTOS Y FIESTAS': 'conciertos',
  DEPORTES: 'deportes',
  'DESTINOS NACIONALES': 'destinos',
  LIFESTYLE: 'lifestyle',
  MARCAS: 'marcas',
  DOCUMENTAL: 'documental',
  'REDES SOCIALES': 'redes',
  VIDEOCLIPS: 'videoclips',
};

const PHOTO_EXT = ['.jpg', '.jpeg', '.png', '.heic', '.tif', '.tiff'];
const VIDEO_EXT = ['.mp4', '.mov', '.avi', '.mkv'];

/** Nombres limpios para URL: sin espacios, acentos ni simbolos raros. */
function slugifyName(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['"@]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function isJunk(file) {
  const base = path.basename(file);
  return base.startsWith('._') || base === '.DS_Store' || base.startsWith('.');
}

function listSourceDirs(root) {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && CATEGORY_MAP[e.name])
    .map((e) => ({ dir: path.join(root, e.name), category: CATEGORY_MAP[e.name] }));
}

/**
 * Reserva un nombre de destino unico DENTRO de esta corrida.
 *
 * Es la parte delicada: varios originales distintos pueden producir el mismo
 * slug (`@DOBLEU__-13.jpg` y `@DOBLEU___-13.JPEG` -> `dobleu-13`). Si solo se
 * comprobara la existencia del archivo, el segundo se daria por "ya convertido"
 * y se perderia en silencio. Por eso se reservan los nombres en orden estable
 * (los archivos se recorren ordenados), no segun lo que haya en disco.
 */
function reserveTarget(dir, base, ext, assigned) {
  let candidate = `${base}${ext}`;
  let i = 2;
  while (assigned.has(candidate.toLowerCase())) {
    candidate = `${base}-${i}${ext}`;
    i++;
  }
  assigned.add(candidate.toLowerCase());
  return path.join(dir, candidate);
}

function needsWork(input, output) {
  if (!fs.existsSync(output)) return true;
  return fs.statSync(output).mtimeMs < fs.statSync(input).mtimeMs;
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

async function convertPhotos() {
  const groups = listSourceDirs(photoSrcRoot);
  if (!groups.length) {
    console.log('No hay carpetas de fotos que importar en', photoSrcRoot);
    return;
  }

  let done = 0;
  let skipped = 0;
  let srcBytes = 0;
  let outBytes = 0;

  for (const { dir, category } of groups) {
    const outDir = path.join(photoOutRoot, category);
    fs.mkdirSync(outDir, { recursive: true });

    const assigned = new Set();
    const files = fs
      .readdirSync(dir)
      .filter((f) => !isJunk(f))
      .filter((f) => PHOTO_EXT.includes(path.extname(f).toLowerCase()))
      .sort();

    for (const file of files) {
      const input = path.join(dir, file);
      const base = slugifyName(path.basename(file, path.extname(file)));
      const output = reserveTarget(outDir, base, '.webp', assigned);

      if (!needsWork(input, output)) {
        skipped++;
        continue;
      }

      try {
        await sharp(input)
          .rotate() // respeta la orientacion EXIF
          .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
          .withMetadata() // conserva EXIF real (camara, lente, ISO)
          .webp({ quality: 88, effort: 5 })
          .toFile(output);

        srcBytes += fs.statSync(input).size;
        outBytes += fs.statSync(output).size;
        done++;
        if (done % 25 === 0) console.log(`  ...${done} fotos convertidas`);
      } catch (err) {
        console.error(`[ERROR foto] ${category}/${file}: ${err.message}`);
      }
    }
  }

  console.log(
    `\nFOTOS: ${done} convertidas, ${skipped} ya estaban al dia.` +
      (done ? ` ${(srcBytes / 1048576).toFixed(0)} MB -> ${(outBytes / 1048576).toFixed(0)} MB` : '')
  );
}

async function convertVideos() {
  const groups = fs
    .readdirSync(videoRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && CATEGORY_MAP[e.name])
    .map((e) => ({ dir: path.join(videoRoot, e.name), category: CATEGORY_MAP[e.name] }));

  if (!groups.length) {
    console.log('No hay carpetas de video que importar en', videoRoot);
    return;
  }

  const queue = [];
  for (const { dir, category } of groups) {
    const outDir = path.join(videoRoot, category);
    fs.mkdirSync(outDir, { recursive: true });
    const assigned = new Set();

    const files = fs
      .readdirSync(dir)
      .filter((f) => !isJunk(f))
      .filter((f) => VIDEO_EXT.includes(path.extname(f).toLowerCase()))
      .sort();

    for (const file of files) {
      const input = path.join(dir, file);
      const base = slugifyName(path.basename(file, path.extname(file)));
      const output = reserveTarget(outDir, base, '.webm', assigned);

      if (!needsWork(input, output)) continue;
      queue.push({ input, output, category, file });
    }
  }

  console.log(`VIDEOS por convertir: ${queue.length}\n`);

  let done = 0;
  let srcBytes = 0;
  let outBytes = 0;

  for (const job of queue) {
    const started = Date.now();
    try {
      await runFfmpeg([
        '-y',
        '-i', job.input,
        /*
         * Escala el lado mayor a 1280 sin agrandar los que ya son menores.
         *
         * Los originales son masters 4K, pero el reproductor del sitio muestra
         * el video dentro de un modal de 1024px como maximo. Codificar a 1080p
         * gastaba el doble de bytes en pixeles que nadie llega a ver: medido
         * sobre el material mas dificil del catalogo, 1080p pesaba 43 MB por
         * 45s frente a 25 MB en 720p, y tardaba el doble en codificar.
         */
        '-vf', "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
        '-c:v', 'libvpx-vp9',
        '-crf', '33',
        '-b:v', '0',          // calidad constante: sin techo que aplaste el detalle
        '-row-mt', '1',
        '-threads', '0',
        '-cpu-used', '3',
        '-deadline', 'good',
        '-g', '240',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-ac', '2',
        job.output,
      ]);

      const inMb = fs.statSync(job.input).size / 1048576;
      const outMb = fs.statSync(job.output).size / 1048576;
      srcBytes += inMb;
      outBytes += outMb;
      done++;
      const secs = ((Date.now() - started) / 1000).toFixed(0);
      console.log(
        `[${done}/${queue.length}] ${job.category}/${path.basename(job.output)} ` +
          `${inMb.toFixed(0)} MB -> ${outMb.toFixed(1)} MB (${secs}s)`
      );
    } catch (err) {
      console.error(`[ERROR video] ${job.category}/${job.file}: ${err.message}`);
    }
  }

  console.log(
    `\nVIDEOS: ${done} convertidos. ${srcBytes.toFixed(0)} MB -> ${outBytes.toFixed(0)} MB`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const soloFotos = args.includes('--fotos');
  const soloVideos = args.includes('--videos');

  if (!soloVideos) await convertPhotos();
  if (!soloFotos) await convertVideos();

  console.log('\nListo. Recuerda regenerar portadas y catalogo:');
  console.log('  node scripts/generate-video-posters.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
