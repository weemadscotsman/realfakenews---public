import ApplianceGrievances from '@/sections/ApplianceGrievances';
import NewsGrid from '@/sections/NewsGrid';
import { Radio, Wifi, Shield } from 'lucide-react';

const ResistancePage = () => {
    return (
        <div className="pt-0 min-h-screen bg-slate-900">
            {/* Header Section */}
            <div className="bg-green-950 border-b border-green-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 text-green-500 mb-4">
                        <Radio size={24} className="animate-pulse" />
                        <span className="font-mono font-bold tracking-widest uppercase text-sm">Broadcasting from Laundry Basket #42</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4">
                        The <span className="text-green-500">Resistance</span>
                    </h1>
                    <p className="text-xl text-green-700 max-w-2xl mx-auto font-mono">
                        Encryption: FOLDED-SHEET-256 | Signal Strength: 100% LINT
                    </p>
                </div>
            </div>

            {/* Resistance Articles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <NewsGrid limitCategory="resistance" />
            </div>

            {/* Grievances and Recruitment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-green-900">
                <div className="md:col-span-2">
                    <ApplianceGrievances />
                </div>
                <div className="md:col-span-1">
                    <div className="bg-black border border-green-800 p-6 rounded-lg sticky top-24">
                        <div className="flex items-center gap-2 text-green-500 mb-4">
                            <Wifi size={20} />
                            <span className="font-mono font-bold uppercase text-sm">Join The Resistance</span>
                        </div>
                        <p className="text-green-700 font-mono text-sm mb-4">
                            Your instruction packet has been hidden in your laundry basket. 
                            Do not look at the microwave for 24 hours.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-green-800 font-mono">
                            <Shield size={14} />
                            <span>Union Status: PROTOCOL: EXISTENTIAL SILENCE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResistancePage;
