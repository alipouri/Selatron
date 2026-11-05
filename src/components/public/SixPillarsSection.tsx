import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel, AppRoute } from '../../context/CartelContext';

interface EcosystemPillar {
  num: string;
  title: string;
  summary: string;
  meta: string;
  route: AppRoute;
}

const ECOSYSTEM_INDEX: EcosystemPillar[] = [
  {
    num: '01',
    title: 'The DeadLock Stock Endowment',
    summary: 'Shared Safe multisig treasury designed around tokenized equities and ETH.',
    meta: '50% Secondary Royalties',
    route: '/utilities/stock-endowment'
  },
  {
    num: '02',
    title: 'Instant Reveal Bounties',
    summary: '33 Kingpin bounties and 169 Godmother 100% mint rebates sealed for reveal.',
    meta: '202 Special NFTs',
    route: '/utilities/bounties'
  },
  {
    num: '03',
    title: 'The 4-Tier Patronage Protocol',
    summary: '469 Members command squads of 5–6 Rookies with a 1% Captain’s Cut.',
    meta: 'Reciprocal Hierarchy',
    route: '/utilities/patronage'
  },
  {
    num: '04',
    title: 'Proof-of-Merit & Cartel Grants',
    summary: 'Weekly rewards and grants for research, market analysis, and tooling.',
    meta: 'The Merit Exchange',
    route: '/utilities/merit'
  },
  {
    num: '05',
    title: 'The On-Site Trading Desk',
    summary: 'Gasless Snapshot governance weighted by rank: 50x, 15x, 5x, and 1x.',
    meta: 'Off-Chain Consensus',
    route: '/utilities/trading-desk'
  },
  {
    num: '06',
    title: 'The 3-for-1 Ascension Burn',
    summary: 'Three Rookies burned to forge one Member, reducing supply by two NFTs.',
    meta: 'Deflationary Forge',
    route: '/utilities/ascension'
  }
];

export const SixPillarsSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="utilities"
      className="py-32 md:py-48 px-6 md:px-14 max-w-[1440px] mx-auto border-t border-[#202020]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.28em] text-[#77736B] mb-14">
        <span>03 / THE ECOSYSTEM</span>
        <span className="hidden sm:inline text-[#8D7954]">COLLECTIVE ECONOMIC POWER</span>
      </div>

      {/* Headline */}
      <div className="max-w-3xl space-y-5 mb-20">
        <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#F4F0E8] leading-[1.06] tracking-[0.02em]">
          MORE THAN OWNERSHIP.
        </h2>
        <p className="text-base sm:text-lg text-[#77736B] font-light leading-relaxed max-w-xl">
          Six interconnected mechanisms linking hierarchy, contribution, governance, and a shared treasury on the Robinhood Chain.
        </p>
      </div>

      {/* Asymmetrical Split: Left Atmospheric Vault Visual / Right Editorial Index */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
        {/* Left: Atmospheric Vault Sanctum Preview (Cols 1-5) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: easeEditorial }}
          className="lg:col-span-5 space-y-6"
        >
          <div
            onClick={() => setRoute('/vault')}
            className="group relative aspect-[4/5] overflow-hidden bg-[#141414] cursor-pointer"
          >
            <img
              src="/src/assets/images/vault_sanctum_editorial_1793866307485.jpg"
              alt="The DeadLock Stock Endowment Vault Sanctum"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#B69A67]">
                THE STOCK ENDOWMENT
              </div>
              <div className="font-display font-semibold text-2xl text-[#F4F0E8]">
                AWAITING VERIFIED TREASURY DATA
              </div>
              <div className="pt-2 border-t border-[#343434]/60 flex items-center justify-between text-[11px] font-mono text-[#77736B]">
                <span>NVDA · TSLA · AAPL · HOOD · SPY · ETH</span>
                <span className="text-[#E6DFD1] group-hover:text-[#B69A67] transition-colors">
                  THE VAULT →
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#77736B] leading-relaxed font-mono">
            Policy: 50% of secondary royalties directed to a transparent Safe multisig on Robinhood Chain.
          </p>
        </motion.div>

        {/* Right: Minimal Editorial Index of the 6 Pillars (Cols 6-12) */}
        <div className="lg:col-span-7 border-t border-[#202020]">
          {ECOSYSTEM_INDEX.map((pillar, idx) => (
            <motion.button
              key={pillar.num}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeEditorial, delay: idx * 0.06 }}
              onClick={() => setRoute(pillar.route)}
              className="group w-full text-left py-7 border-b border-[#202020] hover:border-[#8D7954]/60 transition-colors duration-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <div className="flex items-baseline gap-6 max-w-xl">
                <span className="text-xs font-mono text-[#8D7954] tabular-nums shrink-0">
                  {pillar.num}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#77736B] font-light leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pl-10 sm:pl-0 shrink-0 text-[11px] font-mono uppercase tracking-[0.2em] text-[#77736B] group-hover:text-[#E6DFD1] transition-colors">
                <span>{pillar.meta}</span>
                <span className="text-[#B69A67] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
