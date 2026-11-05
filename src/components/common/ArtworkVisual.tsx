import React from 'react';
import { TierId } from '../../types/cartel';

interface ArtworkVisualProps {
  type: TierId | 'hero_monolith' | 'manifesto_portrait' | 'vault_sanctum';
  aspect?: '16:9' | '3:4' | '1:1' | '4:5';
  title?: string;
  subtitle?: string;
  className?: string;
  minimal?: boolean;
}

const TIER_SPEC: Record<
  string,
  {
    code: string;
    rank: string;
    ringRadius: number;
    accentColor: string;
  }
> = {
  kingpin: {
    code: 'TIER 01 · 33 SUPPLY',
    rank: 'KINGPIN · 50X',
    ringRadius: 16,
    accentColor: '#B69A67'
  },
  godmother: {
    code: 'TIER 02 · 169 SUPPLY',
    rank: 'GODMOTHER · 15X',
    ringRadius: 28,
    accentColor: '#8D7954'
  },
  member: {
    code: 'TIER 03 · 469 SUPPLY',
    rank: 'MEMBER · 5X',
    ringRadius: 42,
    accentColor: '#E6DFD1'
  },
  rookie: {
    code: 'TIER 04 · 2,662 SUPPLY',
    rank: 'ROOKIE · 1X',
    ringRadius: 58,
    accentColor: '#A39E92'
  },
  hero_monolith: {
    code: 'COLLECTION · 3,333',
    rank: 'ONE ALLIANCE',
    ringRadius: 48,
    accentColor: '#B69A67'
  },
  manifesto_portrait: {
    code: 'MANIFESTO',
    rank: 'HONOR ARMED WITH LEVERAGE',
    ringRadius: 48,
    accentColor: '#B69A67'
  },
  vault_sanctum: {
    code: 'STOCK ENDOWMENT',
    rank: 'AWAITING CONFIGURATION',
    ringRadius: 48,
    accentColor: '#8D7954'
  }
};

export const ArtworkVisual: React.FC<ArtworkVisualProps> = ({
  type,
  aspect = '3:4',
  title,
  subtitle,
  className = '',
  minimal = false
}) => {
  const aspectClass =
    aspect === '16:9'
      ? 'aspect-video'
      : aspect === '3:4'
      ? 'aspect-[3/4]'
      : aspect === '4:5'
      ? 'aspect-[4/5]'
      : 'aspect-square';

  const spec = TIER_SPEC[type] || TIER_SPEC.rookie;

  return (
    <figure
      className={`relative overflow-hidden bg-[#171717] border border-[rgba(230,223,209,0.14)] select-none flex flex-col justify-between p-5 ${aspectClass} ${className}`}
    >
      {/* Top Hairline Metadata */}
      <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#A39E92]">
        <span>{spec.code}</span>
        <span>PLACEHOLDER</span>
      </div>

      {/* Central Geometric Concentric Ring Diagram */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        <svg
          viewBox="0 0 160 160"
          className="w-28 h-28 sm:w-32 sm:h-32 overflow-visible"
          aria-hidden="true"
        >
          <circle
            cx="80"
            cy="80"
            r="64"
            fill="none"
            stroke="rgba(230, 223, 209, 0.14)"
            strokeWidth="0.75"
          />
          <circle
            cx="80"
            cy="80"
            r="44"
            fill="none"
            stroke="rgba(230, 223, 209, 0.14)"
            strokeWidth="0.75"
          />
          <circle
            cx="80"
            cy="80"
            r="28"
            fill="none"
            stroke="rgba(230, 223, 209, 0.14)"
            strokeWidth="0.75"
          />
          <circle
            cx="80"
            cy="80"
            r={spec.ringRadius}
            fill="none"
            stroke={spec.accentColor}
            strokeWidth="1.25"
          />
          <line
            x1="80"
            y1="10"
            x2="80"
            y2="150"
            stroke="rgba(230, 223, 209, 0.08)"
            strokeWidth="0.75"
          />
          <line
            x1="10"
            y1="80"
            x2="150"
            y2="80"
            stroke="rgba(230, 223, 209, 0.08)"
            strokeWidth="0.75"
          />
          <circle cx="80" cy="80" r="2.5" fill={spec.accentColor} />
        </svg>
      </div>

      {/* Bottom Honest Placeholder Disclosure */}
      <figcaption className="relative z-10 border-t border-[rgba(230,223,209,0.14)] pt-3 space-y-1">
        {!minimal && title && (
          <div className="font-display text-base text-[#F4F0E8] tracking-wide truncate">
            {title}
          </div>
        )}
        <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.2em] text-[#A39E92]">
          <span>{subtitle || spec.rank}</span>
          <span>ARTWORK UNPUBLISHED</span>
        </div>
      </figcaption>
    </figure>
  );
};
