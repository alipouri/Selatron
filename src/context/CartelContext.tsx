import React, { createContext, useContext, useState, useEffect } from 'react';
import { TierId, GovernanceProposal, MeritContribution, CartelNFT } from '../types/cartel';
import { CARTEL_TIERS, TOTAL_INITIAL_SUPPLY, calculateAscensionSupplyImpact } from '../utils/cartelLogic';

export type AppRoute =
  | '/'
  | '/lore'
  | '/hierarchy'
  | '/collection'
  | '/collection/detail'
  | '/vault'
  | '/utilities'
  | '/utilities/stock-endowment'
  | '/utilities/bounties'
  | '/utilities/patronage'
  | '/utilities/merit'
  | '/utilities/trading-desk'
  | '/utilities/ascension'
  | '/community'
  | '/member';

export interface WalletPersona {
  id: string;
  label: string;
  address: string;
  tier: TierId;
  ownedNfts: CartelNFT[];
}

export const PRESET_PERSONAS: WalletPersona[] = [
  {
    id: 'kingpin-holder',
    label: 'Apex Architect (Kingpin)',
    address: '0x33A7...49F2',
    tier: 'kingpin',
    ownedNfts: [
      {
        tokenId: 14,
        tier: 'kingpin',
        name: 'DeadLock Kingpin #14',
        status: 'REVEALED',
        traits: { suit: 'Bespoke Charcoal Pinstripe', coat: 'Cashmere Heavy Overcoat', jewelry: 'Antique Gold Signet Ring', accessory: 'Cartel Seal Cane' },
        revealBountyEligible: true
      },
      {
        tokenId: 840,
        tier: 'member',
        name: 'DeadLock Member #840',
        status: 'REVEALED',
        traits: { suit: 'Tactical Navy Wool', accessory: 'Squad Commander Insignia', squadRole: 'Alpha Cohort Lead' }
      }
    ]
  },
  {
    id: 'godmother-holder',
    label: 'Matriarch (Godmother)',
    address: '0x88C1...E209',
    tier: 'godmother',
    ownedNfts: [
      {
        tokenId: 72,
        tier: 'godmother',
        name: 'DeadLock Godmother #72',
        status: 'REVEALED',
        traits: { suit: 'Structured Silk Crepe Suit', coat: 'Midnight Double-Faced Wool', jewelry: 'Cartel Sigil Pendant', accessory: 'Safe Multisig Key Holder' },
        revealBountyEligible: true
      }
    ]
  },
  {
    id: 'member-holder',
    label: 'Squad Captain (Member)',
    address: '0x49B2...7A18',
    tier: 'member',
    ownedNfts: [
      {
        tokenId: 295,
        tier: 'member',
        name: 'DeadLock Member #295',
        status: 'REVEALED',
        traits: { suit: 'Charcoal Minimalist Suit', accessory: 'Squad 19 Lead Insignia', squadRole: 'Squad Captain' }
      }
    ]
  },
  {
    id: 'rookie-holder',
    label: 'Street Vanguard (Rookie)',
    address: '0x71F3...902A',
    tier: 'rookie',
    ownedNfts: [
      {
        tokenId: 1204,
        tier: 'rookie',
        name: 'DeadLock Rookie #1204',
        status: 'REVEALED',
        traits: { suit: 'Layered Tech Hoodie', coat: 'Matte Black Anorak', accessory: 'Cartel Keycard' }
      },
      {
        tokenId: 1205,
        tier: 'rookie',
        name: 'DeadLock Rookie #1205',
        status: 'REVEALED',
        traits: { suit: 'Urban Heavy Fleece', coat: 'Structured Trench', accessory: 'Tactical Radio' }
      },
      {
        tokenId: 1206,
        tier: 'rookie',
        name: 'DeadLock Rookie #1206',
        status: 'REVEALED',
        traits: { suit: 'Utility Overshirt', coat: 'Quilted Vest', accessory: 'Vanguard Tag' }
      }
    ]
  }
];

