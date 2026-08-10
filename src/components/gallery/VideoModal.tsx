'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { VideoItem } from '@/helpers/mediaData';
import { formatTimecode } from '@/helpers/formatters';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { X, Play, Pause, Volume2, VolumeX, Maximize, ArrowUpRight, RotateCw } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  /**
   * Giro manual en pasos de 90°. Algunos originales llegan grabados de lado y
   * el contenedor WebM no lleva matriz de rotacion que el navegador respete,
   * asi que el visitante puede enderezarlos.
   */
  const [rotation, setRotation] = useState(0);
  const {
    attachVideo,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isBuffering,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    toggleFullscreen,
  } = useVideoPlayer();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, togglePlay]);

  if (!isOpen || !video) return null;

  // La orientacion sale de las dimensiones reales, no de una etiqueta escrita
  // a mano; al girar 90° o 270° el alto y el ancho se intercambian.
  const quarterTurn = rotation % 180 !== 0;
  const isVertical = quarterTurn ? video.width > video.height : video.height > video.width;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* MODAL MAIN CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-[#080808] border-2 border-[#222222] z-10 my-auto shadow-2xl flex flex-col"
      >
        {/* HEADER BAR */}
        <div className="flex items-center justify-between gap-4 p-3 sm:p-4 border-b border-[#1f1f1f] bg-[#0c0c0c] text-xs font-tech">
          <div className="flex items-center space-x-3 text-white min-w-0">
            <div className="w-2 h-2 bg-[#DFFF00] shrink-0" />
            <span className="font-bold tracking-wider uppercase truncate">
              {video.title}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar reproductor"
            className="shrink-0 p-1.5 border border-[#444444] bg-[#1a1a1a] hover:bg-[#DFFF00] hover:text-black text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PLAYER & TEXT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* VIDEO SCREEN */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-center items-center relative border-b lg:border-b-0 lg:border-r border-[#1f1f1f] min-h-[350px] sm:min-h-[460px]">
            <div
              className={`relative w-full ${
                isVertical ? 'max-w-xs aspect-[9/16]' : 'aspect-video'
              } flex items-center justify-center bg-black`}
            >
              <video
                ref={attachVideo}
                src={video.streamUrl}
                poster={video.posterUrl}
                preload="auto"
                playsInline
                autoPlay
                onClick={togglePlay}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  // Al poner el video de canto, su "ancho" pasa a medirse contra
                  // la altura del contenedor: sin esto se desborda del marco.
                  maxWidth: quarterTurn ? '100vh' : '100%',
                }}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-300"
              />

              {/* BUFFERING SPINNER */}
              {isBuffering && (
                <div className="absolute inset-0 m-auto flex flex-col items-center justify-center bg-black/60 pointer-events-none z-20">
                  <div className="w-10 h-10 border-2 border-[#333333] border-t-[#DFFF00] animate-spin mb-2" />
                  <span className="text-[10px] font-tech text-[#DFFF00] tracking-widest uppercase">
                    CARGANDO
                  </span>
                </div>
              )}

              {/* CENTER PLAY BUTTON OVERLAY WHEN PAUSED */}
              {!isPlaying && !isBuffering && (
                <button
                  onClick={togglePlay}
                  aria-label="Reproducir"
                  className="absolute inset-0 m-auto w-16 h-16 bg-[#DFFF00]/90 text-black flex items-center justify-center border-2 border-white hover:scale-105 transition-transform z-10"
                >
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </button>
              )}
            </div>

            {/* CUSTOM PLAYBACK CONTROLS BAR */}
            <div className="w-full p-3 bg-[#0a0a0a] border-t border-[#1f1f1f] flex flex-col space-y-2">
              {/* SCRUB PROGRESS BAR */}
              <div className="relative w-full h-1.5 bg-[#222222] group">
                <div className="h-full bg-[#DFFF00]" style={{ width: `${progress}%` }} />
                {/* THUMB */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ left: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={currentTime}
                  disabled={duration === 0}
                  aria-label="Avanzar o retroceder el video"
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-default"
                />
              </div>

              {/* CONTROLS ROW */}
              <div className="flex items-center justify-between text-xs font-tech text-[#888888]">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    className="p-1 hover:text-[#DFFF00] text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                      className="p-1 hover:text-[#DFFF00] transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-[#DFFF00]" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      aria-label="Volumen"
                      onChange={(e) => changeVolume(parseFloat(e.target.value))}
                      className="w-16 h-1 bg-[#333333] accent-[#DFFF00] cursor-pointer hidden sm:block"
                    />
                  </div>

                  {/* TIMECODE */}
                  <span className="text-white tabular-nums">
                    {formatTimecode(currentTime)} / {formatTimecode(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className={`p-1 transition-colors ${
                      rotation === 0 ? 'text-white hover:text-[#DFFF00]' : 'text-[#DFFF00]'
                    }`}
                    aria-label="Girar el video 90 grados"
                    title="Girar 90°"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  {rotation !== 0 && (
                    <span className="text-[10px] font-tech text-[#DFFF00] tabular-nums">
                      {rotation}°
                    </span>
                  )}
                  <button
                    onClick={() => toggleFullscreen(containerRef.current)}
                    className="p-1 hover:text-[#DFFF00] text-white transition-colors"
                    aria-label="Pantalla completa"
                    title="Pantalla completa"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TITLE & DESCRIPTION ONLY */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between gap-6 bg-[#080808]">
            <div className="space-y-4">
              <span className="inline-block px-2 py-0.5 bg-[#141414] border border-[#222222] text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider">
                {video.categoryLabel}
              </span>

              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight">
                {video.title}
              </h3>

              {video.description && (
                <p className="text-xs text-[#a0a0a0] font-sans leading-relaxed border-l border-[#333333] pl-3">
                  {video.description}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#1f1f1f]">
              <Link
                href="/#contacto"
                onClick={onClose}
                className="w-full py-2.5 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 hover:bg-white transition-colors"
              >
                <span>QUIERO ALGO ASÍ</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
