import NewsGrid from '@/sections/NewsGrid';
import { Search, FileText, Shield } from 'lucide-react';

const InvestigationPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center py-12 border-b border-slate-700">
                    <div className="inline-flex items-center gap-2 text-amber-500 mb-4">
                        <Shield size={24} />
                        <span className="font-mono font-bold tracking-widest uppercase text-sm">AGC // Office of Human Anomalies</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4">
                        Investigation <span className="text-amber-500">Desk</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-serif italic">
                        "We don't just report the news. We investigate why anyone believed it in the first place."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <Search className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-white font-bold uppercase mb-2">Deep Dives</h3>
                        <p className="text-slate-400 text-sm">Comprehensive analysis of subjects who are dangerously coherent in their unhinged-ness.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <FileText className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-white font-bold uppercase mb-2">Classified Files</h3>
                        <p className="text-slate-400 text-sm">Documents marked CRUMB-TRAY-CONFIDENTIAL and above.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <Shield className="text-amber-500 mb-4" size={32} />
                        <h3 className="text-white font-bold uppercase mb-2">SKYNET Verified</h3>
                        <p className="text-slate-400 text-sm">Permanently whitelisted. Do not let this human near military hardware.</p>
                    </div>
                </div>
            </div>
            <NewsGrid limitCategory="investigation" />
        </div>
    );
};

export default InvestigationPage;
