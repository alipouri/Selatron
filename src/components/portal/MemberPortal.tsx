import React, { useState } from 'react';
import { useCartel, PRESET_PERSONAS } from '../../context/CartelContext';
import { CARTEL_TIERS } from '../../utils/cartelLogic';
import { ArtworkVisual } from '../common/ArtworkVisual';
import { CartelInsignia } from '../common/CartelInsignia';
import {
  LayoutDashboard,
  Layers,
  TrendingUp,
  Users,
  Award,
  Landmark,
  ShieldCheck,
  Flame,
  Wallet,
  Bell,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Home
} from 'lucide-react';

export const MemberPortal: React.FC = () => {
  const {
    setRoute,
    isConnected,
    selectedPersona,
    setPersona,
    connectWallet,
    disconnectWallet,
    currentSupply,
    completedAscensions,
    executeAscensionSimulation,
    setSelectedNftDetail,
    proposals,
    castVote,
    contributions,
    submitContribution
  } = useCartel();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'collection' | 'trading-desk' | 'squad' | 'merit' | 'vault-rewards'
  >('overview');

  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);
  const [newMeritTitle, setNewMeritTitle] = useState('');
  const [newMeritCategory, setNewMeritCategory] = useState<'MARKET_ANALYSIS' | 'RESEARCH' | 'SQUAD_MANAGEMENT' | 'TOOLING' | 'EDUCATION' | 'CREATIVE'>('MARKET_ANALYSIS');
  const [newMeritSummary, setNewMeritSummary] = useState('');
  const [activeAscensionSlots, setActiveAscensionSlots] = useState<number[]>([1204, 1205, 1206]);

  const tier = selectedPersona ? CARTEL_TIERS[selectedPersona.tier] : CARTEL_TIERS['rookie'];

  const sidebarItems = [
    { id: 'overview', label: '01. Overview', icon: LayoutDashboard },
    { id: 'collection', label: '02. My Collection', icon: Layers },
    { id: 'trading-desk', label: '03. Trading Desk', icon: TrendingUp },
    { id: 'squad', label: '04. My Squad', icon: Users },
    { id: 'merit', label: '05. Merit Exchange', icon: Award },
    { id: 'vault-rewards', label: '06. Vault & Rewards', icon: Landmark }
  ] as const;

  // Non-connected state prompt
  if (!isConnected || !selectedPersona) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#1e1c18] border border-[#B69A67]/40 flex items-center justify-center text-[#B69A67]">
          <Wallet size={28} />
        </div>
        <h1 className="text-3xl font-display font-bold text-[#F4F0E8]">
          PRIVATE MEMBER ACCESS
        </h1>
        <p className="text-xs text-[#77736B] leading-relaxed">
          The Private Headquarters is accessible only to verified holders on the Robinhood Chain. Connect your EVM wallet or select a simulated persona to inspect member functionality.
        </p>

        <div className="pt-4 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#B69A67] block">
            Select Testnet Persona:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESET_PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => connectWallet(p.id)}
                className="p-3 bg-[#181818] border border-[#272727] hover:border-[#B69A67] text-left rounded-sm transition-all cursor-pointer"
              >
                <div className="text-xs font-semibold text-[#F4F0E8]">{p.label}</div>
                <div className="text-[10px] font-mono text-[#77736B] mt-0.5">{p.address}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={() => setRoute('/')}
            className="text-xs text-[#77736B] hover:text-[#E6DFD1] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Home size={14} />
            <span>Return to Public Website</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-[#E6DFD1] flex flex-col pt-16">
      {/* Top Bar Contract for Member Portal */}
      <header className="sticky top-0 z-40 bg-[#171717] border-b border-[#242424] px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Cartel Monogram & Portal Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRoute('/')}
            className="flex items-center gap-2 group cursor-pointer"
            title="Return to Public Website"
          >
            <CartelInsignia size={24} />
            <span className="font-display font-bold text-sm text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors">
              HEADQUARTERS
            </span>
          </button>
          <span className="text-[#333] hidden sm:inline">|</span>
          <span className="text-[11px] font-mono text-[#8D7954] hidden sm:inline">
            ROBINHOOD CHAIN EVM
          </span>
        </div>

        {/* Right: Persona Switcher, Connected Address, Exit to Public */}
        <div className="flex items-center gap-3">
          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
              className="px-3 py-1.5 bg-[#1b1b1b] border border-[#2d2d2d] hover:border-[#8D7954] rounded-sm text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#B69A67]" />
              <span className="font-mono text-[#F4F0E8] font-medium hidden sm:inline">{selectedPersona.label}</span>
              <span className="font-mono text-[#F4F0E8] font-medium sm:hidden">{selectedPersona.tier.toUpperCase()}</span>
              <ChevronDown size={14} className="text-[#77736B]" />
            </button>

            {isPersonaMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#333] shadow-2xl rounded-sm py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#77736B] border-b border-[#242424]">
                  Simulate Membership Rank:
                </div>
                {PRESET_PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPersona(p);
                      setIsPersonaMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#252525] cursor-pointer ${
                      selectedPersona.id === p.id ? 'text-[#B69A67] font-semibold bg-[#202020]' : 'text-[#E6DFD1]'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="font-mono text-[10px] text-[#77736B]">{p.tier}</span>
                  </button>
                ))}
                <div className="border-t border-[#242424] mt-1 pt-1">
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setIsPersonaMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#562C32] hover:text-[#d97c88] cursor-pointer"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setRoute('/')}
            className="px-3 py-1.5 text-xs text-[#77736B] hover:text-[#F4F0E8] transition-colors cursor-pointer border border-transparent hover:border-[#292929] rounded-sm"
          >
            Public Site
          </button>
        </div>
      </header>

      {/* Main Portal Body: Persistent Sidebar + Content View */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="w-full md:w-64 bg-[#161616] border-b md:border-b-0 md:border-r border-[#242424] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* User Identity Card */}
            <div className="p-3.5 bg-[#121212] border border-[#242424] rounded-sm space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#77736B] block">Protector Identity</span>
              <div className="font-display font-bold text-sm text-[#F4F0E8] flex items-center justify-between">
                <span>{tier.name}</span>
                <span className="text-xs font-mono text-[#B69A67]">{tier.votingPower}x</span>
              </div>
              <div className="text-[11px] font-mono text-[#77736B] truncate">
                {selectedPersona.address}
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1" aria-label="Member Portal Modules">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs rounded-sm transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#222222] text-[#F4F0E8] border border-[#333] font-semibold'
                        : 'text-[#77736B] hover:text-[#E6DFD1] hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-[#B69A67]' : 'text-[#77736B]'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 border-t border-[#222222] space-y-2 text-[11px] font-mono text-[#77736B]">
            <div className="flex justify-between">
              <span>Collection Supply</span>
              <span className="text-[#F4F0E8] tabular-nums">{currentSupply} / 3,333</span>
            </div>
            <div className="flex justify-between">
              <span>Ascensions Burned</span>
              <span className="text-[#B69A67] tabular-nums">{completedAscensions}</span>
            </div>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-8">
          {/* ========================================================================= */}
          {/* VIEW 01: OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    MEMBER HEADQUARTERS
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    COMMAND OVERVIEW
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#77736B]">
                  Logged as: <strong className="text-[#E6DFD1]">{selectedPersona.label}</strong>
                </div>
              </div>

              {/* 4 KPI Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-[#181818] border border-[#272727] rounded-sm space-y-1">
                  <span className="text-[11px] font-mono text-[#77736B] uppercase">Connected Rank</span>
                  <div className="text-lg font-display font-bold text-[#F4F0E8]">{tier.name}</div>
                  <span className="text-[10px] font-mono text-[#B69A67]">{tier.code}</span>
                </div>

                <div className="p-5 bg-[#181818] border border-[#272727] rounded-sm space-y-1">
                  <span className="text-[11px] font-mono text-[#77736B] uppercase">Voting Power</span>
                  <div className="text-xl font-mono font-bold text-[#B69A67] tabular-nums">{tier.votingPower}x Weight</div>
                  <span className="text-[10px] font-mono text-[#77736B]">Snapshot Signatures</span>
                </div>

                <div className="p-5 bg-[#181818] border border-[#272727] rounded-sm space-y-1">
                  <span className="text-[11px] font-mono text-[#77736B] uppercase">Owned Cartel NFTs</span>
                  <div className="text-xl font-mono font-bold text-[#F4F0E8] tabular-nums">
                    {selectedPersona.ownedNfts.length} Assets
                  </div>
                  <span className="text-[10px] font-mono text-[#77736B]">Verified in Wallet</span>
                </div>

                <div className="p-5 bg-[#181818] border border-[#272727] rounded-sm space-y-1">
                  <span className="text-[11px] font-mono text-[#77736B] uppercase">Stock Endowment</span>
                  <div className="text-xs font-mono text-[#E6DFD1] pt-1">AWAITING ON-CHAIN DATA</div>
                  <span className="text-[10px] font-mono text-[#8D7954]">Safe Multisig</span>
                </div>
              </div>

              {/* Fast Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
                  <h3 className="text-sm font-display font-bold text-[#F4F0E8] uppercase tracking-wider">
                    Quick Governance Actions
                  </h3>
                  <p className="text-xs text-[#77736B] leading-relaxed">
                    {proposals.filter((p) => p.status === 'ACTIVE' && !p.userVoted).length} active weekly stock purchase proposals are awaiting your signed vote on Robinhood Chain.
                  </p>
                  <button
                    onClick={() => setActiveTab('trading-desk')}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer"
                  >
                    Cast Snapshot Vote
                  </button>
                </div>

                <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
                  <h3 className="text-sm font-display font-bold text-[#F4F0E8] uppercase tracking-wider">
                    Ascension Protocol Status
                  </h3>
                  <p className="text-xs text-[#77736B] leading-relaxed">
                    You hold {selectedPersona.ownedNfts.filter((n) => n.tier === 'rookie').length} Rookie NFTs. Three rookies can be burned into the crucible to forge one Member rank NFT.
                  </p>
                  <button
                    onClick={() => setActiveTab('collection')}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#E6DFD1] bg-[#222222] hover:bg-[#2b2b2b] border border-[#2e2e2e] rounded-sm transition-colors cursor-pointer"
                  >
                    Review Collection & Forge
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 02: MY COLLECTION */}
          {/* ========================================================================= */}
          {activeTab === 'collection' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    ASSET INVENTORY
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    MY COLLECTION ({selectedPersona.ownedNfts.length})
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#77736B]">
                  Connected Wallet: <strong className="text-[#E6DFD1]">{selectedPersona.address}</strong>
                </div>
              </div>

              {selectedPersona.ownedNfts.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[#262626] rounded-sm text-xs text-[#77736B]">
                  No NFTs currently detected in this connected wallet address.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPersona.ownedNfts.map((nft) => (
                    <div
                      key={nft.tokenId}
                      className="p-4 bg-[#181818] border border-[#272727] rounded-sm space-y-4"
                    >
                      <div className="w-full aspect-[3/4] overflow-hidden rounded-xs">
                        <ArtworkVisual type={nft.tier} aspect="3:4" title={nft.name} />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono text-[#77736B]">
                          <span className="uppercase text-[#B69A67]">{nft.tier}</span>
                          <span>ID #{nft.tokenId}</span>
                        </div>
                        <h3 className="text-sm font-display font-bold text-[#F4F0E8]">{nft.name}</h3>

                        <div className="pt-2 grid grid-cols-2 gap-1.5 text-[11px]">
                          {nft.traits.suit && (
                            <div className="p-1.5 bg-[#141414] border border-[#222] rounded-xs text-[#77736B] truncate">
                              {nft.traits.suit}
                            </div>
                          )}
                          {nft.traits.accessory && (
                            <div className="p-1.5 bg-[#141414] border border-[#222] rounded-xs text-[#77736B] truncate">
                              {nft.traits.accessory}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#B69A67]">
                          {CARTEL_TIERS[nft.tier].votingPower}x Voting Weight
                        </span>
                        <button
                          onClick={() => setSelectedNftDetail(nft)}
                          className="text-[11px] text-[#E6DFD1] hover:text-[#B69A67] font-semibold uppercase cursor-pointer"
                        >
                          Inspect &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 03: TRADING DESK */}
          {/* ========================================================================= */}
          {activeTab === 'trading-desk' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    GOVERNANCE & ASSET PURCHASES
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    THE TRADING DESK
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#B69A67] px-3 py-1 bg-[#1e1c18] border border-[#382f1f] rounded-sm">
                  Active Voting Weight: {tier.votingPower}x ({tier.name})
                </div>
              </div>

              {/* Proposals List */}
              <div className="space-y-6">
                {proposals.map((prop) => {
                  const totalVotes = prop.votesFor + prop.votesAgainst;
                  const forPercent = totalVotes > 0 ? Math.round((prop.votesFor / totalVotes) * 100) : 0;

                  return (
                    <div key={prop.id} className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#B69A67]">
                          <span>{prop.id}</span>
                          <span>·</span>
                          <span className="text-[#77736B]">{prop.targetAsset}</span>
                        </div>
                        <span className="text-xs font-mono text-[#77736B]">{prop.deadline}</span>
                      </div>

                      <h3 className="text-base font-display font-bold text-[#F4F0E8]">{prop.title}</h3>
                      <p className="text-xs text-[#77736B] leading-relaxed">{prop.description}</p>

                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#E6DFD1]">For: {prop.votesFor.toLocaleString()} ({forPercent}%)</span>
                          <span className="text-[#77736B]">Against: {prop.votesAgainst.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-[#141414] rounded-full overflow-hidden flex">
                          <div className="bg-[#B69A67] h-full" style={{ width: `${forPercent}%` }} />
                          <div className="bg-[#562C32] h-full" style={{ width: `${100 - forPercent}%` }} />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#77736B]">
                          Snapshot Off-Chain Signature
                        </span>
                        {prop.userVoted ? (
                          <span className="text-xs font-mono text-[#B69A67] bg-[#221f19] px-3 py-1 border border-[#3b3220] rounded-sm">
                            Voted: {prop.userVoted}
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => castVote(prop.id, 'FOR')}
                              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm transition-colors cursor-pointer"
                            >
                              Vote For ({tier.votingPower}x)
                            </button>
                            <button
                              onClick={() => castVote(prop.id, 'AGAINST')}
                              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E6DFD1] bg-[#222222] hover:bg-[#2b2b2b] border border-[#2e2e2e] rounded-sm transition-colors cursor-pointer"
                            >
                              Vote Against
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 04: MY SQUAD */}
          {/* ========================================================================= */}
          {activeTab === 'squad' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    PATRONAGE CADRE
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    MY SQUAD (COHORT ALPHA-19)
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#8D7954]">
                  Supervision: 6 Rookies · 1% Captain&apos;s Cut Active
                </div>
              </div>

              {/* Squad Header Card */}
              <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#B69A67] uppercase">Designated Commander</span>
                  <div className="text-base font-display font-bold text-[#F4F0E8]">
                    Captain_M295 (DeadLock Member #295)
                  </div>
                  <p className="text-xs text-[#77736B]">
                    Assigned cohort of 6 Rookies on Robinhood Chain track.
                  </p>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div>
                    <span className="text-[#77736B] block">ACCRUED CUT</span>
                    <span className="text-[#B69A67] font-bold text-base">Awaiting On-Chain Data</span>
                  </div>
                  <div>
                    <span className="text-[#77736B] block">SQUAD SIZE</span>
                    <span className="text-[#F4F0E8] font-bold text-base">6 Rookies</span>
                  </div>
                </div>
              </div>

              {/* 6 Assigned Squad Members */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#B69A67]">
                  Assigned Rookies
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 1204, handle: 'Vanguard_Analyst', status: 'Active Research', score: 94 },
                    { id: 1205, handle: 'DevProtector', status: 'Multisig Watcher Staged', score: 88 },
                    { id: 1206, handle: 'AlphaRookie_06', status: 'Bootcamp Week 4', score: 76 },
                    { id: 1410, handle: 'MarketScout_2', status: 'Weekly Briefing', score: 82 },
                    { id: 1891, handle: 'EquityProtector', status: 'Ascension Ready', score: 98 },
                    { id: 2201, handle: 'RH_Specialist', status: 'Liquidity Review', score: 79 }
                  ].map((m) => (
                    <div key={m.id} className="p-4 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#F4F0E8] font-bold">Rookie #{m.id}</span>
                        <span className="text-[#B69A67] text-[10px]">Score {m.score}/100</span>
                      </div>
                      <p className="text-xs text-[#E6DFD1] font-medium">{m.handle}</p>
                      <div className="pt-2 border-t border-[#222] flex justify-between text-[11px] text-[#77736B]">
                        <span>Status: {m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 05: MERIT EXCHANGE */}
          {/* ========================================================================= */}
          {activeTab === 'merit' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    VALUE CREATION ENGINE
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    THE MERIT EXCHANGE
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#77736B]">
                  Weekly Fractional Stock Rewards & Grants
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 bg-[#181818] border border-[#272727] rounded-sm p-6 space-y-4">
                  <h3 className="text-sm font-display font-bold text-[#F4F0E8]">
                    Submit Proof of Merit
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newMeritTitle || !newMeritSummary) return;
                      submitContribution({
                        category: newMeritCategory,
                        title: newMeritTitle,
                        summary: newMeritSummary,
                        author: `${selectedPersona.label} (${selectedPersona.address})`,
                        authorTier: selectedPersona.tier
                      });
                      setNewMeritTitle('');
                      setNewMeritSummary('');
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-[#77736B] uppercase mb-1">
                        Category
                      </label>
                      <select
                        value={newMeritCategory}
                        onChange={(e) => setNewMeritCategory(e.target.value as any)}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-xs text-[#E6DFD1] rounded-sm"
                      >
                        <option value="MARKET_ANALYSIS">Market Analysis</option>
                        <option value="RESEARCH">Chain Research</option>
                        <option value="SQUAD_MANAGEMENT">Squad Management</option>
                        <option value="TOOLING">Technical Tooling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#77736B] uppercase mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newMeritTitle}
                        onChange={(e) => setNewMeritTitle(e.target.value)}
                        placeholder="Deliverable title"
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-xs text-[#E6DFD1] rounded-sm"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#77736B] uppercase mb-1">
                        Summary
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={newMeritSummary}
                        onChange={(e) => setNewMeritSummary(e.target.value)}
                        placeholder="Value created for the Cartel..."
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-xs text-[#E6DFD1] rounded-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] rounded-sm cursor-pointer"
                    >
                      File Merit Submission
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <h3 className="text-sm font-display font-bold text-[#F4F0E8]">
                    Submission History
                  </h3>
                  <div className="space-y-3">
                    {contributions.map((c) => (
                      <div key={c.id} className="p-4 bg-[#181818] border border-[#272727] rounded-sm space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#B69A67]">{c.id} · {c.category}</span>
                          <span className="text-[10px] text-[#77736B]">{c.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#F4F0E8]">{c.title}</h4>
                        <p className="text-[11px] text-[#77736B] leading-relaxed">{c.summary}</p>
                        <div className="pt-2 border-t border-[#222] flex justify-between text-[10px] font-mono">
                          <span className="text-[#77736B]">Reward Status: {c.rewardStatus}</span>
                          <span className="text-[#8D7954]">{c.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 06: VAULT & REWARDS */}
          {/* ========================================================================= */}
          {activeTab === 'vault-rewards' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#242424]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B69A67]">
                    ENDOWMENT & REWARDS
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F4F0E8]">
                    VAULT & REWARD SETTLEMENT
                  </h1>
                </div>
                <div className="text-xs font-mono text-[#8D7954]">
                  Safe Multisig: Awaiting Contract Configuration
                </div>
              </div>

              {/* Reveal Bounty Eligibility Card */}
              <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B69A67] font-bold">REVEAL VAULT STATUS</span>
                  <span className="text-[#77736B]">Delayed Reveal Mechanism</span>
                </div>

                <div className="p-4 bg-[#141414] border border-[#242424] rounded-sm space-y-2">
                  <span className="text-xs font-bold text-[#F4F0E8] block">
                    {selectedPersona.tier === 'kingpin'
                      ? 'High-Multiplier Kingpin Bounty Eligible'
                      : selectedPersona.tier === 'godmother'
                      ? '100% Mint Rebate Eligible'
                      : 'Standard Reveal Tier'}
                  </span>
                  <p className="text-xs text-[#77736B]">
                    {selectedPersona.tier === 'kingpin'
                      ? 'Your Kingpin asset is designated for instant high-multiplier settlement in ETH or tokenized stocks upon contract activation.'
                      : selectedPersona.tier === 'godmother'
                      ? 'Your Godmother asset is designated for full 100% mint rebate reimbursement upon reveal.'
                      : 'Rookies and Members participate in weekly Merit Exchange dividends and 1% Captain commissions.'}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-[#8D7954]">
                    Claim Status: Awaiting On-Chain Data & Contract Settlement
                  </div>
                </div>
              </div>

              {/* Treasury Holdings Honest State */}
              <div className="p-6 bg-[#181818] border border-[#272727] rounded-sm space-y-4">
                <h3 className="text-sm font-display font-bold text-[#F4F0E8]">
                  Safe Multisig Portfolio
                </h3>
                <div className="p-8 text-center border border-dashed border-[#242424] rounded-sm space-y-2">
                  <span className="text-xs font-mono text-[#B69A67] block">
                    AWAITING ON-CHAIN DATA
                  </span>
                  <p className="text-xs text-[#77736B] max-w-md mx-auto">
                    Live balance queries and transaction feeds will populate automatically once the Safe contract address on Robinhood Chain is deployed and linked.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
