import React from 'react';
import { useCartel } from '../../context/CartelContext';
import { PhyllotaxisFigure } from '../common/PhyllotaxisFigure';

export const HeroSection: React.FC = () => {
  const { setRoute } = useCartel();

  const scrollToCartel = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setRoute('/lore');
    }
  };

  return (
    <section
      aria-label="Hero — The Cartel"
      className="relative min-h-screen w-full bg-[#171717] overflow-hidden flex items-center pt-24 pb-16 px-5 sm:px-8 lg:px-14"
    >
      {/* Signature Form: 3,333-point Phyllotaxis Figure with Circle Convergence Animation */}
      <div className="pointer-events-none absolute inset-0 lg:inset-y-0 lg:left-auto lg:right-[-8%] lg:w-[62%] flex items-center justify-center opacity-25 lg:opacity-100">
        <div className="w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px] xl:w-[860px] xl:h-[860px]">
          <PhyllotaxisFigure
            animateAssembly={true}
            ariaLabel="One circle of 3,333 points: 33 Kingpins at the centre, then 169 Godmothers, 469 Members and 2,662 Rookies"
          />
        </div>
      </div>

      {/* Main Content Container (Static — only the circle convergence animation runs) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 xl:col-span-6 space-y-8 sm:space-y-10">
          {/* Eyebrow + Gold Rule */}
          <div className="flex items-center gap-4">
            <span className="w-10 h-[1px] bg-[#B69A67] shrink-0" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#A39E92]">
              AN ON-CHAIN ECONOMIC BROTHERHOOD
            </span>
          </div>

          {/* Two-Line Display Title */}
          <h1
            aria-label="DEADLOCK CARTEL."
            className="font-display font-light text-[54px] sm:text-[84px] md:text-[104px] xl:text-[120px] text-[#F4F0E8] leading-[0.9] tracking-[-0.015em]"
          >
            <span className="block pb-1">DEADLOCK</span>
            <span className="block pt-1 text-[#E6DFD1]">
              CARTEL<span className="text-[#B69A67]">.</span>
            </span>
          </h1>

          {/* Supporting Statement & Short Description */}
          <div className="space-y-3 max-w-md pt-1">
            <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#B69A67] font-medium">
              HONOR ARMED WITH LEVERAGE.
            </p>
            <p className="text-sm sm:text-base text-[#A39E92] leading-relaxed">
              An alliance built on unity, discipline and collective power.
            </p>
          </div>

          {/* Primary & Secondary Square-Cornered Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={scrollToCartel}
              className="px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#8D7954] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              EXPLORE THE CARTEL
            </button>

            <button
              onClick={() => setRoute('/member')}
              className="px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E6DFD1] border border-[rgba(230,223,209,0.14)] hover:border-[#B69A67] hover:text-[#F4F0E8] transition-colors duration-200 cursor-pointer whitespace-nowrap bg-[#171717]/60"
            >
              ENTER THE PORTAL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
