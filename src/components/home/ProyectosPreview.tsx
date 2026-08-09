'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Camera, Film } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper';
import MagneticButton from '@/components/animations/MagneticButton';

export default function ProyectosPreview() {
  return (
    <section id="proyectos" className="py-20 bg-[#050505] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION TITLE */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-5 mb-10 gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-3 h-px bg-[#DFFF00]" />
              EXPLORACIÓN DISCIPLINARIA
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              PROYECTOS & DISCIPLINAS
            </h2>
          </div>
          <p className="text-xs font-tech text-[#888888] max-w-sm">
            Selecciona una rama para acceder a su galería de 5 columnas con filtrado instantáneo y streaming en alta resolución.
          </p>
        </FadeUp>

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
              <span className="text-[#DFFF00]">6 CATEGORÍAS DISPONIBLES</span>
            </div>

            {/* PREVIEW IMAGE WITH HOVER REVEAL */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden border border-[#1f1f1f]">
              <Image
                src="/media/imagenes/conciertos/DOBLEU_-01.webp"
                alt="Fotografía Profesional"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* OVERLAY RETICLE */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] font-tech text-white bg-black/60 px-2 py-1 self-start border border-[#333333]">
                  <span>STILL RESOLUTION: 33MP RAW</span>
                </div>
                <div className="text-[9px] font-tech text-[#DFFF00] bg-black/80 px-2 py-1 self-end border border-[#333333]">
                  EXIF VERIFICADO
                </div>
              </div>

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
                  PORTAFOLIO DE FOTOGRAFÍA
                </h3>
                <p className="text-xs text-[#999999] font-sans leading-relaxed mt-1">
                  Retratos editoriales, cobertura de festivales masivos, deportes de combate, campañas comerciales y paisajes con líneas de horizonte perfectas.
                </p>
              </div>

              {/* CATEGORIES PILLS */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-tech text-[#888888]">
                {['Artistas', 'Conciertos', 'Deportes', 'Destinos', 'Lifestyle', 'Marcas'].map((cat) => (
                  <span key={cat} className="px-2 py-0.5 bg-[#141414] border border-[#222222]">
                    {cat}
                  </span>
                ))}
              </div>

              {/* CTA LINK BUTTON WITH MAGNETIC HOVER */}
              <MagneticButton strength={10} className="w-full">
                <Link
                  href="/proyectos/fotografia"
                  className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2a2a2a] hover:border-[#DFFF00] transition-all"
                >
                  <span>VER GALERÍA DE FOTOS</span>
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
                <span>CINEMATOGRAFÍA</span>
              </div>
              <span className="text-[#DFFF00]">STREAMING HTTP 206</span>
            </div>

            {/* PREVIEW VIDEO / POSTER WITH HOVER REVEAL */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden border border-[#1f1f1f]">
              <Image
                src="/media/imagenes/marcas/DOBLEU_-040.JPG.webp"
                alt="Cinematografía Profesional"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />

              {/* OVERLAY RETICLE */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[9px] font-tech text-white bg-black/60 px-2 py-1 self-start border border-[#333333]">
                  <span>CINE MASTER: 4K 120FPS 10-BIT</span>
                </div>
                <div className="text-[9px] font-tech text-[#DFFF00] bg-black/80 px-2 py-1 self-end border border-[#333333]">
                  PRORES / ACEScct
                </div>
              </div>

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
                  PORTAFOLIO DE CINEMATOGRAFÍA
                </h3>
                <p className="text-xs text-[#999999] font-sans leading-relaxed mt-1">
                  Videoclips de alto presupuesto, reels comerciales para marcas de indumentaria, aftermovies de festivales y cortometrajes documentales.
                </p>
              </div>

              {/* CATEGORIES PILLS */}
              <div className="flex flex-wrap gap-1.5 text-[10px] font-tech text-[#888888]">
                {['Videoclips', 'Marcas', 'Redes Sociales', 'Conciertos', 'Deportes', 'Documental'].map((cat) => (
                  <span key={cat} className="px-2 py-0.5 bg-[#141414] border border-[#222222]">
                    {cat}
                  </span>
                ))}
              </div>

              {/* CTA LINK BUTTON WITH MAGNETIC HOVER */}
              <MagneticButton strength={10} className="w-full">
                <Link
                  href="/proyectos/video"
                  className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2a2a2a] hover:border-[#DFFF00] transition-all"
                >
                  <span>VER GALERÍA DE CINEMATOGRAFÍA</span>
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
