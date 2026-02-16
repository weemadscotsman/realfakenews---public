import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ZapOff, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { voteOnQuest } from '@/lib/gemini';
import { useAuth } from '@/hooks/useAuth';
import { useGameEconomy } from '@/hooks/useGameEconomy';
import { toast } from 'sonner';

interface Branch {
    id: string;
    title: string;
    consequence: string;
    triggers: Record<string, unknown>;
}

interface Story {
    id: string;
    title: string;
    branches: Branch[] | null;
    stats?: {
        total: number;
        branches: Record<string, number>;
    };
}

interface QuestDecisionProps {
    activeStories: Story[];
    onDecisionMade?: (arcId: string, branchId: string) => void;
}

export const QuestDecision: React.FC<QuestDecisionProps> = ({ activeStories, onDecisionMade }) => {
    const { user } = useAuth();
    const { refreshEconomy, roastTokens } = useGameEconomy();
    const [selectedDecisions, setSelectedDecisions] = useState<Record<string, boolean>>({});
    const [votingInProgress, setVotingInProgress] = useState<Record<string, boolean>>({});

    // Filter for stories that have branches (Quests)
    const quests = activeStories.filter(s => s.branches && s.branches.length > 0);

    if (quests.length === 0) return null;

    const handleChoice = async (arcId: string, branch: Branch) => {
        if (selectedDecisions[arcId]) return;
        if (!user) {
            toast.error("Authentication required to influence the timeline.");
            return;
        }
        if (roastTokens < 1) {
            toast.error("Insufficient Roast Tokens. The Council demands tribute.");
            return;
        }

        try {
            // Optimistic update
            setVotingInProgress(prev => ({ ...prev, [branch.id]: true }));

            const result = await voteOnQuest(user.id, arcId, branch.id);

            if (result.success) {
                await refreshEconomy(); // Sync balance from backend
                toast.success(`Vote Recorded: ${branch.title}`, {
                    description: "Your influence has shifted the narrative vector.",
                    icon: <ShieldCheck className="text-amber-500" />
                });
                if (onDecisionMade) onDecisionMade(arcId, branch.id);
                setSelectedDecisions(prev => ({ ...prev, [arcId]: true }));
            } else {
                toast.error("Vote failed: " + result.message);
            }
        } catch {
            toast.error("Telemetry failure. The Council ignored your choice.");
        } finally {
            setVotingInProgress(prev => ({ ...prev, [branch.id]: false }));
        }
    };

    return (
        <div className="space-y-6 my-12">
            <h3 className="font-black text-xl uppercase tracking-tighter flex items-center gap-2 italic text-amber-500">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Active Lore Quests
            </h3>

            {quests.map(quest => (
                <div key={quest.id} className="bg-zinc-950 border border-amber-900/30 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Ghost className="w-12 h-12" />
                    </div>

                    <div className="p-5 border-b border-zinc-900">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 block">
                            Status: High Stakes Decision Required
                        </span>
                        <h4 className="text-lg font-bold text-zinc-100">{quest.title}</h4>
                    </div>

                    <div className="p-5 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {quest.branches?.map(branch => {
                            const voteCount = quest.stats?.branches[branch.id] || 0;
                            const totalVotes = quest.stats?.total || 0;
                            const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

                            return (
                                <motion.div
                                    key={branch.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative flex flex-col h-full"
                                >
                                    <Button
                                        onClick={() => handleChoice(quest.id, branch)}
                                        disabled={selectedDecisions[quest.id] || votingInProgress[branch.id]}
                                        variant="outline"
                                        className={`h-auto flex-col items-start gap-1 p-4 w-full text-left transition-all relative overflow-hidden ${selectedDecisions[quest.id]
                                            ? 'opacity-50 grayscale border-zinc-800'
                                            : 'hover:border-amber-500/50 hover:bg-amber-500/5 bg-zinc-900/50 border-zinc-800'
                                            }`}
                                    >
                                        {/* Progress Bar Background */}
                                        <div
                                            className="absolute bottom-0 left-0 h-1 bg-amber-500/20 transition-all duration-1000"
                                            style={{ width: `${percentage}%` }}
                                        />

                                        <div className="flex items-center justify-between w-full mb-1 z-10">
                                            <span className="font-bold text-amber-400 text-xs tracking-tight">
                                                {branch.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-zinc-500 font-mono">{percentage}%</span>
                                                <ArrowRight className="w-3 h-3 text-amber-600" />
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-zinc-500 leading-tight z-10">
                                            {branch.consequence}
                                        </p>
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {selectedDecisions[quest.id] && (
                        <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2">
                            <div className="bg-amber-950/20 border border-amber-900/30 p-2 rounded text-[10px] text-amber-500/80 italic flex items-center gap-2">
                                <ZapOff className="w-3 h-3" />
                                Narrative locked. Awaiting Council processing of your contribution.
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
