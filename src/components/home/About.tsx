'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ARTIST_PROFILE } from '@/helpers/mediaData';
import { Sliders } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper';
import ScrollDrawLine from '@/components/animations/ScrollDrawLine';
import ScrollParallaxRow from '@/components/animations/ScrollParallaxRow';
import CounterStat from '@/components/animations/CounterStat';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#080808] border-b border-[#222222] relative overflow-hidden">
      {/* BACKGROUND DECORATIVE GRID LINES & PARALLAX WATERMARK */}
      <div className="absolute inset-0 crosshair-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 inset-x-0 pointer-events-none z-0">
        <ScrollParallaxRow text="CINEMATOGRAPHY // EDITORIAL // SONY FX3 // ACES // 35MM FILM" direction="left" speed={200} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between pb-5 mb-4 gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-3 h-px bg-[#DFFF00]" />
              IDENTIDAD & TRAYECTORIA
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
        </FadeUp>

        {/* BLUEPRINT DRAW LINE UNDER HEADER */}
        <ScrollDrawLine color="#2a2a2a" className="mb-10 sm:mb-14" />

        {/* TELEMETRY STATS COUNTER BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-12">
          <div className="p-4 bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#DFFF00]/50 transition-colors">
            <div className="text-[10px] font-tech text-[#666666] tracking-widest uppercase">// PRODUCCIONES</div>
            <div className="text-3xl font-editorial font-bold text-white mt-1">
              <CounterStat value={50} prefix="+" suffix=" Prods" />
            </div>
          </div>
          <div className="p-4 bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#DFFF00]/50 transition-colors">
            <div className="text-[10px] font-tech text-[#666666] tracking-widest uppercase">// TRAYECTORIA</div>
            <div className="text-3xl font-editorial font-bold text-[#DFFF00] mt-1">
              <CounterStat value={6} prefix="+" suffix=" Años" />
            </div>
          </div>
          <div className="p-4 bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#DFFF00]/50 transition-colors">
            <div className="text-[10px] font-tech text-[#666666] tracking-widest uppercase">// RESOLUCIÓN MASTER</div>
            <div className="text-3xl font-editorial font-bold text-white mt-1">
              <span>4K DCI</span>
            </div>
          </div>
          <div className="p-4 bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#DFFF00]/50 transition-colors">
            <div className="text-[10px] font-tech text-[#666666] tracking-widest uppercase">// COLOR SCIENCE</div>
            <div className="text-3xl font-editorial font-bold text-[#DFFF00] mt-1">
              <CounterStat value={100} suffix="% ACES" />
            </div>
          </div>
        </div>

        {/* MAIN ABOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: PHOTOGRAPHER PORTRAIT WITH ASSEMBLED CAMERA BRACKETS & SCANLINE */}
          <FadeUp delay={0.1} className="lg:col-span-5 relative">
            <div className="border-2 border-[#2a2a2a] bg-[#0d0d0d] p-2 relative group">
              {/* TOP RETICLE */}
              <div className="flex items-center justify-between text-[10px] font-tech text-[#888888] pb-2 mb-2 border-b border-[#1f1f1f]">
                <span>FOTÓGRAFO & DIRECTOR</span>
                <span className="text-[#DFFF00] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#DFFF00] animate-pulse" />
                  STATUS: DISPONIBLE
                </span>
              </div>

              <div className="relative aspect-[3/4] bg-black overflow-hidden border border-[#1f1f1f]">
                <Image
                  src="/media/imagenes/artistas/DOBLEU_-13.webp"
                  alt="WES Director y Fotógrafo"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* ANIMATED SCANLINE LASER */}
                <motion.div
                  initial={{ y: '-100%' }}
                  animate={{ y: ['-100%', '400%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DFFF00]/40 to-transparent pointer-events-none"
                />

                {/* ASSEMBLED CORNER TARGETING MARKS */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#DFFF00]"
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#DFFF00]"
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#DFFF00]"
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#DFFF00]"
                />

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
          </FadeUp>

          {/* RIGHT: BIOGRAPHY, PHILOSOPHY & TRAJECTORY */}
          <div className="lg:col-span-7 space-y-8">
            {/* BIO TEXT */}
            <FadeUp delay={0.2} className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-white tracking-tight">
                VISIÓN, ESTÉTICA Y NARRATIVA VISUAL
              </h3>
              <p className="text-sm sm:text-base text-[#b0b0b0] font-sans leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-sm text-[#888888] font-sans leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </FadeUp>

            {/* TIMELINE / TRAYECTORIA WITH PROGRESSIVE TRACER LINE */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f1f] relative">
              <span className="text-xs font-tech text-[#DFFF00] uppercase tracking-widest block">
                // TRAYECTORIA PROFESIONAL
              </span>

              {/* VERTICAL TRACER LINE THAT DRAWS DOWNWARD WITH SCROLL */}
              <div className="relative pl-4 border-l border-[#1f1f1f]">
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#DFFF00] via-[#DFFF00]/70 to-[#DFFF00]/20 shadow-[0_0_8px_rgba(223,255,0,0.5)]"
                />

                <StaggerContainer className="space-y-3">
                  {ARTIST_PROFILE.trajectory.map((item, index) => (
                    <StaggerItem
                      key={index}
                      className="p-4 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#DFFF00]/60 transition-colors flex flex-col space-y-1.5"
                    >
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
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </div>

        {/* GEAR & OPTICS SECTION */}
        <FadeUp delay={0.2} className="mt-20 pt-12 border-t border-[#222222]">
          <div className="flex items-center space-x-2 text-xs font-tech text-[#DFFF00] uppercase tracking-widest mb-6">
            <Sliders className="w-4 h-4" />
            <span>// ARSENAL ÓPTICO & HARDWARE CINEMATOGRÁFICO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTIST_PROFILE.gear.map((gearCategory) => (
              <div key={gearCategory.category} className="p-5 border border-[#1f1f1f] bg-[#0c0c0c] hover:border-[#333333] transition-colors">
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
        </FadeUp>

        {/* CLIENT ROSTER */}
        <FadeUp delay={0.1} className="mt-16 pt-10 border-t border-[#1f1f1f]">
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
        </FadeUp>
      </div>
    </section>
  );
}
