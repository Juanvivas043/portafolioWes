import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Shield } from 'lucide-react';
import { ARTIST_PROFILE } from '@/helpers/mediaData';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Política de privacidad | WES',
  description:
    'Qué datos recoge el formulario de contacto de WES, para qué se usan, cuánto se conservan y cómo pedir que se eliminen.',
};

/**
 * Politica de privacidad.
 *
 * Describe lo que el sitio hace de verdad: el formulario manda un correo y nada
 * mas. No hay base de datos, ni analitica, ni cookies de terceros. Si algo de
 * eso cambia, hay que actualizar esta pagina.
 */
export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5]">
      <Header />

      <section className="pt-32 pb-12 border-b border-[#222222] bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-tech text-[#888888] mb-4">
            <Link href="/" className="hover:text-[#DFFF00] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>INICIO</span>
            </Link>
            <span>/</span>
            <span className="text-white">PRIVACIDAD</span>
          </div>

          <div className="inline-flex items-center space-x-2 border border-[#222222] bg-[#121212] px-3 py-1 mb-2">
            <Shield className="w-3.5 h-3.5 text-[#DFFF00]" />
            <span className="text-xs font-tech text-[#DFFF00] uppercase font-bold">
              TUS DATOS
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase">
            PRIVACIDAD
          </h1>
        </div>
      </section>

      <section className="py-14 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Bloque titulo="QUÉ SE RECOGE">
            <p>
              Solo lo que escribes en el formulario de contacto: tu nombre, tu correo
              electrónico, la descripción de tu proyecto y, si decides ponerlos, tu teléfono
              y una fecha tentativa.
            </p>
            <p>
              El sitio no usa cookies de seguimiento, no tiene analítica y no registra tu
              navegación. Si nunca escribes por el formulario, no queda ningún dato tuyo.
            </p>
          </Bloque>

          <Bloque titulo="PARA QUÉ SE USA">
            <p>
              Únicamente para leer tu solicitud y responderte. No se usa para publicidad, no
              se cede ni se vende a nadie, y no vas a recibir boletines ni promociones.
            </p>
          </Bloque>

          <Bloque titulo="A DÓNDE VA">
            <p>
              Al enviar el formulario se generan dos correos: uno con tu solicitud, que llega
              al buzón de WES, y otro de confirmación que llega al tuyo. No hay base de datos:
              tus datos viven en esas bandejas de entrada y en ningún otro sitio.
            </p>
            <p>
              El correo se envía a través de Gmail (Google), que actúa como proveedor y aplica
              sus propias condiciones al tránsito y almacenamiento del mensaje.
            </p>
          </Bloque>

          <Bloque titulo="CUÁNTO SE CONSERVA">
            <p>
              El tiempo que el mensaje permanezca en el correo. Puedes pedir que se borre en
              cualquier momento y se elimina de la bandeja.
            </p>
          </Bloque>

          <Bloque titulo="TUS DERECHOS">
            <p>
              Puedes pedir acceso a lo que enviaste, su corrección o su eliminación. Basta con
              escribir a{' '}
              <a
                href={`mailto:${ARTIST_PROFILE.socials.email}`}
                className="text-[#DFFF00] hover:underline"
              >
                {ARTIST_PROFILE.socials.email}
              </a>{' '}
              desde el mismo correo con el que contactaste.
            </p>
          </Bloque>

          <Bloque titulo="RESPONSABLE">
            <p>
              {ARTIST_PROFILE.name} — {ARTIST_PROFILE.role}, Caracas, Venezuela.
              <br />
              Correo:{' '}
              <a
                href={`mailto:${ARTIST_PROFILE.socials.email}`}
                className="text-[#DFFF00] hover:underline"
              >
                {ARTIST_PROFILE.socials.email}
              </a>
              <br />
              WhatsApp:{' '}
              <a
                href={ARTIST_PROFILE.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DFFF00] hover:underline"
              >
                {ARTIST_PROFILE.socials.phone}
              </a>
            </p>
          </Bloque>

          <div className="pt-6 border-t border-[#1f1f1f]">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#DFFF00] text-black font-tech text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>VOLVER AL FORMULARIO</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#222222] pl-5 space-y-3">
      <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
        {titulo}
      </h2>
      <div className="space-y-3 text-sm text-[#a0a0a0] font-sans leading-relaxed">{children}</div>
    </div>
  );
}
