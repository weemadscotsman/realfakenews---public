import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Radio, AlertTriangle, EyeOff, Zap, Search } from 'lucide-react';
import { generateConspiracyTheories, type ConspiracyTheory } from '@/lib/openai-enhanced';

interface NewsItem {
    title: string;
    snippet?: string;
    link?: string;
}

interface NewsResponse {
    news: NewsItem[];
}

const ConspiracyDesk = () => {
    const [theories, setTheories] = useState<ConspiracyTheory[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let mounted = true;
        const fetchTheories = async () => {
            try {
                // 1. Fetch live headlines for context
                const res = await fetch('/.netlify/functions/fetch-live-news?mode=raw');
                const data: NewsResponse = await res.json();
                const liveHeadlines = (data.news || []).map((n) => n.title);

                // 2. Generate theories based on live topics (or fallback if empty)
                const topicsToUse = liveHeadlines.length > 0 ? liveHeadlines.slice(0, 4) : [
                    "New AI Regulation",
                    "Recent Solar Flare",
                    "Celebrity Diet Trends",
                    "Smart City Initiative"
                ];

                const conspiracyData = await generateConspiracyTheories(topicsToUse);

                if (mounted) {
                    setTheories(conspiracyData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Conspiracy fetch failed:", error);
                // Fallback to static if everything fails
                const fallbackData = await generateConspiracyTheories([
                    "New AI Regulation",
                    "Recent Solar Flare"
                ]);
                if (mounted) {
                    setTheories(fallbackData);
                    setLoading(false);
                }
            }
        };
        fetchTheories();
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (theories.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % theories.length);
            }, 8000);
            return () => clearInterval(timer);
        }
    }, [theories]);

    return (
        <section className="py-20 bg-black text-red-500 overflow-hidden relative border-y-4 border-red-900 shadow-[0_0_50px_rgba(153,27,27,0.3)]">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b-2 border-red-900 pb-8 uppercase font-mono tracking-tighter">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Radio className="text-red-600 animate-pulse" size={48} />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <h2 className="text-5xl font-black italic">CONSPIRACY DESK</h2>
                            <p className="text-sm font-bold text-red-700">BROADCASTING FROM THE DISCLOSED FALLOUT SHELTER #42</p>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-red-800">ENCRYPTION: AES-256-CHAOS</p>
                        <p className="text-xs font-bold text-red-800">SIGNAL STRENGTH: 🟢 99% PARANOIA</p>
                    </div>
                </div>

                {loading ? (
                    <div className="h-96 flex items-center justify-center border-2 border-dashed border-red-900 rounded-3xl">
                        <div className="flex flex-col items-center gap-4">
                            <Search className="animate-spin text-red-900" size={48} />
                            <p className="font-mono text-xl animate-pulse">DECODING THE SIGNAL...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Main Theory Display */}
                        <div className="lg:col-span-8 bg-zinc-950 border-2 border-red-900 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <EyeOff size={100} />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="relative z-10"
                                >
                                    <div className="flex items-center gap-2 mb-4 text-xs font-black text-red-700 uppercase tracking-widest">
                                        <AlertTriangle size={14} />
                                        Intercepted Topic: {theories[currentIndex].topic}
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase italic underline decoration-red-900 decoration-4 underline-offset-8">
                                            THE TRUTH:
                                        </h3>
                                        <p className="text-xl md:text-2xl font-mono text-red-400 font-bold leading-relaxed bg-red-950/20 p-6 rounded-xl border border-red-900/50">
                                            {theories[currentIndex].truth.split(' ').map((word, i) => (
                                                <span key={i} className={word.toUpperCase() === 'DARREN' || word.toUpperCase() === 'SHEILA' ? 'text-white bg-red-600 px-1 rounded' : ''}>
                                                    {word}{' '}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-red-900/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center text-white font-black text-xs">
                                                {theories[currentIndex].theorist[0]}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-red-800 font-black uppercase">Source</p>
                                                <p className="font-bold uppercase tracking-tighter">{theories[currentIndex].theorist}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-black border border-red-900 flex items-center justify-center text-red-500">
                                                <ShieldAlert size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-red-800 font-black uppercase">Certainty</p>
                                                <p className="font-bold uppercase tracking-tighter">{theories[currentIndex].level.replace('_', ' ')}</p>
                                            </div>
                                        </div>

                                        {theories[currentIndex].connectedToDarren && (
                                            <div className="flex items-center gap-2 bg-red-900/50 text-red-100 px-3 py-1 rounded-full animate-pulse border border-red-700">
                                                <Zap size={14} />
                                                <span className="text-[10px] font-black uppercase">Link Detected: DARREN SAGA</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Sidebar: Theories List */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <h4 className="text-xs font-black uppercase text-red-800 tracking-widest pl-2">Intercepted Transmissions</h4>
                            {theories.map((theory, idx) => (
                                <button
                                    key={theory.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`p-4 rounded-xl border transition-all text-left uppercase font-mono text-sm ${currentIndex === idx
                                        ? 'bg-red-900 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] translate-x-2'
                                        : 'bg-zinc-950 border-red-900/30 text-red-900 hover:border-red-900/60'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] opacity-70">SIGNAL #{idx + 1}</span>
                                        {theory.connectedToDarren && <Zap size={10} className="text-yellow-500" />}
                                    </div>
                                    <p className="font-black truncate">{theory.topic}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Quote */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-mono text-red-900 uppercase tracking-[.5em]">
                        "THE BIRDS ARE CAMERAS. THE ROOMBA IS THE BRAIN." — ANONYMOUS SINK
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ConspiracyDesk;
