import React, { useState } from 'react';
import { useCartel } from '../../context/CartelContext';
import { CARTEL_TIERS } from '../../utils/cartelLogic';
import { TierId } from '../../types/cartel';
import { ArtworkVisual } from '../common/ArtworkVisual';
import { ArrowUpRight, ShieldCheck, Flame, Scale, Users } from 'lucide-react';

export const HierarchySection: React.FC = () => {
  const { setRoute, setSelectedNftDetail } = useCartel();
  const [activeTierId, setActiveTierId] = useState<TierId>('kingpin');

  const tierKeys: TierId[] = ['kingpin', 'godmother', 'member', 'rookie'];

  return (
    <section id="chain-of-command" className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-[#222222]">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#B69A67] mb-6">
        <span>02</span>
        <span>/</span>
        <span>THE CHAIN OF COMMAND</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F4F0E8] leading-tight text-balance">
            3,333 PROTECTORS. FOUR LEVELS. ONE ALLIANCE.
          </h2>
          <p className="text-sm sm:text-base text-[#77736B]">
            Every member has a place, a role, and a path within the Cartel. Visually distinct characters belonging to one unified artistic universe.
          </p>
        </div>

        <button
          onClick={() => setRoute('/hierarchy')}
          className="text-xs font-semibold uppercase tracking-wider text-[#B69A67] hover:text-[#F4F0E8] transition-colors flex items-center gap-2 cursor-pointer pb-1 self-start md:self-end"
        >
          <span>Examine Detailed Hierarchy Protocol</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Four Major Tier Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tierKeys.map((tierKey) => {
          const tier = CARTEL_TIERS[tierKey];
          const isSelected = activeTierId === tierKey;

          return (
            <div
              key={tier.id}
              onMouseEnter={() => setActiveTierId(tier.id)}
              className={`group flex flex-col justify-between bg-[#191919] border transition-all duration-300 rounded-sm overflow-hidden p-4 ${
                isSelected
                  ? 'border-[#B69A67]/70 shadow-xl shadow-black/50'
                  : 'border-[#262626] hover:border-[#3a3a3a]'
              }`}
            >
              {/* Artwork Container */}
              <div className="relative mb-5 overflow-hidden">
                <ArtworkVisual type={tier.id} aspect="3:4" title={tier.name} />
                
                {/* Voting Power Tag */}
                <div className="absolute bottom-3 right-3 bg-[#171717]/90 backdrop-blur-sm border border-[#2d2d2d] px-2.5 py-1 text-[11px] font-mono text-[#F4F0E8]">
                  <span className="text-[#B69A67] font-bold">{tier.votingPower}x</span> Voting Power
                </div>
              </div>

              {/* Tier Information */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#77736B] mb-1">
                    <span>{tier.code}</span>
                    <span className="text-[#E6DFD1] font-semibold">{tier.supply} UNITS ({tier.supplyPercentage}%)</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors">
                    {tier.name}
                  </h3>

                  <p className="text-xs font-serif text-[#B69A67] italic mt-0.5">
                    {tier.role}
                  </p>

                  <p className="text-xs text-[#77736B] mt-2.5 leading-relaxed line-clamp-3">
                    {tier.description}
                  </p>
                </div>

                {/* Footnote / Action */}
                <div className="pt-4 border-t border-[#242424] flex items-center justify-between text-xs">
                  {tier.revealReward ? (
                    <span className="text-[11px] text-[#B69A67] font-mono">Instant Bounty Eligible</span>
                  ) : tier.id === 'member' ? (
                    <span className="text-[11px] text-[#8D7954] font-mono">1% Captain&apos;s Cut</span>
                  ) : (
                    <span className="text-[11px] text-[#77736B] font-mono">3-for-1 Ascension Burn</span>
                  )}

                  <button
                    onClick={() => setRoute('/hierarchy')}
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer"
                  >
                    Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Squad Mathematics Banner */}
      <div className="mt-12 p-6 bg-[#161616] border border-[#262626] rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <Users size={14} />
            <span>SQUAD PATRONAGE PROTOCOL</span>
          </div>
          <p className="text-xs text-[#77736B] max-w-2xl leading-relaxed">
            The operational backbone connects all tiers: <strong className="text-[#E6DFD1]">469 Members</strong> serve as Squad Captains supervising <strong className="text-[#E6DFD1]">2,662 Rookies</strong> (152 squads of 5 and 317 squads of 6). Captains receive a 1% cut on verified squad achievements.
          </p>
        </div>

        <button
          onClick={() => setRoute('/utilities/patronage')}
          className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E6DFD1] bg-[#222222] hover:bg-[#2a2a2a] border border-[#2e2e2e] rounded-sm whitespace-nowrap cursor-pointer transition-colors"
        >
          View Squad Structure
        </button>
      </div>
    </section>
  );
};
