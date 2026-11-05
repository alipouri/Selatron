import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useCartel } from '../../context/CartelContext';

export const ManifestoSection: React.FC = () => {
  const { setRoute } = useCartel();
  const shouldReduceMotion = useReducedMotion();
  const easeEditorial: [number, number, number, number] = [0.2, 0.7, 0.1, 1];

  return (
    <section
      id="manifesto"
      aria-label="Manifesto — Brand Identity"
      className="relative py-28 sm:py-36 lg:py-48 px-5 sm:px-8 lg:px-14 border-t border-[rgba(230,223,209,0.14)] overflow-hidden"
    >
      {/* Background: Faint Concentric Hairline Rings */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.4, ease: easeEditorial }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-[720px] h-[720px] sm:w-[960px] sm:h-[960px] lg:w-[1160px] lg:h-[1160px] opacity-100"
        >
          <circle
            cx="500"
            cy="500"
            r="48"
            fill="none"
            stroke="rgba(230, 223, 209, 0.13)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="118"
            fill="none"
            stroke="rgba(230, 223, 209, 0.13)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="215"
            fill="none"
            stroke="rgba(230, 223, 209, 0.13)"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="480"
            fill="none"
            stroke="rgba(230, 223, 209, 0.11)"
            strokeWidth="1"
          />
          <circle cx="500" cy="500" r="4.5" fill="#B69A67" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter Metadata */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#A39E92] mb-16 sm:mb-24">
          <span>01 / THE MANIFESTO</span>
          <span className="hidden sm:inline">ECONOMIC BROTHERHOOD</span>
        </div>

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Masked Section Headline (Cols 1-6) */}
          <div className="lg:col-span-6">
            <motion.h2
              aria-label="HONOR ARMED WITH LEVERAGE."
              initial={shouldReduceMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } }
              }}
              className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-[#F4F0E8] leading-[0.92] tracking-[-0.01em]"
            >
              <span className="block overflow-hidden pb-1">
                <motion.span
                  variants={{
                    hidden: { y: '108%' },
                    visible: { y: 0, transition: { duration: 1.15, ease: easeEditorial } }
                  }}
                  className="block"
                >
                  HONOR ARMED
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-1">
                <motion.span
                  variants={{
                    hidden: { y: '108%' },
                    visible: { y: 0, transition: { duration: 1.15, ease: easeEditorial } }
                  }}
                  className="block text-[#E6DFD1]"
                >
                  WITH LEVERAGE<span className="text-[#B69A67]">.</span>
                </motion.span>
              </span>
            </motion.h2>
          </div>

          {/* Right Column: Exact Excerpt & Discreet Link (Cols 7-12) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.0, ease: easeEditorial, delay: 0.18 }}
            className="lg:col-span-6 space-y-8 pt-2"
          >
            <p className="font-display font-light text-2xl sm:text-3xl text-[#F4F0E8] leading-[1.35]">
              DeadLockCartel is an alliance of independent individuals, creators and traders, united around shared value, collective intelligence, mutual protection and a common economic treasury.
            </p>

            <p className="text-sm sm:text-base text-[#A39E92] leading-relaxed max-w-xl">
              Wall Street had its cartels. Now, the everyday people have theirs. &ldquo;Cartel&rdquo; is a metaphor for an economic alliance, nothing more.
            </p>

            <div className="pt-4 border-t border-[rgba(230,223,209,0.14)]">
              <button
                onClick={() => setRoute('/lore')}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-[#B69A67] hover:text-[#F4F0E8] transition-colors duration-300 cursor-pointer py-1 border-b border-[#8D7954] hover:border-[#F4F0E8] pb-2"
              >
                <span>READ THE FULL MANIFESTO →</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
