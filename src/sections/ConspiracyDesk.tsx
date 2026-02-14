import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertTriangle, EyeOff, Search, FileText } from 'lucide-react';
import { generateConspiracyTheories, type ConspiracyTheory } from '@/lib/content-engine';
import { ConspiracyGraph } from '@/components/ConspiracyGraph';
import { InterceptedSignal } from '@/components/InterceptedSignal';
import { FactionTrustRadar } from '@/components/FactionTrustRadar';
import { Link } from 'react-router-dom';

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
        <section id="conspiracy" className="py-20 bg-black text-red-500 overflow-hidden relative border-y-4 border-red-900 shadow-[0_0_50px_rgba(153,27,27,0.3)]">
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
                        {/* LEFT COLUMN: Visuals & Radar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-zinc-950 border-2 border-red-900 rounded-xl overflow-hidden shadow-lg hover:border-red-600 transition-colors group">
                                <div className="p-3 bg-red-900/10 border-b border-red-900 flex justify-between items-center">
                                    <h3 className="text-xs font-black uppercase text-red-500 tracking-widest">The String Wall</h3>
                                    <Search size={14} className="text-red-700 group-hover:text-red-400" />
                                </div>
                                <div className="p-4">
                                    <ConspiracyGraph />
                                </div>
                            </div>

                            <FactionTrustRadar />

                            {/* ARCHIVES LINK */}
                            <Link to="/archives" className="block group">
                                <div className="bg-amber-950/20 border-2 border-amber-900/50 p-6 rounded-xl hover:bg-amber-900/30 hover:border-amber-600 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4 mb-2">
                                        <FileText className="text-amber-600 group-hover:text-amber-400" size={24} />
                                        <h3 className="text-lg font-black uppercase text-amber-700 group-hover:text-amber-500">Classified Archives</h3>
                                    </div>
                                    <p className="text-xs text-amber-800 font-mono">
                                        ACCESS LEVEL: CLEARANCE GRANTED<br />
                                        &gt; READ THE FOUNDING DOCUMENTS
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* MIDDLE COLUMN: Main Theory Display */}
                        <div className="lg:col-span-5 bg-zinc-950 border-2 border-red-900 p-8 rounded-3xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <EyeOff size={100} />
                            </div>

                            <div className="relative z-10">
                                <div className="p-4 border border-red-900/30 rounded bg-black/40 mb-8">
                                    <h4 className="text-red-500 font-bold uppercase text-xs mb-2">Active Investigations</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2 text-red-400">
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            Subject: Smart Fridge (Code: SPOILED_MILK)
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-500">
                                            <span className="w-2 h-2 bg-gray-700 rounded-full" />
                                            Operation: Crumb Tray (Stalled)
                                        </li>
                                        <li className="pt-2">
                                            <Link to="/logs/darren-03" className="flex items-center gap-2 text-red-900 hover:text-red-500 transition-colors cursor-pointer group">
                                                <FileText size={14} />
                                                <span className="uppercase text-[10px] group-hover:underline decoration-red-500 underline-offset-4">
                                                    EVIDENCE_FILE_03.wav [ENCRYPTED]
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                    >
                                        <div className="flex items-center gap-2 mb-4 text-xs font-black text-red-700 uppercase tracking-widest border-b border-red-900/30 pb-2">
                                            <AlertTriangle size={14} />
                                            Intercepted Theory #{currentIndex + 1}
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-3xl font-black mb-6 leading-tight uppercase italic text-red-100">
                                                {theories[currentIndex].topic}
                                            </h3>
                                            <p className="text-xl font-mono text-red-400 font-bold leading-relaxed bg-red-950/20 p-6 rounded-xl border border-red-900/50 shadow-inner">
                                                <span className="text-red-600 mr-2 text-3xl float-left">"</span>
                                                {theories[currentIndex].truth}
                                                <span className="text-red-600 ml-2 text-3xl">"</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 pt-6">
                                            <div className="px-3 py-1 rounded bg-black border border-red-800 text-[10px] text-red-500 font-mono">
                                                SOURCE: {theories[currentIndex].theorist}
                                            </div>
                                            <div className="px-3 py-1 rounded bg-black border border-red-800 text-[10px] text-red-500 font-mono">
                                                CERTAINTY: {theories[currentIndex].level}
                                            </div>
                                            {theories[currentIndex].connectedToDarren && (
                                                <div className="px-3 py-1 rounded bg-red-900 text-[10px] text-white font-black animate-pulse">
                                                    DARREN LINKED
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="mt-8 flex justify-between items-center text-[10px] text-red-800 font-mono pt-4 border-t border-red-900/30">
                                <span>AUTO-SCROLL: ACTIVE</span>
                                <span>REFRESH RATE: 8000ms</span>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Comms & List */}
                        <div className="lg:col-span-3 space-y-6">
                            <InterceptedSignal />

                            <div className="bg-zinc-950 border border-red-900/30 rounded-xl p-4">
                                <h4 className="text-[10px] font-black uppercase text-red-800 tracking-widest mb-4">Active Threads</h4>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {theories.map((theory, idx) => (
                                        <button
                                            key={theory.id}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`w-full p-3 rounded border transition-all text-left uppercase font-mono text-[10px] leading-tight ${currentIndex === idx
                                                ? 'bg-red-900 text-white border-red-500'
                                                : 'bg-black border-red-900/20 text-red-800 hover:border-red-900/60'
                                                }`}
                                        >
                                            {theory.topic}
                                        </button>
                                    ))}
                                </div>
                            </div>
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
