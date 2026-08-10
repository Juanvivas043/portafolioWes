# CLAUDE.md

Guía para agentes que trabajen en este repositorio. Contiene tanto las **reglas
de construcción del proyecto** (términos de referencia originales, no
negociables) como el **estado real del código** verificado en el repo.

---

## 1. Qué es este proyecto

Portafolio web de fotografía y video de alta resolución para **WES** (fotógrafo
y director audiovisual, Caracas, Venezuela). Next.js 14 App Router, self-hosted,
con almacenamiento de medios desacoplado del código.

Tres pilares que rigen toda decisión técnica:

1. **Entrega multimedia fluida e instantánea** sin comprometer resolución.
2. **Dirección de arte geométrica de alto impacto** (aristas vivas, monocromo +
   un acento).
3. **Arquitectura de software escalable y limpia** (SOLID adaptado a React,
   bajo acoplamiento, alta cohesión).

Todo el contenido de UI está en **español**. Los comentarios de código en el
repo están mayormente en inglés/español mezclado; sigue el estilo del archivo
que edites.

---

## 2. Stack y comandos

| Aspecto     | Valor                                                   |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 14.2 (App Router) + React 18.3                   |
| Lenguaje    | TypeScript 5.7, `strict: true`, alias `@/*` → `./src/*`  |
| Estilos     | Tailwind CSS 3.4 + `src/app/globals.css`                 |
| Animación   | framer-motion 13                                         |
| Iconos      | lucide-react (única fuente de iconografía)               |
| Media tools | sharp (imágenes), ffmpeg-static (video) — solo en scripts |

```bash
npm run dev     # dev server en http://localhost:3000
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # next lint
```

No hay suite de tests configurada. Si agregas lógica pura nueva, colócala en
`src/helpers/` para que sea testeable a futuro.

`clsx` y `tailwind-merge` están en `package.json` pero **no se usan** en el
código actual: las clases se componen con template strings. No introduzcas un
`cn()` helper salvo que el usuario lo pida.

---

## 3. Estructura de carpetas (obligatoria)

```text
/
├── next.config.mjs         # headers de caché + Accept-Ranges para /media
├── tailwind.config.js      # paleta, tipografías, borderRadius = 0 en todo
├── /scripts                # utilidades Node one-off para medios (CommonJS)
├── /src
│   ├── /app                # rutas, layouts y páginas (solo composición)
│   ├── /components         # componentes modulares y desacoplados
│   │   ├── /animations     # primitivas de movimiento reutilizables
│   │   ├── /gallery        # grids y modales de foto/video
│   │   ├── /home           # secciones de la landing
│   │   └── /layout         # Header, Footer, CustomCursor
│   ├── /helpers            # funciones puras + catálogo de datos
│   └── /hooks              # lógica de estado y efectos
└── /public
    └── /media              # medios pesados (~390 MB, versionados en git)
        ├── /imagenes/<categoria>/*.webp
        └── /videos/<categoria>/*.webm
```

**Regla de páginas:** los archivos en `/src/app` solo importan y componen
componentes. No escribas JSX de secciones completas dentro de una `page.tsx`
(la excepción existente es el banner de cabecera de las subpáginas de
`/proyectos`, que es específico de esa ruta).

### Política de versionado de medios (decidida)

`/public/media` **sí se versiona**: los `.webp`, `.webm` y el `.mp4` de fallback
optimizados forman parte del repositorio y deben subirse (75 archivos, ~390 MB).
Esto reemplaza la indicación del documento de referencia original.

Lo que el `.gitignore` **sí** bloquea dentro de `/public/media` son los
originales sin optimizar que los scripts consumen: `.jpg/.jpeg/.png/.heic`,
`.tif/.tiff`, `.mov/.avi/.mkv` y RAW (`.arw/.cr2/.dng`). Consecuencia práctica:
si dejas caer un original y no lo conviertes, git no lo verá. Optimiza siempre
antes de commitear (§8).

---

## 4. Dirección de arte — reglas duras

- **Cero bordes redondeados.** `tailwind.config.js` fuerza `borderRadius: 0` en
  todas las escalas y `globals.css` aplica `* { border-radius: 0px !important; }`.
  Nunca introduzcas `rounded-*` ni `border-radius` en línea.
