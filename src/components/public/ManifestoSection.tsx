import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';

export const ManifestoSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const easeEditorial: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="manifesto"
      className="py-32 md:py-48 px-6 md:px-14 max-w-[1440px] mx-auto border-t border-[#202020]"
    >
      {/* Chapter Metadata */}
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.28em] text-[#77736B] mb-16">
        <span>01 / THE MANIFESTO</span>
        <span className="hidden sm:inline text-[#8D7954]">COLLECTIVE SOVEREIGNTY</span>
      </div>

      {/* Asymmetrical Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        {/* Left: Large Cinematic Alliance Composition (Cols 1-7) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: easeEditorial }}
          className="lg:col-span-7 relative overflow-hidden bg-[#141414]"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              initial={shouldReduceMotion ? false : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.35, ease: easeEditorial }}
              src="/src/assets/images/manifesto_alliance_portrait_1793866256902.jpg"
              alt="Four members of the DeadLock Cartel standing in quiet unity in bespoke dark wool coats"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent pointer-events-none" />
          <div className="pt-3 flex items-center justify-between text-[10px] font-mono tracking-[0.22em] text-[#77736B] uppercase">
            <span>FIG. 02 — THE ALLIANCE</span>
            <span>DIGNITY · DISCIPLINE · DETERRENCE</span>
          </div>
        </motion.div>

        {/* Right: Concise Editorial Statement & Discreet Link (Cols 8-12) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: easeEditorial, delay: 0.12 }}
          className="lg:col-span-5 space-y-8 lg:pl-4"
        >
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F4F0E8] leading-[1.12] tracking-[0.02em] text-balance">
            HONOR ARMED WITH LEVERAGE.
          </h2>

          <p className="text-base sm:text-lg text-[#E6DFD1]/85 font-light leading-relaxed">
            For too long, traditional markets have operated behind closed doors. DeadLockCartel is an alliance of independent individuals who unite around shared value, collective intelligence, and a common economic vision.
          </p>

          <p className="text-sm text-[#77736B] leading-relaxed">
            We wear bespoke suits for dignity. Our strength is not aggression, but unity, discipline, and mutual protection.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setRoute('/lore')}
              className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-[#B69A67] hover:text-[#F4F0E8] transition-colors duration-300 cursor-pointer"
            >
              <span>READ THE FULL MANIFESTO</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
