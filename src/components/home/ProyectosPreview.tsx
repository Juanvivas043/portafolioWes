'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Camera, Film } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper';
import ScrollDrawLine from '@/components/animations/ScrollDrawLine';
import MagneticButton from '@/components/animations/MagneticButton';
import {
  PHOTO_CATALOG,
  VIDEO_CATALOG,
  PHOTO_CATEGORY_LABELS,
  getFeaturedPhoto,
  VIDEO_CATEGORY_LABELS,
} from '@/helpers/mediaData';
import { buildCategoryFilters } from '@/helpers/formatters';

export default function ProyectosPreview() {
  // Categorias y conteos derivados del catalogo: no pueden contradecir lo que
  // el visitante encuentra despues en la galeria.
  const photoCategories = buildCategoryFilters(PHOTO_CATALOG, PHOTO_CATEGORY_LABELS).slice(1);
  const videoCategories = buildCategoryFilters(VIDEO_CATALOG, VIDEO_CATEGORY_LABELS).slice(1);

  const photoCover = getFeaturedPhoto('conciertos');
  const videoCover = getFeaturedPhoto('marcas');

  return (
    <section id="proyectos" className="py-20 bg-[#050505] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION TITLE */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between pb-4 gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-3 h-px bg-[#DFFF00]" />
              GALERÍAS
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              PROYECTOS
            </h2>
          </div>
          <p className="text-xs font-tech text-[#888888] max-w-sm">
            Elige una galería para ver el trabajo completo, con filtros por categoría.
          </p>
        </FadeUp>

        {/* BLUEPRINT DRAW LINE */}
        <ScrollDrawLine color="#222222" className="mb-10" />

        {/* DUAL SPLIT PREVIEW CARDS */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BRANCH 1: FOTOGRAFÍA */}
          <StaggerItem className="group relative border-2 border-[#222222] bg-[#0c0c0c] p-3 hover:border-[#DFFF00] transition-all duration-300">
            {/* CARD TOP INFO */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f1f1f] text-[11px] font-tech text-[#888888]">
              <div className="flex items-center space-x-2 text-white font-bold">
                <Camera className="w-4 h-4 text-[#DFFF00]" />
                <span>FOTOGRAFÍA</span>
              </div>
              <span className="text-[#DFFF00]">{PHOTO_CATALOG.length} FOTOGRAFÍAS</span>
            </div>

            {/* PREVIEW IMAGE WITH HOVER REVEAL */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden border border-[#1f1f1f]">
              <Image
                src={photoCover?.src ?? ''}
                alt="Fotografía Profesional"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* CORNER BRACKETS */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* CARD BODY */}
            <div className="pt-5 space-y-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-white tracking-tight group-hover:text-[#DFFF00] transition-colors">
                  FOTOGRAFÍA
                </h3>
                <p className="text-xs text-[#999999] font-sans leading-relaxed mt-1">
                  Retratos, conciertos, deportes, paisajes y campañas de marca.
                </p>
              </div>

              {/* CATEGORIES PILLS */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-tech text-[#888888]">
                {photoCategories.map((cat) => (
                  <span key={cat.id} className="px-2 py-0.5 bg-[#141414] border border-[#222222]">
                    {cat.label} {cat.count}
                  </span>
                ))}
              </div>

              {/* CTA LINK BUTTON WITH MAGNETIC HOVER */}
              <MagneticButton strength={10} className="w-full">
                <Link
                  href="/proyectos/fotografia"
                  className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2a2a2a] hover:border-[#DFFF00] transition-all"
                >
                  <span>VER GALERÍA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </StaggerItem>

          {/* BRANCH 2: CINEMATOGRAFÍA & VIDEO */}
          <StaggerItem className="group relative border-2 border-[#222222] bg-[#0c0c0c] p-3 hover:border-[#DFFF00] transition-all duration-300">
            {/* CARD TOP INFO */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f1f1f] text-[11px] font-tech text-[#888888]">
              <div className="flex items-center space-x-2 text-white font-bold">
                <Film className="w-4 h-4 text-[#DFFF00]" />
                <span>VIDEO</span>
              </div>
              <span className="text-[#DFFF00]">{VIDEO_CATALOG.length} VIDEOS</span>
            </div>

            {/* PREVIEW VIDEO / POSTER WITH HOVER REVEAL */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden border border-[#1f1f1f]">
              <Image
                src={videoCover?.src ?? ''}
                alt="Cinematografía Profesional"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* CORNER BRACKETS */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* CARD BODY */}
            <div className="pt-5 space-y-4">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-white tracking-tight group-hover:text-[#DFFF00] transition-colors">
                  VIDEO
                </h3>
                <p className="text-xs text-[#999999] font-sans leading-relaxed mt-1">
                  Videoclips, comerciales de marca, aftermovies de festivales y documental.
                </p>
              </div>

              {/* CATEGORIES PILLS */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-tech text-[#888888]">
                {videoCategories.map((cat) => (
                  <span key={cat.id} className="px-2 py-0.5 bg-[#141414] border border-[#222222]">
                    {cat.label} {cat.count}
                  </span>
                ))}
              </div>

              {/* CTA LINK BUTTON WITH MAGNETIC HOVER */}
              <MagneticButton strength={10} className="w-full">
                <Link
                  href="/proyectos/video"
                  className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2a2a2a] hover:border-[#DFFF00] transition-all"
                >
                  <span>VER GALERÍA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