- **Paleta monocromática + un solo acento.** Negro/gris/blanco más
  `#DFFF00` (Acid Lime / High-Voltage Yellow) reservado para CTAs, hovers,
  estados activos y detalles de interfaz. No introduzcas un segundo color de
  acento.
  - Fondo base `#050505`, superficies `#0a0a0a`–`#151515`, bordes `#222222`,
    texto `#f5f5f5`, muted `#888888`.
- **Tipografías (cargadas por `<link>` de Google Fonts en `layout.tsx`):**
  - `font-editorial` → Syne — titulares, siempre `uppercase`.
  - `font-tech` → Space Mono — metadatos, etiquetas, microcopy técnico.
  - Space Grotesk — texto corrido (default del `body`).
- **Mobile-first.** Toda sección debe sobrevivir de 320 px a desktop sin romper
  la estructura de bloques. Contenedor estándar:
  `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Prohibiciones explícitas:** sin emojis, sin texto resaltado con fondos de
  color, sin apariencia de plantilla comercial ni de "página generada por IA".
  El diseño debe leerse arriesgado, editorial y autoral.

### Tono y redacción de los textos

La UI pasó por una limpieza de copy; respeta estas reglas al escribir textos
nuevos:

- **Títulos de una sola palabra o frase corta**, en una sola línea: `PROYECTOS`,
  `TRABAJOS`, `GALERÍA`, `CONTACTO`, `SOBRE MÍ`. Nada de
  `TÍTULO // SUBTÍTULO EN LA MISMA LÍNEA`.
- **Español en toda la interfaz.** No mezcles inglés decorativo (`SELECTED
  WORKS`, `SCROLL DOWN`, `CINEMA PLAYER`, `FOCUS LOCK`).
- **Nada de especificaciones técnicas inventadas.** Fuera etiquetas tipo
  `LUT: ACEScct`, `STREAMING HTTP 206`, `4K 120FPS 10-BIT` como decoración. Los
  datos técnicos solo aparecen donde son reales y provienen del catálogo: la
  ficha EXIF del modal de foto y la ficha de producción del modal de video.
- **El prefijo `//`** quedó reservado para el ticker; no lo uses como adorno de
  cada eyebrow o etiqueta.
- **Nombres consistentes:** la disciplina audiovisual se llama **Video** en toda
  la navegación (no "Cinematografía" en un sitio y "Video" en otro).
- **Cifras verificables.** Cuando un número se pueda derivar del catálogo,
  derívalo (`PHOTO_CATALOG.length`, `ARTIST_PROFILE.clients.length`) en lugar de
  escribirlo a mano y arriesgar que se contradiga con otra sección.
- **Nada de datos técnicos que no se puedan medir del archivo.** Duración,
  proporción y portada de cada video salen de `ffmpeg`; si vas a añadir un dato
  técnico nuevo, primero compruébalo contra el archivo real.

---

## 5. Arquitectura y estándares de código

- **Funcional y declarativo.** Componentes de función + hooks. Sin clases, sin
  mutación directa de estado; trabaja con copias inmutables (`[...items]`,
  spread de objetos).
- **Single Responsibility.** Un componente, un hook o una función = un solo
  motivo para cambiar. Si un componente pasa de ~250 líneas o mezcla
  responsabilidades, extrae.
- **Open/Closed.** Extiende vía `children`, composición y props opcionales;
  no modifiques la lógica interna de un componente compartido para un caso
  puntual (ver `GalleryGrid` con `showCategoryFilters`, `title`, `subtitle`).
- **Dependency Inversion.** Los componentes visuales reciben datos por props;
  no hacen fetching propio. El catálogo se lee desde `@/helpers/mediaData`.
- **Separación de capas:** presentación (`/components`), lógica de estado
  (`/hooks`), datos y funciones puras (`/helpers`).
- **Helpers puros.** Toda matemática, formateo, slugs, parsing y cálculo
  repetido va a `/src/helpers` como función pura sin dependencias externas.
- **`'use client'`** solo donde hay estado, efectos, eventos o framer-motion.
  `layout.tsx` y las `page.tsx` son Server Components; las páginas de
  `/proyectos` declaran `export const dynamic = 'force-static'`.

### Convenciones concretas del repo

