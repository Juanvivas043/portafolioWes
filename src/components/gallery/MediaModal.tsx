'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PhotoItem } from '@/helpers/mediaData';
import { formatExif } from '@/helpers/formatters';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, User, ArrowUpRight, Crosshair } from 'lucide-react';

interface MediaModalProps {
  photo: PhotoItem | null;
  isOpen: boolean;
  currentIndex: number;
  totalItems: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function MediaModal({
  photo,
  isOpen,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
}: MediaModalProps) {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6 overflow-y-auto">
      {/* BACKDROP CLICK */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* MODAL MAIN CONTAINER (SHARP GEOMETRIC EDGES) */}
      <div className="relative w-full max-w-6xl bg-[#080808] border-2 border-[#222222] z-10 my-auto shadow-2xl flex flex-col">
        {/* MODAL TOP BAR WITH CAMERA SPECS & CLOSE BUTTON */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#1f1f1f] bg-[#0c0c0c] text-xs font-tech">
          <div className="flex items-center space-x-3 text-white">
            <div className="w-2 h-2 bg-[#DFFF00]" />
            <span className="font-bold tracking-wider uppercase">
              EXIF VIEWER // {photo.title}
            </span>
            <span className="text-[#666666] hidden sm:inline">
              [{currentIndex + 1} / {totalItems}]
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onPrev}
              aria-label="Foto anterior"
              className="p-1.5 border border-[#333333] bg-[#141414] hover:bg-[#DFFF00] hover:text-black text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              aria-label="Foto siguiente"
              className="p-1.5 border border-[#333333] bg-[#141414] hover:bg-[#DFFF00] hover:text-black text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="p-1.5 border border-[#444444] bg-[#1a1a1a] hover:bg-[#DFFF00] hover:text-black text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MODAL CONTENT GRID: IMAGE LEFT / METADATA RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* IMAGE VIEWER */}
          <div className="lg:col-span-8 relative bg-black flex items-center justify-center p-2 sm:p-6 min-h-[360px] sm:min-h-[500px] border-b lg:border-b-0 lg:border-r border-[#1f1f1f]">
            <div className="relative w-full h-[55vh] sm:h-[65vh] flex items-center justify-center">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-contain"
                priority
              />

              {/* VIEWFINDER CORNERS */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#DFFF00]/70 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#DFFF00]/70 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#DFFF00]/70 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#DFFF00]/70 pointer-events-none" />
            </div>
          </div>

          {/* METADATA SIDEBAR */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-6 bg-[#080808]">
            <div className="space-y-5">
              <div>
                <span className="px-2 py-0.5 bg-[#141414] border border-[#222222] text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider">
                  {photo.categoryLabel}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight mt-2">
                  {photo.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-xs text-[#a0a0a0] font-sans leading-relaxed border-l border-[#333333] pl-3">
                {photo.description}
              </p>

              {/* TECHNICAL EXIF SPECS TABLE */}
              <div className="space-y-2 pt-3 border-t border-[#1f1f1f]">
                <div className="text-[10px] font-tech text-[#666666] uppercase tracking-widest flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-[#DFFF00]" />
                  <span>METADATOS ÓPTICOS // RAW</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-tech">
                  <div className="p-2 bg-[#0e0e0e] border border-[#1a1a1a]">
                    <div className="text-[#666666] text-[9px]">CÁMARA</div>
                    <div className="text-white font-bold truncate">{photo.camera}</div>
                  </div>
                  <div className="p-2 bg-[#0e0e0e] border border-[#1a1a1a]">
                    <div className="text-[#666666] text-[9px]">ÓPTICA / LENTE</div>
                    <div className="text-white font-bold truncate">{photo.lens}</div>
                  </div>
                  <div className="p-2 bg-[#0e0e0e] border border-[#1a1a1a]">
                    <div className="text-[#666666] text-[9px]">APERTURA & FOCAL</div>
                    <div className="text-[#DFFF00] font-bold">ƒ/{photo.aperture} • {photo.focalLength}</div>
                  </div>
                  <div className="p-2 bg-[#0e0e0e] border border-[#1a1a1a]">
                    <div className="text-[#666666] text-[9px]">VELOCIDAD & ISO</div>
                    <div className="text-white font-bold">{photo.shutter} • ISO {photo.iso}</div>
                  </div>
                </div>

                {/* LOCATION & CLIENT */}
                <div className="space-y-1.5 pt-2 text-xs font-tech text-[#888888]">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DFFF00]" />
                    <span>{photo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-[#DFFF00]" />
                    <span>Año de Captura: {photo.year}</span>
                  </div>
                  {photo.client && (
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 text-[#DFFF00]" />
                      <span>Cliente: {photo.client}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-1 pt-2">
                {photo.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-[#121212] text-[10px] font-tech text-[#888888] border border-[#1f1f1f]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTION CTA */}
            <div className="pt-4 border-t border-[#1f1f1f] space-y-2">
              <Link
                href={`/#contacto`}
                onClick={onClose}
                className="w-full py-2.5 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 hover:bg-white transition-colors"
              >
                <span>COTIZAR PRODUCCIÓN SIMILAR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
