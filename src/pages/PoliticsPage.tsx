import NewsGrid from '@/sections/NewsGrid';
import { PollingStation } from '@/components/PollingStation';

const PoliticsPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    Democracy Inaction
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
                    Politics <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Unfiltered</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto font-serif italic">
                    "Democracy dies in darkness, but at least the memes are lit."
                </p>

                <div className="max-w-2xl mx-auto mt-12 text-left">
                    <PollingStation />
                </div>
            </div>
            <NewsGrid limitCategory="politics" />
        </div>
    );
};

export default PoliticsPage;
