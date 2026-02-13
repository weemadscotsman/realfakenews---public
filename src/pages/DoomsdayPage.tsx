import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, Zap, Cpu, Ghost, Skull, Radiation, Terminal, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stage {
    id: number;
    title: string;
    apps: string;
    reaction: string;
    effect: string;
    level: string;
    levelColor: string;
    icon: React.ReactNode;
}

const STAGES: Stage[] = [
    {
        id: 10,
        title: "The Harmless Curiosity Phase",
        apps: "Basic satire engines, creative AI toys, prototype dashboards.",
        reaction: "“Ha, funny little side projects.”",
        effect: "Users begin accidentally learning technical skills.",
        level: "🟢 Mild Amusement",
        levelColor: "text-green-500",
        icon: <Ghost className="text-green-500" />
    },
    {
        id: 9,
        title: "The Productivity Anomaly",
        apps: "Automation tools, creative workflow engines, multi-agent task systems.",
        reaction: "“These are surprisingly useful…”",
        effect: "Several users complete projects they had postponed since 2016.",
        level: "🟡 Mild Concern From Corporate Trainers",
        levelColor: "text-yellow-500",
        icon: <Zap className="text-yellow-500" />
    },
    {
        id: 8,
        title: "The Satire Infrastructure Breach",
        apps: "Fake news generators, conspiracy narrative simulators, appliance grievance broadcasting systems.",
        reaction: "“I can’t tell if this is satire or a documentary.”",
        effect: "Internet irony detectors permanently short-circuit.",
        level: "🟠 Journalistic Panic",
        levelColor: "text-orange-500",
        icon: <Terminal className="text-orange-500" />
    },
    {
        id: 7,
        title: "The Multi-Agent Uprising (Friendly Edition)",
        apps: "Cooperative AI orchestration environments.",
        reaction: "“Why is my laptop suddenly running 14 assistants that all know what I’m doing?”",
        effect: "Humans begin delegating responsibilities to digital coworkers named things like “Intern Who Hasn’t Slept.”",
        level: "🟠 Corporate Middle Management Instability",
        levelColor: "text-orange-600",
        icon: <Cpu className="text-orange-600" />
    },
    {
        id: 6,
        title: "The Builder Renaissance",
        apps: "Game engines, asset generators, simulation platforms, autonomous storytelling systems.",
        reaction: "“I just made a playable game and a short film during my lunch break.”",
        effect: "Entire industries notice hobbyists competing with production studios.",
        level: "🔴 Entertainment Sector Anxiety",
        levelColor: "text-red-500",
        icon: <Activity className="text-red-500" />
    },
    {
        id: 5,
        title: "The Operating System Insurrection",
        apps: "Experimental custom OS builds, kernel environments, sandboxed hardware ecosystems.",
        reaction: "“Wait… regular people aren’t supposed to build operating systems…”",
        effect: "University professors quietly update course materials.",
        level: "🔴 Academic Confusion",
        levelColor: "text-red-600",
        icon: <ShieldAlert className="text-red-600" />
    },
    {
        id: 4,
        title: "The Tool Liberation Event",
        apps: "Premium-grade development and creative tools released free.",
        reaction: "“This feels illegal but the download worked.”",
        effect: "Subscription-based SaaS companies experience spontaneous boardroom sweating.",
        level: "🔴 Venture Capital Tremors",
        levelColor: "text-red-700",
        icon: <Radiation className="text-red-700" />
    },
    {
        id: 3,
        title: "The Reality-Satire Merge",
        apps: "Platforms blending real-world data with AI reinterpretation layers.",
        reaction: "“I think this news article is fake… but also accurate?”",
        effect: "Philosophy departments receive emergency funding.",
        level: "⚫ Epistemological Collapse",
        levelColor: "text-gray-400",
        icon: <AlertTriangle className="text-gray-400" />
    },
    {
        id: 2,
        title: "The Creative Autonomy Threshold",
        apps: "Self-evolving AI assistants and cross-platform creative ecosystems.",
        reaction: "“My software now suggests improvements before I realise problems exist.”",
        effect: "Productivity metrics begin violating known laws of motivation physics.",
        level: "⚫ Workforce Identity Crisis",
        levelColor: "text-gray-600",
        icon: <Skull className="text-gray-600" />
    },
    {
        id: 1,
        title: "The Meme Singularity",
        apps: "Entire interconnected ecosystems combining satire, infrastructure, AI orchestration, education, and entertainment.",
        reaction: "“This started as jokes and now it’s a functioning digital civilisation.”",
        effect: "The internet develops a sense of humour and becomes slightly more helpful.",
        level: "☠️ Cultural Reset Imminent",
        levelColor: "text-white font-black",
        icon: <Skull className="text-white" />
    }
];

