import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Galería de Fotografía Profesional | WES',
  description: 'Portafolio fotográfico de alta resolución por WES. Retratos de artistas, conciertos en vivo, deportes extremos, paisajes y campañas de marcas comerciales.',
};

export default function FotografiaPage() {
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
            <span className="text-white">FOTOGRAFÍA</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 border border-[#222222] bg-[#121212] px-3 py-1 mb-2">
                <Camera className="w-3.5 h-3.5 text-[#DFFF00]" />
                <span className="text-xs font-tech text-[#DFFF00] uppercase font-bold">
                  CATÁLOGO FOTOGRÁFICO COMPLETO
                </span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
                DISCIPLINA // FOTOGRAFÍA
              </h1>
            </div>

            <p className="text-xs font-tech text-[#888888] max-w-md">
              Explora las obras por categoría. Haz clic en cualquier imagen para abrir el visor de alta resolución con metadatos EXIF de cámara, lente, apertura e ISO.
            </p>
          </div>
        </div>
      </section>

      {/* FULL GALLERY GRID WITH CATEGORY FILTERS */}
      <GalleryGrid
        showCategoryFilters={true}
        title="TODAS LAS OBRAS FOTOGRÁFICAS"
        subtitle="SELECCIÓN CURADA // ARISTAS VIVAS & RESOLUCIÓN DIRECTA"
      />

      {/* CONTACT CTA SECTION REQUIRED FOR SUBPAGE */}
      <ContactForm />

      <Footer />
    </main>
  );
}
