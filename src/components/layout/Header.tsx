'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Menu, X, ArrowUpRight, Camera, Film } from 'lucide-react';
import MagneticButton from '@/components/animations/MagneticButton';

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState<string>('00:00:00:00');
  const { isScrolled, scrollProgress } = useScrollPosition();

  // Live cinematic timecode simulator
  useEffect(() => {
    const updateTimecode = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      const frames = Math.floor((now.getMilliseconds() / 1000) * 24)
        .toString()
        .padStart(2, '0');
      setTime(`${hours}:${mins}:${secs}:${frames}`);
    };

    updateTimecode();
    const interval = setInterval(updateTimecode, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Fotografía', href: '/proyectos/fotografia' },
    { label: 'Video', href: '/proyectos/video' },
    { label: 'Sobre mí', href: '/#about' },
    { label: 'Contacto', href: '/#contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-[#222222] py-3'
            : 'bg-[#050505]/80 backdrop-blur-sm border-[#141414] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: BRAND & REC INDICATOR */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="group flex items-center space-x-3 text-white focus:outline-none"
            >
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-editorial font-bold text-sm tracking-tighter group-hover:bg-[#DFFF00] transition-colors">
                W
              </div>
              <div className="flex flex-col">
                <span className="font-editorial font-bold text-lg tracking-wider text-white flex items-center gap-2">
                  WES
                </span>
                {/* <span className="text-[9px] font-tech uppercase tracking-widest text-[#888888] hidden md:block">
                  CINEMA & STILLS
                </span> */}
                <span className="text-[9px] font-tech text-[#DFFF00] tracking-wider">
                  @weslypacheco
                </span>
              </div>
            </Link>

            {/* REC BLINKER & TIMECODE */}
            <div className="hidden xl:flex items-center space-x-2 border-l border-[#222222] pl-4">
              <span className="w-2 h-2 bg-red-600 rounded-none animate-rec" />
              <span className="text-[10px] font-tech tracking-widest text-[#DFFF00]">
                REC
              </span>
              <span className="text-[10px] font-tech text-[#666666] tracking-wider">
                {time}
              </span>
            </div>
          </div>

          {/* CENTER: DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 border border-[#1f1f1f] bg-[#0c0c0c]/90 px-3 py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-1 text-xs font-tech tracking-wider uppercase text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: CTA BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center space-x-3">
            {/* Quick subpage portals */}
            <div className="hidden sm:flex items-center space-x-2 mr-1">
              <Link
                href="/proyectos/fotografia"
                className="px-2.5 py-1 text-[11px] font-tech uppercase tracking-wider text-[#888888] hover:text-[#DFFF00] border border-[#222222] hover:border-[#DFFF00] transition-colors flex items-center gap-1"
              >
                <Camera className="w-3 h-3" />
                <span>Foto</span>
              </Link>
              <Link
                href="/proyectos/video"
                className="px-2.5 py-1 text-[11px] font-tech uppercase tracking-wider text-[#888888] hover:text-[#DFFF00] border border-[#222222] hover:border-[#DFFF00] transition-colors flex items-center gap-1"
              >
                <Film className="w-3 h-3" />
                <span>Video</span>
              </Link>
            </div>

            {/* MAIN CTA BUTTON WITH MAGNETIC ATTRACTION */}
            <MagneticButton strength={12} className="hidden lg:inline-block">
              <Link
                href="/#contacto"
                className="flex px-4 py-2 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-all items-center space-x-1 border border-[#DFFF00]"
              >
                <span>CONTACTO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticButton>

            {/* HAMBURGER BUTTON (MOBILE / TABLET) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="lg:hidden p-2 text-white border border-[#222222] bg-[#0f0f0f] hover:bg-[#1f1f1f] hover:border-[#DFFF00] transition-colors"
            >
              <Menu className="w-5 h-5 text-[#DFFF00]" />
            </button>
          </div>
        </div>

        {/* BOTTOM TELEMETRY SCROLL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a] overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#DFFF00] transition-all duration-75 shadow-[0_0_8px_#DFFF00]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/*
        MOBILE / RESPONSIVE SIDEBAR DRAWER

        AnimatePresence mantiene el panel montado mientras se va, que es lo que
        permite animar tambien el cierre: sin el, desmontar el nodo lo hacia
        desaparecer de golpe.
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            {/* BACKDROP OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* SIDEBAR CONTAINER WITH SHARP GEOMETRIC EDGES */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm bg-[#0a0a0a] border-l border-[#222222] h-full flex flex-col justify-between p-6 z-10 shadow-2xl overflow-y-auto will-change-transform"
            >
            {/* DRAWER HEADER WITH MANDATORY CLOSE BUTTON */}
            <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#DFFF00] text-black font-editorial font-bold text-xs flex items-center justify-center">
                  W
                </div>
                <span className="font-editorial font-bold text-sm tracking-wider text-white">
                  NAVEGACIÓN
                </span>
              </div>

              {/* MANDATORY CLOSE BUTTON IN HEADER */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 border border-[#333333] bg-[#141414] hover:bg-[#DFFF00] hover:text-black text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* DRAWER LINKS */}
            <div className="py-8 flex flex-col space-y-3">
              <span className="text-[10px] font-tech uppercase tracking-widest text-[#666666] mb-2">
                SECCIONES
              </span>
              {/*
                Los enlaces entran escalonados detras del panel: el retardo base
                cubre el deslizamiento para que no aparezcan antes de que el
                cajon haya llegado.
              */}
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 border border-[#1a1a1a] bg-[#0e0e0e] hover:border-[#DFFF00] hover:bg-[#141414] text-white hover:text-[#DFFF00] transition-all group"
                  >
                    <span className="font-editorial text-lg font-bold tracking-tight">
                      {link.label}
                    </span>
                    <span className="text-xs font-tech text-[#666666] group-hover:text-[#DFFF00]">
                      0{idx + 1} →
                    </span>
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-[#1f1f1f] flex flex-col space-y-2">
                <span className="text-[10px] font-tech uppercase tracking-widest text-[#666666] mb-1">
                  GALERÍAS
                </span>
                <Link
                  href="/proyectos/fotografia"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 border border-[#1f1f1f] text-sm font-tech text-[#cccccc] hover:text-[#DFFF00] hover:border-[#DFFF00]"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#DFFF00]" />
                    Galería de Fotografía
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/proyectos/video"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 border border-[#1f1f1f] text-sm font-tech text-[#cccccc] hover:text-[#DFFF00] hover:border-[#DFFF00]"
                >
                  <span className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#DFFF00]" />
                    Galería de Video
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* DRAWER FOOTER & CTA BUTTON */}
            <div className="space-y-4 pt-4 border-t border-[#1f1f1f]">
              {/* MANDATORY CTA BUTTON IN SIDEBAR */}
              <Link
                href="/#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#DFFF00] hover:bg-white hover:border-white transition-all shadow-lg"
              >
                <span>CONTACTAR</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
