import React, { useState, useEffect } from 'react';
import { useCartel, AppRoute } from '../../context/CartelContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { route, setRoute } = useCartel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'The Lore', route: '/lore' },
    { label: 'Hierarchy', route: '/hierarchy' },
    { label: 'Collection', route: '/collection' },
    { label: 'The Vault', route: '/vault' },
    { label: 'Utilities', route: '/utilities' },
    { label: 'Community', route: '/community' }
  ];

  const handleNavClick = (targetRoute: AppRoute) => {
    setRoute(targetRoute);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#171717]/95 border-b border-[rgba(230,223,209,0.14)] py-4'
          : 'bg-transparent border-b border-[rgba(230,223,209,0.14)] py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between gap-6">
        {/* Wordmark + Site Icon: DEADLOCK CARTEL */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left cursor-pointer group shrink-0 flex items-center gap-3"
          aria-label="DEADLOCK CARTEL Homepage"
        >
          <img
            src="./deadlock-cartel-mark.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 shrink-0"
          />
          <span className="font-display font-normal text-lg sm:text-xl tracking-[0.22em] text-[#F4F0E8] group-hover:text-[#B69A67] transition-colors whitespace-nowrap">
            DEADLOCK CARTEL
          </span>
        </button>

        {/* Desktop Navigation: 6 items */}
        <nav
          className="hidden xl:flex items-center gap-8 text-[11px] tracking-[0.22em] uppercase text-[#A39E92]"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              route === link.route || (link.route !== '/' && route.startsWith(link.route));
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`transition-colors duration-200 whitespace-nowrap shrink-0 hover:text-[#F4F0E8] cursor-pointer py-1 relative ${
                  isActive ? 'text-[#F4F0E8]' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#B69A67]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Member Access Button */}
        <div className="hidden xl:flex items-center shrink-0">
          <button
            onClick={() => handleNavClick('/member')}
            className="px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F4F0E8] border border-[rgba(230,223,209,0.14)] hover:border-[#B69A67] hover:text-[#B69A67] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Member Access
          </button>
        </div>

        {/* Mobile / Tablet Full-Screen Menu Toggle */}
        <div className="flex xl:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#F4F0E8] hover:text-[#B69A67] cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile & Tablet Menu */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="xl:hidden fixed inset-x-0 top-[61px] bottom-0 min-h-[calc(100vh-61px)] bg-[#171717] z-50 px-6 sm:px-10 py-10 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col divide-y divide-[rgba(230,223,209,0.14)] border-y border-[rgba(230,223,209,0.14)]">
            {navLinks.map((link, idx) => {
              const isActive = route === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className="py-5 flex items-baseline justify-between text-left group cursor-pointer"
                >
                  <span
                    className={`font-display text-3xl sm:text-4xl font-light tracking-[0.04em] transition-colors ${
                      isActive ? 'text-[#B69A67]' : 'text-[#F4F0E8] group-hover:text-[#B69A67]'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#A39E92] tabular-nums">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-8 space-y-6">
            <button
              onClick={() => handleNavClick('/member')}
              className="w-full py-4 px-6 text-xs font-medium uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#8D7954] transition-colors cursor-pointer text-center"
            >
              Member Access
            </button>

            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#A39E92]">
              <span>ROBINHOOD CHAIN</span>
              <span>@DeadLockCartel</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
