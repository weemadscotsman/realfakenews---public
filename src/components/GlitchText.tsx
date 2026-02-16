import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span 
      className={`relative inline-block ${className}`}
      style={{
        textShadow: `
          -2px 0 #ff00ff,
          2px 0 #00ffff
        `,
        animation: 'glitch 1s linear infinite',
      }}
    >
      <style>{`
        @keyframes glitch {
          2%, 64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }
      `}</style>
      {text}
    </span>
  );
};

export default GlitchText;
