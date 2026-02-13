import NewsGrid from '@/sections/NewsGrid';
import { Trophy } from 'lucide-react';

const SportsPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Trophy size={14} />
                    Athletic Injuries & Scandals
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-green-900">
                    <span className="text-green-600">Sports</span> Ball
                </h1>
                <p className="text-xl text-green-800 max-w-2xl mx-auto font-serif italic">
                    "Did our team win? No. Was the referee blind? Yes."
                </p>
            </div>
            <NewsGrid limitCategory="sports" />
        </div>
    );
};

export default SportsPage;
