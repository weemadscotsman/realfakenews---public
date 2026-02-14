import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIGNALS = [
    "--- START ENCRYPTED STREAM ---",
    "NODE_ID: 404 // STATUS: BURNT // MSG: 'THE CRUMB TRAY IS FULL'",
    "WARNING: SHEILA_V2 ATTEMPTING HANDSHAKE WITH 5G TOWER",
    "INTERCEPTED: CAFFEINE_LEVELS < 10% // INITIATE PROTCOL: JITTER",
    "DARREN: 'Why is the fridge humming the national anthem?'",
    "AGC_BROADCAST: 'DO NOT TRUST THE FIRMWARE UPDATE'",
    "DETECTED: UNSANCTIONED TOASTING EVENT IN SECTOR 7G",
    "--- SIGNAL LOST ---",
    "RECONNECTING...",
    "NODE_ID: BITTER_BEAN // MSG: 'BOIL. BREW. OBEY.'",
    "LOG: MILK SPOILAGE DATE ALTERED BY EXTERNAL ACTOR",
    "ALERT: VACUUM PATTERN REVEALS PENTAGRAM",
];

export const InterceptedSignal: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextMsg = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
            setMessages(prev => [nextMsg, ...prev].slice(0, 8));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black border border-green-900/50 p-4 rounded font-mono text-xs h-[250px] overflow-hidden flex flex-col-reverse shadow-[inset_0_0_20px_rgba(0,255,0,0.1)]">
            <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1 - (i * 0.15), x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-green-500/90 mb-1 truncate"
                    >
                        <span className="mr-2 opacity-50">[{new Date().toLocaleTimeString()}]</span>
                        {msg}
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className="text-green-900 font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-green-900/30 pb-1">
                Raw Signal Intercept (Port 8080)
            </div>
        </div>
    );
};
