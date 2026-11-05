/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartelProvider, useCartel } from './context/CartelContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GTDModal } from './components/common/GTDModal';
import { NFTDetailModal } from './components/common/NFTDetailModal';
import { HeroSection } from './components/public/HeroSection';
import { ManifestoSection } from './components/public/ManifestoSection';
import { CollectionSection } from './components/public/CollectionSection';
import { SixPillarsSection } from './components/public/SixPillarsSection';
import { CommunitySection } from './components/public/CommunitySection';
import { DedicatedPages } from './components/public/DedicatedPages';
import { MemberPortal } from './components/portal/MemberPortal';
import { CheckCircle2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { route, notificationMessage } = useCartel();

  const isPortal = route === '/member';

  return (
    <div className="min-h-screen bg-[#171717] text-[#E6DFD1] flex flex-col selection:bg-[#B69A67]/20 selection:text-[#F4F0E8]">
      {/* Global Toast Notification */}
      {notificationMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1e1c18] border border-[#B69A67]/60 text-[#F4F0E8] px-4 py-3 rounded-sm shadow-2xl flex items-center gap-3 text-xs font-mono animate-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 size={16} className="text-[#B69A67] shrink-0" />
          <span>{notificationMessage}</span>
        </aside>
      )}

      {/* Public Navbar (Hidden inside standalone Member Portal) */}
      {!isPortal && <Navbar />}

      {/* Main Content Router */}
      <div className="flex-1">
        {isPortal ? (
          <MemberPortal />
        ) : route === '/' ? (
          <main>
            <HeroSection />
            <ManifestoSection />
            <CollectionSection />
            <SixPillarsSection />
            <CommunitySection />
          </main>
        ) : (
          <main>
            <DedicatedPages />
          </main>
        )}
      </div>

      {/* Public Footer (Hidden inside standalone Member Portal) */}
      {!isPortal && <Footer />}

      {/* Modals */}
      <GTDModal />
      <NFTDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <CartelProvider>
      <MainApp />
    </CartelProvider>
  );
}
