'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { PHOTO_CATALOG, VIDEO_CATALOG, PhotoItem, VideoItem } from '@/helpers/mediaData';
import { getMasonrySpanClass } from '@/helpers/formatters';
import { useMediaModal } from '@/hooks/useMediaModal';
import MediaModal from '@/components/gallery/MediaModal';
import VideoModal from '@/components/gallery/VideoModal';
import { FadeUp } from '@/components/animations/MotionWrapper';
import ScrollDrawLine from '@/components/animations/ScrollDrawLine';
import ScrollAssembleCard from '@/components/animations/ScrollAssembleCard';
import { Camera, Film, Maximize2, Play } from 'lucide-react';

type MixedItem =
  | { kind: 'photo'; data: PhotoItem }
  | { kind: 'video'; data: VideoItem };

/**
 * Shuffle array deterministically with a seed (no hydration mismatch).
 * Uses a simple seeded linear congruential generator.
 */
function seededShuffle<T>(arr: T[], seed: number = 42): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface MixedGridProps {
  photoLimit?: number;
  videoLimit?: number;
}

export default function MixedGrid({ photoLimit = 10, videoLimit = 7 }: MixedGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Build mixed array: interleave photos & videos, shuffle once at module level
  const mixedItems = useMemo<MixedItem[]>(() => {
    const photos: MixedItem[] = PHOTO_CATALOG.slice(0, photoLimit).map((p) => ({
      kind: 'photo',
      data: p,
    }));
    const videos: MixedItem[] = VIDEO_CATALOG.slice(0, videoLimit).map((v) => ({
      kind: 'video',
      data: v,
    }));
    return seededShuffle([...photos, ...videos], 73);
  }, [photoLimit, videoLimit]);

  // Photo modal — only feed photos extracted from mixedItems
  const photoItems = useMemo(
    () => mixedItems.filter((m): m is { kind: 'photo'; data: PhotoItem } => m.kind === 'photo').map((m) => m.data),
    [mixedItems]
  );

  const { selectedPhoto, isOpen, currentIndex, totalItems, openModal, closeModal, nextPhoto, prevPhoto } =
    useMediaModal(photoItems);

  const handleOpenVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="preview-grid" className="py-14 bg-[#050505] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        {/* SECTION HEADER */}
        <FadeUp className="flex items-end justify-between pb-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-[#DFFF00]" />
              SELECCIÓN
            </div>
            <p className="font-editorial text-4xl sm:text-5xl font-extrabold text-white tracking-tighter uppercase leading-none">
              TRABAJOS
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end text-[10px] font-tech text-[#444444] gap-1 pb-1">
            <span className="text-[#555555]">{photoItems.length} FOTOGRAFÍAS</span>
            <span className="text-[#555555]">{mixedItems.length - photoItems.length} VIDEOS</span>
          </div>
        </FadeUp>

        {/* BLUEPRINT DRAW LINE UNDER HEADER */}
        <ScrollDrawLine color="#222222" className="mb-6" />

        {/*
          MIXED 5-COLUMN GRID WITH SCROLL ASSEMBLY PARALLAX.
          El reveal lo hace SOLO ScrollAssembleCard. Antes cada celda iba ademas
          envuelta en StaggerItem, que animaba un filter: blur sobre la misma
          imagen: dos animaciones peleando por el mismo nodo y un blur costoso
          en 17 imagenes grandes. De ahi venian los tirones.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 auto-rows-[220px] [grid-auto-flow:dense]">
          {mixedItems.map((item, index) => {
            const spanClass = getMasonrySpanClass(index);

            if (item.kind === 'photo') {
              const photo = item.data;
              return (
                <div key={photo.id} className={spanClass}>
                  <ScrollAssembleCard index={index} className="w-full h-full">
                    <button
                      type="button"
                      onClick={() => openModal(photo)}
                      className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#DFFF00] transition-all duration-300 overflow-hidden cursor-pointer text-left w-full h-full p-0 block focus:outline-none focus:border-[#DFFF00]"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                      />

                      {/* CORNER MARKS WITH HOVER EXPANSION */}
                      <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                      <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                      <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />

                      {/* EXPAND ICON */}
                      <div className="absolute top-2 right-2 p-1 bg-[#0a0a0a]/90 text-white opacity-0 group-hover:opacity-100 border border-[#333333] transition-opacity pointer-events-none">
                        <Maximize2 className="w-3 h-3" />
                      </div>

                      {/* BOTTOM OVERLAY: TITLE + ROLE */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform pointer-events-none">
                        <h3 className="font-editorial text-sm font-bold text-white tracking-tight truncate leading-snug">
                          {photo.title}
                        </h3>
                        <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider pt-0.5 truncate">
                          {photo.categoryLabel}
                        </div>
                      </div>
                    </button>
                  </ScrollAssembleCard>
                </div>
              );
            }

            // VIDEO ITEM
            const video = item.data;
            return (
              <div key={video.id} className={spanClass}>
                <ScrollAssembleCard index={index} className="w-full h-full">
                  <button
                    type="button"
                    onClick={() => handleOpenVideo(video)}
                    className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#DFFF00] transition-all duration-300 overflow-hidden cursor-pointer text-left w-full h-full p-0 block focus:outline-none focus:border-[#DFFF00]"
                  >
                    <Image
                      src={video.posterUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                    />

                    {/* PLAY BUTTON */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 bg-black/80 border border-[#333333] group-hover:border-[#DFFF00] group-hover:bg-[#DFFF00] group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* CORNER MARKS WITH HOVER EXPANSION */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />

                    {/* BOTTOM OVERLAY: TITLE + ROLE */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform pointer-events-none">
                      <h3 className="font-editorial text-sm font-bold text-white tracking-tight truncate leading-snug">
                        {video.title}
                      </h3>
                      <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider pt-0.5 truncate">
                        {video.categoryLabel}
                      </div>
                    </div>
                  </button>
                </ScrollAssembleCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODALS */}
      <MediaModal
        photo={selectedPhoto}
        isOpen={isOpen}
        currentIndex={currentIndex}
        totalItems={totalItems}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />
      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
      />
    </section>
  );
}
