'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ARTIST_PROFILE } from '@/helpers/mediaData';
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FadeUp } from '@/components/animations/MotionWrapper';
import MagneticButton from '@/components/animations/MagneticButton';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    details: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setErrors([]);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setErrors(result?.errors ?? ['No se pudo enviar el mensaje. Inténtalo de nuevo.']);
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', date: '', details: '', consent: false });
    } catch {
      // Sin conexion o servidor caido: el visitante sigue teniendo WhatsApp.
      setErrors(['No hay conexión con el servidor. Escríbeme por WhatsApp mientras tanto.']);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#050505] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION TITLE */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#222222] pb-5 mb-10 sm:mb-16 gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] font-tech text-[#DFFF00] tracking-widest uppercase mb-1 flex items-center gap-2">
              <span className="w-3 h-px bg-[#DFFF00]" />
              HABLEMOS
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              CONTACTO
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-tech text-[#888888] uppercase tracking-widest block">
              RESPUESTA
            </span>
            <span className="text-xs font-tech text-[#DFFF00]">EN 24 HORAS</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: DIRECT CONTACT INFO & CALENDAR STATUS */}
          <FadeUp delay={0.1} className="lg:col-span-5 space-y-8 flex flex-col h-full">
            <div className="p-6 border-2 border-[#222222] bg-[#0a0a0a] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] text-[10px] font-tech">
                <span className="text-white font-bold">DATOS DE CONTACTO</span>
                <span className="text-[#DFFF00]">DISPONIBLE</span>
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
                    <div className="text-[10px] font-tech text-[#777777] uppercase">UBICACIÓN</div>
                    <div className="text-sm font-tech text-white">{ARTIST_PROFILE.location}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#121212] border border-[#1f1f1f] text-xs font-tech text-[#888888] space-y-1">
                <div className="text-[#DFFF00] font-bold uppercase">VIAJES</div>
                <p>Disponible para trabajos fuera de Caracas y en el exterior.</p>
              </div>
            </div>

            {/* INSTANT WHATSAPP SHORTCUT */}
            <div className="p-6 border border-[#222222] bg-[#0c0c0c]">
              <div className="text-sm font-editorial font-bold text-white mb-2">
                ¿NECESITAS RESPUESTA INMEDIATA?
              </div>
              <p className="text-xs text-[#888888] mb-4">
                Escríbeme por WhatsApp con la fecha y el tipo de trabajo.
              </p>
              <a
                href={`${ARTIST_PROFILE.socials.whatsapp}?text=Hola%20WES,%20vengo%20desde%20tu%20portafolio%20web%20y%20quiero%20cotizar%20un%20proyecto.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#171717] hover:bg-[#DFFF00] text-white hover:text-black font-tech text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 border border-[#2e2e2e] transition-colors"
              >
                <span>ABRIR WHATSAPP</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeUp>

          {/* RIGHT: INTERACTIVE BOOKING FORM */}
          <FadeUp delay={0.2} className="lg:col-span-7 flex flex-col h-full">
            {isSubmitted ? (
              <div className="p-10 border-2 border-[#DFFF00] bg-[#0c0c0c] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#DFFF00] mx-auto" />
                <h3 className="font-editorial text-2xl font-bold text-white">
                  ¡MENSAJE ENVIADO!
                </h3>
                <p className="text-xs font-tech text-[#a0a0a0] max-w-md mx-auto">
                  Te envié una confirmación a tu correo. Revisaré los detalles de tu proyecto y
                  te responderé dentro de las próximas 24 horas.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider"
                >
                  Enviar otro mensaje
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
                      placeholder="+58 414 000 0000"
                      className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-tech text-[#888888] uppercase">FECHA TENTATIVA</label>
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
                    CUÉNTAME SOBRE EL PROYECTO *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe la idea, el lugar, la duración o lo que necesitas entregar..."
                    className="w-full p-3 bg-[#121212] border border-[#222222] text-white text-xs font-tech focus:border-[#DFFF00] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* CONSENTIMIENTO DE TRATAMIENTO DE DATOS */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 w-4 h-4 shrink-0 accent-[#DFFF00] cursor-pointer"
                  />
                  <span className="text-[11px] font-tech text-[#888888] leading-relaxed group-hover:text-[#a0a0a0] transition-colors">
                    Autorizo el uso de estos datos para responder a mi solicitud. No se
                    comparten con terceros ni se usan para publicidad.{' '}
                    <Link
                      href="/privacidad"
                      target="_blank"
                      className="text-[#DFFF00] hover:underline"
                    >
                      Ver política de privacidad
                    </Link>
                  </span>
                </label>

                {/* ERRORES DE ENVÍO O DE VALIDACIÓN DEL SERVIDOR */}
                {errors.length > 0 && (
                  <div className="p-3 border border-[#DFFF00] bg-[#121212] space-y-1" role="alert">
                    {errors.map((error) => (
                      <div key={error} className="flex items-start gap-2 text-xs font-tech text-[#DFFF00]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* SUBMIT BUTTON WITH MAGNETIC HOVER */}
                <MagneticButton strength={12} className="w-full">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center space-x-2 border border-[#DFFF00] disabled:opacity-60 disabled:cursor-wait"
                  >
                    {isSending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black animate-spin" />
                        <span>ENVIANDO...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ENVIAR MENSAJE</span>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
