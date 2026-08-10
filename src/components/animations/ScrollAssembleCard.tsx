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
  /**
   * El ref va en el contenedor ESTATICO, no en el elemento animado.
   * Si se mide un elemento que a la vez se esta trasladando y escalando, cada
   * frame cambia su posicion, el progreso de scroll se recalcula sobre datos
   * que el propio efecto acaba de mover y la animacion se ve a tirones.
   */
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 70%'],
  });

  /**
   * Un unico spring suaviza el progreso y de el se derivan todas las
   * transformaciones. Antes habia cuatro springs por tarjeta (y son 17 en el
   * grid): 68 animaciones compitiendo por el mismo frame.
   */
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Desfase por columna para que el grid se arme escalonado.
  const colIndex = index % 5;
  const offsetDistances = [70, 96, 52, 84, 64];
  const offsetDistance = offsetDistances[colIndex];
  const tiltY = colIndex < 2 ? -4 : colIndex > 2 ? 4 : 0;

  const y = useTransform(progress, [0, 1], [offsetDistance, 0]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  const rotateX = useTransform(progress, [0, 1], [8, 0]);
  const rotateY = useTransform(progress, [0, 1], [tiltY, 0]);
  const opacity = useTransform(progress, [0, 0.55], [0.35, 1]);

  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={`w-full h-full ${className}`}>
      <motion.div
        style={{ y, scale, rotateX, rotateY, opacity }}
        className="w-full h-full will-change-transform [transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </div>
  );
}
