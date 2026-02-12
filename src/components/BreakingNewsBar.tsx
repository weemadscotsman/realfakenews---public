import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDailyNews } from '@/lib/openai-enhanced';

const FALLBACK_HEADLINES = [
  "BREAKING: Local Man Discovers He's Been Reading Fake News This Whole Time—Sources Say 'We Told You So'",
  "EXCLUSIVE: Scientists Confirm Breathing Air Linked to Staying Alive—More Studies Needed",
  "URGENT: Politician Caught Telling Truth—Nation Shocked, Investigation Launched",
  "ALERT: Area Woman's Opinion Suddenly Becomes Fact After Posting on Social Media",
  "DEVELOPING: Study Finds 100% of People Who Drink Water Eventually Die—Should You Be Worried?",
  "BREAKING: Time Traveler from 2025 Arrives, Disappointed by Lack of Flying Cars",
  "EXCLUSIVE: Cat Declares Itself Supreme Ruler of Household—Dog Too Tired to Object",
  "URGENT: Man Who Said 'I'll Do It Tomorrow' Still Hasn't Done It—Family Concerned",
];

const TRENDING_TOPICS = [
  'technology', 'politics', 'celebrity gossip', 'social media',
  'AI takeover', 'crypto', 'climate', 'sports drama',
];

const BreakingNewsBar = () => {
  const [headlines, setHeadlines] = useState<string[]>(FALLBACK_HEADLINES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  // Fetch AI-generated headlines on mount
  useEffect(() => {
    let cancelled = false;

    const fetchHeadlines = async () => {
      try {
        const shuffled = [...TRENDING_TOPICS].sort(() => Math.random() - 0.5);
        const topics = shuffled.slice(0, 4);
        const articles = await generateDailyNews(topics);

        if (!cancelled && articles.length > 0) {
          const aiHeadlines = articles.map((a) => `${a.category.toUpperCase()}: ${a.headline}`);
          setHeadlines(aiHeadlines);
          setIsAiGenerated(true);
        }
      } catch {
        // Keep fallback headlines
      }
    };

    fetchHeadlines();
    return () => { cancelled = true; };
  }, []);

  // Rotate headlines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.span
            className="breaking-pulse px-2 py-0.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle size={14} />
            Breaking
          </motion.span>
          <div className="overflow-hidden flex-1 relative h-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                className="text-sm truncate absolute inset-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {headlines[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          {isAiGenerated && (
            <motion.span
              className="text-[10px] text-gray-500 uppercase tracking-wider shrink-0 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              AI Generated
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
