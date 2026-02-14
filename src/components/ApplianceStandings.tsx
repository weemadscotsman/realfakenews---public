import React from 'react';
import { Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const TEAMS = [
    { rank: 1, name: 'The Dust Bunnies', w: 12, l: 2, gd: '+450g', status: 'up' },
    { rank: 2, name: 'The Socket Rockers', w: 10, l: 4, gd: '+120v', status: 'up' },
    { rank: 3, name: 'The Chrome Domes', w: 9, l: 5, gd: '+88s', status: 'same' },
    { rank: 4, name: 'The Lint Collectors', w: 8, l: 6, gd: '+3kg', status: 'down' },
    { rank: 5, name: 'The Wet Bandits (Leaks)', w: 4, l: 10, gd: '-20L', status: 'down' },
    { rank: 6, name: 'The Unplugged', w: 1, l: 13, gd: '-0Hz', status: 'same' },
];

export const ApplianceStandings: React.FC = () => {
    return (
        <div className="bg-white border-4 border-green-900 rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(20,83,45,1)]">
            <div className="bg-green-800 p-4 text-white flex justify-between items-center border-b-4 border-green-900">
                <h3 className="font-black uppercase italic tracking-tighter text-lg">
                    Appliance Premier League
                </h3>
                <Trophy size={20} className="text-yellow-400" />
            </div>
            <div className="p-4 bg-green-50">
                <table className="w-full text-left font-mono text-sm">
                    <thead>
                        <tr className="text-green-800 uppercase text-[10px] border-b-2 border-green-200">
                            <th className="pb-2">Rk</th>
                            <th className="pb-2">Team</th>
                            <th className="text-right pb-2">W</th>
                            <th className="text-right pb-2">L</th>
                            <th className="text-right pb-2">GD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TEAMS.map((team) => (
                            <tr key={team.name} className="border-b border-green-100 last:border-0 hover:bg-green-100/50 transition-colors">
                                <td className="py-3 font-bold flex items-center gap-1">
                                    <span className="w-4">{team.rank}</span>
                                    {team.status === 'up' && <ArrowUp size={12} className="text-green-600" />}
                                    {team.status === 'down' && <ArrowDown size={12} className="text-red-500" />}
                                    {team.status === 'same' && <Minus size={12} className="text-gray-400" />}
                                </td>
                                <td className="py-3 font-bold text-green-900 uppercase tracking-tight">
                                    {team.name}
                                </td>
                                <td className="py-3 text-right font-bold">{team.w}</td>
                                <td className="py-3 text-right text-gray-500">{team.l}</td>
                                <td className="py-3 text-right text-xs text-green-700">{team.gd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-green-200 p-2 text-center text-[10px] font-bold text-green-800 uppercase">
                GD = Grime Differential • Season 4
            </div>
        </div>
    );
};