export const INITIAL_PROPOSALS: GovernanceProposal[] = [
  {
    id: 'DLP-014',
    title: 'Proposal #014: Allocate Treasury Inflow to NVDA Tokenized Stock',
    description: 'Authorize the deployment of 50% secondary royalty accumulations into NVDA synthetic tokenized equity on Robinhood Chain upon Safe contract activation.',
    proposer: '0x33A7...49F2 (Kingpin #14)',
    proposerTier: 'kingpin',
    targetAsset: 'NVDA Tokenized Stock',
    actionType: 'STOCK_PURCHASE',
    status: 'ACTIVE',
    executionStatus: 'SNAPSHOT_OFFCHAIN_VOTE',
    deadline: 'In 3 Days',
    votesFor: 4850,
    votesAgainst: 120
  },
  {
    id: 'DLP-013',
    title: 'Proposal #013: Ratify 1% Captain Cut Settlement Smart Contract Spec',
    description: 'Off-chain consensus on automated execution parameter of the 1% Squad Captain commission on Rookie Ascension transformations.',
    proposer: '0x88C1...E209 (Godmother #72)',
    proposerTier: 'godmother',
    targetAsset: 'Governance Parameter',
    actionType: 'TREASURY_POLICY',
    status: 'ACTIVE',
    executionStatus: 'SNAPSHOT_OFFCHAIN_VOTE',
    deadline: 'In 5 Days',
    votesFor: 3210,
    votesAgainst: 45
  },
  {
    id: 'DLP-012',
    title: 'Proposal #012: Initial Allocation Pool for Tokenized SPY Exposure',
    description: 'Off-chain signaling vote on core index weighting strategy inside the DeadLock Stock Endowment safe wallet.',
    proposer: '0x49B2...7A18 (Member #295)',
    proposerTier: 'member',
    targetAsset: 'SPY Tokenized Exposure',
    actionType: 'STOCK_PURCHASE',
    status: 'PASSED',
    executionStatus: 'AWAITING_TREASURY_EXECUTION',
    deadline: 'Closed Oct 28',
    votesFor: 12400,
    votesAgainst: 310
  }
];

export const INITIAL_CONTRIBUTIONS: MeritContribution[] = [
  {
    id: 'MERIT-108',
    category: 'MARKET_ANALYSIS',
    title: 'Robinhood Chain Tokenized Equities: Liquidity & Custody Risk Breakdown',
    author: 'Vanguard_Analyst (Rookie #1204)',
    authorTier: 'rookie',
    date: 'Nov 02, 2026',
    status: 'APPROVED',
    rewardStatus: 'AWAITING ON-CHAIN DATA',
    summary: 'A 24-page analytical breakdown comparing synthetic stock tokens to direct custodian models on EVM rails.'
  },
  {
    id: 'MERIT-109',
    category: 'SQUAD_MANAGEMENT',
    title: 'Squad 19 Operational Curriculum: Week 4 Options Strategy Bootcamp',
    author: 'Captain_M295 (Member #295)',
    authorTier: 'member',
    date: 'Nov 03, 2026',
    status: 'EVALUATING',
    rewardStatus: 'AWAITING ON-CHAIN DATA',
    summary: 'Structured curriculum and 6-week mentorship track for squad apprentices on market mechanics.'
  },
  {
    id: 'MERIT-110',
    category: 'TOOLING',
    title: 'DeadLock Safe Multisig Watcher & Gasless Offchain Webhook Service',
    author: 'DevProtector (Rookie #1205)',
    authorTier: 'rookie',
    date: 'Nov 04, 2026',
    status: 'PENDING_REVIEW',
    rewardStatus: 'AWAITING ON-CHAIN DATA',
    summary: 'Open-source telemetry relay notifying Cartel Discord and portal members whenever Safe proposals update.'
  }
];

interface CartelContextType {
  route: AppRoute;
  setRoute: (route: AppRoute) => void;
  selectedNftDetail: CartelNFT | null;
  setSelectedNftDetail: (nft: CartelNFT | null) => void;
  
  // Wallet / Member state
  isConnected: boolean;
  selectedPersona: WalletPersona | null;
  connectWallet: (personaId?: string) => void;
  disconnectWallet: () => void;
  setPersona: (persona: WalletPersona) => void;
  
  // Dynamic supply and ascensions
  currentSupply: number;
  completedAscensions: number;
  executeAscensionSimulation: (rookieIds: number[]) => { success: boolean; newMemberTokenId: number };

  // Governance proposals
  proposals: GovernanceProposal[];
  castVote: (proposalId: string, direction: 'FOR' | 'AGAINST') => void;

  // Merit Exchange
  contributions: MeritContribution[];
  submitContribution: (data: Omit<MeritContribution, 'id' | 'date' | 'status' | 'rewardStatus'>) => void;

  // GTD modal
  isGtdModalOpen: boolean;
  setIsGtdModalOpen: (open: boolean) => void;

  // Vault notification
  notificationMessage: string | null;
  setNotificationMessage: (msg: string | null) => void;
}

const CartelContext = createContext<CartelContextType | undefined>(undefined);

