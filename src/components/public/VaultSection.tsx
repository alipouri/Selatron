import React from 'react';
import { useCartel } from '../../context/CartelContext';
import { TREASURY_INTENDED_ASSETS, CONTRACT_DISCLOSURE } from '../../utils/cartelLogic';
import { Landmark, ShieldAlert, Lock, ArrowUpRight, CheckCircle2, History } from 'lucide-react';

export const VaultSection: React.FC = () => {
  const { setRoute } = useCartel();

  return (
    <section id="vault" className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-[#222222]">
      {/* Chapter Indicator */}
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#B69A67] mb-6">
        <span>04</span>
        <span>/</span>
        <span>THE STOCK ENDOWMENT</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F4F0E8] leading-tight text-balance">
            WEALTH BUILT TOGETHER.
          </h2>
          <p className="text-sm sm:text-base text-[#77736B]">
            A permanent shared treasury designed around tokenized-stock exposure, digital assets, and community participation on the Robinhood Chain.
          </p>
        </div>

        <button
          onClick={() => setRoute('/vault')}
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer flex items-center gap-2 self-start md:self-end shadow-sm"
        >
          <Landmark size={14} />
          <span>Enter The Vault</span>
        </button>
      </div>

      {/* Dashboard Preview Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module 1: Treasury State & Multisig Architecture (Col 8) */}
        <div className="lg:col-span-8 bg-[#181818] border border-[#272727] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <div className="flex items-center gap-2.5">
                <Lock size={16} className="text-[#B69A67]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#F4F0E8]">
                  Safe Multisig Architecture
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8D7954] bg-[#22201d] px-2.5 py-1 border border-[#3d3423] rounded-sm">
                ROBINHOOD CHAIN
              </span>
            </div>

            {/* Treasury Balance Status (Honest Empty State as required by prompt) */}
            <div className="p-6 bg-[#141414] border border-[#242424] rounded-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#77736B]">
                  Total Treasury Net Asset Value
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#E6DFD1] flex items-center gap-3">
                  <span>AWAITING VERIFIED TREASURY DATA</span>
                </div>
                <p className="text-xs text-[#77736B]">
                  Smart contract deployment on Robinhood Chain pending official public reveal.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block text-[11px] font-mono text-[#B69A67] px-3 py-1.5 bg-[#201d17] border border-[#3a3222] rounded-sm">
                  0.00 USD (PRE-DEPLOYMENT)
                </span>
              </div>
            </div>

            {/* Intended Target Assets Matrix */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#B69A67] mb-3">
                Intended Portfolio Asset Exposure
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TREASURY_INTENDED_ASSETS.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="p-3 bg-[#141414] border border-[#242424] rounded-sm space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[#F4F0E8]">{asset.symbol}</span>
                      <span className="text-[10px] text-[#77736B] uppercase">{asset.type.replace('_', ' ')}</span>
                    </div>
                    <p className="text-[11px] text-[#77736B] truncate">{asset.name}</p>
                    <div className="text-[9px] font-mono text-[#8D7954] pt-1 border-t border-[#1e1e1e]">
                      AWAITING CONTRACT
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#222222] flex flex-wrap items-center justify-between gap-4 text-xs text-[#77736B]">
            <span>Funding Rule: 50% Secondary Royalties</span>
            <span>·</span>
            <span>Multisig Signers: Senior Apex Architects & Matriarchs</span>
          </div>
        </div>

        {/* Module 2: Funding Engine & Policy Parameters (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Policy Box */}
          <div className="bg-[#181818] border border-[#272727] rounded-sm p-6 space-y-4">
            <h3 className="text-sm font-display font-bold text-[#F4F0E8] tracking-wider uppercase">
              Funding Mechanisms
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm">
                <span className="text-[10px] font-mono text-[#B69A67] uppercase block mb-0.5">
                  Secondary Market Royalties
                </span>
                <span className="text-sm font-bold text-[#F4F0E8] block font-mono">50% Royalty Share</span>
                <p className="text-[11px] text-[#77736B] mt-1">
                  Automated routing to Safe multisig contract to acquire tokenized assets.
                </p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm">
                <span className="text-[10px] font-mono text-[#B69A67] uppercase block mb-0.5">
                  Mint Proceeds Inflow
                </span>
                <span className="text-sm font-bold text-[#F4F0E8] block font-mono">A Portion of Mint Inflows</span>
                <p className="text-[11px] text-[#77736B] mt-1">
                  Baseline capital base seeded at initial mint completion.
                </p>
              </div>

              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm">
                <span className="text-[10px] font-mono text-[#B69A67] uppercase block mb-0.5">
                  Endowment Preservation
                </span>
                <span className="text-sm font-bold text-[#F4F0E8] block font-mono">Principal Preservation</span>
                <p className="text-[11px] text-[#77736B] mt-1">
                  Underlying tokenized assets are preserved; only dividend yields & rewards circulate.
                </p>
              </div>
            </div>
          </div>

          {/* Honest Audit Status */}
          <div className="p-4 bg-[#1b1916] border border-[#3b311f] rounded-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#B69A67] font-mono text-[11px]">
              <ShieldAlert size={14} />
              <span>ON-CHAIN VERIFICATION STATUS</span>
            </div>
            <p className="text-[#E6DFD1]/80 text-[11px] leading-relaxed">
              Safe contract deployment, multisig key rotation, and Robinhood Chain oracle feeds are currently undergoing testnet validation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
