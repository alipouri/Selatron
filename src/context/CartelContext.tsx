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
    label: 'Preview Mode: Kingpin (50x)',
    address: 'AWAITING CONFIGURATION',
    tier: 'kingpin',
    ownedNfts: [
      {
        tokenId: 1,
        tier: 'kingpin',
        name: 'Kingpin Placeholder #01',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished' },
        revealBountyEligible: true
      }
    ]
  },
  {
    id: 'godmother-holder',
    label: 'Preview Mode: Godmother (15x)',
    address: 'AWAITING CONFIGURATION',
    tier: 'godmother',
    ownedNfts: [
      {
        tokenId: 34,
        tier: 'godmother',
        name: 'Godmother Placeholder #34',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished' },
        revealBountyEligible: true
      }
    ]
  },
  {
    id: 'member-holder',
    label: 'Preview Mode: Member (5x)',
    address: 'AWAITING CONFIGURATION',
    tier: 'member',
    ownedNfts: [
      {
        tokenId: 203,
        tier: 'member',
        name: 'Member Placeholder #203',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished', squadRole: 'Sworn Squad Captain' }
      }
    ]
  },
  {
    id: 'rookie-holder',
    label: 'Preview Mode: Rookie (1x)',
    address: 'AWAITING CONFIGURATION',
    tier: 'rookie',
    ownedNfts: [
      {
        tokenId: 1204,
        tier: 'rookie',
        name: 'Rookie Placeholder #1204',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished' }
      },
      {
        tokenId: 1205,
        tier: 'rookie',
        name: 'Rookie Placeholder #1205',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished' }
      },
      {
        tokenId: 1206,
        tier: 'rookie',
        name: 'Rookie Placeholder #1206',
        status: 'SEALED',
        traits: { suit: 'Artwork Placeholder — Unpublished' }
      }
    ]
  }
];

export const INITIAL_PROPOSALS: GovernanceProposal[] = [];

export const INITIAL_CONTRIBUTIONS: MeritContribution[] = [];

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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<WalletPersona | null>(null);
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
