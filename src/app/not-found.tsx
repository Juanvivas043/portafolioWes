import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col items-center justify-center p-6 text-center">
      <div className="border-2 border-[#222222] bg-[#0a0a0a] p-8 sm:p-12 max-w-lg space-y-6">
        <div className="text-[10px] font-tech text-[#DFFF00] uppercase tracking-widest">
          // ERROR 404 • ENCUADRE FUERA DE LÍMITES
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight">
          404 // NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] font-sans">
          La toma o página solicitada no existe o ha sido reubicada en el archivo.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER AL INICIO</span>
        </Link>
      </div>
    </main>
  );
}
