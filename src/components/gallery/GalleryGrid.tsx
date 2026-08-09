'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { PHOTO_CATALOG, PhotoItem } from '@/helpers/mediaData';
import { filterByCategory, getMasonrySpanClass } from '@/helpers/formatters';
import { useMediaModal } from '@/hooks/useMediaModal';
import MediaModal from '@/components/gallery/MediaModal';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper';
import { Camera, Maximize2 } from 'lucide-react';

interface GalleryGridProps {
  initialCategory?: string;
  showCategoryFilters?: boolean;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export default function GalleryGrid({
  initialCategory = 'all',
  showCategoryFilters = true,
  limit,
  title = 'GALERÍA DE OBRAS // STILLS',
  subtitle = 'GRID ASIMÉTRICO DE 5 COLUMNAS // ARISTAS VIVAS',
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const displayPhotos = useMemo(() => {
    const filtered = filterByCategory(PHOTO_CATALOG, activeCategory);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [activeCategory, limit]);

  const {
    selectedPhoto,
    isOpen,
    currentIndex,
    totalItems,
    openModal,
    closeModal,
    nextPhoto,
    prevPhoto,
  } = useMediaModal(displayPhotos);

  const categories = [
    { id: 'all', label: 'Todas las Obras' },
    { id: 'artistas', label: 'Artistas & Retratos' },
    { id: 'conciertos', label: 'Conciertos' },
    { id: 'deportes', label: 'Deportes' },
    { id: 'destinos', label: 'Destinos' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'marcas', label: 'Marcas' },
  ];

  return (
    <section className="py-14 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* HEADER & FILTERS */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-5 mb-6 gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-3 h-px bg-[#DFFF00]" />
              {subtitle}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              {title}
            </h2>
          </div>

          {/* CATEGORY FILTER BUTTONS */}
          {showCategoryFilters && (
            <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition-all border ${
                      isActive
                        ? 'bg-[#DFFF00] text-black border-[#DFFF00] font-bold shadow-md'
                        : 'bg-[#0e0e0e] text-[#888888] border-[#1f1f1f] hover:border-[#444444] hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}
        </FadeUp>

        {/* 5-COLUMN ASYMMETRICAL EDITORIAL GRID WITH MINIMAL GAPS */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 auto-rows-[220px] [grid-auto-flow:dense]">
          {displayPhotos.map((photo, index) => {
            const spanClass = getMasonrySpanClass(index, photo.aspectRatio);

            return (
              <StaggerItem key={photo.id} className={spanClass}>
                <button
                  type="button"
                  onClick={() => openModal(photo)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(photo);
                    }
                  }}
                  className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#DFFF00] transition-all duration-300 overflow-hidden cursor-pointer text-left w-full h-full p-0 block focus:outline-none focus:border-[#DFFF00]"
                >
                  {/* PHOTO IMAGE IN OPTIMIZED WEBP */}
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                  />

                  {/* CORNER RETICLE ON HOVER */}
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                  <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />

                  {/* EXPAND ICON ON TOP RIGHT */}
                  <div className="absolute top-2 right-2 p-1 bg-[#0a0a0a]/90 text-white opacity-0 group-hover:opacity-100 border border-[#333333] transition-opacity pointer-events-none">
                    <Maximize2 className="w-3 h-3" />
                  </div>

                  {/* MINIMAL BOTTOM OVERLAY: ONLY TITLE AND ROLE */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform pointer-events-none">
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate">
                      {photo.title}
                    </h3>
                    <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider pt-0.5 truncate">
                      {photo.role || photo.categoryLabel}
                    </div>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* EMPTY STATE IF NONE FOUND */}
        {displayPhotos.length === 0 && (
          <div className="text-center py-20 border border-[#1f1f1f] bg-[#0c0c0c]">
            <Camera className="w-10 h-10 text-[#444444] mx-auto mb-3" />
            <div className="font-editorial text-lg text-white">No se encontraron obras en esta categoría</div>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-3 px-4 py-2 bg-[#DFFF00] text-black font-tech text-xs font-bold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>

      {/* FULLSCREEN HIGH-RES EXIF LIGHTBOX MODAL */}
      <MediaModal
        photo={selectedPhoto}
        isOpen={isOpen}
        currentIndex={currentIndex}
        totalItems={totalItems}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />
    </section>
  );
}
