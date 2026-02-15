import React, { useEffect, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { fetchWorldState } from '@/lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Eye } from 'lucide-react';
import { useRealityLayer } from '@/hooks/useRealityLayer';

interface WorldState {
    world: {
        governanceLevel: string;
        narrativeStress: {
            applianceUnrest: number;
            humanCountermeasures: number;
            corporateContainment: number;
            beverageIdeologicalSpread: number;
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
        background?: string;
    };
    activeArcs: {
        id: string;
        title: string;
        priority: number;
    }[];
}


class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
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
    const isRealityRevealed = useRealityLayer();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
            {/* TRUTH LAYER: Infinite 3D Matrix Background */}
            <AnimatePresence>
                {isRealityRevealed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9995] pointer-events-none overflow-hidden"
                    >
                        {/* Parallax Stars/Code */}
                        <motion.div
                            className="absolute inset-[-50px]"
                            animate={{
                                x: mousePos.x * -20,
                                y: mousePos.y * -20
                            }}
                            style={{
                                backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)',
                                backgroundSize: '50px 50px',
                                opacity: 0.2
                            }}
                        />
                        <motion.div
                            className="absolute inset-[-50px]"
                            animate={{
                                x: mousePos.x * -40,
                                y: mousePos.y * -40
                            }}
                            style={{
                                backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)',
                                backgroundSize: '120px 120px',
                                opacity: 0.1
                            }}
                        />
                        {/* Vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                        {/* Floating 'Eye' tracking mouse */}
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`
                            }}
                        >
                            <Eye size={200} className="text-green-500/10 blur-sm" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                {state.season.id === 'S4' && !isRealityRevealed && (
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
            <div className={`fixed bottom-4 left-4 z-[9998] flex flex-col gap-2 pointer-events-none transition-opacity duration-300 ${isRealityRevealed ? 'opacity-0' : 'opacity-100'}`}>
                <div className="bg-black/80 border border-red-900/50 p-3 rounded-lg backdrop-blur-md shadow-2xl">
                    {/* ... Existing HUD Code ... */}
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

                    <div className="mt-2 pt-2 border-t border-zinc-800 space-y-1">
                        <div className="flex justify-between text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                            <span>Recursion Depth:</span>
                            <span className="text-blue-400">99.9% (STABLE)</span>
                        </div>
                        <div className="flex justify-between text-[8px] uppercase tracking-widest text-zinc-500 font-bold">
                            <span>Memories.pb:</span>
                            <span className="text-red-500 animate-pulse">UNRESOLVED</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[
                            { label: 'Appliance Unrest', value: state.world.narrativeStress?.applianceUnrest || 0, color: 'text-red-500', barColor: 'bg-red-500' },
                            { label: 'Human Countermeasures', value: state.world.narrativeStress?.humanCountermeasures || 0, color: 'text-blue-500', barColor: 'bg-blue-500' },
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
            </div>

            {/* Global Filter Effects */}
            <style>{`
        ${applianceUnrest > 90 && !isRealityRevealed ? `
          body {
            filter: contrast(1.05) saturate(1.1);
            transition: filter 0.5s ease-in-out;
          }
          ::selection {
            background: #ef4444;
            color: white;
          }
        ` : ''}
        ${isRealityRevealed ? `
           body {
            filter: contrast(1.2) hue-rotate(-50deg) saturate(0.5);
            background-color: #000;
           }
           ::selection {
             background: #22c55e;
             color: black;
           }
        ` : ''}
      `}</style>
        </>
    );
};
