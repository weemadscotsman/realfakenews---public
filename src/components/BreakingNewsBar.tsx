import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDailyNews } from '@/lib/content-engine';

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
  'human tragedy',
];

const BreakingNewsBar = () => {
  const [headlines, setHeadlines] = useState<string[]>(FALLBACK_HEADLINES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fetch AI-generated headlines on mount
  useEffect(() => {
    let cancelled = false;

    const fetchHeadlines = async () => {
      try {
        // 1. Fetch live raw news for topics
        const res = await fetch('/.netlify/functions/fetch-live-news?mode=raw');
        const data = await res.json();
        const liveTopics = (data.news || []).map((n: { title: string }) => n.title);

        const topics = liveTopics.length > 0 ? liveTopics.slice(0, 4) : TRENDING_TOPICS.slice(0, 4);
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

  // Rotate headlines every 8 seconds (slower for reading/listening)
  useEffect(() => {
    if (isSpeaking) return; // Don't auto-rotate while speaking

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [headlines.length, isSpeaking]); // Add isSpeaking dependency

  const speakHeadline = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const text = headlines[currentIndex];
    const utterance = new SpeechSynthesisUtterance(text);

    // Hardened Voice Selection Logic
    const voices = window.speechSynthesis.getVoices();

    // Priority 1: British Female (The classic "Satirical AI" voice)
    let selectedVoice = voices.find(v =>
      (v.lang.startsWith('en-GB')) &&
      (v.name.includes('Female') || v.name.includes('Hazel') || v.name.includes('Serena'))
    );

    // Priority 2: Any British voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en-GB'));
    }

    // Priority 3: Any English Female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v =>
        v.lang.startsWith('en') &&
        (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha'))
      );
    }

    // Priority 4: System default
    if (!selectedVoice) {
      selectedVoice = voices[0];
    }

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.pitch = 1.0;
    utterance.rate = 0.9; // Slightly slower for that "authoritative" news tone

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-black text-white py-2 overflow-hidden border-b border-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={speakHeadline}
            className={`p-1 rounded hover:bg-white/10 transition-colors ${isSpeaking ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}
            title="Read Aloud (British Narrator)"
            whileTap={{ scale: 0.9 }}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>

          <motion.span
            className="breaking-pulse px-2 py-0.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 text-red-500"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle size={14} />
            Breaking
          </motion.span>
          <div className="overflow-hidden flex-1 relative h-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Link
                  to={`/article/${encodeURIComponent(headlines[currentIndex])}`}
                  className="text-sm truncate hover:text-red-400 transition-colors block font-mono tracking-tight"
                >
                  {headlines[currentIndex]}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          {isAiGenerated && (
            <motion.span
              className="text-[10px] text-gray-600 uppercase tracking-wider shrink-0 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              AI Live
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
