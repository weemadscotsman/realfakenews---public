import NewsGrid from '@/sections/NewsGrid';
import { FlaskConical } from 'lucide-react';

const SciencePage = () => {
    return (
        <div className="pt-12 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <FlaskConical size={14} />
                    Peer Reviewed Nonsense
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-slate-900">
                    Mad <span className="text-blue-600">Science</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-serif italic">
                    "9 out of 10 scientists agree: We have no idea what we're doing."
                </p>
            </div>
            <NewsGrid limitCategory="science" />
        </div>
    );
};

export default SciencePage;
