import React from 'react';
import { useCartel } from '../../context/CartelContext';
import { CartelInsignia } from './CartelInsignia';
import { Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRoute, setIsGtdModalOpen } = useCartel();

  return (
    <footer className="bg-[#121212] border-t border-[#242424] text-[#77736B] text-xs pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#202020]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <CartelInsignia size={26} />
              <span className="font-display font-bold text-base text-[#F4F0E8] tracking-wider">
                DEADLOCK CARTEL
              </span>
            </div>
            <p className="text-sm text-[#E6DFD1]/80 max-w-md leading-relaxed font-serif italic">
              &ldquo;Wall Street had its cartels. Now, the everyday people have theirs.&rdquo;
            </p>
            <p className="text-xs text-[#77736B] max-w-md leading-relaxed">
              An on-chain economic brotherhood of 3,333 Sworn Protectors on the Robinhood Chain.
              United by collective intelligence, a shared tokenized-stock treasury, and an unbreakable defensive alliance.
            </p>
            <div className="flex items-center gap-4 pt-2 text-[11px] font-mono tracking-wider text-[#B69A67]">
              <span>TICKER: $DLC</span>
              <span>·</span>
              <span>NETWORK: ROBINHOOD CHAIN (EVM)</span>
              <span>·</span>
              <span>SUPPLY: 3,333 DEFLATIONARY</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#B69A67]">Protocol</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setRoute('/lore')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  The Lore & Manifesto
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/hierarchy')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  The 4-Tier Hierarchy
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/collection')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  Collection Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/vault')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  The Stock Endowment
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  Six Utility Pillars
                </button>
              </li>
            </ul>
          </div>

          {/* Utility Sub-routes */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#B69A67]">Mechanics</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setRoute('/utilities/bounties')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  Instant Reveal Bounties
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities/patronage')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  Patronage & Squads
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities/merit')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  The Merit Exchange
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities/trading-desk')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  Trading Desk Governance
                </button>
              </li>
              <li>
                <button onClick={() => setRoute('/utilities/ascension')} className="hover:text-[#E6DFD1] transition-colors cursor-pointer">
                  3-for-1 Ascension Burn
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono tracking-widest uppercase text-[#B69A67]">Alliance & Governance</h4>
            <div className="space-y-2">
              <button
                onClick={() => setIsGtdModalOpen(true)}
                className="w-full text-left py-2 px-3 bg-[#1e1e1e] hover:bg-[#252525] border border-[#2d2d2d] hover:border-[#8D7954] text-xs text-[#E6DFD1] transition-all rounded-sm flex items-center justify-between cursor-pointer"
              >
                <span>Apply for GTD Clearance</span>
                <ExternalLink size={12} className="text-[#B69A67]" />
              </button>
              <div className="text-[11px] text-[#77736B] pt-2 space-y-1">
                <p>Official X: <span className="text-[#E6DFD1]">@DeadLockCartel</span></p>
                <p>Website: <span className="text-[#E6DFD1]">deadlockcartel.xyz</span></p>
                <p>Safe Multisig: <span className="font-mono text-[#B69A67]">Awaiting Contract Configuration</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Risk Transparency Notice (Prompt Requirement) */}
        <div className="pt-8 space-y-4 text-[11px] leading-relaxed text-[#77736B]/80">
          <p>
            <strong className="text-[#E6DFD1]/70 font-semibold uppercase tracking-wider">Regulatory & Transparency Disclosure:</strong> DeadLock Cartel represents a fictional narrative brotherhood and community digital collectible ecosystem. References to &ldquo;tokenized stock exposure&rdquo; or treasury assets describe proposed synthetic tracking or derivative smart-contract reserves and do not confer direct shareholder title, voting equity, or legal corporate ownership of underlying public securities. DeadLock Cartel does not guarantee investment returns or financial yields. Participation is governed by decentralized smart contracts on the Robinhood Chain.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#1a1a1a] text-[11px]">
            <p>&copy; 2026 DEADLOCK CARTEL. All rights reserved. On-chain sovereignty.</p>
            <div className="flex items-center gap-6">
              <span>50% Secondary Royalties to Treasury</span>
              <span>·</span>
              <span>Gasless Snapshot Governance</span>
              <span>·</span>
              <span>Safe Multisig Governance</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
