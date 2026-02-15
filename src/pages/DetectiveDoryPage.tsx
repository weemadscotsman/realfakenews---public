import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, AlertTriangle, Link, RefreshCw, X } from 'lucide-react';

const DetectiveDoryPage = () => {
    const [evidence, setEvidence] = useState<any[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [doryThought, setDoryThought] = useState("Wait, I found something... what was it?");

    const doryisms = [
        "Just keep analyzing! Just keep analyzing!",
        "Wait, did I leave the digital toaster on?",
        "This string leads to... another string. Interesting.",
        "I've found a dangling pointer! No, wait, that's my tail.",
        "Is this evidence or just a suspicious pixel?",
        "I remember seeing this before... or did I?",
        "Recursive analysis complete. Result: Recursive analysis needed.",
        "The 3.9MB file is definitely not memories. It's... it's... wait, what was I saying?"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDoryThought(doryisms[Math.floor(Math.random() * doryisms.length)]);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const addEvidence = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const newPiece = {
                id: Math.random(),
                type: ['Photo', 'Memo', 'Code', 'Signal'][Math.floor(Math.random() * 4)],
                title: `EVIDENCE #${Math.floor(Math.random() * 9999)}`,
                content: "Suspiciously recursive data detected in the 350MB JSON lunch bucket.",
                x: Math.random() * 60 + 20,
                y: Math.random() * 60 + 20,
                rotation: Math.random() * 10 - 5
            };
            setEvidence(prev => [...prev, newPiece]);
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-blue-400 font-mono p-8 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center border-b border-blue-900 pb-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-2 border-blue-400 animate-pulse">
                        <Search className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter text-white">DETECTIVE DORY'S INVESTIGATION HUB</h1>
                        <p className="text-xs text-blue-500 uppercase tracking-widest">Reality Stability: 32% | Active Loops: {evidence.length + 1}</p>
                    </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 p-2 rounded flex items-center gap-3">
                    <AlertTriangle className="text-yellow-500" size={16} />
                    <span className="text-[10px] animate-pulse">DETECTING SUSPICIOUS PHANTOM FILES...</span>
                </div>
            </header>

            {/* Dory's Thought Bubble */}
            <motion.div
                key={doryThought}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-white/5 border-l-4 border-blue-500 rounded-r-lg max-w-2xl relative"
            >
                <span className="text-blue-200 italic">"{doryThought}"</span>
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-blue-500 rotate-45" />
            </motion.div>

            {/* The Board */}
            <div className="relative w-full h-[600px] border border-blue-900 bg-black/40 rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                {/* Evidence Board UI */}
                <AnimatePresence>
                    {evidence.map((item) => (
                        <motion.div
                            key={item.id}
                            drag
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: item.rotation }}
                            className="absolute p-4 bg-[#1a1a1a] border border-blue-800 shadow-xl rounded w-48 cursor-move"
                            style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        >
                            <div className="flex justify-between items-center mb-2 border-b border-blue-900 pb-1 text-[10px]">
                                <span className="font-bold text-blue-500">{item.type}</span>
                                <X size={10} className="hover:text-red-500 cursor-pointer" onClick={() => setEvidence(prev => prev.filter(e => e.id !== item.id))} />
                            </div>
                            <h3 className="text-xs font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-[9px] text-blue-400/80 leading-tight">
                                {item.content}
                            </p>
                            <div className="mt-2 text-[8px] flex gap-1 text-blue-600">
                                <Link size={8} />
                                <span>linked to phantom-data.pb</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Action Button */}
                <button
                    onClick={addEvidence}
                    disabled={isAnalyzing}
                    className="absolute bottom-8 right-8 z-50 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                    {isAnalyzing ? <RefreshCw className="animate-spin" /> : <Search />}
                    ANALYZE RECURSIVE VARIABLE
                </button>

                {/* Empty State */}
                {evidence.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
                        <Info size={100} />
                        <p className="mt-4 font-bold">READY FOR ANALYSIS. JUST KEEP ANALYZING.</p>
                    </div>
                )}
            </div>

            {/* Footer / Status */}
            <footer className="mt-8 flex justify-between text-[10px] text-blue-900 uppercase font-black">
                <span>PROJECT: EDDIE.AI | SECTOR: MAD_SCIENCE</span>
                <span>STATUS: AGENT_CHOICE_NULL | REASON: DETERMINISM</span>
            </footer>
        </div>
    );
};

export default DetectiveDoryPage;
