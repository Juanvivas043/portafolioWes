import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import VideoGrid from '@/components/gallery/VideoGrid';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Film } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Galería de Cinematografía & Video | WES',
  description: 'Portafolio de cinematografía, videoclips musicales, comerciales y reels por WES. Streaming local fluido y master en 4K 120fps.',
};

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <Header />

      {/* SUBPAGE HERO BANNER */}
      <section className="pt-32 pb-12 border-b border-[#222222] bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-tech text-[#888888] mb-4">
            <Link href="/" className="hover:text-[#DFFF00] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>INICIO</span>
            </Link>
            <span>/</span>
            <span className="text-[#DFFF00]">PROYECTOS</span>
            <span>/</span>
            <span className="text-white">CINEMATOGRAFÍA</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 border border-[#222222] bg-[#121212] px-3 py-1 mb-2">
                <Film className="w-3.5 h-3.5 text-[#DFFF00]" />
                <span className="text-xs font-tech text-[#DFFF00] uppercase font-bold">
                  STREAMING CINEMATOGRÁFICO
                </span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
                DISCIPLINA // CINEMATOGRAFÍA
              </h1>
            </div>

            <p className="text-xs font-tech text-[#888888] max-w-md">
              Videoclips, spots comerciales y microcontenido vertical para redes. Haz clic en cualquier pieza para abrir el reproductor cinematográfico con controles personalizados.
            </p>
          </div>
        </div>
      </section>

      {/* FULL VIDEO GRID WITH CATEGORY FILTERS */}
      <VideoGrid
        showCategoryFilters={true}
        title="TODAS LAS PRODUCCIONES AUDIOVISUALES"
        subtitle="STREAMING PARCIAL EN ALTA DEFINICIÓN & SIN RETARDOS"
      />

      {/* CONTACT CTA SECTION REQUIRED FOR SUBPAGE */}
      <ContactForm />

      <Footer />
    </main>
  );
}