- Componentes: `export default function Nombre()`; las primitivas de animación
  de `MotionWrapper.tsx` son exports nombrados (`FadeUp`, `ShutterWipe`,
  `StaggerContainer`, `StaggerItem`).
- Hooks: export nombrado, prefijo `use`, devuelven un objeto con estado +
  callbacks memoizados con `useCallback`.
- Imports internos siempre con alias `@/…`, nunca rutas relativas largas.
- Los colores se escriben inline como valores hex arbitrarios de Tailwind
  (`bg-[#050505]`, `text-[#DFFF00]`), no con los tokens semánticos del
  `tailwind.config.js`. Mantén la consistencia con lo existente.

---

## 6. SLA de rendimiento y entrega de medios

Prioridad crítica; no negociable.

- **Imágenes:** siempre `next/image`. `next.config.mjs` tiene
  `images.unoptimized: true` (entrega directa desde `/public`, sin
  transformación en servidor). Nunca uses `<img>` crudo.
  - Usa `sizes` correcto y `priority` solo en el above-the-fold.
  - Evita CLS: reserva el espacio con `fill` + contenedor con aspect ratio, o
    con `width`/`height` explícitos.
- **Lazy loading estricto:** nada fuera del viewport inicial descarga antes de
  que el usuario haga scroll.
- **Video:** todo `<video>` lleva `poster` (obligatorio), `playsInline` y
  `preload` acorde al caso (`metadata` por defecto; `auto` solo cuando el video
  es el foco inmediato, como el loop del Hero o el modal ya abierto).
  - En grids **no** se montan `<video>`: se muestra `posterUrl` con
    `next/image` y el video real solo se carga al abrir el modal.
- **Streaming por rangos:** los medios se sirven desde el filesystem local.
  `next.config.mjs` inyecta en `/media/:path*`:
  - `Cache-Control: public, max-age=31536000, immutable`
  - `Accept-Ranges: bytes` (habilita `206 Partial Content`)
  - `src/helpers/streamHelpers.ts` tiene `parseRange()` y `getMimeType()` puros,
    listos si se implementa un route handler de streaming propio.
- **Formatos canónicos:** imágenes `.webp` (máx. 2560 px, calidad 88, con EXIF),
  videos `.webm` VP9/Opus con el **lado mayor a 1280 px**. Un `.mp4` sobrevive
  como fallback del loop del Hero.
  - Los videos no se codifican a 1080p a propósito: el reproductor vive dentro
    de un modal de 1024 px, así que 1080p gastaba el doble de bytes en píxeles
    que nadie llega a ver. Medido sobre el material más difícil del catálogo,
    1080p pesaba 43 MB por 45 s frente a 25 MB en 720p.
- **Paginación obligatoria en los grids.** El catálogo pasa de 300 piezas; los
  grids montan tandas con `usePagination` (30 fotos / 24 videos) y un botón de
  cargar más. No renderices el catálogo completo de golpe.

---

## 7. Datos: catálogo generado desde los archivos

El catálogo **ya no se escribe a mano**. Se genera leyendo los medios reales:

| Archivo | Qué es | ¿Se edita a mano? |
| ------- | ------ | ----------------- |
| `src/helpers/mediaData.ts` | Tipos, `ARTIST_PROFILE`, etiquetas de categoría y helpers | Sí |
| `src/helpers/generatedCatalog.ts` | `PHOTO_CATALOG` y `VIDEO_CATALOG` | **No** — lo pisa el script |
| `src/helpers/catalogOverrides.json` | Títulos, descripciones y clientes propios por `id` | Sí |

Flujo para añadir medios:

1. Deja los originales en `public/media/images/<CATEGORÍA>/` o
   `public/media/videos/<CATEGORÍA>/` (nombres en mayúsculas como vienen del
   disco: `ARTISTAS`, `CONCIERTOS Y FIESTAS`, `REDES SOCIALES`…).
2. `node scripts/import-media.js` — convierte a `.webp` / `.webm` en las
   carpetas canónicas en minúscula y con nombres slug.
3. `node scripts/generate-video-posters.js` — un fotograma real por video.
4. `node scripts/generate-catalog.js` — reescribe `generatedCatalog.ts`.

