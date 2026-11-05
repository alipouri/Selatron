import React, { useEffect, useRef } from 'react';
import { TierId } from '../../types/cartel';

interface PhyllotaxisFigureProps {
  highlightedTier?: TierId | null;
  ariaLabel?: string;
  className?: string;
}

interface PointNode {
  index: number;
  q: number;
  baseAngle: number;
  tier: TierId;
  color: string;
  rgb: [number, number, number];
  baseRadius: number;
  baseAlpha: number;
  parallaxDepth: number;
}

const TOTAL_POINTS = 3333;
const GOLDEN_ANGLE = 2.399963;
const DRIFT_RATE = 1.2e-5; // rad/ms

// Concentric ring normalized radii: sqrt(33/3333), sqrt(202/3333), sqrt(671/3333), 1
const RING_RADII = [
  Math.sqrt(33 / TOTAL_POINTS),
  Math.sqrt(202 / TOTAL_POINTS),
  Math.sqrt(671 / TOTAL_POINTS),
  1
];

// Precompute the 3,333 phyllotaxis nodes once
const PHYLLOTAXIS_NODES: PointNode[] = Array.from({ length: TOTAL_POINTS }, (_, i) => {
  const q = Math.sqrt((i + 0.5) / TOTAL_POINTS);
  const baseAngle = i * GOLDEN_ANGLE;

  if (i <= 32) {
    // 0-32: 33 Kingpins (Antique Gold, largest dots, highest parallax depth)
    return {
      index: i,
      q,
      baseAngle,
      tier: 'kingpin',
      color: '#B69A67',
      rgb: [182, 154, 103],
      baseRadius: 3.1,
      baseAlpha: 0.98,
      parallaxDepth: 16
    };
  } else if (i <= 201) {
    // 33-201: 169 Godmothers (Gold, second largest)
    return {
      index: i,
      q,
      baseAngle,
      tier: 'godmother',
      color: '#B69A67',
      rgb: [182, 154, 103],
      baseRadius: 2.15,
      baseAlpha: 0.88,
      parallaxDepth: 11
    };
  } else if (i <= 670) {
    // 202-670: 469 Members (Ivory)
    return {
      index: i,
      q,
      baseAngle,
      tier: 'member',
      color: '#E6DFD1',
      rgb: [230, 223, 209],
      baseRadius: 1.55,
      baseAlpha: 0.78,
      parallaxDepth: 7
    };
  } else {
    // 671-3332: 2,662 Rookies (Stone #A39E92, smallest)
    return {
      index: i,
      q,
      baseAngle,
      tier: 'rookie',
      color: '#A39E92',
      rgb: [163, 158, 146],
      baseRadius: 1.05,
      baseAlpha: 0.56,
      parallaxDepth: 3.5
    };
  }
});

export const PhyllotaxisFigure: React.FC<PhyllotaxisFigureProps> = ({
  highlightedTier = null,
  ariaLabel = 'Phyllotaxis diagram of 3,333 DeadLock Cartel memberships: 33 Kingpins at the center, surrounded by 169 Godmothers, 469 Members, and 2,662 Rookies.',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const highlightedTierRef = useRef<TierId | null>(highlightedTier);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    highlightedTierRef.current = highlightedTier;
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

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 280);
      height = Math.max(rect.height, 280);
      const isMobile = window.innerWidth < 768;
      const maxDpr = isMobile ? 1.5 : 2;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
      if (prefersReducedMotion) {
        renderFrame(0);
      }
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(canvas);

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion || !isVisibleRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      pointerTargetRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny))
      };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = prefersReducedMotion ? 0 : now - startTime;
      const driftAngle = elapsed * DRIFT_RATE;

      // Smooth pointer interpolation
      if (prefersReducedMotion) {
        pointerCurrentRef.current.x = 0;
        pointerCurrentRef.current.y = 0;
      } else {
        pointerCurrentRef.current.x += (pointerTargetRef.current.x - pointerCurrentRef.current.x) * 0.06;
        pointerCurrentRef.current.y += (pointerTargetRef.current.y - pointerCurrentRef.current.y) * 0.06;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxRadius = Math.min(width, height) * 0.455;
      const activeTier = highlightedTierRef.current;

      // 1. Draw hairline concentric rings at sqrt(33/3333), sqrt(202/3333), sqrt(671/3333), and 1
      ctx.lineWidth = 1;
      RING_RADII.forEach((normR, idx) => {
        const ringR = normR * maxRadius;
        const isHighlightedBoundary =
          (activeTier === 'kingpin' && idx === 0) ||
          (activeTier === 'godmother' && idx === 1) ||
          (activeTier === 'member' && idx === 2) ||
          (activeTier === 'rookie' && idx === 3);

        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = isHighlightedBoundary
          ? 'rgba(182, 154, 103, 0.45)'
          : 'rgba(230, 223, 209, 0.14)';
        ctx.stroke();
      });

      // Subtle crosshair ticks at outer boundary
      ctx.strokeStyle = 'rgba(230, 223, 209, 0.14)';
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius - 8, cy);
      ctx.lineTo(cx - maxRadius + 4, cy);
      ctx.moveTo(cx + maxRadius - 4, cy);
      ctx.lineTo(cx + maxRadius + 8, cy);
      ctx.moveTo(cx, cy - maxRadius - 8);
      ctx.lineTo(cx, cy - maxRadius + 4);
      ctx.moveTo(cx, cy + maxRadius - 4);
      ctx.lineTo(cx, cy + maxRadius + 8);
      ctx.stroke();

      // 2. Draw 3,333 phyllotaxis points (from outer Rookies inward so Kingpins sit on top)
      const px = pointerCurrentRef.current.x;
      const py = pointerCurrentRef.current.y;

      for (let i = TOTAL_POINTS - 1; i >= 0; i--) {
        const node = PHYLLOTAXIS_NODES[i];
        const angle = node.baseAngle + driftAngle;
        const r = node.q * maxRadius;

        const offsetX = px * node.parallaxDepth;
        const offsetY = py * node.parallaxDepth;

        const x = cx + Math.cos(angle) * r + offsetX;
        const y = cy + Math.sin(angle) * r + offsetY;

        let alpha = node.baseAlpha;
        let radius = node.baseRadius;

        if (activeTier) {
          if (node.tier === activeTier) {
            alpha = 1.0;
            radius = node.baseRadius * 1.18;
          } else {
            alpha = 0.14;
          }
        }

        ctx.fillStyle = `rgba(${node.rgb[0]}, ${node.rgb[1]}, ${node.rgb[2]}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      if (isVisibleRef.current && !prefersReducedMotion) {
        renderFrame(now);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const handleHighlightChange = () => {
      renderFrame(performance.now());
    };
    canvas.addEventListener('tierhighlight', handleHighlightChange);

    // Initial render
    renderFrame(performance.now());
    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('tierhighlight', handleHighlightChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  // Re-render immediately when highlightedTier changes in reduced-motion or static mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Trigger a slight resize event or let RAF pick up highlightedTierRef
    const event = new CustomEvent('tierhighlight');
    canvas.dispatchEvent(event);
  }, [highlightedTier]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ariaLabel}
      className={`block w-full h-full select-none ${className}`}
    />
  );
};
