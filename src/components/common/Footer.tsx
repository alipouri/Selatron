import React from 'react';
import { useCartel } from '../../context/CartelContext';

export const Footer: React.FC = () => {
  const { setRoute } = useCartel();

  return (
    <footer className="bg-[#171717] border-t border-[rgba(230,223,209,0.14)] text-[#A39E92] text-xs py-16 px-5 sm:px-8 lg:px-14">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(230,223,209,0.14)]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3 font-display text-lg tracking-[0.22em] text-[#F4F0E8]">
              <img
                src="./deadlock-cartel-mark.svg"
                alt=""
                width={26}
                height={26}
                className="w-6.5 h-6.5 shrink-0"
              />
              <span>DEADLOCK CARTEL</span>
            </div>
            <p className="text-xs text-[#A39E92] max-w-sm leading-relaxed">
              An on-chain economic brotherhood on the Robinhood Chain. 3,333 memberships across four ranks.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-[11px] uppercase tracking-[0.2em]">
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setRoute('/lore')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  The Lore
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/hierarchy')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  Hierarchy
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/collection')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  Collection
                </button>
              </li>
            </ul>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setRoute('/vault')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  The Vault
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  Utilities
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/community')} className="hover:text-[#F4F0E8] transition-colors cursor-pointer">
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Explicit Status Column */}
          <div className="md:col-span-3 space-y-2 text-[11px] uppercase tracking-[0.18em]">
            <div className="text-[#F4F0E8]">SYSTEM STATUS</div>
            <div className="text-[#B69A67]">AWAITING CONFIGURATION</div>
            <div className="text-[#A39E92] normal-case tracking-normal">
              Contracts, multisig addresses, and legal disclosures pending publication.
            </div>
          </div>
        </div>

        {/* Disclosure Placeholder ("awaiting configuration") & Non-Negotiable Financial Integrity Notes */}
        <div className="space-y-4 text-[11px] leading-relaxed text-[#A39E92]">
          <div className="p-4 border border-[rgba(230,223,209,0.14)] bg-[#202020]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="uppercase tracking-[0.22em] text-[#F4F0E8]">
              LEGAL & REGULATORY DISCLOSURE
            </span>
            <span className="uppercase tracking-[0.22em] text-[#B69A67]">
              AWAITING CONFIGURATION
            </span>
          </div>
          <p>
            Disclosure placeholder (awaiting configuration). Tokenized assets referenced in the project architecture are not direct legal ownership of underlying shares. Snapshot votes are off-chain governance signals and do not trigger automatic treasury execution. &ldquo;Cartel&rdquo; is a metaphor for an economic alliance, nothing more.
          </p>
        </div>
      </div>
    </footer>
  );
};
