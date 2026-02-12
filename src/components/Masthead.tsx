import React from 'react';
import { format } from 'date-fns';

const Masthead: React.FC = () => {
  const today = new Date();
  
  return (
    <header className="masthead bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <div className="flex gap-4">
            <span>Vol. CXXVIII No. 42</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Est. 2024</span>
          </div>
          <div className="flex gap-4">
            <span>{format(today, 'EEEE, MMMM do, yyyy')}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">$2.50 / Month</span>
          </div>
        </div>
        
        {/* Main Title */}
        <div className="text-center py-4">
          <h1 className="masthead-title">
            <span className="text-black">Real</span>
            <span className="text-red-600 italic">Fake</span>
            <span className="text-black"> News</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 tracking-wide uppercase">
            "The News You Deserve, Not The News You Need"
          </p>
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
