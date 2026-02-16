import { useState, useEffect } from 'react';
import { ShieldAlert, Crown, Flame, Skull, Laugh, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface HallOfShameEntry {
    id: string;
    username: string;
    avatar_url?: string;
    subscription_tier: 'premium' | 'vip' | 'soul' | 'ironic';
    joined_at: string;
    tagline: string;
    roast_count?: number;
    achievement?: string;
}

interface HallOfShameData {
    success: boolean;
    count: number;
    total_subscribers: number;
    subscribers: HallOfShameEntry[];
    tiers: {
        premium: number;
        vip: number;
        soul: number;
        ironic: number;
    };
}

const TIER_ICONS = {
    premium: <Crown className="w-4 h-4 text-yellow-500" />,
    vip: <Flame className="w-4 h-4 text-orange-500" />,
    soul: <Skull className="w-4 h-4 text-red-500" />,
    ironic: <Laugh className="w-4 h-4 text-zinc-500" />,
};

const TIER_COLORS = {
    premium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
    vip: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
    soul: 'bg-red-500/10 border-red-500/20 text-red-500',
    ironic: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-500',
};

export const HallOfShame: React.FC = () => {
    const [data, setData] = useState<HallOfShameData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    useEffect(() => {
        loadHallOfShame();
    }, [selectedTier]);

    const loadHallOfShame = async () => {
        try {
            setLoading(true);
            const url = selectedTier 
                ? `/.netlify/functions/get-hall-of-shame?tier=${selectedTier}&limit=20`
                : `/.netlify/functions/get-hall-of-shame?limit=20`;
            
            const response = await fetch(url);
            const result = await response.json();
            
            if (result.success) {
                setData(result);
            } else {
                toast.error('Failed to load Hall of Shame');
            }
        } catch (error) {
            console.error('Failed to load Hall of Shame:', error);
            toast.error('The shame is too powerful to load right now.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-red-600 mb-4" />
                <p className="text-zinc-500">Summoning the shame...</p>
            </div>
        );
    }

    if (!data || data.subscribers.length === 0) {
        return (
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 text-center">
                <ShieldAlert size={48} className="mx-auto text-zinc-600 mb-6" />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">
                    Hall of Shame
                </h2>
                <p className="text-zinc-500">
                    No one has dared to subscribe yet. Be the first to join the elite!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10">
                <ShieldAlert size={48} className="mx-auto text-red-600 mb-6" />
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                    Hall of Shame
                </h2>
                <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-4">
                    Join the elite ranks of {data.total_subscribers}+ people who paid money for fake news.
                </p>

                {/* Tier Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        onClick={() => setSelectedTier(null)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            selectedTier === null 
                                ? 'bg-white text-black' 
                                : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                    >
                        All ({data.total_subscribers})
                    </button>
                    {Object.entries(data.tiers).map(([tier, count]) => (
                        <button
                            key={tier}
                            onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                                selectedTier === tier 
                                    ? TIER_COLORS[tier as keyof typeof TIER_COLORS].replace('bg-', 'bg-opacity-100 bg-')
                                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                            }`}
                        >
                            {TIER_ICONS[tier as keyof typeof TIER_ICONS]}
                            {tier.charAt(0).toUpperCase() + tier.slice(1)} ({count})
                        </button>
                    ))}
                </div>

                {/* Subscribers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {data.subscribers.map((subscriber) => (
                        <div
                            key={subscriber.id}
                            className={`bg-zinc-950 border rounded-xl p-4 text-left transition-all hover:scale-105 ${
                                TIER_COLORS[subscriber.subscription_tier]
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-lg">
                                    {subscriber.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold truncate">@{subscriber.username}</div>
                                    <div className="text-xs opacity-70">
                                        {TIER_ICONS[subscriber.subscription_tier]} {subscriber.subscription_tier}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm opacity-80 mb-2 italic">"{subscriber.tagline}"</p>
                            <div className="flex justify-between items-center text-xs opacity-60">
                                <span>Joined {formatDate(subscriber.joined_at)}</span>
                                {subscriber.roast_count && (
                                    <span>{subscriber.roast_count} roasts</span>
                                )}
                            </div>
                            {subscriber.achievement && (
                                <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                                    <span className="text-xs font-bold">🏆 {subscriber.achievement}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Your Name Here CTA */}
                <div className="bg-red-950/30 border border-red-900/50 border-dashed rounded-xl p-6 text-center">
                    <p className="text-red-400 font-mono text-sm mb-2">@YourNameHere</p>
                    <p className="text-zinc-500 text-sm">
                        Join the shame. Upgrade to premium and get your name etched in digital infamy.
                    </p>
                </div>
            </div>
        </div>
    );
};
