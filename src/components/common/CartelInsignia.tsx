import React from 'react';

interface InsigniaProps {
  className?: string;
  size?: number;
}

export const CartelInsignia: React.FC<InsigniaProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Outer Diamond Shield */}
      <path
        d="M24 3L43 22L24 45L5 22L24 3Z"
        stroke="#B69A67"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      {/* Concentric Inner Geometric Alliance Lines */}
      <path
        d="M24 10L37 22L24 37L11 22L24 10Z"
        stroke="#8D7954"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      {/* Interlocking DeadLock Bars */}
      <rect x="20" y="16" width="8" height="16" stroke="#B69A67" strokeWidth="1.5" fill="#171717" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="#F4F0E8" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" fill="#B69A67" />
    </svg>
  );
};
