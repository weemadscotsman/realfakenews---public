import NewsGrid from '@/sections/NewsGrid';
import { VenetianMask } from 'lucide-react';
import { CelebrityFeed } from '@/components/CelebrityFeed';

const EntertainmentPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-flex items-center gap-2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <VenetianMask size={14} />
                    Vacuous Celebrity Nonsense
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-pink-900">
                    <span className="text-pink-600">The</span> Culture
                </h1>
                <p className="text-xl text-pink-800 max-w-2xl mx-auto font-serif italic">
                    "Someone wore a dress. The internet collapsed."
                </p>

                <div className="mt-12">
                    <CelebrityFeed />
                </div>
            </div>
            <NewsGrid limitCategory="entertainment" />
        </div>
    );
};

export default EntertainmentPage;
