'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';

// --- FADE UP WITH APERTURE BLUR ---
interface FadeUpProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 30,
  blur = true,
  className = '',
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // cinematic cubic-bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// --- APERTURE HORIZONTAL SHUTTER WIPE ---
interface ShutterWipeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ShutterWipe({ children, delay = 0, className = '' }: ShutterWipeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// --- STAGGER CONTAINER & ITEM ---
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = '', ...props }: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', ...props }: StaggerContainerProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
