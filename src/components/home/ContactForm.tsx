'use client';

import { useState } from 'react';
import { ARTIST_PROFILE } from '@/helpers/mediaData';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#050505] border-b border-[#222222] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-5 mb-10 sm:mb-16 gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1">
              // CONTACTO & CONTRATACIONES
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              COTIZAR PRODUCCIÓN // WES
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-tech text-[#888888] uppercase tracking-widest block">
              RESPUESTA ESTIMADA
            </span>
            <span className="text-xs font-tech text-[#DFFF00]">DENTRO DE LAS 24 HORAS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: DIRECT CONTACT INFO & CALENDAR STATUS */}
          <div className="lg:col-span-5 space-y-8 flex flex-col h-full">
            <div className="p-6 border-2 border-[#222222] bg-[#0a0a0a] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] text-[10px] font-tech">
                <span className="text-white font-bold">INFO DIRECTA</span>
                <span className="text-[#DFFF00]">DISPONIBILIDAD ACTIVA</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#DFFF00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-tech text-[#777777] uppercase">CORREO ELECTRÓNICO</div>
                    <a
                      href={`mailto:${ARTIST_PROFILE.socials.email}`}
                      className="text-sm font-tech text-white hover:text-[#DFFF00] transition-colors"
                    >
                      {ARTIST_PROFILE.socials.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#DFFF00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-tech text-[#777777] uppercase">WHATSAPP / TELÉFONO</div>
                    <a
                      href={ARTIST_PROFILE.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-tech text-white hover:text-[#DFFF00] transition-colors"
                    >
                      {ARTIST_PROFILE.socials.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#DFFF00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-tech text-[#777777] uppercase">BASE DE OPERACIONES</div>
                    <div className="text-sm font-tech text-white">{ARTIST_PROFILE.location}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#121212] border border-[#1f1f1f] text-xs font-tech text-[#888888] space-y-1">
                <div className="text-[#DFFF00] font-bold uppercase">// EQUIPO PARA VIAJES:</div>
                <p>Disponibilidad para traslados nacionales e internacionales con pasaporte vigente y kit Pelican optimizado.</p>
              </div>
            </div>

            {/* INSTANT WHATSAPP SHORTCUT */}
            <div className="p-6 border border-[#222222] bg-[#0c0c0c]">
              <div className="text-sm font-editorial font-bold text-white mb-2">
                ¿NECESITAS RESPUESTA INMEDIATA?
              </div>
              <p className="text-xs text-[#888888] mb-4">
                Envía un mensaje directo a WhatsApp con los detalles de tu fecha y tipo de rodaje.
              </p>
              <a
                href="https://wa.me/584120000000?text=Hola%20WES,%20vengo%20desde%20tu%20portafolio%20web%20y%20deseo%20cotizar%20un%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2e2e2e] transition-colors"
              >
                <span>ABRIR WHATSAPP DIRECTO</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE BOOKING FORM */}
          <div className="lg:col-span-7 flex flex-col h-full">
            {isSubmitted ? (
              <div className="p-10 border-2 border-[#DFFF00] bg-[#0c0c0c] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#DFFF00] mx-auto" />
                <h3 className="font-editorial text-2xl font-bold text-white">
                  ¡SOLICITUD DE PRODUCCIÓN ENVIADA!
                </h3>
                <p className="text-xs font-tech text-[#a0a0a0] max-w-md mx-auto">
                  Gracias por contactar a WES. Analizaremos los requerimientos técnicos y el calendario para responderte con una propuesta formal.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider"
                >
                  Enviar otra cotización
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 p-6 sm:p-8 border-2 border-[#222222] bg-[#0a0a0a] space-y-6 flex flex-col justify-between">
                {/* NAME & EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-tech text-[#888888] uppercase">NOMBRE O MARCA *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre o empresa"
                      className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-tech text-[#888888] uppercase">EMAIL DE CONTACTO *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* PHONE & TENTATIVE DATE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-tech text-[#888888] uppercase">TELÉFONO / WHATSAPP</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+58 412 000 0000"
                      className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-tech text-[#888888] uppercase">FECHA TENTATIVA DE RODAJE</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* PROJECT DESCRIPTION */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-tech text-[#888888] uppercase">
                    DETALLES DEL PROYECTO / REFERENCIAS VISUALES *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe el concepto, locaciones deseadas, duración de la entrega o metas visuales..."
                    className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center space-x-2 border border-[#DFFF00]"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITUD DE PRODUCCIÓN</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
