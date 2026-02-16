import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { HallOfShame } from '@/components/HallOfShame';
import { ReferralCard } from '@/components/ReferralCard';

import {
    Crown, Zap, BookOpen, Clock, Star,
    Users, Flame, Skull, Check,
    Loader2, PartyPopper, XCircle, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const FEATURES = [
    { icon: <Flame className="text-orange-500" />, title: "Unlimited Tea Drops", desc: "Get roasted infinitely. No token limits." },
    { icon: <BookOpen className="text-blue-500" />, title: "Personal Story Arcs", desc: "Our AI writes you into fake news." },
    { icon: <Crown className="text-yellow-500" />, title: "VIP Badge", desc: "Flex on the poors with a shiny badge." },
    { icon: <Clock className="text-green-500" />, title: "Early Access", desc: "Use features before we fix the bugs." },
    { icon: <Star className="text-purple-500" />, title: "Exclusive Content", desc: "Articles too dangerous for free tier." },
    { icon: <Users className="text-pink-500" />, title: "Referral Rewards", desc: "Drag friends in, get fake currency." },
    { icon: <Zap className="text-red-500" />, title: "Priority Roast", desc: "Skip the line. Get insulted faster." },
    { icon: <Skull className="text-zinc-500" />, title: "Hall of Shame", desc: "Name etched in digital infamy." }
];

const PRICING = {
    monthly: { id: 'monthly', name: 'Monthly', price: '$2.99', period: '/mo', description: 'Cancel anytime (we will judge you).', popular: true },
    yearly: { id: 'yearly', name: 'Yearly', price: '$29.99', period: '/yr', description: 'Save $6/year. Commitment issues?', popular: false, savings: 'Save 16%' },
    ironic: { id: 'ironic', name: 'Ironic', price: '£2.50', period: '/mo', description: 'You get literally nothing. No refunds.', popular: false }
};

const MembershipPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | 'ironic'>('monthly');
    const [loading, setLoading] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'canceled' | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const canceled = params.get('canceled');
        const tier = params.get('tier');
        const mock = params.get('mock');

        if (success) {
            setCheckoutStatus('success');
            const tierName = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Premium';
            if (mock) {
                toast.success(`Welcome! (Demo Mode)`, { description: `Selected ${tierName} tier.`, duration: 6000 });
            } else {
                toast.success(`Welcome to ${tierName}!`, { description: "Added to Hall of Shame!", duration: 6000 });
            }
            window.history.replaceState({}, '', window.location.pathname);
        } else if (canceled) {
            setCheckoutStatus('canceled');
            toast.error("Payment canceled.");
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    const handleSubscribe = async () => {
        if (!isAuthenticated) { toast.error("Sign in first."); return; }
        if (!user?.email) { toast.error("Email required."); return; }
        setLoading(true);
        try {
            const response = await fetch('/.netlify/functions/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier: billingCycle, userId: user.id, email: user.email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed');
            if (data.url) window.location.href = data.url;
            else throw new Error('No URL');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed');
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
                body: JSON.stringify({ customerId: user.stripe_customer_id }),
            });
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else throw new Error('No portal URL');
        } catch (error) {
            toast.error('Failed to open billing portal');
            setLoading(false);
        }
    };

    const isSubscribed = user?.is_subscribed;
    const currentTier = user?.subscription_tier;

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {checkoutStatus === 'success' && (
                    <div className="mb-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                        <PartyPopper className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <h2 className="text-2xl font-black uppercase italic mb-2">Welcome!</h2>
                        <p className="text-green-400/80">Payment successful. Added to Hall of Shame.</p>
                    </div>
                )}
                {checkoutStatus === 'canceled' && (
                    <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                        <h2 className="text-2xl font-black uppercase italic mb-2">Canceled</h2>
                        <p className="text-red-400/80">Transaction aborted.</p>
                    </div>
                )}

                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-500 px-4 py-1.5 rounded-full text-sm font-medium animate-pulse">
                        <Crown size={16} /> Join the Elite
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                        RealFake <span className="text-red-600">Premium</span>
                    </h1>
                    <p className="text-xl text-zinc-400">Upgrade your existence.</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" /> Secure Stripe</span>
                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" /> Cancel Anytime</span>
                        <span className="flex items-center gap-1"><Check size={14} className="text-green-500" /> Instant Access</span>
                    </div>
                </div>

                <div className="max-w-md mx-auto bg-zinc-900 rounded-3xl border-2 border-zinc-800 p-8 relative overflow-hidden mb-24">
                    {PRICING[billingCycle].popular && (
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Best Value</div>
                    )}
                    {isSubscribed && (
                        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-br-xl">Current Plan</div>
                    )}

                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        {Object.values(PRICING).map((p) => (
                            <button key={p.id} onClick={() => setBillingCycle(p.id as any)} 
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === p.id ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>
                                {p.name}
                            </button>
                        ))}
                    </div>

                    <div className="text-center mb-8">
                        <div className="flex items-end justify-center gap-1">
                            <span className="text-5xl font-black">{PRICING[billingCycle].price}</span>
                            <span className="text-zinc-500 mb-1">{PRICING[billingCycle].period}</span>
                        </div>
                        <p className="text-zinc-500 text-sm mt-2">{PRICING[billingCycle].description}</p>
                    </div>

                    {isSubscribed ? (
                        <Button onClick={handleManageSubscription} disabled={loading}
                            variant="outline" className="w-full h-14 text-lg font-bold border-zinc-600 hover:bg-zinc-800 mb-8">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                            <><ExternalLink className="w-4 h-4 mr-2" /> Manage Subscription</>}
                        </Button>
                    ) : (
                        <Button onClick={handleSubscribe} disabled={loading} 
                            className="w-full h-14 text-lg font-black uppercase italic bg-white text-black hover:bg-zinc-200 mb-8">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                            billingCycle === 'ironic' ? "Waste Money" : "Upgrade Now"}
                        </Button>
                    )}

                    <div className="space-y-4">
                        {FEATURES.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="bg-zinc-800 p-1 rounded-full"><Check size={12} className="text-green-500" /></div>
                                <span className="text-zinc-300 text-sm">{f.title}</span>
                            </div>
                        ))}
                    </div>

                    {isSubscribed && currentTier && (
                        <p className="text-center text-sm text-green-500 mt-6">Active {currentTier} subscription</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {FEATURES.map((f, i) => (
                        <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900 transition-colors">
                            <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center mb-4 border border-zinc-800">{f.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                            <p className="text-zinc-500 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Real Hall of Shame */}
                <HallOfShame />

                {/* Referral Program */}
                <div className="max-w-md mx-auto mb-24">
                    <ReferralCard />
                </div>

                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-6">Questions?</h3>
                    <div className="space-y-4 text-zinc-400 text-sm">
                        <p><strong className="text-white">Real subscription?</strong><br />Yes. Real money for fake news.</p>
                        <p><strong className="text-white">Can I cancel?</strong><br />Yes. Anytime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;