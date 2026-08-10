/**
 * Genera src/helpers/generatedCatalog.ts leyendo los archivos ya optimizados.
 *
 * Todo lo que escribe sale medido del archivo real:
 *   - fotos: dimensiones y EXIF (camara, lente, focal, apertura, obturacion,
 *     ISO y anio de captura) leidos con sharp + exif-reader.
 *   - videos: dimensiones y duracion leidas con ffmpeg.
 *
 * Nada de datos inventados. Los textos de autor (titulo propio, descripcion,
 * cliente) se conservan entre corridas: ver OVERRIDES mas abajo.
 *
 * Uso: node scripts/generate-catalog.js
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const sharp = require('sharp');
const exifReader = require('exif-reader');
const ffmpegPath = require('ffmpeg-static');

const root = path.join(__dirname, '..');
const imagesRoot = path.join(root, 'public', 'media', 'imagenes');
const videosRoot = path.join(root, 'public', 'media', 'videos');
const outFile = path.join(root, 'src', 'helpers', 'generatedCatalog.ts');
const overridesFile = path.join(root, 'src', 'helpers', 'catalogOverrides.json');

const PHOTO_CATEGORIES = {
  artistas: 'Artistas',
  conciertos: 'Conciertos',
  deportes: 'Deportes',
  destinos: 'Destinos',
  lifestyle: 'Lifestyle',
  marcas: 'Marcas',
};

const VIDEO_CATEGORIES = {
  videoclips: 'Videoclips',
  conciertos: 'Conciertos',
  deportes: 'Deportes',
  destinos: 'Destinos',
  documental: 'Documental',
  marcas: 'Marcas',
  redes: 'Redes',
};

/** Nombres comerciales de los cuerpos que aparecen en el EXIF. */
const CAMERA_NAMES = {
  'ILCE-7M4': 'Sony A7 IV',
  'ILCE-7CM2': 'Sony A7C II',
  'ILME-FX3': 'Sony FX3',
  'ILCE-6500': 'Sony A6500',
  'ILCE-6700': 'Sony A6700',
};

/**
 * El EXIF guarda la nomenclatura cruda del fabricante ("24-70mm F2.8 DG DN |
 * Art 019"). Aqui se deduce la marca por las siglas de la linea y se limpia el
 * codigo de anio, que no aporta nada en la ficha.
 */
function prettyLens(raw) {
  if (!raw || raw === '----') return undefined;
  let lens = raw.trim().replace(/\s*\|\s*/g, ' ').replace(/\s+\d{3}$/, '');

  if (/DG DN|DG OS|DC DN|Art|Sports|Contemporary/i.test(lens) && !/^sigma/i.test(lens)) {
    lens = `Sigma ${lens}`;
  } else if (/^FE\b|^E PZ\b|^E\b/.test(lens) && !/^sony/i.test(lens)) {
    lens = `Sony ${lens}`;
  } else if (/^samyang/i.test(lens)) {
    lens = lens.replace(/^SAMYANG/i, 'Samyang');
  }
  return lens;
}

const overrides = fs.existsSync(overridesFile)
  ? JSON.parse(fs.readFileSync(overridesFile, 'utf8'))
  : {};

/**
 * Solo entran al catalogo los videos publicados (los que se versionan). El
 * resto se queda en disco como archivo: si se colaran aqui, el sitio desplegado
 * pediria archivos que no viajaron al servidor.
 */
const publishedFile = path.join(root, 'src', 'helpers', 'publishedVideos.json');
const publishedSet = fs.existsSync(publishedFile)
  ? new Set(JSON.parse(fs.readFileSync(publishedFile, 'utf8')).map((v) => v.rel))
  : null;

function titleFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => (w.length <= 2 && /^[a-z]+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

function orientation(width, height) {
  const r = width / height;
  if (Math.abs(r - 1) < 0.06) return 'square';
  return r > 1 ? 'landscape' : 'portrait';
}

function videoAspect(width, height) {
  const r = width / height;
  if (Math.abs(r - 16 / 9) < 0.06) return '16:9';
  if (Math.abs(r - 9 / 16) < 0.04) return '9:16';
  if (Math.abs(r - 4 / 3) < 0.06) return '4:3';
  if (Math.abs(r - 3 / 4) < 0.04) return '3:4';
  return r >= 1 ? '16:9' : '9:16';
}

function formatShutter(exposure) {
  if (!exposure) return undefined;
  if (exposure >= 1) return `${Number(exposure.toFixed(1))}s`;
  return `1/${Math.round(1 / exposure)}s`;
}

function esc(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function field(name, value) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number') return `    ${name}: ${value},`;
  if (Array.isArray(value)) return `    ${name}: [${value.map((v) => `'${esc(v)}'`).join(', ')}],`;
  return `    ${name}: '${esc(value)}',`;
}

function serialize(entry) {
  const lines = Object.entries(entry)
    .map(([k, v]) => field(k, v))
    .filter(Boolean);
  return `  {\n${lines.join('\n')}\n  },`;
}

async function buildPhotos() {
  const items = [];

  for (const [category, label] of Object.entries(PHOTO_CATEGORIES)) {
    const dir = path.join(imagesRoot, category);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.webp')).sort();

    let index = 0;
    for (const file of files) {
      index++;
      const slug = path.basename(file, '.webp');
      const id = `${category}-${String(index).padStart(3, '0')}`;
      const full = path.join(dir, file);

      let exif = {};
      let width = 0;
      let height = 0;
      try {
        const meta = await sharp(full).metadata();
        width = meta.width || 0;
        height = meta.height || 0;
        if (meta.exif) {
          const parsed = exifReader(meta.exif);
          const photo = parsed.Photo || {};
          const image = parsed.Image || {};
          const model = image.Model && image.Model.trim();
          const lens = photo.LensModel && photo.LensModel.trim();

          exif = {
            camera: model ? CAMERA_NAMES[model] || `${(image.Make || '').trim()} ${model}`.trim() : undefined,
            lens: prettyLens(lens),
            focalLength: photo.FocalLength ? `${Math.round(photo.FocalLength)}mm` : undefined,
            aperture: photo.FNumber ? String(photo.FNumber) : undefined,
            shutter: formatShutter(photo.ExposureTime),
            iso: photo.ISOSpeedRatings ? String(photo.ISOSpeedRatings) : undefined,
            year: photo.DateTimeOriginal
              ? String(new Date(photo.DateTimeOriginal).getFullYear())
              : undefined,
          };
        }
      } catch (err) {
        console.error(`[EXIF] ${category}/${file}: ${err.message}`);
      }

      const custom = overrides[id] || {};
      items.push({
        id,
        title: custom.title || `${label} ${String(index).padStart(3, '0')}`,
        category,
        categoryLabel: label,
        src: `/media/imagenes/${category}/${file}`,
        width,
        height,
        aspectRatio: orientation(width, height),
        ...exif,
        ...(custom.client ? { client: custom.client } : {}),
        ...(custom.location ? { location: custom.location } : {}),
        ...(custom.description ? { description: custom.description } : {}),
        ...(custom.tags ? { tags: custom.tags } : {}),
      });
    }
  }

  return items;
}

function probeVideo(file) {
  const res = spawnSync(ffmpegPath, ['-i', file], { encoding: 'utf8' });
  const out = `${res.stdout || ''}${res.stderr || ''}`;
  const dur = out.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  const dim = out.match(/Video:.*?,\s*(\d{2,5})x(\d{2,5})/);
  return {
    seconds: dur ? Number(dur[1]) * 3600 + Number(dur[2]) * 60 + Number(dur[3]) : 0,
    width: dim ? Number(dim[1]) : 0,
    height: dim ? Number(dim[2]) : 0,
  };
}

function buildVideos() {
  const items = [];

  for (const [category, label] of Object.entries(VIDEO_CATEGORIES)) {
    const dir = path.join(videosRoot, category);
    if (!fs.existsSync(dir)) continue;

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.webm'))
      .filter((f) => !publishedSet || publishedSet.has(`${category}/${f}`))
      .sort();

    let index = 0;
    for (const file of files) {
      index++;
      const slug = path.basename(file, '.webm');
      const id = `${category}-vid-${String(index).padStart(2, '0')}`;
      const full = path.join(dir, file);
      const { seconds, width, height } = probeVideo(full);

      const posterPath = path.join(
        root, 'public', 'media', 'imagenes', 'posters', category, `${slug}.webp`
      );
      if (!fs.existsSync(posterPath)) {
        console.warn(`[POSTER] falta portada para ${category}/${file}`);
      }

      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      const custom = overrides[id] || {};

      items.push({
        id,
        title: custom.title || titleFromSlug(slug),
        category,
        categoryLabel: label,
        streamUrl: `/media/videos/${category}/${file}`,
        posterUrl: `/media/imagenes/posters/${category}/${slug}.webp`,
        width,
        height,
        aspectRatio: videoAspect(width, height),
        duration: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
        durationSeconds: Number(seconds.toFixed(1)),
        ...(custom.client ? { client: custom.client } : {}),
        ...(custom.role ? { role: custom.role } : {}),
        ...(custom.year ? { year: custom.year } : {}),
        ...(custom.description ? { description: custom.description } : {}),
        ...(custom.tags ? { tags: custom.tags } : {}),
      });
    }
  }

  return items;
}

async function main() {
  console.log('Leyendo fotos...');
  const photos = await buildPhotos();
  console.log(`  ${photos.length} fotos`);

  console.log('Leyendo videos...');
  const videos = buildVideos();
  console.log(`  ${videos.length} videos`);

  const header = `/**
 * ARCHIVO GENERADO — no lo edites a mano.
 *
 * Lo produce \`node scripts/generate-catalog.js\` leyendo los archivos reales de
 * /public/media: dimensiones y EXIF de cada foto, duracion y resolucion de cada
 * video. Si vuelves a correr el script, cualquier cambio manual se pierde.
 *
 * Para poner titulos, descripciones o clientes propios usa
 * src/helpers/catalogOverrides.json, que el generador respeta entre corridas.
 */
import type { PhotoItem, VideoItem } from '@/helpers/mediaData';

`;

  const body =
    `export const GENERATED_PHOTOS: readonly PhotoItem[] = [\n` +
    photos.map(serialize).join('\n') +
    `\n];\n\n` +
    `export const GENERATED_VIDEOS: readonly VideoItem[] = [\n` +
    videos.map(serialize).join('\n') +
    `\n];\n`;

  fs.writeFileSync(outFile, header + body);
  console.log(`\nEscrito ${path.relative(root, outFile)}`);

  const byCat = {};
  for (const p of photos) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log('fotos por categoria:', byCat);
  const byCatV = {};
  for (const v of videos) byCatV[v.category] = (byCatV[v.category] || 0) + 1;
  console.log('videos por categoria:', byCatV);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
