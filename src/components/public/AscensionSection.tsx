import React from 'react';
import { useCartel } from '../../context/CartelContext';
import { ArtworkVisual } from '../common/ArtworkVisual';
import { Flame, ArrowRight, ShieldCheck, Sparkles, TrendingDown } from 'lucide-react';

export const AscensionSection: React.FC = () => {
  const { setRoute, currentSupply, completedAscensions } = useCartel();

  return (
    <section id="ascension" className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-[#222222]">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#B69A67] mb-6">
        <span>06</span>
        <span>/</span>
        <span>THE ASCENSION PROTOCOL</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F4F0E8] leading-tight text-balance">
            THREE ROOKIES. ONE ASCENDED MEMBER.
          </h2>
          <p className="text-sm sm:text-base text-[#77736B]">
            Three Rookie NFTs can be burned to ascend into the Member rank, reducing the total collection supply by two NFTs per completed ascension.
          </p>
        </div>

        <button
          onClick={() => setRoute('/utilities/ascension')}
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer flex items-center gap-2 self-start md:self-end shadow-sm"
        >
          <Flame size={14} />
          <span>Discover Ascension</span>
        </button>
      </div>

      {/* Visual Transformation Sequence: 3 Rookies Converging into 1 Member */}
      <div className="bg-[#181818] border border-[#272727] rounded-sm p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3 Rookie Slots */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#77736B]">
              <span className="text-[#B69A67] uppercase font-bold">Input: 3 Rookie Archetypes</span>
              <span>1x Voting Power Each</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((slot) => (
                <div
                  key={slot}
                  className="bg-[#141414] border border-[#262626] rounded-sm p-2 flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-xs">
                    <ArtworkVisual type="rookie" aspect="3:4" title={`Rookie Ingot #${slot}`} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#77736B] block">SLOT 0{slot}</span>
                    <span className="text-xs font-semibold text-[#E6DFD1]">Rookie NFT</span>
                    <span className="text-[9px] text-[#562C32] font-mono uppercase block">Sacrificial Burn</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Forge Mechanism & Supply Reduction Indicator */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#201c18] border border-[#B69A67]/50 flex items-center justify-center text-[#B69A67] shadow-lg">
              <Flame size={22} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-[#F4F0E8] block">THE FORGE</span>
              <span className="text-[10px] font-mono text-[#B69A67] block">NET SUPPLY: -2</span>
            </div>
            <ArrowRight size={18} className="text-[#77736B] hidden lg:block" />
          </div>

          {/* Right: 1 Member Destination Slot */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#77736B]">
              <span className="text-[#B69A67] uppercase font-bold">Output: 1 Ascended Member</span>
              <span className="text-[#8D7954]">5x Voting Power</span>
            </div>

            <div className="bg-[#1a1714] border border-[#8D7954]/60 rounded-sm p-4 flex flex-col items-center text-center space-y-3 shadow-xl">
              <div className="w-40 aspect-[3/4] overflow-hidden rounded-xs border border-[#8D7954]/40">
                <ArtworkVisual type="member" aspect="3:4" title="Forged Squad Captain" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-display font-bold text-[#F4F0E8] block">
                  DeadLock Member (Squad Captain)
                </span>
                <p className="text-[11px] text-[#77736B]">
                  Entitled to 5x voting multiplier, squad leadership, and 1% Captain&apos;s Cut commission.
                </p>
              </div>

              <div className="pt-2 w-full flex items-center justify-between text-[10px] font-mono border-t border-[#2d251a] text-[#B69A67]">
                <span>CAPTAIN STATUS</span>
                <span>PERMANENT UPGRADE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Supply Metric Strip */}
        <div className="mt-8 pt-6 border-t border-[#242424] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#77736B]">
          <div className="flex items-center gap-2">
            <TrendingDown size={14} className="text-[#B69A67]" />
            <span>CURRENT CIRCULATING SUPPLY:</span>
            <span className="text-[#F4F0E8] font-bold text-sm tabular-nums">{currentSupply}</span>
            <span>/ 3,333</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Ascensions Completed: <strong className="text-[#E6DFD1] tabular-nums">{completedAscensions}</strong></span>
            <span>·</span>
            <span>Rookies Burned: <strong className="text-[#E6DFD1] tabular-nums">{completedAscensions * 3}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