export const CartelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const initialRoute: AppRoute = (rawPath && rawPath !== '/' ? rawPath : '/') as AppRoute;
  const [route, setRouteState] = useState<AppRoute>(initialRoute);
  const [selectedNftDetail, setSelectedNftDetail] = useState<CartelNFT | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [selectedPersona, setSelectedPersona] = useState<WalletPersona | null>(PRESET_PERSONAS[0]);
  const [completedAscensions, setCompletedAscensions] = useState<number>(0);
  const [proposals, setProposals] = useState<GovernanceProposal[]>(INITIAL_PROPOSALS);
  const [contributions, setContributions] = useState<MeritContribution[]>(INITIAL_CONTRIBUTIONS);
  const [isGtdModalOpen, setIsGtdModalOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync route with browser history / URL path
  const setRoute = (newRoute: AppRoute) => {
    setRouteState(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', newRoute);
    } catch {
      // Ignore in sandbox iframe if restricted
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      if (path) {
        setRouteState(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const connectWallet = (personaId?: string) => {
    const persona = PRESET_PERSONAS.find(p => p.id === personaId) || PRESET_PERSONAS[0];
    setSelectedPersona(persona);
    setIsConnected(true);
    setNotificationMessage(`Wallet connected: ${persona.address} (${persona.label})`);
    setTimeout(() => setNotificationMessage(null), 4000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setSelectedPersona(null);
    setNotificationMessage('Wallet disconnected.');
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const setPersona = (persona: WalletPersona) => {
    setSelectedPersona(persona);
    setIsConnected(true);
    setNotificationMessage(`Switched active membership persona to ${persona.label}`);
    setTimeout(() => setNotificationMessage(null), 3500);
  };

  const currentSupply = TOTAL_INITIAL_SUPPLY - (completedAscensions * 2);

  const executeAscensionSimulation = (rookieIds: number[]) => {
    const newMemberId = 470 + completedAscensions;
    setCompletedAscensions(prev => prev + 1);

    // If active persona has those rookie NFTs, remove them and append the new member NFT
    if (selectedPersona) {
      const updatedNfts = selectedPersona.ownedNfts.filter(nft => !rookieIds.includes(nft.tokenId));
      const mintedMember: CartelNFT = {
        tokenId: newMemberId,
        tier: 'member',
        name: `DeadLock Member #${newMemberId}`,
        status: 'REVEALED',
        traits: {
          suit: 'Ascended Tailored Black Blazer',
          accessory: 'Forged Captain Ring',
          squadRole: 'Newly Ascended Squad Captain'
        }
      };
      setSelectedPersona({
        ...selectedPersona,
        ownedNfts: [...updatedNfts, mintedMember]
      });
    }

    setNotificationMessage(`Ascension Protocol executed: 3 Rookies burned -> DeadLock Member #${newMemberId} issued. Supply reduced by 2.`);
    setTimeout(() => setNotificationMessage(null), 5000);

    return { success: true, newMemberTokenId: newMemberId };
  };

  const castVote = (proposalId: string, direction: 'FOR' | 'AGAINST') => {
    if (!isConnected || !selectedPersona) {
      setNotificationMessage('Please connect your EVM wallet to cast a governance vote.');
      setTimeout(() => setNotificationMessage(null), 4000);
      return;
    }

    const tier = selectedPersona.tier;
    const votingWeight = CARTEL_TIERS[tier].votingPower;

    setProposals(prev =>
      prev.map(p => {
        if (p.id !== proposalId) return p;
        if (p.userVoted) return p; // already voted

        return {
          ...p,
          votesFor: direction === 'FOR' ? p.votesFor + votingWeight : p.votesFor,
          votesAgainst: direction === 'AGAINST' ? p.votesAgainst + votingWeight : p.votesAgainst,
          userVoted: direction
        };
      })
    );

    setNotificationMessage(`Vote recorded via gasless Snapshot signature with ${votingWeight}x voting power (${CARTEL_TIERS[tier].name}).`);
    setTimeout(() => setNotificationMessage(null), 4500);
  };

  const submitContribution = (data: Omit<MeritContribution, 'id' | 'date' | 'status' | 'rewardStatus'>) => {
    const newId = `MERIT-${Math.floor(111 + Math.random() * 800)}`;
    const newContribution: MeritContribution = {
      ...data,
      id: newId,
      date: 'Today',
      status: 'PENDING_REVIEW',
      rewardStatus: 'AWAITING ON-CHAIN DATA'
    };
    setContributions(prev => [newContribution, ...prev]);
    setNotificationMessage(`Contribution ${newId} submitted for Cartel squad and matriarch review.`);
    setTimeout(() => setNotificationMessage(null), 4500);
  };

  return (
    <CartelContext.Provider
      value={{
        route,
        setRoute,
        selectedNftDetail,
        setSelectedNftDetail,
        isConnected,
        selectedPersona,
        connectWallet,
        disconnectWallet,
        setPersona,
        currentSupply,
        completedAscensions,
        executeAscensionSimulation,
        proposals,
        castVote,
        contributions,
        submitContribution,
        isGtdModalOpen,
        setIsGtdModalOpen,
        notificationMessage,
        setNotificationMessage
      }}
    >
      {children}
    </CartelContext.Provider>
  );
};

export const useCartel = () => {
  const context = useContext(CartelContext);
  if (!context) {
    throw new Error('useCartel must be used within a CartelProvider');
  }
  return context;
};
