import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';
import { TierId } from '../../types/cartel';
import { PhyllotaxisFigure, HoveredPointInfo } from '../common/PhyllotaxisFigure';
import { Plus, Minus } from 'lucide-react';

interface CollectionTierRow {
  id: TierId;
  supply: string;
  name: string;
  votingPower: string;
  dotColor: string;
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
    dotColor: '#CDB27D',
    archetype: 'Apex Architects',
    details: 'Strategic leaders, special bounty rewards.',
    ringNote: 'Indices 0–32 · Innermost Ring (r = √(33/3333))'
  },
  {
    id: 'godmother',
    supply: '169',
    name: 'Godmothers',
    votingPower: '15x',
    dotColor: '#B69A67',
    archetype: 'Matriarchs of Stock Endowment',
    details: 'Treasury and community welfare role, 100% mint rebate per brief.',
    ringNote: 'Indices 33–201 · Second Ring (r = √(202/3333))'
  },
  {
    id: 'member',
    supply: '469',
    name: 'Members',
    votingPower: '5x',
    dotColor: '#E6DFD1',
    archetype: 'Sworn Squad Captains',
    details: 'Each supervises ~5–6 Rookies.',
    ringNote: 'Indices 202–670 · Third Ring (r = √(671/3333))'
  },
  {
    id: 'rookie',
    supply: '2,662',
    name: 'Rookies',
    votingPower: '1x',
    dotColor: '#8E897D',
    archetype: 'Street Vanguard',
    details: 'Community foundation, path to Member via Ascension.',
    ringNote: 'Indices 671–3332 · Outer Ring (r = 1.0)'
  }
];

export const CollectionSection: React.FC = () => {
  const { setRoute, setSelectedNftDetail } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const [expandedTier, setExpandedTier] = useState<TierId | null>('kingpin');
  const [hoveredTier, setHoveredTier] = useState<TierId | null>(null);

  const easeEditorial: [number, number, number, number] = [0.2, 0.7, 0.1, 1];
  const highlightedTier = hoveredTier ?? expandedTier;

  const handleRowToggle = (tierId: TierId) => {
    setExpandedTier((prev) => (prev === tierId ? null : tierId));
  };

  const handleTierSelectFromCircle = (tierId: TierId) => {
    setExpandedTier(tierId);
  };

  const handlePointSelect = (point: HoveredPointInfo) => {
    setExpandedTier(point.tier);
    setSelectedNftDetail({
      tokenId: point.tokenId,
      tier: point.tier,
      name: `${point.tierLabel} Placeholder #${String(point.tokenId).padStart(4, '0')}`,
      status: 'SEALED',
      traits: {
        suit: 'Official Artwork Placeholder — Unpublished',
        squadRole:
          point.tier === 'kingpin'
            ? 'Apex Architect (50x)'
            : point.tier === 'godmother'
            ? 'Matriarch of Stock Endowment (15x)'
            : point.tier === 'member'
            ? 'Sworn Squad Captain (5x)'
            : 'Street Vanguard (1x)'
      },
      revealBountyEligible: point.tier === 'kingpin' || point.tier === 'godmother'
    });
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
              3,333. ONE
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
        {/* Left: Four Ruled Rows with Smooth Expandable Details (Cols 1-6) */}
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
                      className={`w-16 sm:w-20 font-display font-light text-2xl sm:text-4xl tabular-nums transition-colors duration-300 ${
                        isHighlighted ? 'text-[#B69A67]' : 'text-[#F4F0E8]'
                      }`}
                    >
                      {tier.supply}
                    </span>
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                          isHighlighted ? 'scale-125 ring-2 ring-[#B69A67]/50' : 'opacity-70'
                        }`}
                        style={{ backgroundColor: tier.dotColor }}
                      />
                      <span
                        className={`font-display font-light text-2xl sm:text-4xl tracking-[0.01em] transition-colors duration-300 ${
                          isHighlighted ? 'text-[#F4F0E8]' : 'text-[#E6DFD1] group-hover:text-[#F4F0E8]'
                        }`}
                      >
                        {tier.name}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-5 shrink-0">
                    <span className="font-display font-light text-2xl sm:text-3xl tabular-nums text-[#B69A67]">
                      {tier.votingPower}
                    </span>
                    <span className="text-[#A39E92] group-hover:text-[#F4F0E8] transition-colors">
                      {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeEditorial }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-21 sm:pl-28 pr-4 space-y-2">
                        <div className="font-display italic text-xl text-[#F4F0E8]">
                          {tier.archetype}
                        </div>
                        <p className="text-sm text-[#A39E92] leading-relaxed">
                          {tier.details}
                        </p>
                        <div className="pt-1 text-[11px] uppercase tracking-[0.18em] text-[#B69A67]">
                          {tier.ringNote}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Honest Placeholder Notice & Clear Highlight Control */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-[#A39E92]">
            <span>TAP ANY ALLIANCE TIER OR RING TO SELECT</span>
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

        {/* Right: Interactive Phyllotaxis Figure with Tier Ring Selection (Cols 7-12) */}
        <motion.div
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 1.0, ease: easeEditorial }
            }
          }}
          className="lg:col-span-6 relative bg-[#171717] border border-[rgba(230,223,209,0.14)] p-4 sm:p-6"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#A39E92] pb-3 border-b border-[rgba(230,223,209,0.14)]">
            <span>PHYLLOTAXIS ARCHIVE · N = 3,333</span>
            <span className="text-[#B69A67]">
              {highlightedTier ? `SELECTED RING: ${highlightedTier.toUpperCase()}` : 'ALL 4 RINGS ACTIVE'}
            </span>
          </div>

          {/* Interactive Ring Selector Pills above the Circle */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
            {COLLECTION_TIERS.map((tier) => {
              const isSelected = highlightedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleRowToggle(tier.id)}
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#B69A67] bg-[#B69A67]/15 text-[#F4F0E8]'
                      : 'border-[rgba(230,223,209,0.14)] text-[#A39E92] hover:text-[#F4F0E8]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: tier.dotColor }}
                  />
                  <span>{tier.name}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full aspect-square max-w-[520px] mx-auto my-2">
            <PhyllotaxisFigure
              highlightedTier={highlightedTier}
              interactivePoints={true}
              onTierSelect={handleTierSelectFromCircle}
              onPointSelect={handlePointSelect}
              ariaLabel="The same circle of 3,333 points. Selecting a tier or tapping a ring highlights its share of the alliance."
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
