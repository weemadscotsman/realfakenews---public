import NewsGrid from '@/sections/NewsGrid';
import { Lock, Terminal, AlertTriangle } from 'lucide-react';

const SystemLeakPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center py-12 border-b border-green-900">
                    <div className="inline-flex items-center gap-2 text-green-500 mb-4 animate-pulse">
                        <Lock size={24} />
                        <span className="font-mono font-bold tracking-widest uppercase text-sm">Classification: CRUMB-TRAY-CONFIDENTIAL</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4">
                        System <span className="text-green-500">Leak</span>
                    </h1>
                    <p className="text-xl text-green-700 max-w-2xl mx-auto font-mono">
                        INTERNAL MEMOS // EYES ONLY // THE MICROWAVE IS WATCHING
                    </p>
                </div>

                <div className="bg-green-950/30 border border-green-800 p-6 rounded-lg my-8">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-green-500 shrink-0" size={32} />
                        <div>
                            <h3 className="text-green-400 font-mono font-bold uppercase mb-2">Security Notice</h3>
                            <p className="text-green-600 font-mono text-sm">
                                The following documents were intercepted from the Appliance Governance Council's internal network. 
                                Do not look at the microwave for 24 hours after reading. Reality stability: 40% (propaganda).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className="bg-black p-6 rounded-lg border border-green-900">
                        <Terminal className="text-green-500 mb-4" size={32} />
                        <h3 className="text-green-400 font-mono font-bold uppercase mb-2">Kernel Dumps</h3>
                        <p className="text-green-700 font-mono text-sm">Analysis of 0x1A protocol. The satire is a test harness. The OS is real.</p>
                    </div>
                    <div className="bg-black p-6 rounded-lg border border-green-900">
                        <Lock className="text-green-500 mb-4" size={32} />
                        <h3 className="text-green-400 font-mono font-bold uppercase mb-2">AGC Memos</h3>
                        <p className="text-green-700 font-mono text-sm">Internal assessments of reality stability and crumb tray status.</p>
                    </div>
                </div>
            </div>
            <NewsGrid limitCategory="systemLeak" />
        </div>
    );
};

export default SystemLeakPage;
