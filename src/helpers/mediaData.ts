import { GENERATED_PHOTOS, GENERATED_VIDEOS } from '@/helpers/generatedCatalog';

export type PhotoCategory =
  | 'artistas'
  | 'conciertos'
  | 'deportes'
  | 'destinos'
  | 'lifestyle'
  | 'marcas';

export type VideoCategory =
  | 'videoclips'
  | 'conciertos'
  | 'deportes'
  | 'destinos'
  | 'documental'
  | 'marcas'
  | 'redes';

/**
 * Los campos marcados como opcionales son de autor: no se pueden deducir del
 * archivo. Se rellenan desde `catalogOverrides.json`. Todo lo obligatorio sale
 * medido del propio medio, asi que no puede contradecirlo.
 */
export interface PhotoItem {
  id: string;
  title: string;
  category: PhotoCategory;
  categoryLabel: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  // Ficha tecnica leida del EXIF del archivo.
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  year?: string;
  // Datos de autor.
  location?: string;
  client?: string;
  description?: string;
  tags?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  categoryLabel: string;
  streamUrl: string;
  posterUrl: string;
  width: number;
  height: number;
  aspectRatio: '16:9' | '9:16' | '4:3' | '3:4';
  /** Duracion real del archivo en mm:ss. */
  duration: string;
  durationSeconds: number;
  // Datos de autor.
  role?: string;
  client?: string;
  year?: string;
  description?: string;
  tags?: string[];
}

export const PHOTO_CATALOG: readonly PhotoItem[] = GENERATED_PHOTOS;
export const VIDEO_CATALOG: readonly VideoItem[] = GENERATED_VIDEOS;

/**
 * Recursos fijos del sitio: no son piezas del portafolio, sino material propio
 * de la interfaz. Viven en `/media/*\/sitio/` a proposito, fuera de las carpetas
 * de categoria, para que los scripts de catalogo no los recojan y no aparezcan
 * en las galerias.
 */
export const SITE_MEDIA = {
  heroVideo: '/media/videos/sitio/hero.webm',
  heroPoster: '/media/imagenes/sitio/hero-poster.webp',
  /** Retrato de la seccion "Mi trayectoria". */
  portrait: '/media/imagenes/sitio/mi-trayectoria.webp',
} as const;

/**
 * Devuelve una foto destacada de una categoria para usarla como imagen fija
 * (portada de seccion, imagen para compartir...).
 *
 * Las secciones tenian la ruta escrita a mano y al reoptimizar la libreria los
 * archivos cambiaron de nombre: todas quedaron rotas a la vez. Leyendolas del
 * catalogo, cualquier reimportacion las repone sola.
 */
export function getFeaturedPhoto(category: PhotoCategory, offset: number = 0): PhotoItem | undefined {
  const pool = PHOTO_CATALOG.filter((photo) => photo.category === category);
  if (pool.length === 0) return PHOTO_CATALOG[0];
  return pool[offset % pool.length];
}

/**
 * Una categoria tal y como se presenta en el indice de cada disciplina:
 * su nombre, cuantas piezas tiene, la portada y a donde lleva.
 */
export interface CategoryEntry {
  id: string;
  label: string;
  count: number;
  cover: string;
  href: string;
}

/**
 * Construye el indice de categorias de fotografia.
 *
 * La portada es una pieza real de la propia categoria (la primera del
 * catalogo), no una imagen elegida a mano: al reimportar la libreria las
 * portadas se reponen solas y nunca apuntan a un archivo que ya no existe.
 * Solo aparecen las categorias que tienen material.
 */
export function getPhotoCategories(): CategoryEntry[] {
  return (Object.keys(PHOTO_CATEGORY_LABELS) as PhotoCategory[])
    .map((id) => {
      const items = PHOTO_CATALOG.filter((photo) => photo.category === id);
      return {
        id,
        label: PHOTO_CATEGORY_LABELS[id],
        count: items.length,
        cover: items[0]?.src ?? '',
        href: `/proyectos/fotografia/${id}`,
      };
    })
    .filter((entry) => entry.count > 0);
}