**De dónde sale cada dato.** Todo lo obligatorio se mide del archivo, así que no
puede contradecirlo: dimensiones y orientación con sharp; cámara, óptica, focal,
apertura, obturación, ISO y año con el EXIF real de la foto; duración y
resolución de cada video con ffmpeg. Lo que no se puede deducir del archivo
(título propio, descripción, cliente) es **opcional** y se pone en
`catalogOverrides.json`, que sobrevive a las regeneraciones.

Nunca escribas a mano un dato técnico: si no sale del archivo, no va.

- `PhotoItem` / `PHOTO_CATALOG` — categorías: `artistas`, `conciertos`,
  `deportes`, `destinos`, `lifestyle`, `marcas`. Incluye metadatos EXIF
  (cámara, lente, focal, apertura, obturación, ISO) que el modal muestra.
- `VideoItem` / `VIDEO_CATALOG` — categorías: `videoclips`, `conciertos`,
  `deportes`, `destinos`, `documental`, `marcas`, `redes`. Incluye
  `streamUrl`, `posterUrl`, `duration`, `resolution`, `fps`, `colorGrade`.
- `ARTIST_PROFILE` — bio, trayectoria, equipo, estadísticas, clientes y redes.

Ambos catálogos son `readonly`; los helpers de filtrado devuelven copias.

**Al añadir medios:**

1. Coloca el archivo en `public/media/<imagenes|videos>/<categoria>/`.
2. Optimízalo con el script correspondiente (§8).
3. Añade la entrada completa al catálogo — `id` único con el prefijo de su
   categoría, y todos los campos de la interfaz rellenos.
4. Verifica que `posterUrl` apunte a una imagen que exista.

**Placeholders intencionales:** `ARTIST_PROFILE.trajectory[].company` y
`.description` contienen Lorem ipsum, y `socials` apunta a URLs genéricas con el
teléfono `+58 412 000 0000`. Es una decisión tomada: **déjalos como están** y no
los reemplaces por contenido inventado. Se sustituirán cuando el usuario provea
los datos reales.

---

## 8. Scripts de medios (`/scripts`, CommonJS, ejecución manual)

No están en `package.json`; se corren con `node scripts/<archivo>.js`.

| Script                   | Qué hace                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| `import-media.js`        | **El principal.** Convierte los originales de `images/<CATEGORÍA>` y `videos/<CATEGORÍA>` a `.webp` (2560 px, q88, conserva EXIF) y `.webm` (VP9/Opus, lado mayor 1280). Reanudable: salta lo que ya está al día. Acepta `--fotos` / `--videos`. |
| `generate-catalog.js`    | Reescribe `src/helpers/generatedCatalog.ts` con los datos medidos de cada archivo. |
| `setup-media.js`         | Copia originales desde una ruta local de OneDrive a `public/media/…`. **La ruta origen está hardcodeada a la máquina del usuario.** |
| `optimize-media.js`      | Versión antigua, solo fotos. Usa `import-media.js`.                       |
| `optimize-videos.js`     | Versión antigua, solo videos. Usa `import-media.js`.                      |
| `optimize-hero-video.js` | Genera el loop de fondo del Hero (`videos/hero/hero_bg_loop.webm` + `.mp4`). |
| `cleanup-old-media.js`   | **Destructivo:** borra los originales sin optimizar. Confirma antes de correrlo. |
| `generate-video-posters.js` | Extrae un fotograma real de cada video (al 15% de su duración) y lo guarda en `public/media/imagenes/posters/<categoria>/`. Imprime además la duración real de cada archivo. |

**Correr un script mientras `npm run dev` está activo rompe el dev server:**
`next build` y `next dev` comparten el directorio `.next` y se sobrescriben.
Si pasa, para el dev server, borra `.next` y arranca de nuevo.

---

## 9. Mapa de componentes

**Layout** — presentes en todas las páginas:

- `Header` — nombre a la izquierda, navegación central (Inicio, About,
  Proyectos, Contacto) y botón CTA. En móvil: menú hamburguesa con sidebar,
  enlaces, CTA y botón de cierre en el header.
- `Footer` — redes, nombre del creador, copyright, crédito "desarrollado por
  Juan".
- `CustomCursor` — retícula de visor de cámara con tres estados
  (`default` / `link` / `media`), estilados en `globals.css`.

