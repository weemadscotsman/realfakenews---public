import React from 'react';
import { Target, Users } from 'lucide-react';
import { HIT_LIST_DATA } from '@/data/hit-list-data';
import type { HitListEntry } from '@/data/hit-list-data';
import { motion } from 'framer-motion';

const CreatorHitList: React.FC = () => {
    return (
        <div className="bg-black/80 border border-green-900 rounded-lg overflow-hidden backdrop-blur-xl">
            <div className="bg-green-900/20 p-4 border-b border-green-900 flex justify-between items-center">
                <div className="flex items-center gap-2 text-green-500">
                    <Target size={20} className="animate-pulse" />
                    <h2 className="text-lg font-black tracking-widest uppercase">The_Creator_Hit_List</h2>
                </div>
                <div className="text-[10px] text-green-700 flex gap-4 uppercase">
                    <span>Targets: 93</span>
                    <span>Status: ACTIVE_MUTATION</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-green-950/30 text-green-800 uppercase tracking-widest border-b border-green-900/50">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Designation</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Stress</th>
                            <th className="p-3">Agents</th>
                            <th className="p-3 text-right">Last_Modified</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-900/20">
                        {HIT_LIST_DATA.map((project) => (
                            <motion.tr
                                key={project.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`hover:bg-green-900/10 transition-colors group ${project.id === 1 ? 'bg-green-900/5' : ''}`}
                            >
                                <td className="p-3 font-mono opacity-40">#{project.id.toString().padStart(3, '0')}</td>
                                <td className="p-3">
                                    <div className="font-bold text-green-400 group-hover:text-green-300">
                                        {project.name}
                                        {project.id === 1 && <span className="ml-2 text-[8px] bg-green-500 text-black px-1 rounded">CANON</span>}
                                    </div>
                                    <div className="text-[9px] text-green-800 uppercase mt-0.5 truncate max-w-[300px]">
                                        {project.description}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${project.status === 'CANONIZED' ? 'bg-green-500 text-black' :
                                        project.status === 'MUTATING' ? 'bg-amber-600 text-white animate-pulse' :
                                            project.status === 'STABLE' ? 'bg-zinc-800 text-zinc-400' :
                                                'bg-red-900 text-red-200 opacity-50'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="p-3 w-32">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-green-900/30 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${project.stress > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${project.stress}%` }}
                                            />
                                        </div>
                                        <span className="text-[9px] opacity-60 font-mono">{project.stress}%</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-1 text-green-600 font-mono">
                                        <Users size={10} />
                                        {project.agents}
                                    </div>
                                </td>
                                <td className="p-3 text-right text-green-900 font-mono">
                                    {project.lastModified}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-3 bg-black text-[9px] text-green-950 uppercase flex justify-between border-t border-green-900">
                <span>// SWARM_TOPOLOGY: 29_KIMIS_DETECTED</span>
                <span>// ENCRYPTION: Teddy_OS_Standard</span>
            </div>
        </div>
    );
};

export default CreatorHitList;
