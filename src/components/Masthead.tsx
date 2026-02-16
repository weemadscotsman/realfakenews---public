import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Masthead: React.FC = () => {
  const today = new Date();

  // Deterministic "Stability Index" that changes daily
  const stabilitySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const stability = 30 + (stabilitySeed % 18); // Varies between 30 and 47

  return (
    <header className="masthead bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <div className="flex gap-4">
            <span className="font-bold">Vol. CXXVIII No. 42</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline font-medium italic underline decoration-red-600/30">Est. 2024</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium">{format(today, 'EEEE, MMMM do, yyyy')}</span>
            <span className="hidden sm:inline">|</span>
            <Link to="/membership" className="hidden sm:inline font-bold hover:text-red-600 transition-colors">$2.99 / Month</Link>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center py-4">
          <Link to="/">
            <h1 className="masthead-title cursor-pointer select-none">
              <span className="text-black">Real</span>
              <span className="masthead-fake mx-1 italic" data-text="FAKE">
                <span className="opacity-0">FAKE</span>
              </span>
              <span className="text-black"> News</span>
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-500 tracking-wide uppercase font-medium">
            "The News You Deserve, Not The News You Need"
          </p>

          {/* Stability Index */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <span>Global Reality Stability Index:</span>
            <span className="text-red-600 font-mono text-xs">{stability}%</span>
            <span className="text-red-600 animate-bounce">📉</span>
          </div>
        </div>

        {/* Tagline Bar */}
        <div className="border-t border-b border-gray-200 py-2 mt-4">
          <div className="flex justify-center gap-6 text-xs text-gray-600 uppercase tracking-wider">
            <span>Verified Unverified</span>
            <span className="text-gray-300">|</span>
            <span>Fact-Optional Journalism</span>
            <span className="text-gray-300">|</span>
            <span>100% Organic Nonsense</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Masthead;
