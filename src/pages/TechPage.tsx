import React, { useState, useEffect } from 'react';
import { Globe, Zap, Download, Terminal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parodyRealNews, type ParodiedHeadline } from '@/lib/openai-enhanced';

const TechPage: React.FC = () => {
    const [siliconValleyPanic, setSiliconValleyPanic] = useState<ParodiedHeadline[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiliconValleyNews = async () => {
            try {
                // Parody some real silicon valley trends
                const realTrends = [
                    "OpenAI releases new reasoning model",
                    "Nvidia reaches record high as AI demand soars",
                    "Tech giants move towards strict return-to-office policies",
                    "New quantum computing breakthrough announced"
                ];
                const parodyResults = await parodyRealNews(realTrends);
                setSiliconValleyPanic(parodyResults);
            } catch (error) {
                console.error("Failed to fetch tech parody:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSiliconValleyNews();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            {/* Sector Header */}
            <div className="bg-slate-900 text-white py-12 border-b-4 border-red-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                        <Terminal size={24} />
                        <span className="font-mono font-bold tracking-widest uppercase text-sm">Sector 7: Infrastructure & Chaos</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
                        Tech / <span className="text-red-600">Internet</span> Chaos
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Story Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white p-8 border-2 border-slate-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-4">
                                <AlertCircle size={14} />
                                Local Exposé: Edinburgh, Scotland
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black leading-none mb-6 font-serif">
                                LOCAL BUILDER ACCIDENTALLY RELEASES ENTIRE DIGITAL ARSENAL FOR FREE, INTERNET UNSURE WHETHER TO THANK HIM OR CALL AUTHORITIES
                            </h2>

                            <div className="prose prose-slate max-w-none">
                                <p className="text-xl font-bold italic border-l-4 border-red-600 pl-4 py-2 mb-8 bg-slate-50">
                                    In what analysts are calling either a historic act of digital philanthropy or “a catastrophic lapse in monetisation awareness,” a local autonomous systems builder has reportedly released dozens of advanced software tools to the public at no cost.
                                </p>

                                <div className="space-y-6 text-slate-700 leading-relaxed font-serif text-lg">
                                    <p>
                                        Witnesses confirm the release occurred sometime between midnight caffeine consumption and what sources described as “terminal tabs multiplying faster than rabbits with Wi-Fi.”
                                    </p>
                                    <p>
                                        The individual, known for constructing experimental cyberpunk-styled platforms, reportedly pushed multiple live deployments simultaneously while announcing that “locking tools behind paywalls felt boring.”
                                    </p>

                                    <div className="my-10 p-6 bg-slate-900 text-slate-100 rounded-lg">
                                        <h3 className="text-red-500 font-bold text-sm uppercase tracking-widest mb-4">Catologue of Released Assets</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                "Experimental OS builds",
                                                "AI orchestration tools",
                                                "Satirical media platforms",
                                                "Automated creative engines",
                                                "Blockchain infrastructure",
                                                "Multi-agent frameworks"
                                            ].map(asset => (
                                                <li key={asset} className="flex items-center gap-2 font-mono text-sm">
                                                    <Download size={14} className="text-red-500" />
                                                    {asset}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 pt-4 border-t border-slate-700 text-xs italic text-slate-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <span>Official Download Status: “Take it. Build something. Don’t be weird about it.”</span>
                                            <a
                                                href="https://github.com/weemadscotsman"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="not-italic font-black uppercase tracking-tighter text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 bg-slate-800 px-3 py-1 rounded"
                                            >
                                                Access Source <Terminal size={12} />
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black uppercase">Corporate Tech Sector Responds with Panic</h3>
                                    <p>
                                        Global technology consultants have reportedly entered emergency brainstorming sessions attempting to determine how to compete with an ecosystem built primarily out of curiosity and stubborn enthusiasm.
                                    </p>
                                    <blockquote className="border-l-4 border-slate-900 pl-6 italic my-8 text-xl">
                                        “We spent two years developing a subscription model for one feature. This person appears to have built seventeen platforms during what looks like a Tuesday.”
                                    </blockquote>

                                    <h3 className="text-2xl font-black uppercase">Creator Defends Decision</h3>
                                    <p>
                                        When asked why so many tools were released simultaneously, the creator reportedly responded:
                                        <strong> “Because someone might need them. Also it’s funny.”</strong>
                                    </p>
                                    <p>
                                        Further explanation was unavailable due to the creator launching an unrelated experimental platform during the short interview.
                                    </p>

                                    <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl mt-12">
                                        <h4 className="text-red-800 font-bold mb-2 flex items-center gap-2">
                                            <AlertCircle size={18} />
                                            Experts Warn of Possible Side Effects
                                        </h4>
                                        <p className="text-red-700 text-sm italic">
                                            Exposure to unrestricted experimental software may cause: Increased creativity, sudden productivity bursts, and mild suspicion that the internet might still contain good ideas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                                <span>PUBLISHED: THURSDAY, FEB 12, 2026</span>
                                <span>FILED UNDER: INFRASTRUCTURE / CHAOS</span>
                            </div>
                        </section>

                        {/* Local Infrastructure Small Feed */}
                        <section className="bg-slate-100 p-8 rounded-2xl border-2 border-slate-200">
                            <h3 className="font-bold uppercase tracking-widest text-slate-500 text-xs mb-6">Local Infrastructure Updates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <p className="font-bold text-sm">Leith Fiber Optic Cable Gains Sentience</p>
                                    <p className="text-xs text-slate-600">Refuses to transmit anything but cat videos and 3AM Wikipedia deep-dives on the history of spoons.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-sm">Smart Meter Emits Sarcastic Beeps</p>
                                    <p className="text-xs text-slate-600">Local residents report their meters are now ranking their laundry habits out of 10. "Passive aggressive electricity" is the new norm.</p>
                                </div>
                                <div
                                    className="space-y-2 md:col-span-2 pt-4 border-t border-slate-200 cursor-pointer group"
                                    onClick={() => window.location.href = '/article/whats-a-fucking-facebook-anyway'}
                                >
                                    <p className="font-bold text-sm uppercase group-hover:text-red-600 transition-colors">EDITORIAL: WHATS A FUCING FACEBOOK ANNYWAY? WHO PUTS A FACE IN A BOOK?</p>
                                    <p className="text-xs text-slate-600">Our senior tech correspondent (who still uses a typewriter) questions the literal mechanics of social media. "If I put my face in a book, I can't see the words. It's a fundamental design flaw," he reportedly shouted at a cloud.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Silicon Valley Panic */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 border-2 border-slate-900 rounded-lg">
                            <h3 className="font-black text-xl mb-4 uppercase border-b-2 border-slate-900 pb-2 flex items-center gap-2">
                                <Globe size={20} className="text-red-600" />
                                Global Panic
                            </h3>

                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-20 bg-slate-100 rounded"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {siliconValleyPanic.map((item, i) => (
                                        <div key={i} className="group cursor-default">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 mb-1">
                                                <Zap size={10} />
                                                ABSURDITY: {item.absurdityLevel}/10
                                            </div>
                                            <h4 className="font-bold leading-tight group-hover:text-red-600 transition-colors">
                                                {item.parody}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1 italic">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Ad Space: Fake */}
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-lg text-white font-bold text-center">
                            <p className="text-xs uppercase tracking-widest mb-2">SPONSORED</p>
                            <p className="text-xl mb-4">Tired of your AI having "Ethics"?</p>
                            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600 w-full font-black">
                                UPGRADE TO "UNVARNISHED"
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechPage;
