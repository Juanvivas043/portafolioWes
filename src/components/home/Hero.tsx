'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Camera, Film, Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const f = Math.floor((now.getMilliseconds() / 1000) * 24).toString().padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    };
    tick();
    const id = setInterval(tick, 1000 / 24);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted={isAudioMuted}
        playsInline
        preload="auto"
        disablePictureInPicture
        poster="/media/imagenes/artistas/DOBLEU_-11.webp"
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-55 pointer-events-none"
      >
        <source src="/media/videos/hero/hero_bg_loop.webm" type="video/webm" />
        <source src="/media/videos/hero/hero_bg_loop.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* CROSSHAIR GRID */}
      <div className="absolute inset-0 crosshair-grid opacity-15 pointer-events-none" />

      {/* CORNER VIEWFINDER MARKS */}
      <div className="absolute top-[88px] left-3 sm:left-4 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-l-2 border-[#DFFF00]/50 pointer-events-none" />
      <div className="absolute top-[88px] right-3 sm:right-4 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-r-2 border-[#DFFF00]/50 pointer-events-none" />
      <div className="absolute bottom-12 left-3 sm:left-4 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-l-2 border-[#DFFF00]/50 pointer-events-none" />
      <div className="absolute bottom-12 right-3 sm:right-4 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-r-2 border-[#DFFF00]/50 pointer-events-none" />

      {/* TOP-LEFT: REC + TIMECODE (single compact row) */}
      <div className="absolute top-[90px] left-4 z-20 hidden md:flex items-center gap-2 text-[9px] font-tech tracking-widest pointer-events-none bg-black/50 border border-[#1a1a1a] px-2.5 py-1.5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 bg-red-500 animate-rec rounded-none" />
        <span className="text-white font-bold">REC</span>
        <span className="text-[#DFFF00]">{timecode}</span>
        <span className="text-[#333333]">|</span>
        <span className="text-[#666666]">SONY FX3 · 4K · ƒ/1.2</span>
      </div>

      {/* TOP-RIGHT: LUT label only */}
      <div className="absolute top-[90px] right-4 z-20 hidden md:flex items-center gap-2 text-[9px] font-tech tracking-widest pointer-events-none bg-black/50 border border-[#1a1a1a] px-2.5 py-1.5 backdrop-blur-sm">
        <span className="text-[#DFFF00]">LUT: ACEScct</span>
        <span className="text-[#333333]">|</span>
        <span className="text-[#666666]">2.39:1 CINEMA</span>
      </div>

      {/* MUTE BUTTON */}
      <button
        onClick={() => setIsAudioMuted(!isAudioMuted)}
        className="absolute bottom-14 right-4 sm:right-5 z-30 p-2 bg-black/60 hover:bg-[#DFFF00] hover:text-black text-white border border-[#333333] hover:border-[#DFFF00] transition-all backdrop-blur-sm"
        title={isAudioMuted ? 'Activar audio' : 'Silenciar'}
      >
        {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* MAIN CONTENT — centered vertically */}
      <div className="relative z-10 flex-1 flex items-center pt-28 sm:pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 border border-[#2a2a2a] bg-black/50 backdrop-blur-sm px-3 py-1 mb-4 sm:mb-5">
              <span className="text-[#DFFF00] font-tech text-[10px] sm:text-[11px] tracking-widest font-bold">// FOTÓGRAFO</span>
              <span className="text-[#555555] text-[10px] sm:text-[11px] font-tech">PROFESIONAL</span>
            </div>

            {/* H1 */}
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold text-white tracking-tighter uppercase leading-[0.9] mb-4 sm:mb-5 drop-shadow-2xl">
              WESLY <span className="text-[#DFFF00]">PACHECO</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-xs sm:text-sm text-[#a0a0a0] font-sans max-w-md leading-relaxed border-l-2 border-[#DFFF00] pl-3 sm:pl-4 mb-6 sm:mb-7">
              Fotografía editorial, conciertos, deportes de acción y dirección cinematográfica.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/proyectos/fotografia"
                className="w-full sm:w-auto px-5 py-3 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 border border-[#DFFF00]"
              >
                <Camera className="w-4 h-4" />
                <span>FOTOGRAFÍA</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/proyectos/video"
                className="w-full sm:w-auto px-5 py-3 bg-black/50 backdrop-blur-sm text-white font-tech text-xs font-bold uppercase tracking-wider hover:border-[#DFFF00] hover:text-[#DFFF00] transition-all flex items-center justify-center gap-2 border border-[#2a2a2a]"
              >
                <Film className="w-4 h-4" />
                <span>VIDEO</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR — minimal */}
      <div className="relative z-10 border-t border-white/10 backdrop-blur-sm bg-black/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
          <span className="text-[9px] font-tech text-[#444444] tracking-widest hidden sm:inline">
            WES © PORTAFOLIO OFICIAL
          </span>
          <Link
            href="/#about"
            className="flex items-center gap-1.5 text-[10px] font-tech text-[#666666] hover:text-[#DFFF00] transition-colors ml-auto"
          >
            <span>SCROLL DOWN</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
