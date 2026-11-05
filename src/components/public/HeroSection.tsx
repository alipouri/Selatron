import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';

export const HeroSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  // Controlled Presence: subtle normalized pointer coordinates (-1 to 1)
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  const scrollToCartel = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setRoute('/lore');
    }
  };

  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-screen w-full bg-[#171717] overflow-hidden flex items-center pt-28 pb-16 px-6 md:px-14"
    >
      {/* Layer 1: Controlled Ambient Chiaroscuro Lighting */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `translate3d(${pointer.x * 14}px, ${pointer.y * 14}px, 0)`,
          background:
            'radial-gradient(circle at 68% 45%, rgba(182, 154, 103, 0.09) 0%, rgba(32, 32, 32, 0.25) 42%, rgba(23, 23, 23, 0.98) 78%)'
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Typography & Negative Space (Cols 1-6) */}
        <div className="lg:col-span-6 space-y-10">
          {/* Eyebrow */}
          <div className="overflow-hidden">
            <motion.div
              initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: easeEditorial, delay: 0.05 }}
              className="flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-[#8D7954]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#B69A67]">
                AN ON-CHAIN ECONOMIC BROTHERHOOD
              </span>
            </motion.div>
          </div>

          {/* Main Masked Display Title: DEADLOCK CARTEL. */}
          <h1
            aria-label="DEADLOCK CARTEL."
            className="font-display font-bold text-5xl sm:text-7xl xl:text-[88px] tracking-[0.04em] text-[#F4F0E8] leading-[0.96]"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: easeEditorial, delay: 0.12 }}
                className="block"
              >
                DEADLOCK
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-1">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: easeEditorial, delay: 0.22 }}
                className="block text-[#E6DFD1]"
              >
                CARTEL<span className="text-[#B69A67]">.</span>
              </motion.span>
            </span>
          </h1>

          {/* Supporting Statement & Concise Line */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeEditorial, delay: 0.38 }}
            className="space-y-4 max-w-md pt-2"
          >
            <p className="font-display text-sm sm:text-base tracking-[0.22em] uppercase text-[#E6DFD1]">
              HONOR ARMED WITH LEVERAGE.
            </p>
            <p className="text-sm sm:text-base text-[#77736B] font-light leading-relaxed">
              An alliance built on unity, discipline and collective power.
            </p>
          </motion.div>

          {/* Primary & Secondary Actions */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeEditorial, delay: 0.48 }}
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <button
              onClick={scrollToCartel}
              className="px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              Explore The Cartel
            </button>

            <button
              onClick={() => setRoute('/member')}
              className="px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E6DFD1] border border-[#343434] hover:border-[#8D7954] hover:text-[#F4F0E8] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              Enter The Portal
            </button>
          </motion.div>
        </div>

        {/* Right Column: Dominant Sculptural Subject with Atmospheric Depth (Cols 7-12) */}
        <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.15, ease: easeEditorial, delay: 0.18 }}
            className="relative w-full max-w-[620px] aspect-[4/5] sm:aspect-[16/13] overflow-hidden bg-[#141414]"
          >
            {/* Sculptural Monolith Image Layer (moves subtly counter to pointer) */}
            <div
              className="w-full h-full transition-transform duration-700 ease-out"
              style={{
                transform: shouldReduceMotion
                  ? 'none'
                  : `scale(1.04) translate3d(${pointer.x * -10}px, ${pointer.y * -8}px, 0)`
              }}
            >
              <img
                src="/src/assets/images/hero_deadlock_monolith_1793866256884.jpg"
                alt="The DeadLock Monolith — Sculptural obsidian and brushed bronze emblem of collective unity"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Foreground Layer: Subtle Precision Architectural Framing & Chiaroscuro Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-transparent to-[#171717]/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-[#171717]/40 pointer-events-none" />

            {/* Subtle Engraved Geometric Alignment Hairline (moves slightly faster for depth separation) */}
            <div
              className="absolute inset-6 border border-[#343434]/35 pointer-events-none transition-transform duration-500 ease-out flex flex-col justify-between p-5"
              style={{
                transform: shouldReduceMotion
                  ? 'none'
                  : `translate3d(${pointer.x * 6}px, ${pointer.y * 6}px, 0)`
              }}
            >
              <div className="flex justify-between items-center text-[9px] font-mono tracking-[0.28em] text-[#77736B]/70 uppercase">
                <span>MONOLITH I</span>
                <span>ROBINHOOD CHAIN</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono tracking-[0.28em] text-[#8D7954]/80 uppercase">
                <span>UNBREAKABLE ALLIANCE</span>
                <span>3,333</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
