import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import AutonomousInfiniteReel from '@/components/animations/AutonomousInfiniteReel';
import About from '@/components/home/About';
import ProyectosPreview from '@/components/home/ProyectosPreview';
import CTASection from '@/components/home/CTASection';
import ContactForm from '@/components/home/ContactForm';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#DFFF00] selection:text-black">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <Hero />

      {/* AUTONOMOUS 100% SELF-SCROLLING 35MM INFINITE FILM REEL & TELEMETRY TAPE */}
      <AutonomousInfiniteReel />

      {/* ABOUT SECTION */}
      <About />

      {/* PROYECTOS PREVIEW (PORTAL TO SUBPAGES) */}
      <ProyectosPreview />

      {/* HIGH IMPACT CTA SECTION */}
      <CTASection />

      {/* CLIENT INQUIRY & BOOKING FORM */}
      <ContactForm />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