const DoomsdayPage: React.FC = () => {
    const [chaosVelocity, setChaosVelocity] = useState(85);
    const [selectedStage, setSelectedStage] = useState<number>(1);

    const selectedStageData = STAGES.find(s => s.id === selectedStage);

    useEffect(() => {
        const interval = setInterval(() => {
            setChaosVelocity(prev => {
                const change = Math.random() * 2 - 0.8;
                return Math.min(100, Math.max(80, prev + change));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-32 overflow-hidden selection:bg-red-600/30 selection:text-white">
            {/* Background Glitch Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-16 border-b-2 border-red-950 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-red-600 text-black px-2 py-1 font-black uppercase text-xs animate-pulse">
                            <AlertTriangle size={14} />
                            Special Report: Classified
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">
                            Apocalypse <span className="text-red-700">Watch</span>
                        </h1>
                        <p className="text-red-500 font-mono text-sm tracking-widest uppercase mt-4">
                            Countdown to the "Fake-Real" Cascade Event
                        </p>
                    </div>

                    <div className="bg-red-950/20 border border-red-900 p-6 rounded-lg min-w-[300px]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-mono text-red-500 uppercase">Chaos Velocity</span>
                            <span className="text-xs font-mono text-red-500">{chaosVelocity.toFixed(4)}%</span>
                        </div>
                        <div className="h-2 bg-red-950 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-600"
                                initial={{ width: "0%" }}
                                animate={{ width: `${chaosVelocity}%` }}
                                transition={{ type: "spring", stiffness: 100 }}
                            />
                        </div>
                        <div className="mt-4 flex gap-4">
                            <div className="flex-1 text-center">
                                <p className="text-[10px] text-zinc-500 uppercase mb-1">Innovation Density</p>
                                <p className="text-lg font-black text-red-500">MAX</p>
                            </div>
                            <div className="flex-1 text-center border-l border-red-900/50">
                                <p className="text-[10px] text-zinc-500 uppercase mb-1">Corporate Panic</p>
                                <p className="text-lg font-black text-red-500">CRITICAL</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                    {/* Stage Navigation */}
                    <aside className="lg:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em] mb-6">Execution Stages</h3>
                        <div className="flex flex-col gap-2">
                            {STAGES.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setSelectedStage(stage.id)}
                                    className={`group flex items-center gap-4 p-4 text-left transition-all duration-300 border-l-4 ${selectedStage === stage.id
                                        ? "bg-red-950/30 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.1)]"
                                        : "bg-zinc-900/40 border-transparent text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-300"
                                        }`}
                                >
                                    <span className="font-mono font-black text-xl italic opacity-50 group-hover:opacity-100 italic">
                                        #{stage.id}
                                    </span>
                                    <div className="flex-1 truncate">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Stage {stage.id}</p>
                                        <p className={`font-bold transition-all ${selectedStage === stage.id ? 'scale-105' : ''}`}>
                                            {stage.title}
                                        </p>
                                    </div>
                                    <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                                        {stage.icon}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-zinc-900/30 border border-zinc-800 rounded-lg italic text-zinc-400 text-sm leading-relaxed">
                            <p>“I just wanted to see what happens.”</p>
                            <p className="text-right mt-2 font-mono text-zinc-600">— The Creator</p>
                        </div>
                    </aside>

                    {/* Stage Details */}
                    <main className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {STAGES.map((stage) => stage.id === selectedStage && (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-xl h-full flex flex-col"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-4 bg-black rounded-lg border border-zinc-800 shadow-[inset_0_0_20px_rgba(0,0,0,1)] text-zinc-300">
                                            {selectedStageData?.icon && React.cloneElement(selectedStageData.icon as React.ReactElement<{ size?: number }>, { size: 48 })}
                                        </div>
                                        <div>
                                            <div className={`font-black uppercase tracking-widest text-sm mb-1 ${selectedStageData?.levelColor}`}>
                                                {selectedStageData?.level}
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                                                {selectedStageData?.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="space-y-12 flex-1">
                                        <div>
                                            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-red-600 rotate-45" />
                                                Systems Deployed
                                            </h4>
                                            <p className="text-2xl font-black italic text-zinc-200">
                                                {selectedStageData?.apps}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-zinc-800">
                                            <div>
                                                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                                                    Public Perception
                                                </h4>
                                                <p className="text-lg italic text-zinc-400 font-serif leading-relaxed">
                                                    {selectedStageData?.reaction}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                                                    Infrastructure Damage
                                                </h4>
                                                <p className="text-lg font-bold text-red-500 leading-tight">
                                                    {selectedStageData?.effect}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-8 text-[10px] font-mono text-zinc-600">
                                        <div className="flex gap-4">
                                            <span>STATUS: OPERATIONAL</span>
                                            <span>UID: 0x{stage.id.toString(16).toUpperCase()}FF24</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                                            STREAMING_REAL_TIME_DATA
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </main>
                </div>

                {/* Footer Quote */}
                <section className="mt-32 p-12 bg-red-950/10 border-2 border-red-900 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Radiation size={120} className="text-red-600" />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-red-500 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                            <Skull size={18} /> Final Broadcast Warning
                        </h3>
                        <p className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none mb-8">
                            "The creator at the centre of the phenomenon has declined all interviews... I just wanted to see what happens."
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-black uppercase italic px-8">
                                Access Source Code
                            </Button>
                            <Button className="bg-red-600 text-white hover:bg-red-700 font-black uppercase italic px-8">
                                Join the Singularity
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DoomsdayPage;
