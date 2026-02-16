import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Battery, Wifi, Bluetooth } from 'lucide-react';

const PRODUCTS = [
    { name: "iRock", tagline: "It does nothing. Perfectly.", price: "$999" },
    { name: "Smart Sock", tagline: "Now with 5G connectivity.", price: "$299/mo" },
    { name: "AI Water", tagline: "It hydrates you... intelligently.", price: "$50/bottle" },
    { name: "The Cube", tagline: "We don't know what it does either.", price: "$4,000" },
    { name: "Invisible Phone", tagline: "You'll lose it immediately.", price: "$1,200" }
];

export const ProductReveal: React.FC = () => {
    const [product, setProduct] = useState<typeof PRODUCTS[number] | null>(null);
    const [loading, setLoading] = useState(false);

    const generate = () => {
        setLoading(true);
        setProduct(null);
        setTimeout(() => {
            setLoading(false);
            setProduct(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]);
        }, 1500);
    };

    return (
        <div className="bg-black text-white p-8 rounded-3xl border border-zinc-800 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-transparent to-zinc-900 opacity-50" />

            <div className="relative z-10 min-h-[300px] flex flex-col items-center justify-center">
                {!product && !loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h3 className="text-3xl font-black tracking-tight mb-2">The Future is Here.</h3>
                        <p className="text-zinc-500 mb-8 font-mono text-sm">And it requires a subscription.</p>
                        <button
                            onClick={generate}
                            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        >
                            <Sparkles size={16} /> Innovate
                        </button>
                    </motion.div>
                )}

                {loading && (
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-zinc-500 font-mono text-xs uppercase tracking-widest"
                    >
                        Disrupting Industries...
                    </motion.div>
                )}

                <AnimatePresence>
                    {product && !loading && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            className="space-y-6"
                        >
                            <div className="w-32 h-32 bg-gradient-to-br from-zinc-800 to-black rounded-3xl mx-auto shadow-2xl border border-zinc-700 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-white/5 rounded-3xl animate-pulse" />
                                <Wifi className="text-zinc-600" />
                            </div>

                            <div>
                                <h2 className="text-5xl font-black tracking-tighter mb-2">{product.name}</h2>
                                <p className="text-zinc-400 text-xl font-light italic">"{product.tagline}"</p>
                            </div>

                            <div className="pt-8 flex justify-center gap-8 text-zinc-600">
                                <span className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                                    <Battery size={20} /> 4 Hour Life
                                </span>
                                <span className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-widest">
                                    <Bluetooth size={20} /> Only connects to toaster
                                </span>
                            </div>

                            <button
                                onClick={generate}
                                className="mt-8 text-zinc-500 text-xs hover:text-white transition-colors underline"
                            >
                                Disrupt Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
