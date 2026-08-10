'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { VIDEO_CATALOG, VIDEO_CATEGORY_LABELS, VideoItem } from '@/helpers/mediaData';
import { filterByCategory, getMasonrySpanClass, buildCategoryFilters } from '@/helpers/formatters';
import { usePagination } from '@/hooks/usePagination';
import VideoModal from '@/components/gallery/VideoModal';
import { FadeUp } from '@/components/animations/MotionWrapper';
import { Film, Play, Plus } from 'lucide-react';

interface VideoGridProps {
  initialCategory?: string;
  showCategoryFilters?: boolean;
  limit?: number;
  title?: string;
  subtitle?: string;
  pageSize?: number;
}

export default function VideoGrid({
  initialCategory = 'all',
  showCategoryFilters = true,
  limit,
  title = 'VIDEO',
  subtitle = 'SELECCIÓN DE TRABAJOS',
  pageSize = 24,
}: VideoGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const displayVideos = useMemo(() => {
    const filtered = filterByCategory(VIDEO_CATALOG, activeCategory);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [activeCategory, limit]);

  const { visibleItems, visibleCount, totalCount, hasMore, remaining, showMore, showAll } =
    usePagination(displayVideos, { pageSize });

  const categories = useMemo(
    () => buildCategoryFilters(VIDEO_CATALOG, VIDEO_CATEGORY_LABELS, 'Todos'),
    []
  );

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
    <section className="py-14 bg-[#080808] border-b border-[#222222] relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* HEADER & CATEGORY BAR */}
        <FadeUp className="border-b border-[#222222] pb-5 mb-6 space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
                <span className="w-3 h-px bg-[#DFFF00] shrink-0" />
                <span className="truncate">{subtitle}</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase whitespace-nowrap">
                {title}
              </h2>
            </div>

            <span className="text-[10px] font-tech text-[#666666] uppercase tracking-widest shrink-0 pb-1 text-right">
              {visibleCount} / {totalCount}
              <span className="hidden sm:inline"> VIDEOS</span>
            </span>
          </div>

          {showCategoryFilters && (
            <div className="-mx-2 px-2 overflow-x-auto sm:overflow-visible">
              <div className="flex flex-nowrap sm:flex-wrap gap-1.5 min-w-max sm:min-w-0 pb-1 sm:pb-0">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition-all border flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#DFFF00] text-black border-[#DFFF00] font-bold'
                          : 'bg-[#0e0e0e] text-[#888888] border-[#1f1f1f] hover:border-[#444444] hover:text-white'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={isActive ? 'text-black/60' : 'text-[#555555]'}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </FadeUp>

        {/* 5-COLUMN ASYMMETRICAL VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 auto-rows-[220px] [grid-auto-flow:dense]">
          {visibleItems.map((video, index) => {
            const spanClass = getMasonrySpanClass(index);

            return (
              <div key={video.id} className={spanClass}>
                <button
                  type="button"
                  onClick={() => handleOpenVideo(video)}
                  className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#DFFF00] transition-all duration-300 overflow-hidden cursor-pointer text-left w-full h-full p-0 block focus:outline-none focus:border-[#DFFF00]"
                >
                  {/* En el grid nunca se monta un <video>: solo el poster. */}
                  <Image
                    src={video.posterUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    loading={index < 10 ? 'eager' : 'lazy'}
                    className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                  />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 bg-black/85 border border-[#333333] group-hover:border-[#DFFF00] group-hover:bg-[#DFFF00] group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-xl">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* DURACIÓN REAL DEL ARCHIVO */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-[#333333] text-[10px] font-tech text-white tabular-nums pointer-events-none">
                    {video.duration}
                  </div>

                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                  <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform pointer-events-none">
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate">
                      {video.title}
                    </h3>
                    <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider pt-0.5 truncate">
                      {video.categoryLabel}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* PAGINACIÓN POR TANDAS */}
        {hasMore && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={showMore}
              className="w-full sm:w-auto px-6 py-3 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 border border-[#DFFF00]"
            >
              <Plus className="w-4 h-4" />
              <span>Cargar {Math.min(pageSize, remaining)} más</span>
            </button>
            <button
              type="button"
              onClick={showAll}
              className="w-full sm:w-auto px-6 py-3 bg-[#0e0e0e] text-[#888888] font-tech text-xs font-bold uppercase tracking-wider border border-[#1f1f1f] hover:border-[#444444] hover:text-white transition-colors"
            >
              Ver los {totalCount}
            </button>
          </div>
        )}

        {displayVideos.length === 0 && (
          <div className="text-center py-20 border border-[#1f1f1f] bg-[#0c0c0c]">
            <Film className="w-10 h-10 text-[#444444] mx-auto mb-3" />
            <div className="font-editorial text-lg text-white">No hay videos en esta categoría</div>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-3 px-4 py-2 bg-[#DFFF00] text-black font-tech text-xs font-bold"
            >
              Ver todos
            </button>
          </div>
        )}
      </div>

      <VideoModal video={selectedVideo} isOpen={isVideoModalOpen} onClose={handleCloseVideo} />
    </section>
  );
}
