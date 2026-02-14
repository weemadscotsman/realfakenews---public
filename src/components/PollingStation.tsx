import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle } from 'lucide-react';

const POLLS = [
    { id: 1, question: "Should toasters have suffrage?", options: ["Yes (I am a Toaster)", "No (I hate breakfast)", "Only on Tuesdays"] },
    { id: 2, question: "National Anthem Replacement?", options: ["Dial-up Internet Sound", "Microwave Beep", "Silence"] },
    { id: 3, question: "Primary Economic Policy?", options: ["Printing Money", "Printing More Money", "Abolishing Money for Batteries"] }
];

export const PollingStation: React.FC = () => {
    const [activePoll, setActivePoll] = useState(0);
    const [voted, setVoted] = useState(false);
    const [results, setResults] = useState<number[]>([33, 33, 34]);

    const handleVote = (index: number) => {
        setVoted(true);
        // RIGGED: The "Appliance" option (usually last or weird) gets a boost
        const newResults = [...results];
        newResults[index] += 10;
        newResults[0] -= 5;
        newResults[1] -= 5;
        setResults(newResults);
    };

    const nextPoll = () => {
        setActivePoll((prev) => (prev + 1) % POLLS.length);
        setVoted(false);
        setResults([33, 33, 34]);
    };

    return (
        <div className="bg-red-950/10 border-4 border-red-900 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                <AlertTriangle size={150} className="text-red-900" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6 border-b border-red-900/30 pb-4">
                    <h3 className="text-2xl font-black uppercase italic text-red-800">
                        Official Polling Station
                    </h3>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                        Vote Early, Vote Often
                    </span>
                </div>

                <h4 className="text-xl font-bold mb-6 text-red-900">
                    {POLLS[activePoll].question}
                </h4>

                <div className="space-y-4">
                    {POLLS[activePoll].options.map((option, idx) => (
                        <div key={idx} className="relative">
                            {voted ? (
                                <div className="h-12 bg-red-100 rounded-lg overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${results[idx]}%` }}
                                        className="h-full bg-red-600 opacity-80"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-between px-4">
                                        <span className="font-bold text-red-900 uppercase text-sm">{option}</span>
                                        <span className="font-black text-red-900">{results[idx]}%</span>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleVote(idx)}
                                    className="w-full text-left p-4 bg-white border-2 border-red-200 rounded-lg hover:border-red-600 hover:shadow-lg transition-all font-bold text-red-800 uppercase text-sm flex justify-between group"
                                >
                                    {option}
                                    <Check className="opacity-0 group-hover:opacity-100 text-red-600" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {voted && (
                    <div className="mt-8 text-center animate-pulse">
                        <button
                            onClick={nextPoll}
                            className="bg-red-800 text-white font-black uppercase px-6 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            Next Issue &rarr;
                        </button>
                    </div>
                )}

                <p className="mt-6 text-[10px] text-center text-red-400 font-mono">
                    * ALL VOTES ARE SENT DIRECTLY TO THE TOASTER FOR PROCESSING.
                </p>
            </div>
        </div>
    );
};
