import React, { useEffect, useRef, useState } from 'react';
import { TierId } from '../../types/cartel';

export interface HoveredPointInfo {
  tokenId: number;
  tier: TierId;
  tierLabel: string;
  votingPower: string;
}

interface PhyllotaxisFigureProps {
  highlightedTier?: TierId | null;
  animateAssembly?: boolean;
  interactivePoints?: boolean;
  onPointSelect?: (point: HoveredPointInfo) => void;
  ariaLabel?: string;
  className?: string;
}

interface TierPoint {
  qx: number;
  qy: number;
  sx: number;
  sy: number;
  tokenId: number;
}

interface TierSpec {
  id: TierId;
  label: string;
  votingPower: string;
  count: number;
  color: string;
  radius: number;
  parallaxK: number;
  delayOffset: number;
  points: TierPoint[];
}

const TOTAL_POINTS = 3333;
const GOLDEN_ANGLE = 2.399963;
const DRIFT_RATE = 1.2e-5; // rad/ms

// Concentric seal ring normalized radii: sqrt(33/3333), sqrt(202/3333), sqrt(671/3333), 1
const SEAL_RADII = [33, 202, 671, 3333].map((v) => Math.sqrt(v / TOTAL_POINTS));

// Precompute the 4 tiers and their 3,333 phyllotaxis + scattered start coordinates
const TIER_SPECS: TierSpec[] = (() => {
  const specs: Omit<TierSpec, 'points'>[] = [
    {
      id: 'kingpin',
      label: 'Kingpin',
      votingPower: '50x',
      count: 33,
      color: '#CDB27D',
      radius: 3.2,
      parallaxK: 14,
      delayOffset: 0.45
    },
    {
      id: 'godmother',
      label: 'Godmother',
      votingPower: '15x',
      count: 169,
      color: '#B69A67',
      radius: 2.1,
      parallaxK: 10,
      delayOffset: 0.30
    },
    {
      id: 'member',
      label: 'Member',
      votingPower: '5x',
      count: 469,
      color: '#E6DFD1',
      radius: 1.5,
      parallaxK: 6,
      delayOffset: 0.15
    },
    {
      id: 'rookie',
      label: 'Rookie',
      votingPower: '1x',
      count: 2662,
      color: '#8E897D',
      radius: 1.15,
      parallaxK: 3,
      delayOffset: 0.0
    }
  ];

  let n = 0;
  return specs.map((spec, k) => {
    const points: TierPoint[] = [];
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

      points.push({
        qx,
        qy,
        sx,
        sy,
        tokenId: n + 1
      });
    }
    return { ...spec, points };
  });
})();

