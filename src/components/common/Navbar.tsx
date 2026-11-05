import React, { useState, useEffect } from 'react';
import { useCartel, AppRoute } from '../../context/CartelContext';
import { CartelInsignia } from './CartelInsignia';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { route, setRoute, isConnected, selectedPersona } = useCartel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'The Lore', route: '/lore' },
    { label: 'Hierarchy', route: '/hierarchy' },
    { label: 'Collection', route: '/collection' },
    { label: 'The Vault', route: '/vault' },
    { label: 'Utilities', route: '/utilities' }
  ];

  const handleNavClick = (targetRoute: AppRoute) => {
    setRoute(targetRoute);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#171717]/90 backdrop-blur-md border-b border-[#343434]/40 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus-visible:outline-none"
          aria-label="DeadLock Cartel Homepage"
        >
          <CartelInsignia size={26} className="transition-transform duration-500 group-hover:scale-105" />
          <span className="font-display font-semibold text-sm md:text-base tracking-[0.22em] text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors whitespace-nowrap shrink-0">
            DEADLOCK CARTEL
          </span>
        </button>

        {/* Zone 2: Minimal Editorial Nav Links */}
        <nav
          className="hidden lg:flex items-center gap-10 text-[11px] tracking-[0.24em] font-medium uppercase text-[#77736B]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = route === link.route || (link.route !== '/' && route.startsWith(link.route));
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors duration-300 whitespace-nowrap shrink-0 hover:text-[#F4F0E8] cursor-pointer py-1 relative ${
                  isActive ? 'text-[#F4F0E8]' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-[#B69A67]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden sm:flex items-center gap-6 shrink-0">
          <button
            onClick={() => handleNavClick('/member')}
            className="px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F4F0E8] border border-[#343434] hover:border-[#B69A67] hover:text-[#B69A67] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            {isConnected && selectedPersona
              ? `Portal · ${selectedPersona.tier.toUpperCase()}`
              : 'Enter The Portal'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#E6DFD1] hover:text-[#B69A67] cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#171717]/98 border-b border-[#343434]/50 px-6 py-8 animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 text-xs font-medium tracking-[0.22em] uppercase text-[#77736B]">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`text-left py-2 hover:text-[#F4F0E8] border-b border-[#202020] cursor-pointer ${
                  route === link.route ? 'text-[#B69A67]' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('/community')}
              className="text-left py-2 hover:text-[#F4F0E8] border-b border-[#202020] cursor-pointer"
            >
              Community
            </button>
            <button
              onClick={() => handleNavClick('/member')}
              className="mt-3 w-full text-center py-3 px-4 text-xs font-medium uppercase tracking-[0.2em] text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] cursor-pointer"
            >
              Enter The Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
