import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
    Crown, Zap, BookOpen, Clock, Star,
    Users, Flame, Skull, Check, ShieldAlert,
    Loader2, ExternalLink
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

// Pricing tiers - MUCH more reasonable now!
const PRICING = {
    monthly: {
        id: 'monthly',
        name: 'Monthly',
        price: '$2.99',
        period: '/mo',
        description: 'Cancel anytime (we will judge you).',
        priceId: '', // Will be set from env
        popular: true,
    },
    yearly: {
        id: 'yearly',
        name: 'Yearly',
        price: '$29.99',
        period: '/yr',
        description: 'Save $6/year. Commitment issues?',
        priceId: '', // Will be set from env
        popular: false,
        savings: 'Save 16%',
    },
    ironic: {
        id: 'ironic',
        name: 'Ironic',
        price: '£2.50',
        period: '/mo',
        description: 'You get literally nothing extra. No refunds.',
        priceId: '',
        popular: false,
    }
};

const MembershipPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | 'ironic'>('monthly');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!isAuthenticated) {
            toast.error("You need to exist (sign in) before you can sell your soul.");
            return;
        }

        if (!user?.email) {
            toast.error("Email required for payment.");
            return;
        }

        setLoading(true);

        try {
            // Call the Netlify function to create a checkout session
            const response = await fetch('/.netlify/functions/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tier: billingCycle,
                    userId: user.id,
                    email: user.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error(error instanceof Error ? error.message : 'Payment setup failed');
            setLoading(false);
        }
    };

    const handleManageSubscription = async () => {
        if (!user?.stripe_customer_id) {
            toast.error('No active subscription found');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/.netlify/functions/create-portal-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: user.stripe_customer_id,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No portal URL received');
            }
        } catch (error) {
            console.error('Portal error:', error);
            toast.error('Failed to open billing portal');
            setLoading(false);
        }
    };

    const getPrice = () => PRICING[billingCycle].price;
    const getPeriod = () => PRICING[billingCycle].period;
    const getDisclaimer = () => PRICING[billingCycle].description;
    const showSavings = () => billingCycle === 'yearly' ? PRICING.yearly.savings : null;

    const isSubscribed = user?.is_subscribed;
    const currentTier = user?.subscription_tier;

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
                    
                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Check size={14} className="text-green-500" />
                            Secure Stripe Checkout
                        </span>
                        <span className="flex items-center gap-1">
                            <Check size={14} className="text-green-500" />
                            Cancel Anytime
                        </span>
                        <span className="flex items-center gap-1">
                            <Check size={14} className="text-green-500" />
                            Instant Access
                        </span>
                    </div>
                </div>

                {/* Pricing Card */}
                <div className="max-w-md mx-auto bg-zinc-900 rounded-3xl border-2 border-zinc-800 p-8 relative overflow-hidden mb-24 group hover:border-red-600 transition-colors duration-500">
                    {PRICING[billingCycle].popular && (
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                            Best Value
                        </div>
                    )}

                    {/* Current plan badge */}
                    {isSubscribed && (
                        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-br-xl uppercase tracking-widest">
                            Current Plan
                        </div>
                    )}

                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${billingCycle === 'yearly' ? 'bg-green-600 text-white' : 'text-zinc-500 hover:text-green-500'}`}
                        >
                            Yearly
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                Save
                            </span>
                        </button>
                        <button
                            onClick={() => setBillingCycle('ironic')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'ironic' ? 'bg-zinc-700 text-zinc-300' : 'text-zinc-500 hover:text-zinc-400'}`}
                        >
                            Ironic
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-5xl font-black">{getPrice()}</span>
                            <span className="text-zinc-500 mb-1">{getPeriod()}</span>
                        </div>
                        {showSavings() && (
                            <p className="text-green-500 text-sm mt-1 font-medium">
                                {showSavings()}
                            </p>
                        )}
                        <p className="text-zinc-500 text-sm mt-2">
                            {getDisclaimer()}
                        </p>
                    </div>

                    {isSubscribed ? (
                        <Button
                            onClick={handleManageSubscription}
                            disabled={loading}
                            variant="outline"
                            className="w-full h-14 text-lg font-bold border-zinc-600 hover:bg-zinc-800 mb-8"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Manage Subscription
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className="w-full h-14 text-lg font-black uppercase italic bg-white text-black hover:bg-zinc-200 mb-8"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                billingCycle === 'ironic' ? "Waste Money" : "Upgrade Now"
                            )}
                        </Button>
                    )}

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

                    {isSubscribed && currentTier && (
                        <p className="text-center text-sm text-green-500 mt-6">
                            ✓ Active {currentTier} subscription
                        </p>
                    )}
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

                {/* FAQ / Trust Section */}
                <div className="mt-24 max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-6">Questions?</h3>
                    <div className="space-y-4 text-zinc-400 text-sm">
                        <p>
                            <strong className="text-white">Is this a real subscription?</strong><br />
                            Yes, we use Stripe for secure payment processing. You'll be charged real money for fake news.
                        </p>
                        <p>
                            <strong className="text-white">Can I cancel?</strong><br />
                            Absolutely. Cancel anytime from your account or billing portal. No dark patterns, we promise.
                        </p>
                        <p>
                            <strong className="text-white">What do I actually get?</strong><br />
                            Unlimited access to our satirical content, the ability to submit roasts, VIP badge, and eternal bragging rights.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MembershipPage;
