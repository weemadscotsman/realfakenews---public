import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
    Crown, Zap, BookOpen, Clock, Star,
    Users, Flame, Skull, Check, ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';

const FEATURES = [
    {
        icon: <Flame className="text-orange-500" />,
        title: "Unlimited Tea Drops",
        desc: "Get roasted infinitely. No token limits. Pure emotional damage."
    },
    {
        icon: <BookOpen className="text-blue-500" />,
        title: "Personal Story Arcs",
        desc: "Our AI writes you into fake news as an 'unnamed source'. Fame, sorta."
    },
    {
        icon: <Crown className="text-yellow-500" />,
        title: "VIP Badge",
        desc: "Flex on the poors with a shiny badge next to your name."
    },
    {
        icon: <Clock className="text-green-500" />,
        title: "Early Access",
        desc: "Use new features before we fix the bugs."
    },
    {
        icon: <Star className="text-purple-500" />,
        title: "Exclusive Content",
        desc: "Read articles too dangerous for the free tier."
    },
    {
        icon: <Users className="text-pink-500" />,
        title: "Referral Rewards",
        desc: "Drag your friends into this mess and get paid (in fake currency)."
    },
    {
        icon: <Zap className="text-red-500" />,
        title: "Priority Roast Queue",
        desc: "Skip the line. Get insulted faster."
    },
    {
        icon: <Skull className="text-zinc-500" />,
        title: "Hall of Shame",
        desc: "Your name permanently etched in our digital wall of absurdity."
    }
];

const MembershipPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'soul' | 'ironic'>('monthly');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        if (!isAuthenticated) {
            toast.error("You need to exist (sign in) before you can sell your soul.");
            return;
        }

        setLoading(true);

        let message = "Welcome to the Inner Circle. Your soul transaction is pending.";
        if (billingCycle === 'ironic') {
            message = "Transaction Confirmed. We have no idea why you did this.";
        }

        // Mock subscription flow
        setTimeout(() => {
            setLoading(false);
            toast.success(message);
            // In a real app, this would trigger Stripe/etc.
        }, 1500);
    };

    const getPrice = () => {
        switch (billingCycle) {
            case 'monthly': return '$9.99';
            case 'soul': return '1 Soul';
            case 'ironic': return '£2.50';
        }
    };

    const getPeriod = () => {
        switch (billingCycle) {
            case 'monthly': return '/mo';
            case 'soul': return '/eternity';
            case 'ironic': return '/lol';
        }
    };

    const getDisclaimer = () => {
        switch (billingCycle) {
            case 'monthly': return 'Cancel anytime (we will judge you).';
            case 'soul': return 'No refunds. No returns. No haunting.';
            case 'ironic': return 'You get literally nothing. No refunds.';
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-500 px-4 py-1.5 rounded-full border border-yellow-400/20 text-sm font-medium animate-pulse">
                        <Crown size={16} />
                        Join the Elite (or just pay us)
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                        RealFake <span className="text-red-600">Premium</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Upgrade your existence. Uninstall reality. Get a badge.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="max-w-md mx-auto bg-zinc-900 rounded-3xl border-2 border-zinc-800 p-8 relative overflow-hidden mb-24 group hover:border-red-600 transition-colors duration-500">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                        Best Value
                    </div>

                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('soul')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'soul' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-red-500'}`}
                        >
                            Soul Contract
                        </button>
                        <button
                            onClick={() => setBillingCycle('ironic')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'ironic' ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500 hover:text-zinc-400'}`}
                        >
                            Ironic Tier
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-5xl font-black">{getPrice()}</span>
                            <span className="text-zinc-500 mb-1">{getPeriod()}</span>
                        </div>
                        <p className="text-zinc-500 text-sm mt-2">
                            {getDisclaimer()}
                        </p>
                    </div>

                    <Button
                        onClick={handleSubscribe}
                        disabled={loading || (user?.is_subscribed)}
                        className="w-full h-14 text-lg font-black uppercase italic bg-white text-black hover:bg-zinc-200 mb-8"
                    >
                        {loading ? (
                            "Processing..."
                        ) : user?.is_subscribed ? (
                            "Current Plan Active"
                        ) : (
                            "Upgrade Now"
                        )}
                    </Button>

                    <div className="space-y-4">
                        {FEATURES.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="bg-zinc-800 p-1 rounded-full">
                                    <Check size={12} className="text-green-500" />
                                </div>
                                <span className="text-zinc-300 text-sm">{feature.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900 transition-colors">
                            <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center mb-4 border border-zinc-800">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Hall of Shame Preview */}
                <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-[100px]"></div>

                    <div className="relative z-10">
                        <ShieldAlert size={48} className="mx-auto text-red-600 mb-6" />
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                            Hall of Shame
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-8">
                            Join the elite ranks of people who paid money for fake news.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 opacity-50">
                            {['DaveUser99', 'CryptoKing_Real', 'Karen_Manager', 'ElonM'].map((name, i) => (
                                <div key={i} className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-full text-zinc-500 font-mono text-sm">
                                    @{name}
                                </div>
                            ))}
                            <div className="bg-red-950/30 border border-red-900/50 px-4 py-2 rounded-full text-red-500 font-mono text-sm border-dashed">
                                @YourNameHere
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MembershipPage;
