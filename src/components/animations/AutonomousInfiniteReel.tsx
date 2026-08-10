'use client';

const TICKER_ITEMS = [
  'FOTOGRAFÍA EDITORIAL',
  'CONCIERTOS & FESTIVALES',
  'DEPORTES DE ACCIÓN',
  'VIDEOCLIPS MUSICALES',
  'CAMPAÑAS DE MARCA',
  'DOCUMENTAL',
  'CONTENIDO PARA REDES',
  'CARACAS · VENEZUELA',
];

export default function AutonomousInfiniteReel() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070707] border-y border-[#1f1f1f] py-3 select-none z-20">
      {/* SHADOW VIGNETTES ON EDGES */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#070707] via-[#070707]/80 to-transparent z-10 pointer-events-none" />

      {/* AUTONOMOUS STRIP: DISCIPLINES RIBBON GLIDING CONTINUOUSLY */}
      <div className="relative w-full overflow-hidden">
        <div className="flex whitespace-nowrap animate-infinite-scroll-reverse">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center space-x-3 px-5 text-[10px] sm:text-[11px] font-tech tracking-widest uppercase text-[#777777] hover:text-[#DFFF00] transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-[#DFFF00] rounded-none animate-pulse" />
              <span className="font-bold">{item}</span>
              <span className="text-[#333333]">//</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
