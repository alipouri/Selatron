import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';
import { CartelInsignia } from '../common/CartelInsignia';

export const CommunitySection: React.FC = () => {
  const { setIsGtdModalOpen, setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="community"
      className="py-36 md:py-52 px-6 md:px-14 max-w-[1440px] mx-auto border-t border-[#202020]"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: easeEditorial }}
        className="max-w-3xl mx-auto text-center space-y-10"
      >
        <div className="flex justify-center">
          <CartelInsignia size={42} />
        </div>

        <div className="space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#8D7954] block">
            04 / THE BROTHERHOOD
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[#F4F0E8] leading-[1.08] tracking-[0.02em] text-balance">
            THE CARTEL TAKES CARE OF ITS OWN.
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <button
            onClick={() => setIsGtdModalOpen(true)}
            className="px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#171717] bg-[#B69A67] hover:bg-[#c5a975] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Apply For GTD Clearance
          </button>

          <button
            onClick={() => setRoute('/member')}
            className="px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E6DFD1] border border-[#343434] hover:border-[#8D7954] hover:text-[#F4F0E8] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Enter The Portal
          </button>

          <a
            href="https://x.com/DeadLockCartel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 text-[11px] font-mono uppercase tracking-[0.22em] text-[#77736B] hover:text-[#E6DFD1] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            @DeadLockCartel →
          </a>
        </div>
      </motion.div>
    </section>
  );
};
