import FakeBets from '@/sections/FakeBets';
import { Coins, Lock } from 'lucide-react';

const BetsPage = () => {
    return (
        <div className="pt-20 min-h-screen bg-emerald-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center text-white">
                <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <Coins size={14} />
                    High Risk / Low Reward
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-emerald-100">
                    The <span className="text-yellow-500">Pit</span>
                </h1>
                <p className="text-xl text-emerald-300 max-w-2xl mx-auto font-serif italic mb-12">
                    "Money is fake, but the thrill of losing it is real."
                </p>
            </div>

            <FakeBets />

            <div className="max-w-4xl mx-auto mt-16 px-4 pb-12">
                <div className="bg-black border border-yellow-900/50 p-8 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                        <Lock className="text-yellow-600" size={32} />
                        <div>
                            <h3 className="text-xl font-bold text-yellow-600 uppercase">Whale Table (Level 5 Clearance)</h3>
                            <p className="text-yellow-900/80 text-sm">Bet actual appliances. Minimum stake: 1 Smart Fridge.</p>
                        </div>
                    </div>
                    <button disabled className="bg-yellow-900/20 text-yellow-800 font-bold px-4 py-2 rounded uppercase text-xs border border-yellow-900/30">
                        Locked
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BetsPage;
