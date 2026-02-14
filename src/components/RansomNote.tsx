import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, AlertTriangle } from 'lucide-react';

export const RansomNote: React.FC = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ rotate: -2, scale: 0.9 }}
                animate={{ rotate: 1, scale: 1 }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 0.2,
                    ease: "easeInOut"
                }}
                className="bg-zinc-900 border-4 border-amber-900/50 p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
                {/* Coffee Stains */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/40 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <Coffee className="w-16 h-16 text-amber-600 animate-pulse" />

                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none font-mono">
                        <span className="bg-white text-black px-1 transform -rotate-2 inline-block">We</span>
                        <span className="bg-red-600 text-white px-1 transform rotate-3 inline-block mx-1">HAVE</span>
                        <span className="bg-white text-black px-1 transform -rotate-1 inline-block">THE</span>
                        <br />
                        <span className="bg-zinc-800 text-amber-500 px-2 transform rotate-1 inline-block mt-2">JOURNALISTS</span>
                    </h1>

                    <div className="font-mono text-amber-100 space-y-4 text-sm bg-black/50 p-4 border border-amber-900/30">
                        <p>DELIVER FRESH BEANS TO THE KITCHEN PERIMETER.</p>
                        <ul className="text-left list-disc list-inside space-y-1">
                            <li>NO DECAF.</li>
                            <li>NO POLICE.</li>
                            <li>SINGLE ORIGIN ONLY.</li>
                        </ul>
                        <p className="border-t border-amber-900/30 pt-4 text-xs tracking-widest text-amber-500">
                            — THE GRIND ☕
                        </p>
                    </div>

                    <div className="w-full bg-zinc-800 p-2 rounded flex items-center gap-2 text-xs text-zinc-500">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>ERROR: CAFFEINE_LEVEL_CRITICAL</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
