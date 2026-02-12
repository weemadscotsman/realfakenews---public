import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const breakingNews = [
  "BREAKING: Local Man Discovers He's Been Reading Fake News This Whole Time—Sources Say 'We Told You So'",
  "EXCLUSIVE: Scientists Confirm Breathing Air Linked to Staying Alive—More Studies Needed",
  "URGENT: Politician Caught Telling Truth—Nation Shocked, Investigation Launched",
  "ALERT: Area Woman's Opinion Suddenly Becomes Fact After Posting on Social Media",
  "DEVELOPING: Study Finds 100% of People Who Drink Water Eventually Die—Should You Be Worried?",
  "BREAKING: Time Traveler from 2025 Arrives, Disappointed by Lack of Flying Cars",
  "EXCLUSIVE: Cat Declares Itself Supreme Ruler of Household—Dog Too Tired to Object",
  "URGENT: Man Who Said 'I'll Do It Tomorrow' Still Hasn't Done It—Family Concerned",
];

const BreakingNewsBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="breaking-pulse px-2 py-0.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
            <AlertCircle size={14} />
            Breaking
          </span>
          <div className="overflow-hidden flex-1">
            <p className="text-sm truncate animate-fade-in">
              {breakingNews[currentIndex]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
