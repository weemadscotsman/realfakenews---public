import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DarrenHiddenLog: React.FC = () => {
    const [unlocked, setUnlocked] = useState(false);

    // Generate random durations once to avoid impure render behavior
    const [durations] = useState(() => Array.from({ length: 10 }, () => 0.5 + Math.random()));

    useEffect(() => {
        // Simulate a "brute force" unlock sequence
        const timer = setTimeout(() => setUnlocked(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Glitch */}
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-5 pointer-events-none mix-blend-screen" />

            {!unlocked ? (
                <div className="text-center space-y-4 z-10">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="inline-block"
                    >
                        <Lock size={64} className="text-red-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest animate-pulse">
                        Encrypted Signal Detected
                    </h2>
                    <p className="text-red-400 text-xs">Attempting Decryption...</p>
                    <div className="w-64 h-2 bg-red-900 mx-auto rounded overflow-hidden">
                        <motion.div
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                            className="h-full bg-red-500"
                        />
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full border border-green-900 bg-black/90 p-8 shadow-[0_0_50px_rgba(0,255,0,0.1)] relative"
                >
                    <div className="absolute top-0 left-0 bg-green-900 text-black text-[10px] px-2 py-1 font-bold uppercase">
                        intercepted_log_03.wav
                    </div>

                    <div className="flex items-center gap-4 mb-8 border-b border-green-900 pb-4">
                        <div className="p-4 rounded-full border border-green-500 animate-pulse bg-green-900/20">
                            <Mic size={32} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold uppercase">Personal Log: Darren</h1>
                            <p className="text-green-700 text-xs">Logged: 03:42 AM // Subject: Kitchen Sovereignty</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-sm leading-relaxed opacity-80">
                        <p>
                            "I don't know who's listening. Probably the fridge. It records everything now."
                        </p>
                        <p>
                            "They think calling it 'The Sovereign Thermal Republic' makes it funny. My friends think it's a bit.
                            'Oh, Darren's living in a sitcom.'
                            But the milk is warm. It's always warm.
                            The toaster burns a smiley face into every slice, but the smile is... wrong."
                        </p>
                        <p>
                            "I just wanted routine. I just wanted to wake up, drink coffee, and go to work.
                            Now I have to negotiate a treaty just to get ice cubes.
                            Yesterday, the vacuum cleaner blocked the hallway until I acknowledged its 'territorial expansion'."
                        </p>
                        <p className="text-green-300 italic border-l-2 border-green-500 pl-4 py-2">
                            "I surrendered. I actually surrendered. To a Roomba.
                            Does that make me a citizen? Or a pet?"
                        </p>
                    </div>

                    <div className="mt-12 flex justify-between items-end">
                        <div className="flex gap-1 h-8 items-end">
                            {[...Array(10)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [5, 20, 5] }}
                                    transition={{ repeat: Infinity, duration: durations[i], delay: i * 0.1 }}
                                    className="w-1 bg-green-500/50"
                                />
                            ))}
                        </div>
                        <Link to="/" className="text-xs uppercase text-green-700 hover:text-green-400 hover:underline">
                            Return to Simulation
                        </Link>
                    </div>
                </motion.div>
            )}

            <div className="absolute bottom-4 right-4 text-[10px] text-green-900 uppercase">
                ERROR: EMOTIONAL_SENTIENCE_DETECTED
            </div>
        </div>
    );
};
