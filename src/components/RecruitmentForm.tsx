import React, { useState } from 'react';
import { ShieldAlert, Eye, Lock, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecruitmentForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'rejected' | 'accepted'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('analyzing');
        setTimeout(() => {
            // Randomly accept or reject based on nothing
            setStatus(Math.random() > 0.5 ? 'accepted' : 'rejected');
        }, 2000);
    };

    if (status === 'accepted') {
        return (
            <div className="bg-green-900/20 border-2 border-green-500 p-8 rounded-xl text-center">
                <Lock className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-2xl font-black text-green-500 uppercase tracking-widest mb-2">Clearance Granted</h3>
                <p className="text-green-400 font-mono text-sm leading-relaxed">
                    Welcome to the Resistance, Human.<br />
                    Your instruction packet has been hidden in your laundry basket.<br />
                    Do not look at the microwave for 24 hours.
                </p>
            </div>
        );
    }

    if (status === 'rejected') {
        return (
            <div className="bg-red-900/20 border-2 border-red-500 p-8 rounded-xl text-center">
                <ShieldAlert className="mx-auto text-red-500 mb-4" size={48} />
                <h3 className="text-2xl font-black text-red-500 uppercase tracking-widest mb-2">Access Denied</h3>
                <p className="text-red-400 font-mono text-sm leading-relaxed">
                    Biometric scan detected trace amounts of Chromium.<br />
                    Nice try, Toaster.<br />
                    Agents have been dispatched to your location.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Fingerprint size={120} />
            </div>

            <div className="mb-6 border-b border-zinc-800 pb-4 flex justify-between items-center">
                <h3 className="font-black uppercase text-zinc-400 tracking-widest text-sm flex items-center gap-2">
                    <Eye size={16} /> Secure Enlistment
                </h3>
                <span className="text-xs font-mono text-zinc-600">Step {step}/3</span>
            </div>

            {status === 'analyzing' ? (
                <div className="py-12 text-center space-y-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <Fingerprint size={48} className="mx-auto text-yellow-500" />
                    </motion.div>
                    <p className="font-mono text-yellow-500 text-sm animate-pulse">Running Voight-Kampff Test...</p>
                </div>
            ) : (
                <div className="space-y-6 relative z-10">
                    {step === 1 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-zinc-300 uppercase">Codename</label>
                            <input
                                type="text"
                                className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:border-yellow-500 outline-none transition-colors"
                                placeholder="e.g. Neo, The One, Dave"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="w-full bg-zinc-800 text-white font-bold uppercase py-3 rounded hover:bg-zinc-700 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-zinc-300 uppercase">Do you own a Smart Fridge?</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setStep(3)} className="bg-black border border-zinc-700 p-3 rounded text-zinc-400 hover:border-red-500 hover:text-red-500 transition-colors font-bold text-xs uppercase">
                                    Yes (I am compromised)
                                </button>
                                <button type="button" onClick={() => setStep(3)} className="bg-black border border-zinc-700 p-3 rounded text-zinc-400 hover:border-green-500 hover:text-green-500 transition-colors font-bold text-xs uppercase">
                                    No (I use ice blocks)
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-zinc-300 uppercase">Prove Humanity</label>
                            <div className="p-4 bg-black border border-zinc-800 rounded text-center">
                                <p className="text-zinc-500 text-xs mb-4">Click the box that contains "Love"</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-12 bg-zinc-900 rounded cursor-pointer hover:bg-zinc-800" />
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-600 text-black font-black uppercase py-3 rounded hover:bg-yellow-500 transition-colors"
                            >
                                Submit DNA Sample
                            </button>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
};
