'use client';

import Image from 'next/image';
import { PHOTO_CATALOG } from '@/helpers/mediaData';

const FEATURED_STILLS = PHOTO_CATALOG.slice(0, 8);

const TELEMETRY_ITEMS = [
  'SONY FX3 CINEMA LINE',
  '4K DCI 120FPS 10-BIT',
  'ZEISS MASTER PRIMES',
  'ACEScct COLOR SCIENCE',
  'ANALOGUE 35MM FILM EMULATION',
  'CARACAS // LATAM DIRECTED BY WES',
  'RAW 16-BIT AUDIO RECORDING',
  'RONIN RS3 PRO STABILIZATION',
];

export default function AutonomousInfiniteReel() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070707] border-y border-[#1f1f1f] py-3 select-none z-20">
      {/* SHADOW VIGNETTES ON EDGES */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#070707] via-[#070707]/80 to-transparent z-10 pointer-events-none" />

      {/* TOP AUTONOMOUS STRIP: 35MM FILM CELLULOID REEL (TEMPORARILY COMMENTED OUT AS REQUESTED) */}
      {/*
      <div className="relative w-full overflow-hidden pb-3">
        <div className="flex whitespace-nowrap animate-infinite-scroll hover:[animation-play-state:paused]">
          {[...FEATURED_STILLS, ...FEATURED_STILLS, ...FEATURED_STILLS].map((photo, idx) => (
            <div
              key={idx}
              className="inline-block mx-2 sm:mx-3 bg-[#0d0d0d] border border-[#222222] p-2 sm:p-2.5 transition-all duration-300 hover:border-[#DFFF00] group"
            >
              <div className="flex justify-between items-center px-1 pb-1.5 text-[8px] font-tech text-[#555555] tracking-widest">
                <span>KODAK TRI-X 400</span>
                <div className="flex space-x-1.5">
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                </div>
                <span className="text-[#DFFF00]">0{((idx % 8) + 1)}A</span>
              </div>

              <div className="relative w-44 sm:w-56 h-28 sm:h-36 bg-black overflow-hidden border border-[#1a1a1a]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 180px, 230px"
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                />

                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="text-[9px] font-tech text-white uppercase tracking-wider truncate">
                    {photo.title}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center px-1 pt-1.5 text-[8px] font-tech text-[#444444] tracking-widest">
                <span>ISO 800 · 35MM</span>
                <div className="flex space-x-1.5">
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                  <span className="w-1.5 h-1 bg-[#222222] inline-block" />
                </div>
                <span>24 FPS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* AUTONOMOUS STRIP: TELEMETRY WORDS RIBBON GLIDING CONTINUOUSLY */}
      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-infinite-scroll-reverse">
          {[...TELEMETRY_ITEMS, ...TELEMETRY_ITEMS, ...TELEMETRY_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-3 px-5 text-[10px] sm:text-[11px] font-tech tracking-widest uppercase text-[#777777] hover:text-[#DFFF00] transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-none animate-pulse" />
              <span className="font-bold">{item}</span>
              <span className="text-[#333333]">//</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