**Home** (`/`, compuesta en `src/app/page.tsx`):
`Hero` → `AutonomousInfiniteReel` → `About` → `ProyectosPreview` →
`MixedGrid` → `CTASection` → `ContactForm` → `Footer`.

**Galería** — `GalleryGrid` (fotos) y `VideoGrid` (videos), con `MediaModal` y
`VideoModal`. Grid masonry asimétrico de 5 columnas con `grid-auto-flow: dense`;
los spans salen de `getMasonrySpanClass(index)` en `formatters.ts`. Cada click
abre el modal con la ficha técnica de la obra.

**Subpáginas** — `/proyectos/fotografia` y `/proyectos/video`: banner con
breadcrumb, grid completo con filtros de categoría, `ContactForm` y `Footer`.

**Animaciones** — primitivas reutilizables: `MotionWrapper` (`FadeUp`,
`ShutterWipe`, `StaggerContainer`/`StaggerItem`), `ScrollAssembleCard`,
`ScrollDrawLine`, `InfiniteTicker`, `AutonomousInfiniteReel`, `MagneticButton`,
`CounterStat`. Reúsalas antes de escribir movimiento nuevo a mano. Easings
cinematográficos habituales: `[0.22, 1, 0.36, 1]` y `[0.16, 1, 0.3, 1]`.

**Sin parallax de fondo.** Los watermarks de texto gigante que se desplazaban
detrás de About y del grid fueron eliminados por decisión del usuario, junto con
el componente `ScrollParallaxRow`. No los reintroduzcas. El único parallax que
queda es el del video de fondo del Hero, que es intencional. `ParallaxImage`
sigue en el repo pero **no se usa** en ninguna pantalla.

**Hooks** — `useMediaModal` (selección, navegación con flechas, `Escape`,
bloqueo de scroll del body), `useVideoPlayer` (play/pause, tiempo, volumen,
buffering, fullscreen, manejo seguro de la promesa de `play()`),
`usePagination` (tandas del grid), `useFilterCategory`, `useScrollPosition`.

**`useVideoPlayer` monta los listeners contra un nodo en estado, no contra el
ref.** El `<video>` aparece después que el hook (el modal devuelve `null`
mientras está cerrado); un `useEffect` con `[]` se ejecutaba contra un ref vacío
y la barra de progreso no avanzaba nunca. No lo vuelvas a `useRef` a secas.

**Los filtros se construyen con `buildCategoryFilters`**, que los deriva del
catálogo. Nunca escribas la lista de categorías a mano: cuando se añadió el
primer video de `destinos`, el filtro escrito a mano no la ofrecía y esa pieza
quedó inalcanzable.

---

## 10. Estado conocido y decisiones tomadas

- **El formulario de contacto no envía nada, y así se queda por ahora.**
  `ContactForm.handleSubmit` solo hace `setIsSubmitted(true)`; no hay backend,
  API route ni servicio de email, y **no es un pendiente**. No implementes el
  envío salvo que el usuario lo pida de forma explícita. Los canales reales de
  contacto hoy son el enlace `mailto:` y el botón de WhatsApp de la misma
  sección.
- **Los Lorem ipsum de `ARTIST_PROFILE` son intencionales** (§7).
- `out/` y `.next/` son artefactos de build, ignorados por git.
  `next.config.mjs` no declara `output: 'export'`; si `out/` existe, es residuo
  de una exportación previa.
- No hay configuración de ESLint propia más allá de `next lint`, ni Prettier, ni
  CI.

---

## 11. Checklist antes de dar por terminado un cambio

1. ¿Cero `rounded-*` y ningún color fuera de la paleta monocromo + `#DFFF00`?
2. ¿Las imágenes pasan por `next/image` y los `<video>` llevan `poster`,
   `playsInline` y `preload`?
3. ¿La lógica pura quedó en `/helpers` y la de estado en `/hooks`, en lugar de
   dentro del componente?
4. ¿`'use client'` solo donde de verdad hace falta?
5. ¿Funciona de 320 px a desktop sin romper la retícula?
6. ¿Sin emojis ni texto sobre fondos de color en la UI?
7. ¿Los medios nuevos están optimizados y registrados en `mediaData.ts`?
8. `npm run build` compila limpio.
