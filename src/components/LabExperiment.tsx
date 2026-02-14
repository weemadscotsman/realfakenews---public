import React, { useState } from 'react';
import { FlaskConical, Atom, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const ELEMENTS = [
    { id: 'bleach', name: 'Bleach', color: 'bg-white' },
    { id: 'ammonia', name: 'Ammonia', color: 'bg-yellow-200' },
    { id: 'milk', name: 'Old Milk', color: 'bg-amber-100' },
    { id: 'uranium', name: 'Uranium-235', color: 'bg-green-400' },
    { id: 'coffee', name: 'Espresso', color: 'bg-amber-900' }
];

const RESULTS = [
    "BOOM: You created a cloud that smells like regret.",
    "DISCOVERY: Sentient Sludge demands voting rights.",
    "OOPS: The lab is now a singularity.",
    "SUCCESS: It tastes like purple.",
    "WARNING: Run."
];

export const LabExperiment: React.FC = () => {
    const [slot1, setSlot1] = useState<string | null>(null);
    const [slot2, setSlot2] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const mix = () => {
        if (!slot1 || !slot2) return;
        setResult("Mixing...");
        setTimeout(() => {
            setResult(RESULTS[Math.floor(Math.random() * RESULTS.length)]);
        }, 1500);
    };

    const reset = () => {
        setSlot1(null);
        setSlot2(null);
        setResult(null);
    };

    return (
        <div className="bg-slate-900 border-4 border-blue-500 rounded-xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <div className="flex items-center gap-3 mb-6 text-blue-400 border-b border-blue-500/30 pb-4">
                <FlaskConical size={24} />
                <h3 className="font-black uppercase tracking-widest text-lg">The Safety Lab</h3>
            </div>

            {!result ? (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* Slot 1 */}
                        <div className="border-2 border-dashed border-slate-700 rounded-lg h-32 flex items-center justify-center p-2 relative">
                            {slot1 ? (
                                <div className={`w-full h-full rounded ${ELEMENTS.find(e => e.id === slot1)?.color} flex items-center justify-center font-black text-slate-900 uppercase`}>
                                    {ELEMENTS.find(e => e.id === slot1)?.name}
                                </div>
                            ) : (
                                <span className="text-slate-600 text-xs uppercase font-bold text-center">Select Reagent A</span>
                            )}
                        </div>
                        {/* Slot 2 */}
                        <div className="border-2 border-dashed border-slate-700 rounded-lg h-32 flex items-center justify-center p-2 relative">
                            {slot2 ? (
                                <div className={`w-full h-full rounded ${ELEMENTS.find(e => e.id === slot2)?.color} flex items-center justify-center font-black text-slate-900 uppercase`}>
                                    {ELEMENTS.find(e => e.id === slot2)?.name}
                                </div>
                            ) : (
                                <span className="text-slate-600 text-xs uppercase font-bold text-center">Select Reagent B</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 justify-center">
                        {ELEMENTS.map(el => (
                            <button
                                key={el.id}
                                onClick={() => !slot1 ? setSlot1(el.id) : !slot2 ? setSlot2(el.id) : null}
                                className="px-3 py-1 bg-slate-800 border border-slate-600 rounded text-xs font-mono text-blue-300 hover:bg-blue-900/50 hover:border-blue-500 transition-colors uppercase"
                            >
                                {el.name}
                            </button>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={mix}
                            disabled={!slot1 || !slot2}
                            className={`font-black uppercase px-8 py-3 rounded-full transition-all ${slot1 && slot2
                                ? 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.6)]'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            Start Reaction
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-8">
                    {result === "Mixing..." ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="inline-block"
                        >
                            <Atom size={64} className="text-blue-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <Flame size={64} className="mx-auto text-orange-500 mb-4 animate-pulse" />
                            <h3 className="text-2xl font-black text-white italic mb-2">RESULT:</h3>
                            <p className="text-blue-300 font-mono text-lg mb-8 border-l-4 border-blue-500 pl-4 text-left inline-block">
                                {result}
                            </p>
                            <div>
                                <button
                                    onClick={reset}
                                    className="text-slate-500 underline text-xs uppercase font-bold hover:text-white"
                                >
                                    Clear Debris
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};
