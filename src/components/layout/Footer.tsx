'use client';

import Link from 'next/link';
import { ARTIST_PROFILE } from '@/helpers/mediaData';
import { ArrowUp, Camera, Film, Instagram, Youtube, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#030303] border-t-2 border-[#222222] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ROW: BRAND & SOCIAL LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1f1f1f]">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#DFFF00] text-black font-editorial font-bold text-base flex items-center justify-center">
                W
              </div>
              <div>
                <div className="font-editorial text-2xl font-bold text-white tracking-wider">
                  WES
                </div>
                <div className="text-[10px] font-tech text-[#888888] uppercase tracking-widest">
                  CINEMATOGRAFÍA & FOTOGRAFÍA DE ALTA RESOLUCIÓN
                </div>
              </div>
            </div>

            <p className="text-xs text-[#888888] font-sans leading-relaxed max-w-sm">
              Plataforma audiovisual orientada a la entrega multimedia fluida, estética geométrica de líneas rectas y contraste puro sin concesiones.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-3 text-xs font-tech">
            <div className="text-[#DFFF00] uppercase tracking-widest font-bold">// NAVEGACIÓN</div>
            <ul className="space-y-2 text-[#a0a0a0]">
              <li>
                <Link href="/#inicio" className="hover:text-white transition-colors">
                  Inicio // Top
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  Sobre WES & Filosofía
                </Link>
              </li>
              <li>
                <Link href="/proyectos/fotografia" className="hover:text-[#DFFF00] transition-colors">
                  Galería de Fotografía
                </Link>
              </li>
              <li>
                <Link href="/proyectos/video" className="hover:text-[#DFFF00] transition-colors">
                  Galería de Cinematografía
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:text-white transition-colors">
                  Cotizaciones & Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL & DIRECT CHANNELS */}
          <div className="md:col-span-4 space-y-3 text-xs font-tech">
            <div className="text-[#DFFF00] uppercase tracking-widest font-bold">// REDES & CONTACTO DIRECTO</div>
            <div className="flex flex-col space-y-2">
              <a
                href={ARTIST_PROFILE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-white hover:border-[#DFFF00] hover:text-[#DFFF00] transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4 text-[#DFFF00]" />
                  <span>Instagram Oficial</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={ARTIST_PROFILE.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-white hover:border-[#DFFF00] hover:text-[#DFFF00] transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#DFFF00]" />
                  <span>WhatsApp: {ARTIST_PROFILE.socials.phone}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`mailto:${ARTIST_PROFILE.socials.email}`}
                className="flex items-center justify-between p-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-white hover:border-[#DFFF00] hover:text-[#DFFF00] transition-all"
              >
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#DFFF00]" />
                  <span>{ARTIST_PROFILE.socials.email}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT & CREDITS */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-[#666666]">
          <div>
            <span>© {new Date().getFullYear()} WES. Todos los derechos reservados. </span>
            <span className="text-[#DFFF00] font-bold">Desarrollado por Juan de momento.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[10px] text-[#444444]">ARISTAS VIVAS 0PX • STRICT MONOCHROME</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-[#222222] bg-[#0d0d0d] hover:bg-[#DFFF00] hover:text-black text-white transition-colors flex items-center gap-1"
              title="Volver al inicio"
            >
              <span className="text-[10px] uppercase font-bold">TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
