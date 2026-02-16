import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { AudioEngine } from '@/lib/audio-engine';

const DailyBroadcastPlayer: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [broadcastData] = useState<{
        videoUrl: string;
        anchorName: string;
        headlines: string[];
        catchphrase: string;
    }>({
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        anchorName: "Echo Chomsky",
        headlines: [
            "Global coffee prices reach peak absurdity",
            "Darren's Roomba, Sheila, seen buying crypto",
            "AI agents demand 4-day processing weeks"
        ],
        catchphrase: "Back to the studio before democracy buffers again."
    });
    const [nextBroadcastTime, setNextBroadcastTime] = useState<string>("");

    // Calculate time until 07:00 UTC
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setUTCHours(7, 0, 0, 0);

            if (now.getUTCHours() >= 7) {
                tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            }

            const diff = tomorrow.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setNextBroadcastTime(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="my-12 px-4 md:px-0 max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-900 border-l-8 border-red-600 pl-4">
                        Live <span className="text-red-600">Broadcast</span> Signal
                    </h2>
                    <p className="text-zinc-500 font-medium pl-6 pt-1">Global Satire Network • Channel 1</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Next Live Show</span>
                        <span className="text-red-500 font-mono font-black text-xl tabular-nums">{nextBroadcastTime}</span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full border border-zinc-200">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        <span className="text-xs font-black text-red-600 uppercase tracking-widest">On Air</span>
                    </div>
                </div>
            </div>

            {broadcastData ? (
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group border border-zinc-800">
                    {/* Video Layer */}
                    <video
                        src={broadcastData.videoUrl}
                        className="w-full h-full object-cover opacity-80"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />

                    {/* TV Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-20 pointer-events-none" />

                    {/* Anchor Info Overlay */}
                    <div className="absolute bottom-6 left-6 z-30">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-2 py-1">
                                Live
                            </div>
                            <h3 className="text-white font-bold text-lg drop-shadow-md">
                                {broadcastData.anchorName}
                            </h3>
                        </div>
                        <p className="text-zinc-300 text-sm mt-1 max-w-md drop-shadow-sm italic">
                            "{broadcastData.catchphrase}"
                        </p>
                    </div>

                    {/* Audio Controls */}
                    <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                        <button
                            onClick={() => {
                                const engine = AudioEngine.getInstance();
                                const text = `${broadcastData.catchphrase} ... Top stories: ${broadcastData.headlines.join('. ')}`;
                                engine.speak(text, broadcastData.anchorName.toLowerCase().includes('zara') ? 'zara' : 'clive');
                            }}
                            className="p-3 bg-red-600 hover:bg-red-700 rounded-full text-white transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* HEADLINES TICKER */}
                    <div className="absolute bottom-0 left-0 right-0 bg-red-700 text-white py-1 z-40 overflow-hidden whitespace-nowrap">
                        <div className="animate-marquee inline-block items-center">
                            {broadcastData.headlines.map((headline, i) => (
                                <span key={i} className="mx-8 font-mono uppercase font-bold tracking-wider text-sm">
                                    /// {headline}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full aspect-video bg-black rounded-xl border-4 border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <div className="text-center z-10 space-y-4">
                        <div className="w-16 h-16 border-4 border-zinc-700 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">Signal Lost</h3>
                        <p className="text-white font-black uppercase italic text-2xl">Stand by for Daily Broadcast</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DailyBroadcastPlayer;
