import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartel, AppRoute } from '../../context/CartelContext';
import { CARTEL_TIERS, TREASURY_INTENDED_ASSETS, getSquadMathBreakdown, CONTRACT_DISCLOSURE } from '../../utils/cartelLogic';
import { TierId, CartelNFT } from '../../types/cartel';
import { ArtworkVisual } from '../common/ArtworkVisual';
import {
  Flame,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
  Lock,
  Sparkles,
  RotateCcw
} from 'lucide-react';

const ARCHIVE_NFTS: CartelNFT[] = [
  {
    tokenId: 1,
    tier: 'kingpin',
    name: 'DeadLock Kingpin #0001',
    status: 'REVEALED',
    traits: { suit: 'Bespoke Pinstripe & Cashmere Overcoat', jewelry: '18k Geometric Signet Ring' },
    revealBountyEligible: true
  },
  {
    tokenId: 28,
    tier: 'kingpin',
    name: 'DeadLock Kingpin #0028',
    status: 'REVEALED',
    traits: { suit: 'Obsidian Peak-Lapel Wool Coat', jewelry: 'Brushed Gold Lapel Seal' },
    revealBountyEligible: true
  },
  {
    tokenId: 45,
    tier: 'godmother',
    name: 'DeadLock Godmother #0045',
    status: 'REVEALED',
    traits: { suit: 'Sculpted Couture Silk & Wool Mantle', jewelry: 'Geometric Bronze Pendant' },
    revealBountyEligible: true
  },
  {
    tokenId: 112,
    tier: 'godmother',
    name: 'DeadLock Godmother #0112',
    status: 'REVEALED',
    traits: { suit: 'High-Collar Obsidian Velvet Coat', jewelry: 'Sovereign Cuff Bracelet' },
    revealBountyEligible: true
  },
  {
    tokenId: 204,
    tier: 'member',
    name: 'DeadLock Member #0204',
    status: 'REVEALED',
    traits: { suit: 'Tailored Dark Charcoal Trench', jewelry: 'Bronze Squad Captain Collar Pin' },
    revealBountyEligible: false
  },
  {
    tokenId: 489,
    tier: 'member',
    name: 'DeadLock Member #0489',
    status: 'REVEALED',
    traits: { suit: 'Structured Heavy Wool Overcoat', jewelry: 'Brushed Steel Signet' },
    revealBountyEligible: false
  },
  {
    tokenId: 1042,
    tier: 'rookie',
    name: 'DeadLock Rookie #1042',
    status: 'REVEALED',
    traits: { suit: 'Matte Technical Field Jacket', jewelry: 'Oxidized Silver Insignia Tag' },
    revealBountyEligible: false
  },
  {
    tokenId: 2190,
    tier: 'rookie',
    name: 'DeadLock Rookie #2190',
    status: 'REVEALED',
    traits: { suit: 'Architectural Layered Wool Jacket', jewelry: 'Minimalist Steel Ring' },
    revealBountyEligible: false
  }
];

