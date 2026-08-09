import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/layout/CustomCursor';

export const metadata: Metadata = {
  title: 'WES — Fotografía & Dirección de Cine Audiovisual',
  description: 'Portafolio profesional de fotografía de alta resolución y cinematografía por WES. Videoclips, comerciales para marcas globales, festivales en vivo y deportes de acción.',
  keywords: [
    'WES Fotografía',
    'Director Audiovisual',
    'Cinematografía Caracas',
    'Videoclips Musicales',
    'Sony FX3 Cinema',
    'Fotografía Deportiva',
    'Fotografía de Conciertos',
    'Furia Gear',
  ],
  authors: [{ name: 'WES' }],
  openGraph: {
    title: 'WES — Cinematografía & Fotografía Editorial',
    description: 'Entrega multimedia instantánea, composiciones geométricas de alto impacto y dirección de arte vanguardista.',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/media/imagenes/artistas/DOBLEU_-11.webp',
        width: 1200,
        height: 800,
        alt: 'WES Fotografía & Cinematografía',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WES — Cinematografía & Fotografía',
    description: 'Portafolio profesional de fotografía y dirección audiovisual.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark bg-[#050505] text-[#f5f5f5]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#050505] text-[#f5f5f5] antialiased selection:bg-[#DFFF00] selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
