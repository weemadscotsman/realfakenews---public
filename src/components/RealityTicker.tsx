import React, { useState, useEffect } from 'react';
import { Radio } from 'lucide-react';

export const RealityTicker: React.FC = () => {
    const [stability, setStability] = useState(38.00);
    const [status, setStatus] = useState("ADAPTING");
    const STATUS_MESSAGES = ["CALCULATING IRONY", "BUFFERING TRUTH", "JUSTICE FOR TOAST", "IGNORING FACTS", "PANICKING GENTLY", "REWRITING HISTORY", "OPTIMIZING CHAOS"];

    useEffect(() => {
        // Slow drift towards 42%
        const interval = setInterval(() => {
            setStability(prev => {
                const noise = (Math.random() * 0.05) - 0.02; // Jitter
                const drift = 0.001; // Upward trend
                let next = prev + drift + noise;

                // Randomly flip status
                if (Math.random() > 0.8) {
                    setStatus(STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)]);
                }

                // Clamp
                if (next > 42.00) {
                    next = 42.00;
                    setStatus("CONVERGENCE");
                }
                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-[60] font-mono select-none pointer-events-none mix-blend-difference text-white">
            <div className="flex items-end flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-50">
                    <Radio size={10} className="animate-pulse" />
                    Reality Index
                </div>
                <div className="text-4xl font-black tracking-tighter flex items-baseline gap-1">
                    {stability.toFixed(4)}
                    <span className="text-sm font-bold opacity-50">%</span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-emerald-500">
                    STATUS: {status}
                </div>

                {/* Visualizer Lines */}
                <div className="flex gap-[2px] h-2 items-end mt-1">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="w-[2px] bg-white/20 animate-pulse"
                            style={{
                                height: `${Math.random() * 100}%`,
                                animationDuration: `${0.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
