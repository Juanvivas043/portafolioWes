'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollParallaxRowProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
  speed?: number;
}

export default function ScrollParallaxRow({
  text,
  direction = 'left',
  className = '',
  speed = 150,
}: ScrollParallaxRowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xRange = direction === 'left' ? [speed, -speed] : [-speed, speed];
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      <motion.div
        style={{ x }}
        className="whitespace-nowrap font-editorial font-extrabold text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter text-white/[0.03] will-change-transform"
      >
        {text} &nbsp; {text} &nbsp; {text}
      </motion.div>
    </div>
  );
}
