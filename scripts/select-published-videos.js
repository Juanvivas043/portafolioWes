/**
 * Elige que videos se publican (y por tanto se versionan) y cuales se quedan
 * solo en disco como archivo.
 *
 * El catalogo completo pesa mas de lo que conviene meter en git, asi que el
 * sitio publica una seleccion con tope de tamanio. La lista queda escrita en
 * src/helpers/publishedVideos.json, que es la fuente para dos cosas:
 *   - generate-catalog.js: solo mete en el catalogo lo que esta publicado.
 *   - el bloque de .gitignore: versiona solo esos .webm.
 *
 * La seleccion se reparte entre categorias para que ninguna quede fuera, y
 * dentro de cada una entra primero lo que mejor aprovecha el presupuesto.
 * Puedes editar el JSON a mano: este script no lo pisa si pasas --keep.
 *
 * Uso:
 *   node scripts/select-published-videos.js            # propone y escribe
 *   node scripts/select-published-videos.js --budget 400
 *   node scripts/select-published-videos.js --keep     # solo reescribe .gitignore
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const videosRoot = path.join(root, 'public', 'media', 'videos');
const listFile = path.join(root, 'src', 'helpers', 'publishedVideos.json');
const gitignoreFile = path.join(root, '.gitignore');

const CATEGORIES = [
  'videoclips',
  'conciertos',
  'deportes',
  'destinos',
  'documental',
  'marcas',
  'redes',
];

const START = '# >>> videos publicados (generado por scripts/select-published-videos.js)';
const END = '# <<< videos publicados';

function argValue(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? Number(process.argv[i + 1]) : fallback;
}

function collect() {
  const byCategory = {};
  for (const category of CATEGORIES) {
    const dir = path.join(videosRoot, category);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.webm'))
      .map((f) => ({
        rel: `${category}/${f}`,
        category,
        mb: fs.statSync(path.join(dir, f)).size / 1048576,
      }))
      .sort((a, b) => a.mb - b.mb);
    if (files.length) byCategory[category] = files;
  }
  return byCategory;
}

/**
 * Reparto por rondas: en cada vuelta cada categoria mete su siguiente video si
 * cabe en el presupuesto. Asi ninguna categoria se queda sin representacion
 * porque otra se llevo el espacio primero.
 */
function select(byCategory, budgetMb) {
  const picked = [];
  const queues = Object.fromEntries(Object.entries(byCategory).map(([k, v]) => [k, [...v]]));
  let used = 0;
  let movedSomething = true;

  while (movedSomething) {
    movedSomething = false;
    for (const category of CATEGORIES) {
      const queue = queues[category];
      if (!queue || queue.length === 0) continue;
      const next = queue[0];
      if (used + next.mb > budgetMb) continue;
      queue.shift();
      picked.push(next);
      used += next.mb;
      movedSomething = true;
    }
  }

  return { picked, used };
}

function writeGitignore(published) {
  let content = fs.readFileSync(gitignoreFile, 'utf8');

  const block = [
    START,
    '# Los .webm no se versionan por defecto: la libreria completa pesa mas de lo',
    '# que conviene en un repo. Solo suben los que el sitio publica.',
    '/public/media/**/*.webm',
    '# Recursos fijos de la interfaz (no son piezas del portafolio).',
    '!/public/media/videos/sitio/*.webm',
    ...published.map((p) => `!/public/media/videos/${p.rel}`),
    END,
  ].join('\n');

  const startIdx = content.indexOf(START);
  if (startIdx !== -1) {
    const endIdx = content.indexOf(END, startIdx);
    content = content.slice(0, startIdx) + block + content.slice(endIdx + END.length);
  } else {
    content = `${content.trimEnd()}\n\n${block}\n`;
  }

  fs.writeFileSync(gitignoreFile, content);
}

function main() {
  const budget = argValue('--budget', 480);
  const keep = process.argv.includes('--keep');

  let published;
  let used = 0;

  if (keep && fs.existsSync(listFile)) {
    published = JSON.parse(fs.readFileSync(listFile, 'utf8'));
    for (const p of published) {
      const full = path.join(videosRoot, p.rel);
      if (fs.existsSync(full)) used += fs.statSync(full).size / 1048576;
    }
    console.log(`Conservando la lista existente: ${published.length} videos, ${used.toFixed(0)} MB`);
  } else {
    const byCategory = collect();
    const total = Object.values(byCategory).flat();
    const totalMb = total.reduce((sum, v) => sum + v.mb, 0);

    const result = select(byCategory, budget);
    published = result.picked
      .map(({ rel, category, mb }) => ({ rel, category, mb: Number(mb.toFixed(1)) }))
      .sort((a, b) => a.rel.localeCompare(b.rel));
    used = result.used;

    console.log(`Catalogo en disco: ${total.length} videos, ${totalMb.toFixed(0)} MB`);
    console.log(`Presupuesto: ${budget} MB\n`);

    const byCat = {};
    for (const p of published) byCat[p.category] = (byCat[p.category] || 0) + 1;
    for (const category of CATEGORIES) {
      const all = (byCategory[category] || []).length;
      console.log(`  ${category.padEnd(12)} publica ${String(byCat[category] || 0).padStart(2)} de ${all}`);
    }

    fs.writeFileSync(listFile, `${JSON.stringify(published, null, 2)}\n`);
    console.log(`\nEscrito ${path.relative(root, listFile)}`);
  }

  writeGitignore(published);
  console.log(`Bloque de .gitignore actualizado.`);
  console.log(`\nPUBLICADOS: ${published.length} videos, ${used.toFixed(0)} MB`);
  console.log('Los demas siguen en disco pero no entran a git ni al catalogo.');
  console.log('\nAhora regenera el catalogo:  node scripts/generate-catalog.js');
}

main();
