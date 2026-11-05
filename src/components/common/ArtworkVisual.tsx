import React, { useState } from 'react';
import { TierId } from '../../types/cartel';

export type VisualAssetType = 'headquarters' | 'monolith' | 'alliance' | 'vault' | TierId;

interface ArtworkVisualProps {
  type: VisualAssetType;
  title?: string;
  className?: string;
  aspect?: '16:9' | '3:4' | '1:1' | '4:5';
  showCaption?: boolean;
  minimal?: boolean;
}

const ASSET_MAP: Record<
  VisualAssetType,
  {
    src: string;
    code: string;
    caption: string;
    alt: string;
  }
> = {
  monolith: {
    src: '/src/assets/images/hero_deadlock_monolith_1793866256884.jpg',
    code: 'FIG. 01 — THE DEADLOCK MONOLITH',
    caption: 'Carved Obsidian & Brushed Bronze · Precision Interlocking Seal',
    alt: 'Sculptural obsidian and bronze monolith bearing the DeadLock Cartel geometric emblem'
  },
  headquarters: {
    src: '/src/assets/images/hero_deadlock_monolith_1793866256884.jpg',
    code: 'SANCTUM — DIGITAL HEADQUARTERS',
    caption: 'Obsidian & Brushed Bronze Monolith',
    alt: 'DeadLock Cartel Architectural Sanctum'
  },
  alliance: {
    src: '/src/assets/images/manifesto_alliance_portrait_1793866256902.jpg',
    code: 'ARCHIVE — THE SWORN ALLIANCE',
    caption: 'United in Discipline & Mutual Defense · Sample Editorial Study',
    alt: 'Four figures in bespoke dark wool coats standing in quiet unity within a dark gallery'
  },
  vault: {
    src: '/src/assets/images/vault_sanctum_editorial_1793866307485.jpg',
    code: 'ENDOWMENT — THE PRIVATE VAULT',
    caption: 'Safe Multisig Architecture · Robinhood Chain',
    alt: 'Minimalist dark basalt stone vault interior with recessed bronze geometric seal'
  },
  kingpin: {
    src: '/src/assets/images/collection_kingpin_editorial_1793866258689.jpg',
    code: 'TIER 01 / THE KINGPINS',
    caption: 'Bespoke Charcoal Pinstripe & Cashmere Overcoat · Preview Archetype',
    alt: 'Editorial portrait of a Kingpin archetype in bespoke dark pinstripe suit and overcoat'
  },
  godmother: {
    src: '/src/assets/images/collection_godmother_editorial_1793866259806.jpg',
    code: 'TIER 02 / THE GODMOTHERS',
    caption: 'Sculpted Couture Wool & Geometric Gold Pendant · Preview Archetype',
    alt: 'Editorial portrait of a Godmother archetype in sculpted black couture wool coat'
  },
  member: {
    src: '/src/assets/images/collection_member_editorial_1793866304423.jpg',
    code: 'TIER 03 / THE MEMBERS',
    caption: 'Tailored Charcoal Trench & Bronze Lapel Insignia · Preview Archetype',
    alt: 'Editorial portrait of a Member squad captain in tailored dark wool coat'
  },
  rookie: {
    src: '/src/assets/images/collection_rookie_editorial_1793866306950.jpg',
    code: 'TIER 04 / THE ROOKIES',
    caption: 'Matte Technical Streetwear & Tailored Turtleneck · Preview Archetype',
    alt: 'Editorial portrait of a Rookie street vanguard in dark layered technical jacket'
  }
};

export const ArtworkVisual: React.FC<ArtworkVisualProps> = ({
  type,
  title,
  className = '',
  aspect = '3:4',
  showCaption = false,
  minimal = false
}) => {
  const [imageError, setImageError] = useState(false);
  const asset = ASSET_MAP[type] || ASSET_MAP.monolith;

  const aspectClass =
    aspect === '16:9'
      ? 'aspect-[16/9]'
      : aspect === '1:1'
      ? 'aspect-square'
      : aspect === '4:5'
      ? 'aspect-[4/5]'
      : 'aspect-[3/4]';

  return (
    <figure className={`relative group overflow-hidden bg-[#171717] ${aspectClass} ${className}`}>
      {!imageError ? (
        <img
          src={asset.src}
          alt={title || asset.alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      ) : (
        /* Resilient Sculptural Fallback if offline */
        <div className="w-full h-full bg-gradient-to-b from-[#202020] to-[#141414] flex flex-col items-center justify-center p-6 text-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3 opacity-60">
            <path d="M24 4L42 24L24 44L6 24L24 4Z" stroke="#B69A67" strokeWidth="1" />
            <rect x="20" y="16" width="8" height="16" stroke="#8D7954" strokeWidth="1" />
          </svg>
          <span className="text-[11px] font-mono tracking-widest text-[#77736B] uppercase">
            {title || asset.code}
          </span>
        </div>
      )}

      {/* Subtle Chiaroscuro Depth Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-transparent to-[#171717]/20 pointer-events-none" />

      {/* Minimal Metadata Overlay when not in pure minimal mode */}
      {!minimal && (
        <>
          <div className="absolute top-4 left-4 pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.22em] text-[#E6DFD1]/70 uppercase">
              {asset.code}
            </span>
          </div>

          {showCaption && (
            <figcaption className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <p className="text-[11px] text-[#77736B] tracking-wide line-clamp-1">
                {asset.caption}
              </p>
            </figcaption>
          )}
        </>
      )}
    </figure>
  );
};
