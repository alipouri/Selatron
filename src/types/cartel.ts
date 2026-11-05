export type TierId = 'kingpin' | 'godmother' | 'member' | 'rookie';

export interface TierInfo {
  id: TierId;
  name: string;
  code: string;
  supply: number;
  supplyPercentage: number;
  votingPower: number;
  role: string;
  tagline: string;
  description: string;
  revealReward?: string;
  artDirection: string[];
  responsibilities?: string[];
  perks: string[];
}

export interface TreasuryAsset {
  symbol: string;
  name: string;
  type: 'tokenized_stock' | 'index' | 'native_crypto';
  contractStatus: 'AWAITING CONTRACT CONFIGURATION';
  allocationNotes: string;
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerTier: TierId;
  targetAsset: string;
  actionType: 'STOCK_PURCHASE' | 'TREASURY_POLICY' | 'GRANT_ALLOCATION';
  status: 'ACTIVE' | 'PASSED' | 'AWAITING_EXECUTION' | 'REJECTED';
  executionStatus: 'SNAPSHOT_OFFCHAIN_VOTE' | 'AWAITING_TREASURY_EXECUTION';
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  userVoted?: 'FOR' | 'AGAINST';
}

export interface MeritContribution {
  id: string;
  category: 'MARKET_ANALYSIS' | 'RESEARCH' | 'SQUAD_MANAGEMENT' | 'TOOLING' | 'EDUCATION' | 'CREATIVE';
  title: string;
  author: string;
  authorTier: TierId;
  date: string;
  status: 'PENDING_REVIEW' | 'EVALUATING' | 'APPROVED' | 'REJECTED';
  rewardStatus: 'AWAITING ON-CHAIN DATA';
  summary: string;
}

export interface SquadMember {
  id: number;
  tokenId: number;
  handle: string;
  joinedDate: string;
  activityScore: number;
  ascensionEligibility: boolean;
}

export interface CartelSquad {
  squadId: string;
  captainId: number;
  captainName: string;
  size: number;
  members: SquadMember[];
  captainCutPercent: number; // 1%
}

export interface CartelNFT {
  tokenId: number;
  tier: TierId;
  name: string;
  status: 'REVEALED' | 'SEALED';
  traits: {
    suit?: string;
    coat?: string;
    jewelry?: string;
    accessory?: string;
    squadRole?: string;
  };
  revealBountyEligible?: boolean;
}
