import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Radio, AlertTriangle } from 'lucide-react';

interface NewsAnchorPlayerProps {
    videoUrl: string;
    anchorName: string;
    headlines: string[];
    isLive?: boolean;
}

export const NewsAnchorPlayer: React.FC<NewsAnchorPlayerProps> = ({
    videoUrl,
    anchorName,
    headlines,
    isLive = true
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const tickerText = headlines.join(" • ") + " • " + headlines.join(" • ");

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800 group">
            {/* Main Video */}
            <video
                src={videoUrl}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%]" />

            {/* Glitch Overlay (Active during Absurdity) */}
            <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-10 z-20"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                    filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />

            {/* UI Overlays */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 z-30 pointer-events-none">
                {/* Header: Live Indicator & Anchor Name */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {isLive && (
                            <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase animate-pulse">
                                <Radio size={12} />
                                LIVE
                            </div>
                        )}
                        <div className="bg-zinc-900/80 backdrop-blur-md px-3 py-1 rounded border border-zinc-700">
                            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-tighter block leading-none">Anchor</span>
                            <span className="text-white text-sm font-black leading-tight uppercase italic">{anchorName}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom: Ticker & Headlines */}
                <div className="space-y-4">
                    {/* Lower Thirds */}
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="inline-block"
                            >
                                <div className="bg-zinc-950 border-l-4 border-red-500 p-4 max-w-md backdrop-blur-sm bg-opacity-90">
                                    <div className="flex items-center gap-2 text-red-500 mb-1">
                                        <AlertTriangle size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Reality Warning</span>
                                    </div>
                                    <h2 className="text-white text-xl font-black uppercase italic leading-tight">
                                        {headlines[0] || "RECONSTRUCTING TRUTH..."}
                                    </h2>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Scrolling Ticker */}
                    <div className="w-full bg-red-600 overflow-hidden h-8 flex items-center border-y border-red-400">
                        <div className="flex items-center bg-zinc-950 h-full px-4 text-white font-black italic text-xs z-10 skew-x-[-15deg] ml-[-10px] pr-8">
                            BREAKING
                        </div>
                        <motion.div
                            className="whitespace-nowrap flex text-white font-bold text-sm"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        >
                            <span className="px-4">{tickerText}</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 backdrop-blur-[2px]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(true)}
                        className="p-6 bg-red-600 rounded-full text-white shadow-2xl pointer-events-auto"
                        title="Play Broadcast"
                    >
                        <Play fill="white" size={40} />
                    </motion.button>
                </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-12 right-6 z-50 flex gap-3 pointer-events-auto">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 bg-zinc-900/80 backdrop-blur-md rounded border border-zinc-700 text-white"
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>
        </div>
    );
};
