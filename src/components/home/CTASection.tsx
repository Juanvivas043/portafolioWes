'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp } from '@/components/animations/MotionWrapper';
import MagneticButton from '@/components/animations/MagneticButton';

export default function CTASection() {
  return (
    <section id="cta" className="py-24 bg-[#0a0a0a] border-b border-[#222222] relative overflow-hidden">
      {/* BACKGROUND GRAPHICS & CORNERS */}
      <div className="absolute inset-0 crosshair-grid opacity-20 pointer-events-none" />

      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#DFFF00] pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#DFFF00] pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#DFFF00] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#DFFF00] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* TOP ACCENT BADGE */}
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center space-x-2 border border-[#2a2a2a] bg-[#121212] px-4 py-1.5 mx-auto">
            <span className="w-2 h-2 bg-[#DFFF00] inline-block animate-rec" />
            <span className="text-[#DFFF00] font-tech text-xs font-bold tracking-widest uppercase">
              DISPONIBLE PARA NUEVOS PROYECTOS
            </span>
          </div>
        </FadeUp>

        {/* HIGH IMPACT HEADLINE */}
        <FadeUp delay={0.2}>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] max-w-4xl mx-auto">
            ¿TIENES UN<span className="text-[#DFFF00]"> PROYECTO</span> EN MENTE?
          </h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="text-xs sm:text-base text-[#a0a0a0] font-sans max-w-2xl mx-auto leading-relaxed">
            Sesiones fotográficas, videoclips, cobertura de eventos y campañas de marca. Cuéntame qué necesitas y reservamos la fecha.
          </p>
        </FadeUp>

        {/* CTA ACTION BUTTONS WITH MAGNETIC HOVER */}
        <FadeUp delay={0.4} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
          <MagneticButton strength={15}>
            <Link
              href="/#contacto"
              className="w-full sm:w-auto px-8 py-4 bg-[#DFFF00] text-black font-tech text-sm font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center space-x-2 border border-[#DFFF00] shadow-[0_0_20px_rgba(223,255,0,0.2)]"
            >
              <span>SOLICITAR COTIZACIÓN</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </MagneticButton>

          <MagneticButton strength={15}>
            <a
              href="https://wa.me/584120000000?text=Hola%20WES,%20me%20gustaría%20cotizar%20una%20producción%20audiovisual"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#141414] text-white font-tech text-sm font-bold uppercase tracking-wider hover:border-[#DFFF00] hover:text-[#DFFF00] transition-all flex items-center justify-center space-x-2 border border-[#333333]"
            >
              <span>WHATSAPP DIRECTO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </FadeUp>

        {/* TECHNICAL TICKER */}
        <FadeUp delay={0.5} className="pt-8 border-t border-[#1a1a1a] flex flex-wrap justify-center gap-6 text-[10px] font-tech text-[#666666]">
          <span>RESPUESTA EN 24 HORAS</span>
          <span>•</span>
          <span>CARACAS, VENEZUELA</span>
          <span>•</span>
          <span>VIAJES NACIONALES E INTERNACIONALES</span>
        </FadeUp>
      </div>
    </section>
  );
}
