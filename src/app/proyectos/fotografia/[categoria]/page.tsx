import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { getPhotoCategories } from '@/helpers/mediaData';

export const dynamic = 'force-static';

interface PageProps {
  params: { categoria: string };
}

/** Una pagina estatica por categoria con fotos; el resto devuelve 404. */
export function generateStaticParams() {
  return getPhotoCategories().map((category) => ({ categoria: category.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getPhotoCategories().find((entry) => entry.id === params.categoria);
  if (!category) return { title: 'Categoría no encontrada | WES' };

  return {
    title: `${category.label} — Fotografía | WES`,
    description: `${category.count} fotografías de ${category.label.toLowerCase()} por WES.`,
  };
}

export default function CategoriaFotografiaPage({ params }: PageProps) {
  const category = getPhotoCategories().find((entry) => entry.id === params.categoria);
  if (!category) notFound();

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <Header />

      <section className="pt-32 pb-12 border-b border-[#222222] bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-tech text-[#888888] mb-4">
            <Link href="/" className="hover:text-[#DFFF00] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>INICIO</span>
            </Link>
            <span>/</span>
            <Link href="/proyectos/fotografia" className="hover:text-[#DFFF00] text-[#DFFF00]">
              FOTOGRAFÍA
            </Link>
            <span>/</span>
            <span className="text-white uppercase">{category.label}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 border border-[#222222] bg-[#121212] px-3 py-1 mb-2">
                <Camera className="w-3.5 h-3.5 text-[#DFFF00]" />
                <span className="text-xs font-tech text-[#DFFF00] uppercase font-bold">
                  {category.count} {category.count === 1 ? 'FOTOGRAFÍA' : 'FOTOGRAFÍAS'}
                </span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
                {category.label}
              </h1>
            </div>

            <Link
              href="/proyectos/fotografia"
              className="text-xs font-tech text-[#888888] hover:text-[#DFFF00] transition-colors flex items-center gap-1.5 self-start md:self-end"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>VER TODAS LAS CATEGORÍAS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* La galeria queda fijada a esta categoria: el filtro lo hace la URL. */}
      <GalleryGrid
        initialCategory={category.id}
        showCategoryFilters={false}
        title={category.label.toUpperCase()}
        subtitle="GALERÍA COMPLETA"
      />

      <ContactForm />
      <Footer />
    </main>
  );
}