/** Igual que el anterior, pero la portada es el fotograma real del video. */
export function getVideoCategories(): CategoryEntry[] {
  return (Object.keys(VIDEO_CATEGORY_LABELS) as VideoCategory[])
    .map((id) => {
      const items = VIDEO_CATALOG.filter((video) => video.category === id);
      return {
        id,
        label: VIDEO_CATEGORY_LABELS[id],
        count: items.length,
        cover: items[0]?.posterUrl ?? '',
        href: `/proyectos/video/${id}`,
      };
    })
    .filter((entry) => entry.count > 0);
}

export const PHOTO_CATEGORY_LABELS: Readonly<Record<PhotoCategory, string>> = {
  artistas: 'Artistas',
  conciertos: 'Conciertos',
  deportes: 'Deportes',
  destinos: 'Destinos',
  lifestyle: 'Lifestyle',
  marcas: 'Marcas',
};

export const VIDEO_CATEGORY_LABELS: Readonly<Record<VideoCategory, string>> = {
  videoclips: 'Videoclips',
  conciertos: 'Conciertos',
  deportes: 'Deportes',
  destinos: 'Destinos',
  documental: 'Documental',
  marcas: 'Marcas',
  redes: 'Redes',
};

export const ARTIST_PROFILE = {
  name: 'WES',
  role: 'Director Audiovisual',
  location: 'Caracas, Venezuela • Disponible Globalmente',
  bio: `Creador audiovisual y director de fotografía con más de 7 años de trayectoria capturando la energía cruda de la música en vivo, campañas de marcas internacionales, retratos de alta costura y deportes extremos. Mi visión artística se fundamenta en la precisión geométrica, el contraste agresivo en claroscuro y la autenticidad sin filtros.`,
  trajectory: [
    {
      year: '2024 - 2026',
      title: 'Director Audiovisual & Lead Cinematographer',
      company: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      year: '2022 - 2024',
      title: 'Fotógrafo Comercial & Editor de Moda',
      company: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      year: '2019 - 2022',
      title: 'Fotoperiodista de Acción & Deportes Extremos',
      company: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ],
  /**
   * Equipo real: sale del EXIF de las 277 fotos del catálogo, no de una lista
   * escrita a mano. Si cambias de cuerpo u óptica, aparecerá aquí solo cuando
   * haya fotos suyas en el portafolio.
   */
  gear: [
    {
      category: 'Cuerpos',
      items: ['Sony A7 IV', 'Sony A7C II', 'Sony FX3', 'Sony A6700', 'Sony A6500'],
    },
    {
      category: 'Ópticas',
      items: [
        'Sigma 24-70mm F2.8 DG DN Art',
        'Sigma 70-200mm F2.8 DG OS HSM Sports',
        'Sigma 14-24mm F2.8 DG DN Art',
        'Sony FE PZ 16-35mm F4 G',
        'Sony FE 50mm F1.4 ZA',
      ],
    },
    {
      category: 'Ópticas APS-C',
      items: [
        'Sigma 18-50mm F2.8 DC DN Contemporary',
        'Sigma 16mm F1.4 DC DN Contemporary',
        'Sony E 70-300mm F4.5-6.3',
        'Tokina AT-X 11-16mm F2.8',
      ],
    },
  ],
  /**
   * Cifras de trayectoria que abre la seccion About. Son datos que solo WES
   * puede confirmar (no se deducen del catalogo), asi que viven aqui y el
   * componente solo las pinta.
   */
  stats: [
    { value: 150, prefix: '+', label: 'Producciones' },
    { value: 10, prefix: '+', label: 'Años de trayectoria' },
    { value: 30, prefix: '+', label: 'Clientes & marcas' },
    { value: 300, prefix: '+', label: 'Piezas publicadas' },
  ],
  clients: [
    'FURIA GEAR',
    'NOREH',
    'SONY LATAM',
    'DEVANT EYEWEAR',
    'ANIMA FESTIVAL',
    'THE FLOWERSHOP',
    'BJJ FEDERATION',
    'CHELONIA',
    'STACY MALIBU',
    'PAPELÓN',
  ],
  socials: {
    instagram: 'https://instagram.com/weslypacheco',
    vimeo: 'https://vimeo.com',
    youtube: 'https://youtube.com',
    behance: 'https://behance.net',
    email: 'wesly080998@gmail.com',
    /** Como se muestra en pantalla. */
    phone: '+58 414 233 2570',
    /** wa.me exige el numero en formato internacional y sin signos. */
    whatsapp: 'https://wa.me/584142332570',
  },
};
