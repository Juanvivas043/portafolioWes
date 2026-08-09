'use client';

import { useEffect, useRef } from 'react';

/**
 * CustomCursor — Ultimate Reliability & Precision
 * - Dynamically activates on the very first mouse move (works on laptops with touchscreen + mouse).
 * - Deactivates gracefully if touch is used.
 * - Zero latency center point (hardware accelerated translate3d).
 * - Smooth camera viewfinder trailing frame with acid yellow corner brackets.
 * - States: Default (28px) | Interactive (44px) | Media Viewfinder (58px with crosshairs).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isActive = false;
    let currentState: 'default' | 'link' | 'media' = 'default';
    let animationFrameId: number;

    const setState = (next: 'default' | 'link' | 'media') => {
      if (next === currentState) return;
      currentState = next;

      ring.classList.remove('cursor-state-default', 'cursor-state-link', 'cursor-state-media');
      dot.classList.remove('cursor-dot-default', 'cursor-dot-link', 'cursor-dot-media');

      ring.classList.add(`cursor-state-${next}`);
      dot.classList.add(`cursor-dot-${next}`);
    };

    const activateCursor = () => {
      if (!isActive) {
        isActive = true;
        document.documentElement.classList.add('custom-cursor-active');
        dot.style.display = 'block';
        ring.style.display = 'block';
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const deactivateCursor = () => {
      isActive = false;
      document.documentElement.classList.remove('custom-cursor-active');
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isActive) {
        ringX = mouseX;
        ringY = mouseY;
        activateCursor();
      }

      // Center dot follows mouse 1:1 instantly with GPU transform
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isMedia = target.closest('img, video, [data-cursor="media"], .media-item');
      if (isMedia) {
        setState('media');
        return;
      }

      const isLink = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="link"], summary'
      );
      if (isLink) {
        setState('link');
        return;
      }

      setState('default');
    };

    const handleMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (isActive) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const handleTouchStart = () => {
      deactivateCursor();
    };

    // Smooth lerp loop for the trailing camera viewfinder frame
    const render = () => {
      if (isActive) {
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    setState('default');
    animationFrameId = requestAnimationFrame(render);

    return () => {
      deactivateCursor();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden"
    >
      {/* ── 1:1 Precise Center Dot ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none opacity-0"
        style={{
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <div className="w-2 h-2 bg-[#DFFF00] shadow-[0_0_8px_#DFFF00] transition-all duration-150" />
      </div>

      {/* ── Trailing Viewfinder Reticle ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 will-change-transform pointer-events-none cursor-state-default opacity-0"
        style={{
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <div className="relative flex items-center justify-center transition-all duration-200 ease-out border border-[#DFFF00]/40">
          {/* Top-Left Bracket */}
          <div className="corner-tl absolute -top-0.5 -left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#DFFF00]" />
          {/* Top-Right Bracket */}
          <div className="corner-tr absolute -top-0.5 -right-0.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#DFFF00]" />
          {/* Bottom-Left Bracket */}
          <div className="corner-bl absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#DFFF00]" />
          {/* Bottom-Right Bracket */}
          <div className="corner-br absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#DFFF00]" />

          {/* Center Crosshairs for Media targeting */}
          <div className="crosshair-h absolute top-1/2 left-1.5 right-1.5 h-px bg-[#DFFF00] -translate-y-1/2 opacity-0 transition-opacity duration-200 pointer-events-none" />
          <div className="crosshair-v absolute left-1/2 top-1.5 bottom-1.5 w-px bg-[#DFFF00] -translate-x-1/2 opacity-0 transition-opacity duration-200 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
