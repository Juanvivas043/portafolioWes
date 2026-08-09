'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ARTIST_PROFILE } from '@/helpers/mediaData';
import { ArrowUpRight, Camera, CheckCircle2, Crosshair, Film, Layers, Sliders, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#080808] border-b border-[#222222] relative overflow-hidden">
      {/* BACKGROUND DECORATIVE GRID LINES */}
      <div className="absolute inset-0 crosshair-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-5 mb-10 sm:mb-16 gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1">
              // IDENTIDAD & TRAYECTORIA
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              MI TRAYECTORIA
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-tech text-[#888888] uppercase tracking-widest block">
              EXPERIENCIA & ENFOQUE
            </span>
            <span className="text-xs font-tech text-white">+5 AÑOS EN PRODUCCIÓN AUDIOCINEMATOGRÁFICA</span>
          </div>
        </div>

        {/* MAIN ABOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: PHOTOGRAPHER PORTRAIT WITH CAMERA OVERLAY */}
          <div className="lg:col-span-5 relative">
            <div className="border-2 border-[#2a2a2a] bg-[#0d0d0d] p-2 relative">
              {/* TOP RETICLE */}
              <div className="flex items-center justify-between text-[10px] font-tech text-[#888888] pb-2 mb-2 border-b border-[#1f1f1f]">
                <span>FOTÓGRAFO & DIRECTOR</span>
                <span className="text-[#DFFF00]">STATUS: DISPONIBLE</span>
              </div>

              <div className="relative aspect-[3/4] bg-black overflow-hidden border border-[#1f1f1f]">
                <Image
                  src="/media/imagenes/artistas/DOBLEU_-13.webp"
                  alt="WES Director y Fotógrafo"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />

                {/* CORNER MARKS */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#DFFF00]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#DFFF00]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#DFFF00]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#DFFF00]" />

                <div className="absolute bottom-3 left-3 bg-[#0a0a0a]/95 px-3 py-1.5 border border-[#222222]">
                  <div className="text-xs font-editorial font-bold text-white tracking-wider">
                    {ARTIST_PROFILE.name}
                  </div>
                  <div className="text-[9px] font-tech text-[#888888] uppercase">
                    {ARTIST_PROFILE.role}
                  </div>
                </div>
              </div>

              {/* BOTTOM BADGE */}
              <div className="mt-3 p-3 bg-[#121212] border border-[#1f1f1f] flex items-center justify-between text-xs font-tech">
                <span className="text-[#a0a0a0]">{ARTIST_PROFILE.location}</span>
                <span className="text-[#DFFF00] font-bold">CARACAS / GLOBAL</span>
              </div>
            </div>
          </div>

          {/* RIGHT: BIOGRAPHY, PHILOSOPHY & TRAJECTORY */}
          <div className="lg:col-span-7 space-y-8">
            {/* BIO TEXT */}
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-white tracking-tight">
                VISIÓN, ESTÉTICA Y NARRATIVA VISUAL
              </h3>
              <p className="text-sm sm:text-base text-[#b0b0b0] font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-sm text-[#888888] font-sans leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* TIMELINE / TRAYECTORIA */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
              <span className="text-xs font-tech text-[#DFFF00] uppercase tracking-widest block">
                // TRAYECTORIA PROFESIONAL
              </span>
              <div className="space-y-3">
                {ARTIST_PROFILE.trajectory.map((item, index) => (
                  <div key={index} className="p-4 border border-[#1a1a1a] bg-[#0a0a0a] flex flex-col space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-editorial text-sm font-bold text-white tracking-wide">
                        {item.title}
                      </span>
                      <span className="px-2 py-0.5 bg-[#171717] border border-[#222222] text-[10px] font-tech text-[#DFFF00]">
                        {item.year}
                      </span>
                    </div>
                    <div className="text-xs font-tech text-[#888888]">{item.company}</div>
                    <p className="text-xs text-[#a0a0a0] leading-relaxed pt-1 font-sans">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GEAR & OPTICS SECTION */}
        <div className="mt-20 pt-12 border-t border-[#222222]">
          <div className="flex items-center space-x-2 text-xs font-tech text-[#DFFF00] uppercase tracking-widest mb-6">
            <Sliders className="w-4 h-4" />
            <span>// ARSENAL ÓPTICO & HARDWARE CINEMATOGRÁFICO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTIST_PROFILE.gear.map((gearCategory) => (
              <div key={gearCategory.category} className="p-5 border border-[#1f1f1f] bg-[#0c0c0c]">
                <div className="text-sm font-editorial font-bold text-white tracking-wide pb-3 mb-3 border-b border-[#1f1f1f]">
                  {gearCategory.category}
                </div>
                <ul className="space-y-2 text-xs font-tech text-[#999999]">
                  {gearCategory.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#DFFF00] font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENT ROSTER */}
        <div className="mt-16 pt-10 border-t border-[#1f1f1f]">
          <div className="text-center text-xs font-tech text-[#666666] uppercase tracking-widest mb-6">
            // CLIENTES & MARCAS QUE HAN CONFIADO SU VISIÓN
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {ARTIST_PROFILE.clients.map((client) => (
              <div
                key={client}
                className="px-4 py-2 border border-[#1f1f1f] bg-[#0b0b0b] text-xs font-tech tracking-wider text-[#cccccc] hover:border-[#DFFF00] hover:text-white transition-colors"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
