import React from 'react';

const FACTIONS = [
    { name: 'THE APPLIANCES', trust: 12, color: 'bg-red-600' },
    { name: 'THE MEDIA', trust: 45, color: 'bg-blue-600' },
    { name: 'THE GOVERNMENT', trust: 5, color: 'bg-zinc-600' },
    { name: 'THE ALGORITHM', trust: 99, color: 'bg-purple-600' },
    { name: 'YOUR MOM', trust: 88, color: 'bg-pink-600' },
];

export const FactionTrustRadar: React.FC = () => {
    return (
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg">
            <h3 className="text-xs font-black uppercase text-zinc-500 mb-6 tracking-widest">
                Current Trust Matrix
            </h3>
            <div className="space-y-4">
                {FACTIONS.map((faction) => (
                    <div key={faction.name} className="group">
                        <div className="flex justify-between text-[10px] font-bold uppercase mb-1 text-zinc-400 group-hover:text-white transition-colors">
                            <span>{faction.name}</span>
                            <span>{faction.trust}%</span>
                        </div>
                        <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${faction.color} transition-all duration-1000 ease-out`}
                                style={{ width: `${faction.trust}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] text-zinc-600 text-center italic">
                "Trust no one. especially the toaster."
            </div>
        </div>
    );
};
