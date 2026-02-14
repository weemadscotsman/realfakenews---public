import React, { useState } from 'react';
import { Zap, Shield, Check } from 'lucide-react';

const DRAFT_POOL = [
    { id: 1, name: 'Dyson V10', role: 'Sweeper', stats: { spd: 99, def: 20 }, cost: 50 },
    { id: 2, name: 'Unit 404', role: 'Toaster', stats: { spd: 10, def: 88 }, cost: 40 },
    { id: 3, name: 'Sheila', role: 'Tactician', stats: { spd: 45, def: 90 }, cost: 60 },
    { id: 4, name: 'Blender 9000', role: 'Disruptor', stats: { spd: 85, def: 10 }, cost: 35 },
    { id: 5, name: 'The Microwave', role: 'Support', stats: { spd: 100, def: 50 }, cost: 45 },
    { id: 6, name: 'Smart Fridge', role: 'Tank', stats: { spd: 0, def: 99 }, cost: 55 },
];

export const FantasyDraftPicker: React.FC = () => {
    const [team, setTeam] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const togglePlayer = (id: number) => {
        if (team.includes(id)) {
            setTeam(team.filter(tid => tid !== id));
        } else {
            if (team.length < 3) setTeam([...team, id]);
        }
    };

    if (submitted) {
        return (
            <div className="bg-zinc-900 border-4 border-yellow-500 rounded-xl p-8 text-center shadow-2xl">
                <h3 className="text-3xl font-black text-yellow-500 uppercase italic mb-4">Draft Complete!</h3>
                <p className="text-white font-mono mb-6">
                    Projected Season Outcome: <span className="text-yellow-400 font-bold">Total Chaos.</span>
                </p>
                <button
                    onClick={() => { setTeam([]); setSubmitted(false); }}
                    className="bg-yellow-500 text-black font-black uppercase px-6 py-2 rounded hover:bg-yellow-400 transition-colors"
                >
                    Draft Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700">
            <div className="bg-black p-4 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="text-white font-black uppercase italic tracking-tighter">
                    Fantasy Household Draft
                </h3>
                <span className="text-xs font-mono text-yellow-500">Pick 3 Starters</span>
            </div>

            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {DRAFT_POOL.map((player) => {
                    const isSelected = team.includes(player.id);
                    return (
                        <button
                            key={player.id}
                            onClick={() => togglePlayer(player.id)}
                            className={`relative p-3 rounded border-2 text-left transition-all ${isSelected
                                ? 'bg-yellow-500/20 border-yellow-500'
                                : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                                }`}
                            disabled={!isSelected && team.length >= 3}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-0.5">
                                    <Check size={12} className="text-black" />
                                </div>
                            )}
                            <p className="text-[10px] text-zinc-400 uppercase font-bold">{player.role}</p>
                            <h4 className={`font-black uppercase italic leading-tight mb-2 ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                                {player.name}
                            </h4>
                            <div className="flex gap-2 text-[10px] font-mono">
                                <span className="flex items-center gap-1 text-blue-400"><Zap size={8} /> {player.stats.spd}</span>
                                <span className="flex items-center gap-1 text-green-400"><Shield size={8} /> {player.stats.def}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-black flex justify-between items-center">
                <div className="text-xs text-zinc-500 font-mono">
                    Roster: {team.length}/3
                </div>
                <button
                    onClick={() => setSubmitted(true)}
                    disabled={team.length !== 3}
                    className={`text-xs font-black uppercase px-4 py-2 rounded ${team.length === 3
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                        }`}
                >
                    Submit Lineup
                </button>
            </div>
        </div>
    );
};
