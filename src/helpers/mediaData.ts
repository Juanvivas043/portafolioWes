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
 * Devuelve una foto destacada de una categoria para usarla como imagen fija
 * (portada de seccion, poster del hero, retrato de About...).
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
  role: 'Fotógrafo & Director de Fotografía Audiovisual',
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
  stats: [
    { number: '120+', label: 'Proyectos Completados' },
    { number: '45+', label: 'Videoclips & Spots Dirigidos' },
    { number: '15+', label: 'Marcas Globales' },
    { number: '5+', label: 'Años de Trayectoria' },
  ],
  clients: [
    'FURIA GEAR',
    'NOREH / SONY LATAM',
    'DEVANT EYEWEAR',
    'ANIMA FESTIVAL',
    'THE FLOWERSHOP',
    'BJJ FEDERATION',
    'CHELONIA',
    'STACY MALIBU',
    'PAPELÓN MUNDIAL',
  ],
  socials: {
    instagram: 'https://instagram.com',
    vimeo: 'https://vimeo.com',
    youtube: 'https://youtube.com',
    behance: 'https://behance.net',
    email: 'contacto@wesfotografia.com',
    phone: '+58 412 000 0000',
    whatsapp: 'https://wa.me/584120000000',
  },
};
