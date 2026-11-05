import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';
import { PhyllotaxisFigure } from '../common/PhyllotaxisFigure';

export const HeroSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      const vh = Math.max(window.innerHeight, 600);
      const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  const scrollToCartel = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    } else {
      setRoute('/lore');
    }
  };

  const easeEditorial: [number, number, number, number] = [0.2, 0.7, 0.1, 1];

  // Scroll-driven shift/scale of the figure and subtle text fade
  const textOpacity = shouldReduceMotion ? 1 : Math.max(1 - scrollProgress * 0.85, 0.12);
  const textTranslateY = shouldReduceMotion ? 0 : scrollProgress * -24;
  const figureScale = shouldReduceMotion ? 1 : 1 + scrollProgress * 0.07;
  const figureTranslateY = shouldReduceMotion ? 0 : scrollProgress * 70;

  return (
    <section
      aria-label="Hero — The Cartel"
      className="relative min-h-screen w-full bg-[#171717] overflow-hidden flex items-center pt-24 pb-16 px-5 sm:px-8 lg:px-14"
    >
      {/* Signature Form: 3,333-point Phyllotaxis Figure with Circle Convergence + Pointer Parallax
          On desktop: positioned on the right, bleeding off-edge.
          On mobile/tablet (<lg): sits behind the text at reduced opacity. */}
      <div
        className="pointer-events-none absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-[-8%] lg:w-[62%] flex items-center justify-center opacity-25 lg:opacity-100 transition-opacity duration-500 will-change-transform"
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `translate3d(0, ${figureTranslateY}px, 0) scale(${figureScale})`
        }}
      >
        <div className="w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px] xl:w-[860px] xl:h-[860px]">
          <PhyllotaxisFigure
            animateAssembly={true}
            ariaLabel="One circle of 3,333 points: 33 Kingpins at the centre, then 169 Godmothers, 469 Members and 2,662 Rookies"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div
        className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center"
        style={{
          opacity: textOpacity,
          transform: shouldReduceMotion ? 'none' : `translate3d(0, ${textTranslateY}px, 0)`
        }}
      >
        <div className="lg:col-span-7 xl:col-span-6 space-y-8 sm:space-y-10">
          {/* Eyebrow + Gold Rule scaling in */}
          <div className="flex items-center gap-4">
            <motion.span
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.15, ease: easeEditorial, delay: 0.25 }}
              style={{ transformOrigin: 'left center' }}
              className="w-12 h-[1px] bg-[#B69A67] shrink-0"
            />
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeEditorial, delay: 0.15 }}
              className="text-[11px] uppercase tracking-[0.28em] text-[#A39E92]"
            >
              AN ON-CHAIN ECONOMIC BROTHERHOOD
            </motion.span>
          </div>

          {/* Huge Two-Line Masked Display Title (Weight 300, leading ~0.9) */}
          <h1
            aria-label="DEADLOCK CARTEL."
            className="font-display font-light text-[54px] sm:text-[84px] md:text-[104px] xl:text-[120px] text-[#F4F0E8] leading-[0.9] tracking-[-0.015em]"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, ease: easeEditorial, delay: 0.22 }}
                className="block"
              >
                DEADLOCK
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-1">
              <motion.span
                initial={shouldReduceMotion ? false : { y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.15, ease: easeEditorial, delay: 0.36 }}
                className="block text-[#E6DFD1]"
              >
                CARTEL<span className="text-[#B69A67]">.</span>
              </motion.span>
            </span>
          </h1>

          {/* Gold Rule Accent + Supporting Statement & Description */}
          <div className="space-y-4 max-w-md pt-1">
            <motion.div
              initial={shouldReduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: easeEditorial, delay: 0.65 }}
              style={{ transformOrigin: 'left center' }}
              className="h-[1px] w-36 bg-[#B69A67]"
            />
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeEditorial, delay: 0.52 }}
              className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#B69A67] font-medium"
            >
              HONOR ARMED WITH LEVERAGE.
            </motion.p>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeEditorial, delay: 0.64 }}
              className="text-sm sm:text-base text-[#A39E92] leading-relaxed"
            >
              An alliance built on unity, discipline and collective power.
            </motion.p>
          </div>

          {/* Primary & Secondary Square-Cornered Buttons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: easeEditorial, delay: 0.78 }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <button
              onClick={scrollToCartel}
              className="px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#171717] bg-[#E6DFD1] hover:bg-[#B69A67] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              EXPLORE THE CARTEL
            </button>

            <button
              onClick={() => setRoute('/member')}
              className="px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E6DFD1] border border-[rgba(230,223,209,0.28)] hover:border-[#B69A67] hover:bg-[#B69A67] hover:text-[#171717] transition-colors duration-300 cursor-pointer whitespace-nowrap bg-[#171717]/60"
            >
              ENTER THE PORTAL
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