export const PhyllotaxisFigure: React.FC<PhyllotaxisFigureProps> = ({
  highlightedTier = null,
  animateAssembly = false,
  interactivePoints = false,
  onPointSelect,
  ariaLabel = 'One circle of 3,333 points: 33 Kingpins at the centre, then 169 Godmothers, 469 Members and 2,662 Rookies.',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const highlightedTierRef = useRef<TierId | null>(highlightedTier);
  const onPointSelectRef = useRef(onPointSelect);
  const [hoveredPoint, setHoveredPoint] = useState<(HoveredPointInfo & { x: number; y: number }) | null>(null);
  const hoveredTokenIdRef = useRef<number | null>(null);

  useEffect(() => {
    onPointSelectRef.current = onPointSelect;
  }, [onPointSelect]);

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

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let size = 0;
    let isVisible = true;
    let asm = animateAssembly && !prefersReducedMotion ? 0 : 1;
    const tierAlphas = [1, 1, 1, 0.8];

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let lastRotCos = 1;
    let lastRotSin = 0;

    const draw = (now: number) => {
      if (!size) return;

      const activeTier = highlightedTierRef.current;
      const R = size * 0.46;
      const u = size / 700;
      const angle = prefersReducedMotion ? 0 : now * DRIFT_RATE;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      lastRotCos = cosA;
      lastRotSin = sinA;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);

      // 1. Concentric hairline rings lock in during final 25% of convergence
      const ringProgress = Math.min(1, Math.max(0, (asm - 0.75) / 0.25));
      SEAL_RADII.forEach((q, idx) => {
        const isHighlightedRing =
          (activeTier === 'kingpin' && idx === 0) ||
          (activeTier === 'godmother' && idx === 1) ||
          (activeTier === 'member' && idx === 2) ||
          (activeTier === 'rookie' && idx === 3);

        ctx.beginPath();
        ctx.arc(0, 0, q < 1 ? R * q : R + 12 * u, 0, 6.2832);
        ctx.lineWidth = isHighlightedRing ? 1.25 : 1;
        ctx.strokeStyle = isHighlightedRing
          ? `rgba(182, 154, 103, ${0.48 * ringProgress})`
          : `rgba(230, 223, 209, ${0.16 * ringProgress})`;
        ctx.stroke();
      });

      // 2. Draw each tier's points with convergence + per-tier parallax + smooth alpha easing
      let hoveredCoords: { X: number; Y: number; r: number; color: string } | null = null;

      TIER_SPECS.forEach((tier, k) => {
        const targetAlpha =
          !activeTier || activeTier === tier.id ? (k === 3 && !activeTier ? 0.8 : 1) : 0.14;
        tierAlphas[k] = prefersReducedMotion
          ? targetAlpha
          : tierAlphas[k] + (targetAlpha - tierAlphas[k]) * 0.12;

        const ox = mouse.x * tier.parallaxK * u;
        const oy = mouse.y * tier.parallaxK * u;
        const r = tier.radius * u;

        ctx.globalAlpha = tierAlphas[k];
        ctx.fillStyle = tier.color;
        ctx.beginPath();

        const e = asm < 1 ? Math.min(1, Math.max(0, (asm - tier.delayOffset) / 0.55)) : 1;
        const E = 1 - Math.pow(1 - e, 3);

        for (let j = 0; j < tier.points.length; j++) {
          const pt = tier.points[j];
          const px = e < 1 ? pt.qx * E + pt.sx * (1 - E) : pt.qx;
          const py = e < 1 ? pt.qy * E + pt.sy * (1 - E) : pt.qy;
          const X = (px * cosA - py * sinA) * R + ox;
          const Y = (px * sinA + py * cosA) * R + oy;
          ctx.moveTo(X + r, Y);
          ctx.arc(X, Y, r, 0, 6.2832);

          if (hoveredTokenIdRef.current === pt.tokenId) {
            hoveredCoords = { X, Y, r, color: tier.color };
          }
        }
        ctx.fill();
      });

      // 3. Highlight hovered individual point with a refined hairline halo
      if (hoveredCoords) {
        const { X, Y, r, color } = hoveredCoords as { X: number; Y: number; r: number; color: string };
        ctx.globalAlpha = 1;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(X, Y, r * 1.9, 0, 6.2832);
        ctx.fill();

        ctx.strokeStyle = '#B69A67';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(X, Y, r * 3.6 + 3, 0, 6.2832);
        ctx.stroke();
      }

      ctx.restore();
    };

    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2);
      size = Math.max(rect.width, 280);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(canvas);

    const handleWindowPointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || !isVisible) return;
      mouse.tx = e.clientX / Math.max(window.innerWidth, 1) - 0.5;
      mouse.ty = e.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });

    // Optional point-level hit testing on canvas hover/click
    const findNearestPoint = (clientX: number, clientY: number) => {
      if (!size || asm < 0.85) return null;
      const rect = canvas.getBoundingClientRect();
      const localX = clientX - rect.left - size / 2;
      const localY = clientY - rect.top - size / 2;
      const R = size * 0.46;
      const u = size / 700;

      let bestDistSq = 120; // max hit radius squared (~11px)
      let bestMatch: (HoveredPointInfo & { x: number; y: number }) | null = null;

      for (let k = 0; k < TIER_SPECS.length; k++) {
        const tier = TIER_SPECS[k];
        const ox = mouse.x * tier.parallaxK * u;
        const oy = mouse.y * tier.parallaxK * u;

        for (let j = 0; j < tier.points.length; j++) {
          const pt = tier.points[j];
          const X = (pt.qx * lastRotCos - pt.qy * lastRotSin) * R + ox;
          const Y = (pt.qx * lastRotSin + pt.qy * lastRotCos) * R + oy;
          const dx = localX - X;
          const dy = localY - Y;
          const dSq = dx * dx + dy * dy;
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            bestMatch = {
              tokenId: pt.tokenId,
              tier: tier.id,
              tierLabel: tier.label,
              votingPower: tier.votingPower,
              x: X + size / 2,
              y: Y + size / 2
            };
          }
        }
      }
      return bestMatch;
    };

    const handleCanvasPointerMove = (e: PointerEvent) => {
      if (!interactivePoints) return;
      const match = findNearestPoint(e.clientX, e.clientY);
      hoveredTokenIdRef.current = match ? match.tokenId : null;
      setHoveredPoint(match);
    };

    const handleCanvasPointerLeave = () => {
      if (!interactivePoints) return;
      hoveredTokenIdRef.current = null;
      setHoveredPoint(null);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if (!interactivePoints) return;
      const match = findNearestPoint(e.clientX, e.clientY);
      if (match && onPointSelectRef.current) {
        onPointSelectRef.current(match);
      }
    };

    canvas.addEventListener('pointermove', handleCanvasPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handleCanvasPointerLeave);
    canvas.addEventListener('click', handleCanvasClick);

    const handleHighlight = () => {
      if (prefersReducedMotion) {
        draw(0);
      }
    };
    canvas.addEventListener('tierhighlight', handleHighlight);

    // Start circle convergence animation (350ms delay, 2400ms duration) + continuous loop
    const t0 = performance.now() + 350;
    let rafId = 0;

    if (!prefersReducedMotion) {
      const loop = (now: number) => {
        if (animateAssembly && asm < 1) {
          asm = Math.min(1, Math.max(0, (now - t0) / 2400));
        }
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;

        if (isVisible) {
          draw(now);
        }
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handleWindowPointerMove);
      canvas.removeEventListener('pointermove', handleCanvasPointerMove);
      canvas.removeEventListener('pointerleave', handleCanvasPointerLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('tierhighlight', handleHighlight);
      mediaQuery.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [animateAssembly, interactivePoints]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel}
        className={`block w-full h-full select-none ${
          interactivePoints && hoveredPoint ? 'cursor-pointer' : ''
        }`}
      />
      {interactivePoints && hoveredPoint && (
        <div
          className="pointer-events-none absolute z-20 px-3 py-1.5 bg-[#171717]/95 border border-[#B69A67]/60 text-[10px] uppercase tracking-[0.2em] text-[#F4F0E8] whitespace-nowrap tabular-nums"
          style={{
            left: `${Math.min(Math.max(hoveredPoint.x, 75), 420)}px`,
            top: `${Math.max(hoveredPoint.y - 14, 16)}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <span className="text-[#B69A67]">#{String(hoveredPoint.tokenId).padStart(4, '0')}</span>
          <span className="mx-1.5 text-[#A39E92]">·</span>
          <span>{hoveredPoint.tierLabel}</span>
          <span className="mx-1.5 text-[#A39E92]">·</span>
          <span className="text-[#E6DFD1]">{hoveredPoint.votingPower}</span>
        </div>
      )}
    </div>
  );
};
