import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';
import { CARTEL_TIERS } from '../../utils/cartelLogic';
import { TierId, CartelNFT } from '../../types/cartel';
import { ArtworkVisual } from '../common/ArtworkVisual';

const CURATED_ARCHETYPES: Record<TierId, CartelNFT> = {
  kingpin: {
    tokenId: 14,
    tier: 'kingpin',
    name: 'Kingpin Archetype #14',
    status: 'REVEALED',
    traits: {
      suit: 'Bespoke Charcoal Double-Breasted Pinstripe',
      coat: 'Cashmere Heavy Overcoat',
      jewelry: 'Antique Gold Signet Ring',
      accessory: 'Apex Sovereign Seal'
    },
    revealBountyEligible: true
  },
  godmother: {
    tokenId: 72,
    tier: 'godmother',
    name: 'Godmother Archetype #72',
    status: 'REVEALED',
    traits: {
      suit: 'Sculpted Black Couture Wool',
      coat: 'Midnight Double-Faced Drape',
      jewelry: 'Geometric Gold Pendant',
      accessory: 'Endowment Key Shard'
    },
    revealBountyEligible: true
  },
  member: {
    tokenId: 295,
    tier: 'member',
    name: 'Member Archetype #295',
    status: 'REVEALED',
    traits: {
      suit: 'Tailored Charcoal Wool Trench',
      accessory: 'Brushed Bronze Lapel Insignia',
      squadRole: 'Sworn Squad Captain'
    }
  },
  rookie: {
    tokenId: 1204,
    tier: 'rookie',
    name: 'Rookie Archetype #1204',
    status: 'REVEALED',
    traits: {
      suit: 'Matte Technical Streetwear Jacket',
      coat: 'Tailored Fine-Knit Turtleneck',
      accessory: 'Vanguard Access Seal'
    }
  }
};

export const CollectionSection: React.FC = () => {
  const { setRoute, setSelectedNftDetail } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const [activeTier, setActiveTier] = useState<TierId | null>(null);
  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Staggered asymmetrical layout configuration (not 4 identical cards)
  const layoutItems: {
    tierId: TierId;
    colSpan: string;
    offsetClass: string;
    aspect: '3:4' | '4:5';
  }[] = [
    {
      tierId: 'kingpin',
      colSpan: 'lg:col-span-6',
      offsetClass: 'lg:pr-10',
      aspect: '4:5'
    },
    {
      tierId: 'godmother',
      colSpan: 'lg:col-span-6',
      offsetClass: 'lg:pl-10 lg:mt-28',
      aspect: '3:4'
    },
    {
      tierId: 'member',
      colSpan: 'lg:col-span-5',
      offsetClass: 'lg:pr-6 lg:-mt-12',
      aspect: '3:4'
    },
    {
      tierId: 'rookie',
      colSpan: 'lg:col-span-7',
      offsetClass: 'lg:pl-12 lg:mt-16',
      aspect: '4:5'
    }
  ];

  return (
    <section
      id="collection"
      className="py-32 md:py-48 px-6 md:px-14 max-w-[1440px] mx-auto border-t border-[#202020]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.28em] text-[#77736B] mb-12">
        <span>02 / THE CARTEL & HIERARCHY</span>
        <span className="hidden sm:inline text-[#8D7954]">FOUR RANKS · ONE VISUAL UNIVERSE</span>
      </div>

      {/* Section Headline & Minimal Introduction */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#F4F0E8] leading-[1.06] tracking-[0.02em]">
            3,333. ONE ALLIANCE.
          </h2>
          <p className="text-base text-[#77736B] font-light leading-relaxed max-w-xl">
            Four interconnected ranks united within one bespoke artistic universe. Select any portrait to inspect rank governance weight and character details.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-xs font-mono uppercase tracking-[0.22em]">
          <button
            onClick={() => setRoute('/hierarchy')}
            className="text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer"
          >
            CHAIN OF COMMAND →
          </button>
          <button
            onClick={() => setRoute('/collection')}
            className="text-[#B69A67] hover:text-[#F4F0E8] transition-colors cursor-pointer"
          >
            EXPLORE FULL ARCHIVE →
          </button>
        </div>
      </div>

      {/* Asymmetrical Editorial Portrait Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-y-24 gap-x-8 items-start">
        {layoutItems.map((item, idx) => {
          const tier = CARTEL_TIERS[item.tierId];
          const nft = CURATED_ARCHETYPES[item.tierId];
          const isFocused = activeTier === item.tierId;

          return (
            <motion.div
              key={tier.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: easeEditorial, delay: idx * 0.08 }}
              className={`${item.colSpan} ${item.offsetClass}`}
            >
              <div
                role="button"
                tabIndex={0}
                onMouseEnter={() => setActiveTier(tier.id)}
                onMouseLeave={() => setActiveTier(null)}
                onFocus={() => setActiveTier(tier.id)}
                onBlur={() => setActiveTier(null)}
                onClick={() => setSelectedNftDetail(nft)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNftDetail(nft);
                  }
                }}
                aria-label={`Inspect ${tier.name} — ${tier.supply} units, ${tier.votingPower}x voting power`}
                className="group block w-full text-left cursor-pointer focus:outline-none"
              >
                {/* Portrait Frame without heavy card box */}
                <div className="relative overflow-hidden bg-[#141414]">
                  <ArtworkVisual
                    type={tier.id}
                    aspect={item.aspect}
                    title={tier.name}
                    minimal
                  />

                  {/* Progressive Disclosure Overlay on Hover / Focus */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/45 to-transparent transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-8 ${
                      isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#B69A67] mb-2">
                      {tier.role}
                    </p>
                    <p className="text-sm text-[#E6DFD1]/90 font-light leading-relaxed max-w-md">
                      {tier.tagline}
                    </p>
                    <span className="mt-4 inline-block text-[11px] font-mono uppercase tracking-[0.22em] text-[#F4F0E8]">
                      INSPECT ARCHETYPE →
                    </span>
                  </div>
                </div>

                {/* Minimal Editorial Caption Strip */}
                <div className="pt-5 border-b border-[#202020] pb-4 flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[11px] font-mono tracking-[0.22em] text-[#8D7954] uppercase">
                      {tier.code}
                    </span>
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors">
                      {tier.name.toUpperCase()}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-3 text-xs font-mono tabular-nums text-[#77736B]">
                    <span className="text-[#E6DFD1]">{tier.supply.toLocaleString()}</span>
                    <span>·</span>
                    <span className="text-[#B69A67]">{tier.votingPower}x</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Curatorial Note */}
      <div className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono tracking-[0.2em] text-[#77736B] uppercase">
        <span>PREVIEW ARCHETYPES · VERIFIED ON-CHAIN METADATA AWAITING DELAYED REVEAL</span>
        <button
          onClick={() => setRoute('/collection')}
          className="text-[#E6DFD1] hover:text-[#B69A67] transition-colors cursor-pointer self-start sm:self-auto"
        >
          VIEW ALL COLLECTION SPECIFICATIONS →
        </button>
      </div>
    </section>
  );
};
