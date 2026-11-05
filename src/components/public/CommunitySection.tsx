import React from 'react';
import { useCartel } from '../../context/CartelContext';

export const CommunitySection: React.FC = () => {
  const { setRoute } = useCartel();

  return (
    <section
      id="community"
      aria-label="Community — The Cartel Takes Care of Its Own"
      className="py-28 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-[rgba(230,223,209,0.14)]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#A39E92] mb-14 sm:mb-20">
        <span>04 / THE ALLIANCE</span>
        <span className="hidden sm:inline">ROBINHOOD CHAIN</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        {/* Left: Section Headline (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-10">
          <h2
            aria-label="THE CARTEL TAKES CARE OF ITS OWN."
            className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-[#F4F0E8] leading-[0.92] tracking-[-0.01em]"
          >
            <span className="block pb-1">THE CARTEL TAKES</span>
            <span className="block pt-1 text-[#E6DFD1]">
              CARE OF ITS OWN<span className="text-[#B69A67]">.</span>
            </span>
          </h2>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setRoute('/member')}
              className="px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#8D7954] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              ENTER THE PORTAL
            </button>
          </div>
        </div>

        {/* Right: Structured Specifications (Website, Handle, Network, Ticker) (Cols 8-12) */}
        <div className="lg:col-span-5 border-t border-[rgba(230,223,209,0.14)]">
          <dl className="divide-y divide-[rgba(230,223,209,0.14)] border-b border-[rgba(230,223,209,0.14)] text-xs">
            <div className="py-4 flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.22em] text-[#A39E92]">WEBSITE</dt>
              <dd className="text-[#F4F0E8] tracking-[0.06em]">deadlockcartel.xyz</dd>
            </div>
            <div className="py-4 flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.22em] text-[#A39E92]">HANDLE</dt>
              <dd>
                <a
                  href="https://x.com/DeadLockCartel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B69A67] hover:text-[#F4F0E8] transition-colors tracking-[0.06em]"
                >
                  @DeadLockCartel
                </a>
              </dd>
            </div>
            <div className="py-4 flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.22em] text-[#A39E92]">NETWORK</dt>
              <dd className="text-[#F4F0E8] uppercase tracking-[0.14em]">Robinhood Chain</dd>
            </div>
            <div className="py-4 flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.22em] text-[#A39E92]">TICKER</dt>
              <dd className="text-[#B69A67] uppercase tracking-[0.18em]">DLC</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
