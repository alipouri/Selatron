import { TierId, TierInfo } from '../types/cartel';

export const TOTAL_INITIAL_SUPPLY = 3333;

export const CARTEL_TIERS: Record<TierId, TierInfo> = {
  kingpin: {
    id: 'kingpin',
    name: 'The Kingpins',
    code: 'TIER 01',
    supply: 33,
    supplyPercentage: 0.99,
    votingPower: 50,
    role: 'The Apex Architects',
    tagline: 'Strategic leaders, principal architects, and central pillars of the Cartel.',
    description: 'They represent the highest level of influence and strategic authority. Associated with the highest governance weight (50x) and highest monthly treasury allocation eligibility, subject to branch activity and growth conditions.',
    revealReward: 'High-multiplier bounty paid in ETH or tokenized stocks (Awaiting On-Chain Settlement)',
    artDirection: [
      'Exceptional bespoke tailoring & distinguished luxury suits',
      'High-quality coats and rare jewelry',
      'Visually authoritative presence & controlled poses',
      'More elaborate character-specific details without relying solely on gold'
    ],
    perks: ['50x Voting Power', 'Highest Monthly Treasury Allocation Eligibility', 'Special Instant Reveal Bounty']
  },
  godmother: {
    id: 'godmother',
    name: 'The Godmothers',
    code: 'TIER 02',
    supply: 169,
    supplyPercentage: 5.07,
    votingPower: 15,
    role: 'The Matriarchs of the Stock Endowment and Community Welfare',
    tagline: 'The strategic women of the Cartel overseeing the endowment and community welfare.',
    description: 'Financial strategists, treasury managers, and key figures responsible for overseeing the tokenized-stock portfolio, resource distribution, and community welfare.',
    revealReward: '100% mint rebate according to project brief (Awaiting On-Chain Settlement)',
    artDirection: [
      'Distinct feminine anatomical and costume design system',
      'Bespoke tailored luxury clothing & sophisticated fashion',
      'Elegant jewelry with controlled, intelligent expressions',
      'Distinct silhouettes with independent character presence'
    ],
    perks: ['15x Voting Power', 'Stock Endowment Governance Role', '100% Mint Rebate Bounty']
  },
  member: {
    id: 'member',
    name: 'The Members',
    code: 'TIER 03',
    supply: 469,
    supplyPercentage: 14.07,
    votingPower: 5,
    role: 'The Sworn Squad Captains',
    tagline: 'Operational commanders, experienced analysts, and execution layer.',
    description: 'Each Member commands a squad of approximately 5–6 Rookies. Guiding tasks, reviewing community contributions, and earning a 1% Captain\'s Cut on squad member ascensions and awards.',
    artDirection: [
      'Tailored yet practical contemporary silhouettes',
      'Distinctive leadership accessories & urban fashion',
      'Confident, approachable, and versatile tactical styling'
    ],
    responsibilities: [
      'Guiding designated squads of 5-6 Rookies',
      'Reviewing community tasks and contributions',
      'Supporting Rookie development and ascension',
      'Encouraging disciplined participation'
    ],
    perks: ['5x Voting Power', 'Squad Captaincy', '1% Captain\'s Cut Commission']
  },
  rookie: {
    id: 'rookie',
    name: 'The Rookies',
    code: 'TIER 04',
    supply: 2662,
    supplyPercentage: 79.87,
    votingPower: 1,
    role: 'The Street Vanguard',
    tagline: 'The energetic and developing foundation of the community.',
    description: 'They enter the Cartel to learn, contribute, participate in educational activities, benefit from collective intelligence, and ascend into higher ranks via the 3-for-1 Ascension Protocol.',
    artDirection: [
      'Exclusive streetwear system & contemporary fashion',
      'Layered jackets, hoodies, and distinctive urban accessories',
      'Youthful energy with identical rendering quality as higher tiers'
    ],
    perks: ['1x Voting Power', 'Squad Mentorship & Education', 'Eligible for 3-for-1 Ascension']
  }
};

