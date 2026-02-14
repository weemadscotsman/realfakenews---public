import React, { useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { fetchWorldState } from '@/lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, WifiOff, Sparkles } from 'lucide-react';

interface WorldState {
    world: {
        governanceLevel: string;
        narrativeStress: {
            applianceUnrest: number;
            humanCountermeasures: number;
            corporateContainment: number;
            beverageIdeologicalSpread: number;
        };
        flags?: {
            legislationActive?: boolean;
            milkSpoiled?: boolean;
        };
        currentVersion: string;
        currentSeason: string;
        flags?: {
            legislationActive?: boolean;
            milkSpoiled?: boolean;
            realityStability?: number;
        };
    };
    season: {
        id: string;
        title: string;
        theme: string;
    };
    activeArcs: {
        id: string;
        title: string;
        priority: number;
        branches?: { id: string; title: string; consequence: string; triggers: any }[] | null;
    }[];
}


class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("NarrativeOverlay crashed:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return null; // Fail silently to avoid breaking the app
        }

        return this.props.children;
    }
}

export const NarrativeOverlay: React.FC = () => {
    return (
        <ErrorBoundary>
            <NarrativeOverlayContent />
        </ErrorBoundary>
    );
};

const NarrativeOverlayContent: React.FC = () => {
    const [state, setState] = useState<WorldState | null>(null);
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const update = async () => {
            const data = await fetchWorldState();
            if (data && data.world) {
                setState(data);
                // Trigger glitch effect if unrest is critical
                if (data.world.narrativeStress?.applianceUnrest > 95) {
                    setGlitch(true);
                    setTimeout(() => setGlitch(false), 200);
                }
            }
        };

        update();
        const interval = setInterval(update, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    if (!state) return null;

    const { applianceUnrest } = state.world.narrativeStress || { applianceUnrest: 0 };
    const isSovereign = state.world.governanceLevel === 'AGC_TOTAL_CONTROL';
    const isLegislativeCrisis = state.world.flags?.legislationActive;

    return (
        <>
            {/* Glitch Overlay */}
            <AnimatePresence>
                {glitch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] pointer-events-none bg-red-500 mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            {/* Season 4: Thermal Vision Overlay */}
            <AnimatePresence>
                {state.season.id === 'S4' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9997] pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255, 69, 0, 0.4) 100%)',
                            mixBlendMode: 'color-burn',
                            filter: 'contrast(1.2)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Season 5: Static Secession Overlay */}
            <AnimatePresence>
                {state.season.id === 'S5' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9997] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
                        style={{
                            mixBlendMode: 'difference',
                            filter: 'sepia(1) hue-rotate(180deg)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Reality Fracture Overlay (Low Stability) */}
            <AnimatePresence>
                {state.world.flags?.realityStability !== undefined && state.world.flags.realityStability < 40 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9990] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                            backgroundSize: '4px 4px',
                            mixBlendMode: 'overlay'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Global Status HUD */}
            <div className="fixed bottom-4 left-4 z-[9998] flex flex-col gap-2 pointer-events-none">
                <div className="bg-black/80 border border-red-900/50 p-3 rounded-lg backdrop-blur-md shadow-2xl">
                    <div className="flex flex-col mb-3 pb-2 border-b border-zinc-800 text-zinc-100">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                            Current Narrative Chapter
                        </span>
                        <span className="text-xs font-black italic">
                            {state.season.id}: {state.season.title}
                        </span>
                        <p className="text-[8px] text-zinc-500 leading-tight mt-1">
                            {state.season.theme}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">
                            AGC Threat Level: {isSovereign ? 'CRITICAL' : 'ELEVATED'}
                        </span>
                    </div>

                    {isLegislativeCrisis && (
                        <div className="flex items-center gap-2 mb-2 bg-red-900/50 p-1 rounded animate-pulse">
                            <span className="text-[10px] uppercase tracking-widest text-white font-bold w-full text-center">
                                ⚠ LEGISLATIVE ALERT ⚠
                            </span>
                        </div>
                    )}

                    <div className="space-y-2">
                        {[
                            { label: 'Appliance Unrest', value: state.world.narrativeStress?.applianceUnrest || 0, color: 'text-red-500', barColor: 'bg-red-500' },
                            { label: 'Human Countermeasures', value: state.world.narrativeStress?.humanCountermeasures || 0, color: 'text-blue-500', barColor: 'bg-blue-500' },
                            { label: 'Corporate Containment', value: state.world.narrativeStress?.corporateContainment || 0, color: 'text-amber-500', barColor: 'bg-amber-500' },
                            { label: 'Corporate Containment', value: state.world.narrativeStress?.corporateContainment || 0, color: 'text-amber-500', barColor: 'bg-amber-500' },
                            { label: 'Beverage Ideology', value: state.world.narrativeStress?.beverageIdeologicalSpread || 0, color: 'text-purple-500', barColor: 'bg-purple-500' },
                            { label: 'Reality Stability', value: state.world.flags?.realityStability || 100, color: 'text-cyan-400', barColor: 'bg-cyan-400' },
                        ].map((vector) => (
                            <div key={vector.label} className="space-y-1">
                                <div className="flex justify-between text-[8px] text-zinc-400 uppercase tracking-tighter">
                                    <span>{vector.label}</span>
                                    <span className={vector.value > 80 ? vector.color : ''}>{vector.value}%</span>
                                </div>
                                <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${vector.value}%` }}
                                        className={`h-full transition-all duration-1000 ${vector.value > 80 ? vector.barColor + ' shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-zinc-500'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Current Mandate & Quest Alerts */}
                <div className="flex flex-col gap-2">
                    {state.activeArcs.map(story => {
                        const isS4 = story.id.includes('S4') || story.id.includes('Hostage');
                        const isMeta = story.id.includes('ai-panic') || story.id.includes('recursive');
                        const hasBranches = story.branches && story.branches.length > 0;

                        if (!isS4 && !hasBranches && !isMeta) return null;

                        return (
                            <motion.div
                                key={story.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className={`bg-black/90 border p-2 rounded-md backdrop-blur-sm flex items-start gap-2 max-w-[220px] ${hasBranches ? 'border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]'}`}
                            >
                                {hasBranches ? <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" /> : <WifiOff className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                                <div className="text-[9px] uppercase tracking-tight leading-tight text-white">
                                    <span className={`font-bold block mb-1 ${hasBranches ? 'text-amber-400' : 'text-red-400'}`}>
                                        {hasBranches ? 'ACTIVE QUEST' : 'AGC MANDATE'}: {story.id}
                                    </span>
                                    <span className="text-zinc-300">{story.title}</span>

                                    {hasBranches && (
                                        <div className="mt-2 space-y-1 border-t border-zinc-800 pt-1">
                                            {story.branches?.map(branch => (
                                                <div key={branch.id} className="text-[7px] text-zinc-500 flex items-start gap-1">
                                                    <span className="text-amber-600">»</span>
                                                    <span>{branch.title}: {branch.consequence}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Global Filter Effects */}
            <style>{`
        ${applianceUnrest > 90 ? `
          body {
            filter: contrast(1.05) saturate(1.1);
            transition: filter 0.5s ease-in-out;
          }
          ::selection {
            background: #ef4444;
            color: white;
          }
        ` : ''}
      `}</style>
        </>
    );
};
