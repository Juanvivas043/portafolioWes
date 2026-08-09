'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TICKER_ITEMS = [
  'SONY FX3 CINEMA LINE',
  '4K DCI 120FPS',
  'ZEISS MASTER PRIMES',
  'ACEScct COLOR SCIENCE',
  'RAW 16-BIT AUDIO',
  'RONIN RS3 PRO GIMBAL',
  'CARACAS // LATAM',
  'DIRECTED BY WES',
  'HIGH CONTRAST MONOCHROME',
  'ANALOGUE FILM EMULATION',
];

export default function InfiniteTicker() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  // Scroll velocity parallax effect
  const scrollOffset = useTransform(scrollY, [0, 5000], [0, -400]);
  const smoothScroll = useSpring(scrollOffset, { damping: 20, stiffness: 80 });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a] border-y border-[#1f1f1f] py-3 select-none z-20"
    >
      {/* SHADOW VIGNETTES */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* CONTINUOUS TICKER STRIP */}
      <motion.div
        style={{ x: smoothScroll }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {/* DUPLICATED ARRAY FOR INFINITE WRAPAROUND */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center space-x-4 px-6 text-[11px] font-tech tracking-widest uppercase text-[#888888] hover:text-[#DFFF00] transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-none animate-pulse" />
            <span className="font-bold">{item}</span>
            <span className="text-[#333333]">//</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
