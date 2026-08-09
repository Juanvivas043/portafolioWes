'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  speed?: number; // -50 to 50
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  speed = 25,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate internal image translation relative to scroll
  const rawY = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  const smoothY = useSpring(rawY, { stiffness: 300, damping: 30 });

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div
        style={{ y: smoothY }}
        className="relative w-full h-[130%] -top-[15%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
