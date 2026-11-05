import React, { useEffect, useRef } from 'react';
import { TierId } from '../../types/cartel';

interface PhyllotaxisFigureProps {
  highlightedTier?: TierId | null;
  animateAssembly?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface TierSpec {
  id: TierId;
  count: number;
  color: string;
  radius: number;
  delayOffset: number;
  points: [number, number, number, number][]; // [qx, qy, sx, sy]
}

const TOTAL_POINTS = 3333;
const GOLDEN_ANGLE = 2.399963;

// Concentric seal ring normalized radii: sqrt(33/3333), sqrt(202/3333), sqrt(671/3333), 1
const SEAL_RADII = [33, 202, 671, 3333].map((v) => Math.sqrt(v / TOTAL_POINTS));

// Precompute the 4 tiers and their 3,333 phyllotaxis + scattered start coordinates
const TIER_SPECS: TierSpec[] = (() => {
  const specs: Omit<TierSpec, 'points'>[] = [
    { id: 'kingpin', count: 33, color: '#CDB27D', radius: 3.2, delayOffset: 0.45 },
    { id: 'godmother', count: 169, color: '#B69A67', radius: 2.1, delayOffset: 0.30 },
    { id: 'member', count: 469, color: '#E6DFD1', radius: 1.5, delayOffset: 0.15 },
    { id: 'rookie', count: 2662, color: '#8E897D', radius: 1.15, delayOffset: 0.0 }
  ];

  let n = 0;
  return specs.map((spec, k) => {
    const points: [number, number, number, number][] = [];
    for (let j = 0; j < spec.count; j++, n++) {
      const q = Math.sqrt((n + 0.5) / TOTAL_POINTS);
      const a = n * GOLDEN_ANGLE;
      const qx = q * Math.cos(a);
      const qy = q * Math.sin(a);

      // Deterministic scattered initial coordinates for circle convergence animation
      let h = Math.sin((j + 1) * 12.9898 + k * 78.233) * 43758.5453;
      h -= Math.floor(h);
      let g = Math.sin((j + 1) * 39.346 + k * 11.135) * 43758.5453;
      g -= Math.floor(g);
      const an = h * 6.2832;
      const rd = 0.9 + g * 1.1;
      const sx = Math.cos(an) * rd;
      const sy = Math.sin(an) * rd;

      points.push([qx, qy, sx, sy]);
    }
    return { ...spec, points };
  });
})();

export const PhyllotaxisFigure: React.FC<PhyllotaxisFigureProps> = ({
  highlightedTier = null,
  animateAssembly = false,
  ariaLabel = 'One circle of 3,333 points: 33 Kingpins at the centre, then 169 Godmothers, 469 Members and 2,662 Rookies.',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const highlightedTierRef = useRef<TierId | null>(highlightedTier);
  const asmRef = useRef<number>(animateAssembly ? 0 : 1);

  useEffect(() => {
    highlightedTierRef.current = highlightedTier;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.dispatchEvent(new CustomEvent('tierhighlight'));
    }
  }, [highlightedTier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !animateAssembly) {
      asmRef.current = 1;
    } else {
      asmRef.current = 0;
    }

    let size = 0;

    const draw = () => {
      if (!size) return;
      const asm = asmRef.current;
      const activeTier = highlightedTierRef.current;

      ctx.clearRect(0, 0, size, size);

      const R = size * 0.46;
      const u = size / 700;

      ctx.save();
      ctx.translate(size / 2, size / 2);

      // Concentric hairline rings lock in during final 25% of convergence
      const ringAlpha = 0.16 * Math.min(1, Math.max(0, (asm - 0.75) / 0.25));
      ctx.strokeStyle = `rgba(230, 223, 209, ${ringAlpha})`;
      ctx.lineWidth = 1;
      SEAL_RADII.forEach((q) => {
        ctx.beginPath();
        ctx.arc(0, 0, q < 1 ? R * q : R + 12 * u, 0, 6.2832);
        ctx.stroke();
      });

      // Draw each tier's points
      TIER_SPECS.forEach((tier, k) => {
        const isHighlighted = !activeTier || activeTier === tier.id;
        const alpha = isHighlighted ? (k === 3 && !activeTier ? 0.8 : 1) : 0.14;
        const r = tier.radius * u;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = tier.color;
        ctx.beginPath();

        const e = asm < 1 ? Math.min(1, Math.max(0, (asm - tier.delayOffset) / 0.55)) : 1;
        const E = 1 - Math.pow(1 - e, 3);

        for (let j = 0; j < tier.points.length; j++) {
          const [qx, qy, sx, sy] = tier.points[j];
          const px = e < 1 ? qx * E + sx * (1 - E) : qx;
          const py = e < 1 ? qy * E + sy * (1 - E) : qy;
          const X = px * R;
          const Y = py * R;
          ctx.moveTo(X + r, Y);
          ctx.arc(X, Y, r, 0, 6.2832);
        }
        ctx.fill();
      });

      ctx.restore();
    };

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2);
      size = Math.max(rect.width, 280);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(canvas);

    const handleHighlight = () => {
      draw();
    };
    canvas.addEventListener('tierhighlight', handleHighlight);

    // Circle convergence animation at start (outer tiers first, Kingpins last, then rings lock)
    let rafId = 0;
    if (animateAssembly && !prefersReducedMotion) {
      const t0 = performance.now() + 350;
      const step = (now: number) => {
        asmRef.current = Math.min(1, Math.max(0, (now - t0) / 2400));
        draw();
        if (asmRef.current < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };
      rafId = window.requestAnimationFrame(step);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      canvas.removeEventListener('tierhighlight', handleHighlight);
      resizeObserver.disconnect();
    };
  }, [animateAssembly]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className={`block w-full h-full select-none ${className}`}
    />
  );
};