/**
 * Calculates mathematical breakdown of rookie squads:
 * 152 members supervising 5 rookies (760) + 317 members supervising 6 rookies (1902) = 2,662 Rookies.
 */
export function getSquadMathBreakdown() {
  const squadsOf5 = 152;
  const squadsOf6 = 317;
  const totalCaptains = squadsOf5 + squadsOf6;
  const rookiesInSquadsOf5 = squadsOf5 * 5;
  const rookiesInSquadsOf6 = squadsOf6 * 6;
  const totalRookies = rookiesInSquadsOf5 + rookiesInSquadsOf6;
  return {
    squadsOf5,
    squadsOf6,
    totalCaptains,
    rookiesInSquadsOf5,
    rookiesInSquadsOf6,
    totalRookies
  };
}

/**
 * Calculates voting weight based on tier
 */
export function getVotingPowerForTier(tier: TierId): number {
  return CARTEL_TIERS[tier]?.votingPower || 1;
}

/**
 * Calculates supply impact of Ascension Burn:
 * Burning 3 Rookie NFTs for 1 Member NFT reduces total collection supply by 2 NFTs.
 */
export function calculateAscensionSupplyImpact(
  currentSupply: number,
  ascensionsCount: number
): { newSupply: number; netReduction: number; burnedRookies: number; mintedMembers: number } {
  const burnedRookies = ascensionsCount * 3;
  const mintedMembers = ascensionsCount * 1;
  const netReduction = burnedRookies - mintedMembers; // 2 per ascension
  const newSupply = currentSupply - netReduction;
  return {
    newSupply,
    netReduction,
    burnedRookies,
    mintedMembers
  };
}

/**
 * Validate ascension prerequisites
 */
export function canAscend(rookieIds: number[]): { valid: boolean; reason?: string } {
  if (rookieIds.length !== 3) {
    return { valid: false, reason: 'Ascension requires precisely 3 Rookie NFTs.' };
  }
  const uniqueIds = new Set(rookieIds);
  if (uniqueIds.size !== 3) {
    return { valid: false, reason: 'Duplicate Rookie NFTs selected. All 3 must be distinct.' };
  }
  return { valid: true };
}

/**
 * Treasury config and assets
 */
export const TREASURY_INTENDED_ASSETS = [
  { symbol: 'NVDA', name: 'NVIDIA Tokenized Stock', type: 'tokenized_stock', status: 'AWAITING CONTRACT CONFIGURATION' },
  { symbol: 'TSLA', name: 'Tesla Tokenized Stock', type: 'tokenized_stock', status: 'AWAITING CONTRACT CONFIGURATION' },
  { symbol: 'AAPL', name: 'Apple Tokenized Stock', type: 'tokenized_stock', status: 'AWAITING CONTRACT CONFIGURATION' },
  { symbol: 'HOOD', name: 'Robinhood Markets Tokenized Stock', type: 'tokenized_stock', status: 'AWAITING CONTRACT CONFIGURATION' },
  { symbol: 'SPY', name: 'S&P 500 Tokenized Exposure', type: 'index', status: 'AWAITING CONTRACT CONFIGURATION' },
  { symbol: 'ETH', name: 'Ethereum Reserve', type: 'native_crypto', status: 'AWAITING CONTRACT CONFIGURATION' }
];

export const CONTRACT_DISCLOSURE = {
  chain: 'Robinhood Chain (EVM Compatible)',
  status: 'AWAITING CONTRACT CONFIGURATION',
  multisigType: 'Safe Multisig Architecture',
  royaltyContributionRate: '50% of secondary-market royalties',
  mintProceedsAllocation: 'A portion of initial mint proceeds (Awaiting Final Parameter)',
  legalNotice: 'Stock token exposure represents synthetic or derivative exposure and does not confer direct legal ownership of underlying common shares. Subject to jurisdiction-specific regulatory requirements.'
};