export const DedicatedPages: React.FC = () => {
  const {
    route,
    setRoute,
    currentSupply,
    completedAscensions,
    executeAscensionSimulation,
    setSelectedNftDetail,
    setIsGtdModalOpen,
    proposals,
    castVote,
    contributions,
    submitContribution,
    selectedPersona
  } = useCartel();

  const prefersReducedMotion = useReducedMotion();

  // Ascension Interactive Motion Sequence State
  const [selectedRookies] = useState<number[]>([1204, 1205, 1206]);
  const [ascensionPhase, setAscensionPhase] = useState<'IDLE' | 'CONVERGING' | 'RESOLVED'>('IDLE');
  const [ascensionSuccess, setAscensionSuccess] = useState<number | null>(null);

  // Collection Archive Filter State
  const [archiveTierFilter, setArchiveTierFilter] = useState<'ALL' | TierId>('ALL');
  const [archiveSearchQuery, setArchiveSearchQuery] = useState('');

  // Merit Exchange Form State
  const [meritTitle, setMeritTitle] = useState('');
  const [meritCategory, setMeritCategory] = useState<'MARKET_ANALYSIS' | 'RESEARCH' | 'SQUAD_MANAGEMENT' | 'TOOLING' | 'EDUCATION' | 'CREATIVE'>('MARKET_ANALYSIS');
  const [meritSummary, setMeritSummary] = useState('');

  // ----------------------------------------------------------------------------------
  // 1. /lore : Full Brand Philosophy & Sovereign Manifesto
  // ----------------------------------------------------------------------------------
  if (route === '/lore') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>THE ARCHIVAL CODEX</span>
            <span>·</span>
            <span>OFFICIAL BRAND PHILOSOPHY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            THE DEADLOCK MANIFESTO
          </h1>
          <p className="text-xl font-serif text-[#E6DFD1]/90 italic max-w-2xl">
            &ldquo;Wall Street had its cartels. Now, the everyday people have theirs.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-t border-[#262626] pt-12">
          <div className="md:col-span-8 space-y-8 text-base text-[#E6DFD1]/90 font-serif leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">The Imbalance of Centuries</h2>
              <p>
                For decades, major financial institutions, investment banks, and exclusive private funds have maintained their own cartels. They control access to prime capital, negotiate derivative structures in silence, and leverage systemic advantages unavailable to independent participants.
              </p>
              <p>
                DeadLockCartel is presented as an on-chain response to this systemic imbalance. We do not represent a criminal syndicate; we represent an unbreakable alliance of independent traders, analysts, builders, and sovereign creators who unite around shared leverage, collective intelligence, and a common endowment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">The Brand Symbolism: Dignity & Deterrence</h2>
              <p>
                Our members are clothed in bespoke tailoring, luxury overcoats, and subtle gold seals. These garments symbolize dignity, discipline, mutual respect, and financial independence. The visual presence of character artwork communicates an unmistakable truth:
              </p>
              <div className="p-6 bg-[#1a1a1a] border-l-2 border-[#B69A67] text-[#F4F0E8] font-display text-lg italic">
                &ldquo;WE ARE HONORABLE AND PEACEFUL, BUT NEVER DEFENSELESS.&rdquo;
              </div>
              <p className="text-sm font-sans text-[#A39E92]">
                The visual identity of DeadLock Cartel rejects cheap cartoon clichés or violent stereotypes. We embody the poise of private merchant bankers and sovereign guilds operating on Robinhood Chain.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">The Meaning of DeadLock</h2>
              <p>
                In our fictional brand philosophy, &ldquo;DeadLock&rdquo; signifies an unbreakable defensive equilibrium. It is a unified structure that resists outside market manipulation, market distress, and predatory dilution. In union, our members achieve institutional scale.
              </p>
            </section>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">Pillars of the Creed</h3>
              <ul className="space-y-3 text-xs text-[#A39E92]">
                <li className="pb-3 border-b border-[#222222]">
                  <strong className="text-[#F4F0E8] block mb-1">01. Collective Treasury</strong>
                  50% secondary royalties funneled permanently into tokenized public equities.
                </li>
                <li className="pb-3 border-b border-[#222222]">
                  <strong className="text-[#F4F0E8] block mb-1">02. Reciprocal Mentorship</strong>
                  Every squad captain is bound to support 5–6 developing rookies.
                </li>
                <li>
                  <strong className="text-[#F4F0E8] block mb-1">03. Permanent Supply Burn</strong>
                  Ascension permanently burns 2 NFTs per conversion, locking long-term scarcity.
                </li>
              </ul>
            </div>

            <button
              onClick={() => setRoute('/hierarchy')}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors text-center cursor-pointer"
            >
              Examine The Chain of Command
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 2. /hierarchy : 4 Ranks Deep Dive & Squad Mathematics
  // ----------------------------------------------------------------------------------
  if (route === '/hierarchy') {
    const squadMath = getSquadMathBreakdown();

    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>SYSTEM ARCHITECTURE</span>
            <span>·</span>
            <span>4-TIER MEMBERSHIP HIERARCHY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            THE CHAIN OF COMMAND
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            A mathematically defined social structure combining strategic capital leadership, endowment stewardship, operational squad captains, and the developing street vanguard.
          </p>
        </div>

        {/* 4 Detailed Tier Sections */}
        <div className="space-y-12">
          {(Object.keys(CARTEL_TIERS) as TierId[]).map((tierKey) => {
            const tier = CARTEL_TIERS[tierKey];
            return (
              <div
                key={tier.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#181818] border border-[#272727] rounded-sm p-6 sm:p-8 items-center"
              >
                <div className="lg:col-span-4 max-w-xs mx-auto lg:mx-0 w-full">
                  <ArtworkVisual type={tier.id} aspect="3:4" title={tier.name} />
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#222222]">
                    <div>
                      <span className="text-xs font-mono text-[#B69A67] tracking-widest uppercase block">
                        {tier.code}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                        {tier.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="px-3 py-1 bg-[#141414] border border-[#2b2b2b] rounded-sm">
                        <span className="text-[#B69A67] font-bold">{tier.votingPower}x</span> Voting Power
                      </div>
                      <div className="px-3 py-1 bg-[#141414] border border-[#2b2b2b] rounded-sm">
                        <span className="text-[#F4F0E8] font-bold">{tier.supply}</span> Units ({tier.supplyPercentage}%)
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-serif italic text-[#B69A67]">
                    Role: {tier.role}
                  </p>

                  <p className="text-sm text-[#E6DFD1]/90 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Art Direction Specs */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A39E92]">
                      Art Direction & Uniform Code
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A39E92]">
                      {tier.artDirection.map((art, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#B69A67]">•</span>
                          <span>{art}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reveal Bounty Note if Applicable */}
                  {tier.revealReward && (
                    <div className="p-3 bg-[#1e1c18] border border-[#3d321d] rounded-sm text-xs text-[#B69A67]">
                      <strong>Reveal Reward:</strong> {tier.revealReward}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Squad Mathematical Formula Verification */}
        <div className="p-8 bg-[#141414] border border-[#2a2a2a] rounded-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <Users size={16} />
            <span>EXACT MATHEMATICAL SQUAD PROOFS</span>
          </div>
          <h3 className="text-xl font-display font-bold text-[#F4F0E8]">
            The 469 Captains to 2,662 Rookies Ratio
          </h3>
          <p className="text-xs text-[#A39E92] max-w-2xl leading-relaxed">
            Every Rookie in DeadLock Cartel belongs to an active, accountable squad. The mathematical distribution balances exactly without remainder:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#191919] border border-[#262626] rounded-sm">
              <span className="text-[11px] text-[#A39E92] block">COHORT ALPHA (152 SQUADS)</span>
              <span className="text-lg font-bold text-[#F4F0E8] block mt-1">152 × 5 = 760</span>
              <span className="text-[10px] text-[#B69A67]">Rookies supervised</span>
            </div>

            <div className="p-4 bg-[#191919] border border-[#262626] rounded-sm">
              <span className="text-[11px] text-[#A39E92] block">COHORT BETA (317 SQUADS)</span>
              <span className="text-lg font-bold text-[#F4F0E8] block mt-1">317 × 6 = 1,902</span>
              <span className="text-[10px] text-[#B69A67]">Rookies supervised</span>
            </div>

            <div className="p-4 bg-[#1e1c18] border border-[#3b301c] rounded-sm">
              <span className="text-[11px] text-[#B69A67] block">EXACT MATHEMATICAL TOTAL</span>
              <span className="text-lg font-bold text-[#F4F0E8] block mt-1">760 + 1,902 = 2,662</span>
              <span className="text-[10px] text-[#E6DFD1]">100% of Rookie Base Covered</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 3. /vault : Full Stock Endowment & Multisig Architecture
  // ----------------------------------------------------------------------------------
  if (route === '/vault' || route === '/utilities/stock-endowment') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>TREASURY PROTOCOL</span>
            <span>·</span>
            <span>PILLAR 01: THE DEADLOCK STOCK ENDOWMENT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            THE STOCK ENDOWMENT
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            A permanent shared treasury based on tokenized stocks and digital assets on the Robinhood Chain, funded by 50% of secondary market royalties and initial mint allocations.
          </p>
        </div>

        {/* Treasury Metrics Overview with Honest Empty State */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
            <span className="text-[11px] font-mono text-[#A39E92] uppercase">Total Value (USD)</span>
            <div className="text-xl font-mono font-bold text-[#E6DFD1]">Awaiting On-Chain Data</div>
            <span className="text-[10px] font-mono text-[#8D7954]">Safe Wallet Pre-activation</span>
          </div>

          <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
            <span className="text-[11px] font-mono text-[#A39E92] uppercase">Secondary Royalty Rate</span>
            <div className="text-xl font-mono font-bold text-[#B69A67]">50.00%</div>
            <span className="text-[10px] font-mono text-[#A39E92]">Contract Enforced</span>
          </div>

          <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
            <span className="text-[11px] font-mono text-[#A39E92] uppercase">Active Safe Signers</span>
            <div className="text-xl font-mono font-bold text-[#F4F0E8]">202 Leaders</div>
            <span className="text-[10px] font-mono text-[#A39E92]">33 Kingpins + 169 Godmothers</span>
          </div>

          <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
            <span className="text-[11px] font-mono text-[#A39E92] uppercase">Target Equities</span>
            <div className="text-xl font-mono font-bold text-[#F4F0E8]">6 Core Assets</div>
            <span className="text-[10px] font-mono text-[#A39E92]">NVDA, TSLA, AAPL, HOOD, SPY, ETH</span>
          </div>
        </div>

        {/* Target Asset Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <h2 className="text-xl font-display font-bold text-[#F4F0E8]">Intended Asset Allocation</h2>
            <span className="text-xs font-mono text-[#8D7954]">ROBINHOOD CHAIN EVM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TREASURY_INTENDED_ASSETS.map((asset) => (
              <div key={asset.symbol} className="p-5 bg-[#181818] border border-[#272727] rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-base font-bold text-[#F4F0E8]">{asset.symbol}</span>
                  <span className="text-[10px] text-[#B69A67] uppercase">{asset.type.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-[#A39E92]">{asset.name}</p>
                <div className="pt-2 border-t border-[#222222] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#A39E92]">Contract Status:</span>
                  <span className="text-[#8D7954]">Awaiting Deployment</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory & Safety Notice */}
        <div className="p-6 bg-[#161616] border border-[#2b2b2b] rounded-sm space-y-3 text-xs text-[#A39E92] leading-relaxed">
          <div className="flex items-center gap-2 text-[#B69A67] font-mono text-xs">
            <Lock size={14} />
            <span>COMPLIANCE AND FIDUCIARY SAFEGUARDS</span>
          </div>
          <p>
            {CONTRACT_DISCLOSURE.legalNotice} The DeadLock Stock Endowment operates under a strict preservation model: the underlying principal portfolio of tokenized equities is held in perpetuity, and only returns, portfolio growth, and secondary royalties are utilized to fund member rewards, grants, and Cartel ecosystem development.
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 4. /utilities/bounties : Instant Reveal Vault (Pillar 2)
  // ----------------------------------------------------------------------------------
  if (route === '/utilities/bounties') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>UTILITY ENGINE</span>
            <span>·</span>
            <span>PILLAR 02: INSTANT REVEAL BOUNTIES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            THE REVEAL VAULT
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            202 special reward NFTs are embedded in the genesis 3,333 collection. Unveiled immediately upon the delayed reveal event on Robinhood Chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kingpin Bounty Box */}
          <div className="p-8 bg-[#181818] border border-[#B69A67]/40 rounded-sm space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#B69A67] font-bold">33 SPECIAL NFTS</span>
              <span className="text-[#A39E92]">TIER 01</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">
              Kingpin High-Multiplier Bounty
            </h2>
            <p className="text-xs text-[#A39E92] leading-relaxed">
              Each of the 33 Kingpin NFTs is associated with a high-multiplier bounty, payable in ETH or Robinhood Chain tokenized equity shares upon official reveal verification.
            </p>
            <div className="p-4 bg-[#141414] border border-[#242424] rounded-sm space-y-1 text-xs">
              <span className="text-[10px] font-mono text-[#A39E92] uppercase">Status</span>
              <span className="font-mono text-[#B69A67] block">SEALED IN SMART CONTRACT VAULT</span>
              <p className="text-[11px] text-[#A39E92]">
                Amounts will be calculated and disclosed upon public contract deployment.
              </p>
            </div>
          </div>

          {/* Godmother Rebate Box */}
          <div className="p-8 bg-[#181818] border border-[#8D7954]/40 rounded-sm space-y-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8D7954] font-bold">169 SPECIAL NFTS</span>
              <span className="text-[#A39E92]">TIER 02</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">
              Godmother 100% Mint Rebate
            </h2>
            <p className="text-xs text-[#A39E92] leading-relaxed">
              Every Godmother NFT revealed triggers an automated 100% mint rebate, honoring the matriarchs who oversee community welfare and the tokenized-stock treasury portfolio.
            </p>
            <div className="p-4 bg-[#141414] border border-[#242424] rounded-sm space-y-1 text-xs">
              <span className="text-[10px] font-mono text-[#A39E92] uppercase">Status</span>
              <span className="font-mono text-[#8D7954] block">SEALED IN SMART CONTRACT VAULT</span>
              <p className="text-[11px] text-[#A39E92]">
                Rebate settlement mechanism and claim windows will be executed post-reveal.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 5. /utilities/patronage : The 4-Tier Patronage Protocol (Pillar 3)
  // ----------------------------------------------------------------------------------
  if (route === '/utilities/patronage') {
    const math = getSquadMathBreakdown();

    return (
      <div className="py-28 px-6 md:px-12 max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>UTILITY ENGINE</span>
            <span>·</span>
            <span>PILLAR 03: THE 4-TIER PATRONAGE PROTOCOL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            PATRONAGE & SQUAD STRUCTURE
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            A cohesive brotherhood where senior architects guide operational commanders, and squad captains directly mentor developing rookies with reciprocal financial alignment.
          </p>
        </div>

        {/* Squad Structure Diagram */}
        <div className="bg-[#181818] border border-[#272727] rounded-sm p-8 space-y-8">
          <h2 className="text-xl font-display font-bold text-[#F4F0E8]">
            Organizational Tree
          </h2>

          <div className="space-y-6">
            {/* Level 1: Senior Leaders */}
            <div className="p-4 bg-[#1e1c18] border border-[#3b301c] rounded-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#B69A67]">
                <span>LEADERSHIP LAYER</span>
                <span>202 SENIOR ARCHITECTS & MATRIARCHS</span>
              </div>
              <p className="text-xs text-[#E6DFD1]">
                33 Kingpins (Apex Architects) & 169 Godmothers (Endowment Matriarchs) oversee macro-treasury allocation, brand diplomacy, and monthly branch reward approvals.
              </p>
            </div>

            {/* Level 2: Squad Captains */}
            <div className="p-4 bg-[#191919] border border-[#292929] rounded-sm space-y-2 ml-4 md:ml-8 border-l-2 border-l-[#8D7954]">
              <div className="flex items-center justify-between text-xs font-mono text-[#8D7954]">
                <span>OPERATIONAL LAYER</span>
                <span>469 SWORN SQUAD CAPTAINS (MEMBERS)</span>
              </div>
              <p className="text-xs text-[#E6DFD1]">
                Each Member supervises 5–6 Rookies. Captains review rookie research submissions, guide trading education, and earn a <strong>1% Captain&apos;s Cut</strong> on member ascensions and awards.
              </p>
            </div>

            {/* Level 3: Street Vanguard */}
            <div className="p-4 bg-[#141414] border border-[#242424] rounded-sm space-y-2 ml-8 md:ml-16 border-l-2 border-l-[#A39E92]">
              <div className="flex items-center justify-between text-xs font-mono text-[#A39E92]">
                <span>COMMUNITY LAYER</span>
                <span>2,662 STREET VANGUARD (ROOKIES)</span>
              </div>
              <p className="text-xs text-[#E6DFD1]">
                The heartbeat and grassroots intelligence of the Cartel. Organized into 152 squads of 5 and 317 squads of 6, actively learning and qualifying for 3-for-1 ascension.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 6. /utilities/merit : The Merit Exchange (Pillar 4)
  // ----------------------------------------------------------------------------------
  if (route === '/utilities/merit') {
    const handleMeritSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!meritTitle || !meritSummary) return;

      submitContribution({
        category: meritCategory,
        title: meritTitle,
        summary: meritSummary,
        author: selectedPersona ? `${selectedPersona.label} (${selectedPersona.address})` : 'Anonymous Protector',
        authorTier: selectedPersona ? selectedPersona.tier : 'rookie'
      });

      setMeritTitle('');
      setMeritSummary('');
    };

    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>UTILITY ENGINE</span>
            <span>·</span>
            <span>PILLAR 04: PROOF-OF-MERIT & CARTEL GRANTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            THE MERIT EXCHANGE
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            Members who create measurable value—in-depth market research, squad mentorship, or technical tools—receive fractional tokenized-stock rewards and treasury grants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-5 bg-[#181818] border border-[#272727] rounded-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-display font-bold text-[#F4F0E8]">
              Submit Work For Evaluation
            </h2>

            <form onSubmit={handleMeritSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  Contribution Category
                </label>
                <select
                  value={meritCategory}
                  onChange={(e) => setMeritCategory(e.target.value as any)}
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#B69A67] px-3.5 py-2.5 text-xs text-[#E6DFD1] outline-none rounded-sm"
                >
                  <option value="MARKET_ANALYSIS">Market Analysis & Equities</option>
                  <option value="RESEARCH">Robinhood Chain Research</option>
                  <option value="SQUAD_MANAGEMENT">Squad Curriculum & Guidance</option>
                  <option value="TOOLING">Technical Tooling & Bots</option>
                  <option value="EDUCATION">Educational Content</option>
                  <option value="CREATIVE">Editorial & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  Dossier Title
                </label>
                <input
                  type="text"
                  required
                  value={meritTitle}
                  onChange={(e) => setMeritTitle(e.target.value)}
                  placeholder="e.g. Robinhood Chain Liquidity Deep Dive"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#B69A67] px-3.5 py-2.5 text-xs text-[#E6DFD1] outline-none rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A39E92] mb-1.5">
                  Deliverable Summary / Link
                </label>
                <textarea
                  rows={4}
                  required
                  value={meritSummary}
                  onChange={(e) => setMeritSummary(e.target.value)}
                  placeholder="Summarize the core findings, utility, or measurable value delivered to the Cartel..."
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#B69A67] px-3.5 py-2 text-xs text-[#E6DFD1] outline-none rounded-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer"
              >
                File Dossier With Captains
              </button>
            </form>
          </div>

          {/* Active Submissions & Review Queue */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-display font-bold text-[#F4F0E8]">
              Recent Dossiers in Review
            </h2>

            <div className="space-y-3">
              {contributions.length === 0 ? (
                <div className="p-8 bg-[#202020]/50 border border-[rgba(230,223,209,0.14)] space-y-2">
                  <div className="text-xs uppercase tracking-[0.22em] text-[#B69A67]">
                    AWAITING CONFIGURATION
                  </div>
                  <p className="text-xs text-[#A39E92] leading-relaxed">
                    Merit Exchange smart contracts and dossier verification queues are not yet published on-chain.
                  </p>
                </div>
              ) : (
                contributions.map((c) => (
                  <div key={c.id} className="p-5 bg-[#181818] border border-[rgba(230,223,209,0.14)] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#B69A67]">{c.category.replace('_', ' ')}</span>
                      <span className="text-[10px] text-[#A39E92]">{c.date}</span>
                    </div>

                    <h3 className="text-sm font-display font-bold text-[#F4F0E8]">{c.title}</h3>
                    <p className="text-xs text-[#A39E92] leading-relaxed">{c.summary}</p>

                    <div className="pt-3 border-t border-[rgba(230,223,209,0.14)] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#A39E92]">Author: {c.author}</span>
                      <span className="px-2 py-0.5 text-[10px] uppercase text-[#B69A67] border border-[rgba(230,223,209,0.14)]">
                        {c.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 7. /utilities/trading-desk : Governance, Stock Proposals, Snapshot Voting (Pillar 5)
  // ----------------------------------------------------------------------------------
  if (route === '/utilities/trading-desk') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>UTILITY ENGINE</span>
            <span>·</span>
            <span>PILLAR 05: ON-SITE TRADING DESK & GOVERNANCE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            TRADING DESK & GOVERNANCE
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            Members direct the Stock Endowment through gasless Snapshot-style proposals. Voting power is strictly determined by rank: Kingpins (50x), Godmothers (15x), Members (5x), Rookies (1x).
          </p>
        </div>

        {/* Active Proposals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
            <h2 className="text-xl font-display font-bold text-[#F4F0E8]">
              Active Weekly Stock Purchase Proposals
            </h2>
            <div className="text-xs font-mono text-[#B69A67]">
              GASLESS SNAPSHOT PROTOCOL
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {proposals.length === 0 ? (
              <div className="p-8 bg-[#202020]/50 border border-[rgba(230,223,209,0.14)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-[#B69A67]">
                    AWAITING CONFIGURATION
                  </span>
                  <span className="text-xs tabular-nums text-[#A39E92]">—</span>
                </div>
                <p className="text-sm text-[#E6DFD1] leading-relaxed">
                  No live Snapshot proposals are currently published. Snapshot votes are off-chain signaling mechanisms and do not trigger automatic treasury execution.
                </p>
              </div>
            ) : (
              proposals.map((prop) => {
                const totalVotes = prop.votesFor + prop.votesAgainst;
                const forPercent = totalVotes > 0 ? Math.round((prop.votesFor / totalVotes) * 100) : 0;

                return (
                  <div key={prop.id} className="p-6 bg-[#181818] border border-[rgba(230,223,209,0.14)] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#B69A67]">{prop.id}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#141414] border border-[rgba(230,223,209,0.14)] text-[#A39E92]">
                          {prop.actionType.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#A39E92]">{prop.deadline}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#F4F0E8]">{prop.title}</h3>
                    <p className="text-xs text-[#A39E92] max-w-3xl leading-relaxed">{prop.description}</p>

                    <div className="pt-4 border-t border-[rgba(230,223,209,0.14)] flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#A39E92] font-mono">
                        Execution Status: <span className="text-[#8D7954]">{prop.executionStatus.replace(/_/g, ' ')} ({forPercent}%)</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {prop.userVoted ? (
                          <span className="text-xs font-mono text-[#B69A67] px-3 py-1.5 border border-[rgba(230,223,209,0.14)]">
                            Signature Cast: {prop.userVoted}
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => castVote(prop.id, 'FOR')}
                              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#8D7954] transition-colors cursor-pointer"
                            >
                              Vote For
                            </button>
                            <button
                              onClick={() => castVote(prop.id, 'AGAINST')}
                              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E6DFD1] bg-[#202020] border border-[rgba(230,223,209,0.14)] transition-colors cursor-pointer"
                            >
                              Vote Against
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 8. /utilities/ascension : Dedicated 3-for-1 Ascension Motion Sequence (Pillar 6)
  // ----------------------------------------------------------------------------------
  if (route === '/utilities/ascension') {
    const handleRunAscension = () => {
      if (selectedRookies.length !== 3 || ascensionPhase === 'CONVERGING') return;
      if (prefersReducedMotion) {
        const res = executeAscensionSimulation(selectedRookies);
        setAscensionSuccess(res.newMemberTokenId);
        setAscensionPhase('RESOLVED');
        return;
      }

      setAscensionPhase('CONVERGING');
      window.setTimeout(() => {
        const res = executeAscensionSimulation(selectedRookies);
        setAscensionSuccess(res.newMemberTokenId);
        setAscensionPhase('RESOLVED');
      }, 1100);
    };

    const handleResetAscension = () => {
      setAscensionPhase('IDLE');
    };

    return (
      <div className="py-28 px-6 md:px-12 max-w-[1360px] mx-auto space-y-20">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#242424] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.28em] text-[#B69A67]">
              <span>PILLAR 06</span>
              <span className="w-6 h-px bg-[#B69A67]/40" />
              <span>DEFLATIONARY RANK ELEVATION</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-[0.95] tracking-tight">
              THE 3-FOR-1 ASCENSION.
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-3">
            <p className="text-sm text-[#E6DFD1]/80 leading-relaxed font-sans">
              Three Rookie identities converge into a single Squad Captain (Member) rank. Every completed ascension permanently eliminates two NFTs from circulating supply.
            </p>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8D7954]">
              MECHANISM PREVIEW · AWAITING SMART CONTRACT DEPLOYMENT
            </div>
          </div>
        </div>

        {/* Dedicated Ascension Motion Stage */}
        <div className="relative bg-[#141414] border border-[#262626] p-8 sm:p-14 lg:p-16 overflow-hidden">
          {/* Subtle Ambient Radial Light */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
            style={{
              background:
                ascensionPhase === 'RESOLVED'
                  ? 'radial-gradient(circle at 50% 45%, rgba(182, 154, 103, 0.14), transparent 65%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(182, 154, 103, 0.05), transparent 60%)'
            }}
          />

          {/* Stage Top Status Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-10 mb-12 border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#B69A67]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#E6DFD1]">
                {ascensionPhase === 'IDLE' && 'STAGE 01 · THREE ROOKIE IDENTITIES SELECTED'}
                {ascensionPhase === 'CONVERGING' && 'STAGE 02 · CONVERGING IDENTITIES INTO CRUCIBLE'}
                {ascensionPhase === 'RESOLVED' && 'STAGE 03 · UNIFIED MEMBER RANK RESOLVED'}
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-mono text-[#A39E92]">
              <span>
                FORMULA: <strong className="text-[#F4F0E8]">3 ROOKIES → 1 MEMBER</strong>
              </span>
              <span>
                NET SUPPLY: <strong className="text-[#B69A67]">-2 NFTS</strong>
              </span>
            </div>
          </div>

          {/* Motion Choreography Canvas */}
          <div className="relative z-10 min-h-[460px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {ascensionPhase !== 'RESOLVED' ? (
                <motion.div
                  key="rookies-stage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center">
                    {selectedRookies.map((id, idx) => {
                      // Lateral convergence offsets toward center slot (idx === 1)
                      const convergeX = idx === 0 ? '95%' : idx === 2 ? '-95%' : '0%';
                      const convergeScale = idx === 1 ? 1.04 : 0.88;

                      return (
                        <motion.div
                          key={id}
                          animate={
                            ascensionPhase === 'CONVERGING'
                              ? {
                                  x: convergeX,
                                  scale: convergeScale,
                                  opacity: idx === 1 ? 0.95 : 0.25,
                                  filter: 'brightness(1.25) contrast(1.1)'
                                }
                              : {
                                  x: '0%',
                                  scale: 1,
                                  opacity: 1,
                                  filter: 'brightness(1) contrast(1)'
                                }
                          }
                          transition={{
                            duration: 0.95,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="group relative bg-[#181818] border border-[#2a2a2a] p-4 space-y-4"
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#A39E92] uppercase tracking-[0.2em]">
                            <span>INPUT 0{idx + 1}</span>
                            <span className="text-[#B69A67]">TIER 04 · ROOKIE</span>
                          </div>

                          <div className="w-full aspect-[3/4] overflow-hidden">
                            <ArtworkVisual
                              type="rookie"
                              aspect="3:4"
                              title={`DeadLock Rookie #${id}`}
                              minimal
                            />
                          </div>

                          <div className="pt-2 border-t border-[#222222] flex items-center justify-between">
                            <div>
                              <span className="text-xs font-display font-bold text-[#F4F0E8] block">
                                DeadLock Rookie #{id}
                              </span>
                              <span className="text-[10px] font-mono text-[#A39E92]">
                                1x Governance Weight
                              </span>
                            </div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 bg-[#1f1818] text-[#c97a7e] border border-[#3a2426]">
                              Burn Slot
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="member-resolved-stage"
                  initial={{ opacity: 0, scale: 0.94, clipPath: 'inset(12% 0% 12% 0%)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-[#181818] border border-[#B69A67]/50 p-6 sm:p-10"
                >
                  <div className="md:col-span-5">
                    <div className="w-full aspect-[3/4] overflow-hidden border border-[#B69A67]/30">
                      <ArtworkVisual
                        type="member"
                        aspect="3:4"
                        title={`DeadLock Member #${ascensionSuccess || 470}`}
                        minimal
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#211d17] border border-[#B69A67]/40 text-[10px] font-mono uppercase tracking-[0.24em] text-[#B69A67]">
                      <Sparkles size={12} />
                      <span>ASCENSION SEQUENCE RESOLVED</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8D7954] block">
                        TIER 03 · SWORN SQUAD CAPTAIN
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F4F0E8]">
                        DeadLock Member #{ascensionSuccess || 470}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#E6DFD1]/80 leading-relaxed">
                      Three Rookie identities (#1204, #1205, #1206) have converged into a single Member rank. This elevation grants 5x Snapshot voting weight, command over a 5–6 Rookie squad, and eligibility for the 1% Captain&apos;s Cut.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#262626] font-mono">
                      <div>
                        <span className="text-[10px] text-[#A39E92] uppercase block">Rookies Burned</span>
                        <span className="text-sm font-bold text-[#F4F0E8]">3 Units</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#A39E92] uppercase block">Voting Power</span>
                        <span className="text-sm font-bold text-[#B69A67]">5x Weight</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#A39E92] uppercase block">Supply Impact</span>
                        <span className="text-sm font-bold text-[#B69A67]">-2 NFTs</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Bar & Mechanism Controls */}
          <div className="relative z-10 mt-12 pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#A39E92]">
              <span>
                SIMULATED SUPPLY: <strong className="text-[#F4F0E8]">{currentSupply.toLocaleString()}</strong> / 3,333
              </span>
              <span>
                PREVIEWED ASCENSIONS: <strong className="text-[#B69A67]">{completedAscensions}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4">
              {ascensionPhase === 'RESOLVED' ? (
                <button
                  onClick={handleResetAscension}
                  className="px-6 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-[#E6DFD1] border border-[#343434] hover:border-[#B69A67] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  <span>Reset Sequence</span>
                </button>
              ) : null}

              <button
                onClick={handleRunAscension}
                disabled={ascensionPhase === 'CONVERGING'}
                className="px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-2.5 font-semibold"
              >
                <Flame size={14} />
                <span>
                  {ascensionPhase === 'CONVERGING'
                    ? 'Converging Identities...'
                    : ascensionPhase === 'RESOLVED'
                    ? 'Run Another Ascension Preview'
                    : 'Preview 3-for-1 Ascension Sequence'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 9. /collection : Full Archive Gallery with Rank Filter & Search
  // ----------------------------------------------------------------------------------
  if (route === '/collection') {
    const filteredArchive = ARCHIVE_NFTS.filter((nft) => {
      const matchesTier = archiveTierFilter === 'ALL' || nft.tier === archiveTierFilter;
      const matchesQuery =
        archiveSearchQuery.trim() === '' ||
        nft.name.toLowerCase().includes(archiveSearchQuery.toLowerCase()) ||
        String(nft.tokenId).includes(archiveSearchQuery.trim());
      return matchesTier && matchesQuery;
    });

    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#242424] pb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67] uppercase tracking-[0.24em]">
              <span>ARCHIVE EXPLORATION</span>
              <span>·</span>
              <span>3,333 DIGITAL IDENTITIES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
              THE COLLECTION ARCHIVE
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#A39E92] leading-relaxed">
              Four unified ranks within one economic brotherhood. Official contract metadata and trait provenance synchronize upon delayed reveal execution on Robinhood Chain.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'ALL', label: 'All Ranks (3,333)' },
                { id: 'kingpin', label: 'Kingpins (33)' },
                { id: 'godmother', label: 'Godmothers (169)' },
                { id: 'member', label: 'Members (469)' },
                { id: 'rookie', label: 'Rookies (2,662)' }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setArchiveTierFilter(tab.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] transition-colors cursor-pointer border ${
                  archiveTierFilter === tab.id
                    ? 'bg-[#B69A67] text-[#171717] border-[#B69A67] font-semibold'
                    : 'bg-[#181818] text-[#E6DFD1]/80 border-[#272727] hover:border-[#B69A67]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A39E92]" />
            <input
              type="text"
              value={archiveSearchQuery}
              onChange={(e) => setArchiveSearchQuery(e.target.value)}
              placeholder="Filter by Token ID..."
              className="w-full bg-[#181818] border border-[#272727] focus:border-[#B69A67] pl-9 pr-4 py-2 text-xs font-mono text-[#E6DFD1] outline-none"
            />
          </div>
        </div>

        {/* Curatorial Portrait Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredArchive.map((nft) => (
            <div
              key={nft.tokenId}
              onClick={() => setSelectedNftDetail(nft)}
              className="group bg-[#181818] border border-[#262626] hover:border-[#B69A67]/60 transition-all cursor-pointer flex flex-col justify-between p-4"
            >
              <div className="w-full aspect-[3/4] overflow-hidden mb-4">
                <ArtworkVisual type={nft.tier} aspect="3:4" title={nft.name} minimal />
              </div>
              <div className="space-y-1.5 pt-2 border-t border-[#222222]">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#A39E92]">
                  <span className="uppercase text-[#B69A67]">{nft.tier}</span>
                  <span>#{String(nft.tokenId).padStart(4, '0')}</span>
                </div>
                <h3 className="text-sm font-display font-bold text-[#F4F0E8] truncate group-hover:text-[#B69A67] transition-colors">
                  {nft.name}
                </h3>
                <p className="text-[11px] text-[#A39E92] truncate">{nft.traits.suit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------------
  // 10. /community : Community & GTD clearance page
  // ----------------------------------------------------------------------------------
  if (route === '/community') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>ALLIANCE OUTPOST</span>
            <span>·</span>
            <span>COMMUNITY & GTD CLEARANCE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-[#F4F0E8] leading-tight">
            JOIN THE BROTHERHOOD
          </h1>
          <p className="text-sm sm:text-base text-[#A39E92] max-w-2xl">
            We are not an anonymous speculative chat room. We are an organized economic vanguard on the Robinhood Chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#181818] border border-[#272727] rounded-sm space-y-6">
            <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">
              Apply For GTD Whitelist
            </h2>
            <p className="text-xs text-[#A39E92] leading-relaxed">
              Submit your dossier to prove your merit as an independent market participant, researcher, developer, or squad leader.
            </p>
            <button
              onClick={() => setIsGtdModalOpen(true)}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer"
            >
              Open GTD Application Dossier
            </button>
          </div>

          <div className="p-8 bg-[#181818] border border-[#272727] rounded-sm space-y-6">
            <h2 className="text-2xl font-display font-bold text-[#F4F0E8]">
              Official Communication Lines
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm flex items-center justify-between">
                <span>X / Twitter</span>
                <a
                  href="https://x.com/DeadLockCartel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B69A67] font-mono hover:underline flex items-center gap-1"
                >
                  <span>@DeadLockCartel</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm flex items-center justify-between">
                <span>Official Domain</span>
                <span className="text-[#E6DFD1] font-mono">deadlockcartel.xyz</span>
              </div>
              <div className="p-3 bg-[#141414] border border-[#242424] rounded-sm flex items-center justify-between">
                <span>Token Ticker</span>
                <span className="text-[#B69A67] font-mono">$DLC (Robinhood Chain)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 11. /utilities general overview
  if (route === '/utilities') {
    return (
      <div className="py-28 px-6 md:px-12 max-w-[1440px] mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
            <span>UTILITY HUB</span>
            <span>·</span>
            <span>THE SIX CONNECTED PROTOCOLS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-[#F4F0E8] leading-tight">
            THE SIX UTILITY PILLARS
          </h1>
        </div>

        <div className="border-t border-[rgba(230,223,209,0.14)]">
          {[
            { title: 'Deadlock Stock Endowment', route: '/utilities/stock-endowment', desc: 'Shared treasury policy allocating 50% of secondary royalties to tokenized equities and ETH.' },
            { title: 'Instant Reveal Bounties', route: '/utilities/bounties', desc: '33 Kingpin bounties + 169 Godmother 100% mint rebates per brief.' },
            { title: '4-Tier Patronage Protocol', route: '/utilities/patronage', desc: '469 Sworn Squad Captains each supervise ~5–6 Rookies with a 1% Captain’s Cut.' },
            { title: 'Proof-of-Merit & Cartel Grants', route: '/utilities/merit', desc: 'Merit-based grants for analysis, research, and tooling.' },
            { title: 'On-Site Trading Desk', route: '/utilities/trading-desk', desc: 'Weighted governance proposals (50x/15x/5x/1x). Snapshot votes are not automatic execution.' },
            { title: '3-for-1 Ascension Burn', route: '/utilities/ascension', desc: 'Burn 3 Rookies for 1 Member; each ascension reduces collection supply by two.' }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setRoute(item.route as AppRoute)}
              className="w-full text-left py-7 border-b border-[rgba(230,223,209,0.14)] hover:border-[#B69A67] transition-colors cursor-pointer flex items-baseline justify-between gap-6"
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-[#A39E92]">0{idx + 1}</span>
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-light text-[#F4F0E8]">{item.title}</h3>
                  <p className="text-sm text-[#A39E92] leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#B69A67] flex items-center gap-1 shrink-0">
                <span>INSPECT</span>
                <ArrowRight size={12} />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for any unbuilt route: explicit "NOT PUBLISHED YET" state
  return (
    <div className="py-36 px-6 md:px-14 max-w-[960px] mx-auto space-y-8">
      <div className="inline-block px-3 py-1 border border-[rgba(230,223,209,0.14)] text-[11px] uppercase tracking-[0.24em] text-[#B69A67]">
        NOT PUBLISHED YET · AWAITING CONFIGURATION
      </div>
      <h1 className="font-display font-light text-4xl sm:text-6xl text-[#F4F0E8]">
        SECTION NOT PUBLISHED YET.
      </h1>
      <p className="text-sm sm:text-base text-[#A39E92] max-w-xl leading-relaxed">
        This route is awaiting official configuration and publication. No unverified data or placeholder endpoints are active at this path.
      </p>
      <div className="pt-4">
        <button
          type="button"
          onClick={() => setRoute('/')}
          className="px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#8D7954] transition-colors cursor-pointer"
        >
          RETURN TO HOMEPAGE
        </button>
      </div>
    </div>
  );
};
