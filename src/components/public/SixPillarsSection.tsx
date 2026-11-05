import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel, AppRoute } from '../../context/CartelContext';

interface EcosystemPillar {
  num: string;
  title: string;
  summary: string;
  route: AppRoute;
}

const ECOSYSTEM_PILLARS: EcosystemPillar[] = [
  {
    num: '01',
    title: 'Deadlock Stock Endowment',
    summary: 'Shared treasury policy allocating 50% of secondary royalties to tokenized equities and digital assets.',
    route: '/utilities/stock-endowment'
  },
  {
    num: '02',
    title: 'Instant Reveal Bounties',
    summary: '33 Kingpin bounties + 169 Godmother rebates (100% mint rebate per brief).',
    route: '/utilities/bounties'
  },
  {
    num: '03',
    title: '4-Tier Patronage Protocol',
    summary: '469 Sworn Squad Captains each supervise ~5–6 Rookies with a 1% Captain’s Cut.',
    route: '/utilities/patronage'
  },
  {
    num: '04',
    title: 'Proof-of-Merit & Cartel Grants',
    summary: 'Merit-based grants and allocations for verified market research, analysis, and tooling.',
    route: '/utilities/merit'
  },
  {
    num: '05',
    title: 'On-Site Trading Desk',
    summary: 'Weighted governance proposals (50x / 15x / 5x / 1x). Snapshot votes do not trigger automatic execution.',
    route: '/utilities/trading-desk'
  },
  {
    num: '06',
    title: '3-for-1 Ascension Burn',
    summary: 'Three Rookies converge into one Member rank; each ascension reduces supply by two.',
    route: '/utilities/ascension'
  }
];

export const SixPillarsSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const easeEditorial: [number, number, number, number] = [0.2, 0.7, 0.1, 1];

  return (
    <section
      id="utilities"
      aria-label="Ecosystem — More Than Ownership"
      className="py-28 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-[rgba(230,223,209,0.14)]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#A39E92] mb-14 sm:mb-20">
        <span>03 / THE ECOSYSTEM</span>
        <span className="hidden sm:inline">SIX UTILITY PILLARS</span>
      </div>

      {/* Section Headline (Masked Line Reveal) */}
      <div className="mb-16 sm:mb-24">
        <motion.h2
          aria-label="MORE THAN OWNERSHIP."
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-[#F4F0E8] leading-[0.92] tracking-[-0.01em]"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span
              variants={{
                hidden: { y: '108%' },
                visible: { y: 0, transition: { duration: 1.15, ease: easeEditorial } }
              }}
              className="block"
            >
              MORE THAN
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-1">
            <motion.span
              variants={{
                hidden: { y: '108%' },
                visible: { y: 0, transition: { duration: 1.15, ease: easeEditorial } }
              }}
              className="block text-[#E6DFD1]"
            >
              OWNERSHIP<span className="text-[#B69A67]">.</span>
            </motion.span>
          </span>
        </motion.h2>
      </div>

      {/* Asymmetrical Split: Left = 6 Ruled List Items | Right = Restrained Vault Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Six Utilities as a Ruled List (Cols 1-7) */}
        <div className="lg:col-span-7 border-t border-[rgba(230,223,209,0.14)]">
          {ECOSYSTEM_PILLARS.map((pillar, idx) => (
            <motion.button
              key={pillar.num}
              type="button"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, ease: easeEditorial, delay: idx * 0.06 }}
              onClick={() => setRoute(pillar.route)}
              className="group w-full text-left py-6 sm:py-7 border-b border-[rgba(230,223,209,0.14)] hover:border-[#B69A67] transition-colors duration-300 flex items-baseline justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-baseline gap-5 sm:gap-8 max-w-xl">
                <span className="text-xs tabular-nums uppercase tracking-[0.2em] text-[#A39E92] shrink-0">
                  {pillar.num}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#A39E92] leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              </div>

              <span className="text-xs uppercase tracking-[0.22em] text-[#B69A67] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </motion.button>
          ))}
        </div>

        {/* Right: Restrained Vault Panel (Cols 8-12) */}
        <motion.aside
          aria-label="The Vault Status Panel"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: easeEditorial }}
          className="lg:col-span-5 bg-[#202020]/80 border border-[rgba(230,223,209,0.14)] p-7 sm:p-10 space-y-8"
        >
          <div className="flex items-center justify-between pb-5 border-b border-[rgba(230,223,209,0.14)]">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#F4F0E8]">
              THE VAULT
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 border border-[#8D7954] text-[#B69A67]">
              AWAITING CONFIGURATION
            </span>
          </div>

          <div className="space-y-2">
            <div className="font-display font-light text-3xl sm:text-4xl text-[#F4F0E8]">
              AWAITING CONFIGURATION
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A39E92]">
              TREASURY CONTRACT & MULTISIG NOT YET DEPLOYED
            </p>
          </div>

          <dl className="divide-y divide-[rgba(230,223,209,0.14)] border-y border-[rgba(230,223,209,0.14)] text-xs tabular-nums">
            <div className="py-3.5 flex items-center justify-between">
              <dt className="uppercase tracking-[0.2em] text-[#A39E92]">TREASURY BALANCE</dt>
              <dd className="font-display text-2xl text-[#A39E92]">—</dd>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <dt className="uppercase tracking-[0.2em] text-[#A39E92]">SAFE MULTISIG ADDRESS</dt>
              <dd className="font-display text-2xl text-[#A39E92]">—</dd>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <dt className="uppercase tracking-[0.2em] text-[#A39E92]">TOKENIZED EQUITIES</dt>
              <dd className="font-display text-2xl text-[#A39E92]">—</dd>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <dt className="uppercase tracking-[0.2em] text-[#A39E92]">LAST VERIFIED SNAPSHOT</dt>
              <dd className="font-display text-2xl text-[#A39E92]">—</dd>
            </div>
          </dl>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setRoute('/vault')}
              className="text-[11px] uppercase tracking-[0.24em] text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer"
            >
              INSPECT VAULT ARCHITECTURE →
            </button>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};
