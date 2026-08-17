import Image from 'next/image';
import Link from 'next/link';
import { CategoryEntry } from '@/helpers/mediaData';
import { getMasonrySpanClass } from '@/helpers/formatters';
import { FadeUp } from '@/components/animations/MotionWrapper';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  categories: CategoryEntry[];
  title?: string;
  subtitle?: string;
  /** Palabra con la que se cuentan las piezas: "fotografías" o "videos". */
  itemNoun?: { singular: string; plural: string };
}

/**
 * Indice de categorias con la misma reticula asimetrica que las galerias.
 *
 * No lleva 'use client': son enlaces e imagenes, sin estado ni eventos. La
 * unica parte animada es FadeUp, que ya es un componente cliente.
 */
export default function CategoryGrid({
  categories,
  title = 'CATEGORÍAS',
  subtitle = 'ELIGE UNA CATEGORÍA',
  itemNoun = { singular: 'pieza', plural: 'piezas' },
}: CategoryGridProps) {
  const total = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <section className="py-14 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* HEADER */}
        <FadeUp className="border-b border-[#222222] pb-5 mb-6">
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
              {categories.length} CATEGORÍAS
              <span className="hidden sm:inline"> · {total} {itemNoun.plural.toUpperCase()}</span>
            </span>
          </div>
        </FadeUp>

        {/* MISMA RETÍCULA ASIMÉTRICA DE 5 COLUMNAS QUE LAS GALERÍAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 auto-rows-[220px] [grid-auto-flow:dense]">
          {categories.map((category, index) => (
            <div key={category.id} className={getMasonrySpanClass(index)}>
              <Link
                href={category.href}
                className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#DFFF00] transition-all duration-300 overflow-hidden w-full h-full block focus:outline-none focus:border-[#DFFF00]"
              >
                <Image
                  src={category.cover}
                  alt={category.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  loading={index < 6 ? 'eager' : 'lazy'}
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                />

                {/* Velo permanente: aquí el texto manda sobre la imagen. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20 group-hover:from-black/95 group-hover:via-black/30 transition-colors pointer-events-none" />

                {/* CORNER RETICLE ON HOVER */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#DFFF00] opacity-0 group-hover:opacity-100 group-hover:w-3.5 group-hover:h-3.5 transition-all pointer-events-none" />

                {/* CONTADOR */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 border border-[#333333] text-[10px] font-tech text-white tabular-nums pointer-events-none">
                  {category.count}
                </div>

                {/* NOMBRE DE LA CATEGORÍA */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between gap-2 pointer-events-none">
                  <div className="min-w-0">
                    <h3 className="font-editorial text-lg sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-none truncate group-hover:text-[#DFFF00] transition-colors">
                      {category.label}
                    </h3>
                    <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-wider pt-1">
                      {category.count} {category.count === 1 ? itemNoun.singular : itemNoun.plural}
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white shrink-0 opacity-60 group-hover:opacity-100 group-hover:text-[#DFFF00] transition-all" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
