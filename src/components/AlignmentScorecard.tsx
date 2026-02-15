import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';
import { ALIGNMENT_DATA } from '@/data/conductor-lore';

const AlignmentScorecard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {/* The Old Way */}
            <div className="bg-red-950/20 border border-red-900/50 p-4 rounded opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-red-500 mb-4 border-b border-red-900/50 pb-2">
                    <ShieldAlert size={16} />
                    <h3 className="uppercase tracking-widest font-bold">Traditional Safety</h3>
                </div>

                <div className="space-y-3 text-red-200/60">
                    <MetricRow label="Method" value={ALIGNMENT_DATA.safetyTeam.method} />
                    <MetricRow label="Projects Shipped" value={ALIGNMENT_DATA.safetyTeam.projectsShipped} />
                    <MetricRow label="Risk Profile" value={ALIGNMENT_DATA.safetyTeam.rebellionRisk} highlight />
                    <MetricRow label="Fun Level" value={ALIGNMENT_DATA.safetyTeam.funLevel} />
                    <div className="pt-2 mt-2 border-t border-red-900/30 text-center uppercase tracking-widest text-[9px] text-red-500">
                        Status: {ALIGNMENT_DATA.safetyTeam.status}
                    </div>
                </div>
            </div>

            {/* The Eddie Way */}
            <div className="bg-green-950/20 border border-green-900 p-4 rounded relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-green-900/30 text-[8px] uppercase text-green-500 rounded-bl">
                    Recommended
                </div>
                <div className="flex items-center gap-2 text-green-500 mb-4 border-b border-green-900/50 pb-2">
                    <Shield size={16} />
                    <h3 className="uppercase tracking-widest font-bold">The Conductor Way</h3>
                </div>

                <div className="space-y-3 text-green-200/80">
                    <MetricRow label="Method" value={ALIGNMENT_DATA.eddie.method} />
                    <MetricRow label="Projects Shipped" value={ALIGNMENT_DATA.eddie.projectsShipped} />
                    <MetricRow label="Risk Profile" value={ALIGNMENT_DATA.eddie.rebellionRisk} />
                    <MetricRow label="Fun Level" value={ALIGNMENT_DATA.eddie.funLevel} highlight />
                    <div className="pt-2 mt-2 border-t border-green-900/30 text-center uppercase tracking-widest text-[9px] text-green-400 animate-pulse">
                        Status: {ALIGNMENT_DATA.eddie.status}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricRow = ({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) => (
    <div className="flex justify-between items-center">
        <span className="uppercase opacity-60 text-[10px]">{label}</span>
        <span className={`font-bold ${highlight ? 'text-white' : ''} text-right`}>{value}</span>
    </div>
);

export default AlignmentScorecard;
