import React from 'react';
import { useCartel } from '../../context/CartelContext';
import { ArtworkVisual } from './ArtworkVisual';
import { CARTEL_TIERS } from '../../utils/cartelLogic';
import { X, ShieldCheck, Flame, ExternalLink } from 'lucide-react';

export const NFTDetailModal: React.FC = () => {
  const { selectedNftDetail, setSelectedNftDetail, setRoute } = useCartel();

  if (!selectedNftDetail) return null;

  const tier = CARTEL_TIERS[selectedNftDetail.tier];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nft-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#1a1a1a] border border-[#2d2d2d] rounded-sm overflow-hidden shadow-2xl text-[#E6DFD1]">
        <button
          onClick={() => setSelectedNftDetail(null)}
          className="absolute top-4 right-4 z-10 text-[#A39E92] hover:text-[#F4F0E8] transition-colors p-1 cursor-pointer bg-[#141414]/60 rounded-full"
          aria-label="Close NFT view"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Column */}
          <div className="bg-[#141414] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#262626]">
            <div className="w-full max-w-xs shadow-xl">
              <ArtworkVisual type={selectedNftDetail.tier} title={selectedNftDetail.name} aspect="3:4" />
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B69A67]">
                <span>{tier.code}</span>
                <span>·</span>
                <span>ID #{selectedNftDetail.tokenId}</span>
              </div>

              <h2 id="nft-modal-title" className="text-xl font-display font-bold text-[#F4F0E8]">
                {selectedNftDetail.name}
              </h2>

              <p className="text-xs text-[#A39E92] leading-relaxed">
                {tier.description}
              </p>

              {/* Trait Matrix */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A39E92] block mb-2">
                  Character Attributes & Signatures
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedNftDetail.traits.suit && (
                    <div className="p-2.5 bg-[#141414] border border-[#242424] rounded-sm">
                      <span className="text-[10px] text-[#A39E92] block uppercase">Tailoring</span>
                      <span className="text-[#E6DFD1] font-medium text-[11px]">{selectedNftDetail.traits.suit}</span>
                    </div>
                  )}
                  {selectedNftDetail.traits.coat && (
                    <div className="p-2.5 bg-[#141414] border border-[#242424] rounded-sm">
                      <span className="text-[10px] text-[#A39E92] block uppercase">Overcoat</span>
                      <span className="text-[#E6DFD1] font-medium text-[11px]">{selectedNftDetail.traits.coat}</span>
                    </div>
                  )}
                  {selectedNftDetail.traits.jewelry && (
                    <div className="p-2.5 bg-[#141414] border border-[#242424] rounded-sm">
                      <span className="text-[10px] text-[#A39E92] block uppercase">Insignia Jewelry</span>
                      <span className="text-[#E6DFD1] font-medium text-[11px]">{selectedNftDetail.traits.jewelry}</span>
                    </div>
                  )}
                  {selectedNftDetail.traits.accessory && (
                    <div className="p-2.5 bg-[#141414] border border-[#242424] rounded-sm">
                      <span className="text-[10px] text-[#A39E92] block uppercase">Artifact</span>
                      <span className="text-[#E6DFD1] font-medium text-[11px]">{selectedNftDetail.traits.accessory}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Governance & Staking Power */}
              <div className="p-3 bg-[#141414] border border-[#282828] rounded-sm space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#A39E92]">Voting Weight</span>
                  <span className="font-mono font-bold text-[#B69A67]">{tier.votingPower}x Multiplier</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#A39E92]">Collection Share</span>
                  <span className="font-mono text-[#E6DFD1]">{tier.supplyPercentage}% ({tier.supply} Total)</span>
                </div>
                {tier.revealReward && (
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-[#202020]">
                    <span className="text-[#A39E92]">Reveal Bounty</span>
                    <span className="text-[11px] text-[#B69A67] font-medium">{tier.revealReward}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#242424] flex items-center gap-3">
              {selectedNftDetail.tier === 'rookie' ? (
                <button
                  onClick={() => {
                    setSelectedNftDetail(null);
                    setRoute('/utilities/ascension');
                  }}
                  className="flex-1 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Flame size={14} />
                  <span>Ascend This Rookie (3-for-1)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedNftDetail(null);
                    setRoute('/utilities/trading-desk');
                  }}
                  className="flex-1 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck size={14} />
                  <span>Vote on Trading Desk</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
