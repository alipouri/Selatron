import React from 'react';
import { useCartel } from '../../context/CartelContext';

export const ManifestoSection: React.FC = () => {
  const { setRoute } = useCartel();

  return (
    <section
      id="manifesto"
      aria-label="Manifesto — Brand Identity"
      className="relative py-28 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-14 border-t border-[rgba(230,223,209,0.14)] overflow-hidden"
    >
      {/* Background: Faint Concentric Hairline Rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-[720px] h-[720px] sm:w-[960px] sm:h-[960px] lg:w-[1160px] lg:h-[1160px] opacity-100"
        >
          <circle
            cx="500"
            cy="500"
            r="99.5"
            fill="none"
            stroke="rgba(230, 223, 209, 0.08)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="246.2"
            fill="none"
            stroke="rgba(230, 223, 209, 0.08)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="448.7"
            fill="none"
            stroke="rgba(230, 223, 209, 0.08)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="495"
            fill="none"
            stroke="rgba(230, 223, 209, 0.06)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter Metadata */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#A39E92] mb-16 sm:mb-24">
          <span>01 / THE MANIFESTO</span>
          <span className="hidden sm:inline">ECONOMIC BROTHERHOOD</span>
        </div>

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Headline (Cols 1-6) */}
          <div className="lg:col-span-6">
            <h2
              aria-label="HONOR ARMED WITH LEVERAGE."
              className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-[#F4F0E8] leading-[0.92] tracking-[-0.01em]"
            >
              <span className="block pb-1">HONOR ARMED</span>
              <span className="block pt-1 text-[#E6DFD1]">
                WITH LEVERAGE<span className="text-[#B69A67]">.</span>
              </span>
            </h2>
          </div>

          {/* Right Column: Exact Excerpt & Discreet Link (Cols 7-12) */}
          <div className="lg:col-span-6 space-y-8 pt-2">
            <p className="font-display font-light text-2xl sm:text-3xl text-[#F4F0E8] leading-[1.35]">
              DeadLockCartel is an alliance of independent individuals, creators and traders, united around shared value, collective intelligence, mutual protection and a common economic treasury.
            </p>

            <p className="text-sm sm:text-base text-[#A39E92] leading-relaxed max-w-xl">
              Wall Street had its cartels. Now, the everyday people have theirs. &ldquo;Cartel&rdquo; is a metaphor for an economic alliance, nothing more.
            </p>

            <div className="pt-4 border-t border-[rgba(230,223,209,0.14)]">
              <button
                onClick={() => setRoute('/lore')}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-[#B69A67] hover:text-[#F4F0E8] transition-colors duration-200 cursor-pointer py-1"
              >
                <span>READ THE FULL MANIFESTO →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
