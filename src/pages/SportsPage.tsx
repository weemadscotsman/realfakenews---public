import NewsGrid from '@/sections/NewsGrid';
import { Trophy, Activity, Coins } from 'lucide-react';
import { SportsTicker } from '@/components/SportsTicker';
import { ApplianceStandings } from '@/components/ApplianceStandings';
import { FantasyDraftPicker } from '@/components/FantasyDraftPicker';
import { Link } from 'react-router-dom';

const SportsPage = () => {
    return (
        <div className="pt-12 min-h-screen bg-green-50">
            <SportsTicker />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center pt-8">
                <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-lg">
                    <Trophy size={14} />
                    Athletic Injuries & Scandals
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-green-900 drop-shadow-sm">
                    <span className="text-green-600">Sports</span> Ball
                </h1>
                <p className="text-xl text-green-800 max-w-2xl mx-auto font-serif italic mb-8">
                    "Did our team win? No. Was the referee blind? Yes."
                </p>

                {/* FEATURED DASHBOARD */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left mb-12">
                    {/* LEFT: Standings */}
                    <div className="md:col-span-4">
                        <ApplianceStandings />
                    </div>

                    {/* MIDDLE: Fantasy Draft */}
                    <div className="md:col-span-5">
                        <FantasyDraftPicker />
                    </div>

                    {/* RIGHT: Betting Promo */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <div className="bg-green-900 text-white p-6 rounded-xl border-4 border-green-800 shadow-xl flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-green-400 mb-2">
                                    <Activity size={20} />
                                    <h3 className="font-black uppercase italic">Live Odds</h3>
                                </div>
                                <p className="text-sm font-mono text-green-200 mb-4">
                                    Get rich or die trying. (Please do not die, we need the ad revenue.)
                                </p>
                            </div>
                            <Link to="/bets" className="bg-white text-green-900 font-black uppercase text-center py-3 rounded hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                                <Coins size={16} />
                                Place Bets
                            </Link>
                        </div>

                        <div className="bg-white border-2 border-green-200 p-4 rounded-xl text-center">
                            <h4 className="text-[10px] font-bold uppercase text-green-600 tracking-widest mb-1">Fan Poll</h4>
                            <p className="font-serif italic text-green-900 text-sm mb-3">"Who is the MVP?"</p>
                            <div className="space-y-1">
                                <div className="bg-green-100 rounded p-1 text-xs text-green-800 font-bold">The Toaster (45%)</div>
                                <div className="bg-gray-100 rounded p-1 text-xs text-gray-500">Local Man (2%)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t-4 border-green-200 pt-8">
                    <h2 className="text-3xl font-black italic uppercase text-green-900 mb-8">Headlines From The Field</h2>
                    <NewsGrid limitCategory="sports" />
                </div>
            </div>
        </div>
    );
};

export default SportsPage;
