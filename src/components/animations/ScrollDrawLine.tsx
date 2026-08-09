'use client';

import { motion } from 'framer-motion';

interface ScrollDrawLineProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  delay?: number;
  duration?: number;
}

export default function ScrollDrawLine({
  className = '',
  orientation = 'horizontal',
  color = '#222222',
  delay = 0,
  duration = 0.8,
}: ScrollDrawLineProps) {
  if (orientation === 'vertical') {
    return (
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: color }}
        className={`w-px will-change-transform ${className}`}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0, originX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ backgroundColor: color }}
      className={`h-px w-full will-change-transform ${className}`}
    />
  );
}
