'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollAssembleCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function ScrollAssembleCard({
  children,
  index,
  className = '',
}: ScrollAssembleCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 65%'],
  });

  // Staggered 5-column assembly offsets
  const colIndex = index % 5;
  const offsetDistances = [100, 150, 70, 130, 110];
  const offsetDistance = offsetDistances[colIndex] || 100;

  // Parallax Y elevation translation
  const rawY = useTransform(scrollYProgress, [0, 1], [offsetDistance, 0]);
  const y = useSpring(rawY, { stiffness: 120, damping: 18 });

  // Scale expansion on assembly
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.84, 1]);
  const scale = useSpring(rawScale, { stiffness: 120, damping: 18 });

  // 3D perspective angle tilt on assembly
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 18 });

  const rawRotateY = useTransform(scrollYProgress, [0, 1], [colIndex < 2 ? -6 : colIndex > 2 ? 6 : 0, 0]);
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 18 });

  // Fade from dark into full exposure
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.15, 1]);

  return (
    <div style={{ perspective: '1200px' }} className={`w-full h-full ${className}`}>
      <motion.div
        ref={ref}
        style={{
          y,
          scale,
          rotateX,
          rotateY,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
