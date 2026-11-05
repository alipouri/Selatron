import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';
import { TierId } from '../../types/cartel';
import { PhyllotaxisFigure } from '../common/PhyllotaxisFigure';
import { Plus, Minus } from 'lucide-react';

interface CollectionTierRow {
  id: TierId;
  supply: string;
  name: string;
  votingPower: string;
  archetype: string;
  details: string;
  ringNote: string;
}

const COLLECTION_TIERS: CollectionTierRow[] = [
  {
    id: 'kingpin',
    supply: '33',
    name: 'Kingpins',
    votingPower: '50x',
    archetype: 'Apex Architects',
    details: 'Strategic leaders, special bounty rewards.',
    ringNote: 'Indices 0–32 · Innermost Ring (r = √(33/3333))'
  },
  {
    id: 'godmother',
    supply: '169',
    name: 'Godmothers',
    votingPower: '15x',
    archetype: 'Matriarchs of Stock Endowment',
    details: 'Treasury and community welfare role, 100% mint rebate per brief.',
    ringNote: 'Indices 33–201 · Second Ring (r = √(202/3333))'
  },
  {
    id: 'member',
    supply: '469',
    name: 'Members',
    votingPower: '5x',
    archetype: 'Sworn Squad Captains',
    details: 'Each supervises ~5–6 Rookies.',
    ringNote: 'Indices 202–670 · Third Ring (r = √(671/3333))'
  },
  {
    id: 'rookie',
    supply: '2,662',
    name: 'Rookies',
    votingPower: '1x',
    archetype: 'Street Vanguard',
    details: 'Community foundation, path to Member via Ascension.',
    ringNote: 'Indices 671–3332 · Outer Ring (r = 1.0)'
  }
];

export const CollectionSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const [expandedTier, setExpandedTier] = useState<TierId | null>('kingpin');
  const [hoveredTier, setHoveredTier] = useState<TierId | null>(null);

  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const highlightedTier = hoveredTier ?? expandedTier;

  const handleRowToggle = (tierId: TierId) => {
    setExpandedTier((prev) => (prev === tierId ? null : tierId));
  };

  return (
    <section
      id="collection"
      aria-label="Collection — 3,333. One Alliance."
      className="py-28 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-14 max-w-[1440px] mx-auto border-t border-[rgba(230,223,209,0.14)]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#A39E92] mb-14 sm:mb-20">
        <span>02 / THE COLLECTION</span>
        <span className="hidden sm:inline">OFFICIAL ARTWORK PLACEHOLDER · AWAITING PUBLICATION</span>
      </div>

      {/* Section Headline (Masked Line Reveal) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24">
        <motion.h2
          aria-label="3,333. ONE ALLIANCE."
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-[#F4F0E8] leading-[0.92] tracking-[-0.01em]"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span
              variants={{
                hidden: { y: '105%' },
                visible: { y: 0, transition: { duration: 0.85, ease: easeEditorial } }
              }}
              className="block"
            >
              3,333. ONE
            </motion.span>
          </span>
          <span className="block overflow-hidden pt-1">
            <motion.span
              variants={{
                hidden: { y: '105%' },
                visible: { y: 0, transition: { duration: 0.85, ease: easeEditorial } }
              }}
              className="block text-[#E6DFD1]"
            >
              ALLIANCE<span className="text-[#B69A67]">.</span>
            </motion.span>
          </span>
        </motion.h2>

        <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.24em]">
          <button
            onClick={() => setRoute('/hierarchy')}
            className="text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer py-1"
          >
            CHAIN OF COMMAND →
          </button>
          <button
            onClick={() => setRoute('/collection')}
            className="text-[#B69A67] hover:text-[#F4F0E8] transition-colors cursor-pointer py-1"
          >
            COLLECTION ARCHIVE →
          </button>
        </div>
      </div>

      {/* Two-Column Composition: Left = 4 Ruled Rows | Right = Interactive Phyllotaxis Figure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Four Ruled Rows with Expandable Details (Cols 1-6) */}
        <div className="lg:col-span-6 border-t border-[rgba(230,223,209,0.14)]">
          {COLLECTION_TIERS.map((tier) => {
            const isExpanded = expandedTier === tier.id;
            const isHighlighted = highlightedTier === tier.id;

            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className="border-b border-[rgba(230,223,209,0.14)] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleRowToggle(tier.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-6 sm:py-7 text-left flex items-baseline justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span
                      className={`w-14 sm:w-16 text-sm sm:text-base tabular-nums tracking-[0.14em] transition-colors ${
                        isHighlighted ? 'text-[#B69A67]' : 'text-[#A39E92]'
                      }`}
                    >
                      {tier.supply}
                    </span>
                    <span
                      className={`font-display font-light text-2xl sm:text-4xl tracking-[0.01em] transition-colors ${
                        isHighlighted ? 'text-[#F4F0E8]' : 'text-[#E6DFD1] group-hover:text-[#F4F0E8]'
                      }`}
                    >
                      {tier.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 shrink-0">
                    <span className="text-xs sm:text-sm tabular-nums uppercase tracking-[0.2em] text-[#B69A67]">
                      {tier.votingPower}
                    </span>
                    <span className="text-[#A39E92] group-hover:text-[#F4F0E8] transition-colors">
                      {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="pb-6 pl-19 sm:pl-24 pr-4 space-y-2">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#B69A67]">
                      {tier.archetype}
                    </div>
                    <p className="text-sm text-[#E6DFD1] leading-relaxed">
                      {tier.details}
                    </p>
                    <div className="pt-1 text-[11px] uppercase tracking-[0.18em] text-[#A39E92]">
                      {tier.ringNote}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Honest Placeholder Notice & Clear Highlight Control */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-[#A39E92]">
            <span>OFFICIAL NFT ARTWORK NOT AVAILABLE — PLACEHOLDER DIAGRAM</span>
            {expandedTier && (
              <button
                type="button"
                onClick={() => setExpandedTier(null)}
                className="text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer"
              >
                SHOW ALL 3,333
              </button>
            )}
          </div>
        </div>

        {/* Right: Clip-Path Revealed Phyllotaxis Figure with Tier Highlighting (Cols 7-12) */}
        <motion.div
          initial={shouldReduceMotion ? false : { clipPath: 'inset(12% 12% 12% 12%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: easeEditorial }}
          className="lg:col-span-6 relative bg-[#171717] border border-[rgba(230,223,209,0.14)] p-4 sm:p-6"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#A39E92] pb-3 border-b border-[rgba(230,223,209,0.14)]">
            <span>PHYLLOTAXIS ARCHIVE · N = 3,333</span>
            <span className="text-[#B69A67]">
              {highlightedTier ? `HIGHLIGHT: ${highlightedTier.toUpperCase()}` : 'ALL TIERS ACTIVE'}
            </span>
          </div>

          <div className="w-full aspect-square max-w-[520px] mx-auto my-2">
            <PhyllotaxisFigure
              highlightedTier={highlightedTier}
              ariaLabel="Interactive 3,333-point phyllotaxis collection diagram. Selecting or hovering a rank row highlights its corresponding ring and points while dimming other tiers to 14% opacity."
            />
          </div>

          <div className="pt-3 border-t border-[rgba(230,223,209,0.14)] flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#A39E92] tabular-nums">
            <span>RINGS: √(33/3333) · √(202/3333) · √(671/3333) · 1</span>
            <span>ARTWORK: PLACEHOLDER</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
