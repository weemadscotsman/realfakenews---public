import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Check, Copy, Crown, Zap, Shield, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const USDT_WALLET = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
const XRP_WALLET = 'rN7n7otQDd6FczFgLdlqtyMVrn3HMfHgFj';

const SUBSCRIPTION_PRICE = 2.50;

const features = [
  'Unlimited Tea Drops (get roasted infinitely)',
  'Personal Story Arcs (AI writes you into fake news)',
  'VIP Badge (flex on the poors)',
  'Early Access to New Features',
  'Exclusive Subscriber-Only Content',
  'Referral Rewards Program',
  'Priority Roast Queue',
  'Your Name in Our Hall of Shame',
];

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState<'USDT' | 'XRP'>('USDT');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [copied, setCopied] = useState(false);

  const walletAddress = selectedCrypto === 'USDT' ? USDT_WALLET : XRP_WALLET;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Address copied! Send that crypto.');
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmPayment = () => {
    setPaymentStatus('pending');
    
    // Simulate payment verification
    setTimeout(() => {
      setPaymentStatus('confirmed');
      toast.success('Payment confirmed! Welcome to the elite.');
    }, 2000);
  };

  return (
    <section id="subscription" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Crown size={16} />
            Premium Experience
          </div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-4">
            Join the RealFake Elite
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            For less than the price of a coffee, you can get roasted by AI 
            and become part of fake news history.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Price Header */}
            <div className="bg-black text-white p-8 text-center">
              <div className="text-5xl font-bold mb-2">
                ${SUBSCRIPTION_PRICE}
                <span className="text-xl font-normal text-gray-400">/month</span>
              </div>
              <p className="text-gray-400">Or as we call it: "Two Fitty"</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Features */}
              <div>
                <h3 className="text-xl font-bold mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-xl font-bold mb-6">Pay With Crypto</h3>
                
                {/* Crypto Selector */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setSelectedCrypto('USDT')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      selectedCrypto === 'USDT'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    USDT
                  </button>
                  <button
                    onClick={() => setSelectedCrypto('XRP')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      selectedCrypto === 'XRP'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    XRP
                  </button>
                </div>

                {/* Wallet Address */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <label className="text-sm text-gray-500 mb-2 block">
                    Send ${SUBSCRIPTION_PRICE} {selectedCrypto} to:
                  </label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 text-xs break-all font-mono">
                      {walletAddress}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="bg-black text-white px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Button */}
                {!user ? (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-3">Sign in to subscribe</p>
                    <Button className="w-full btn-primary">
                      Create Account
                    </Button>
                  </div>
                ) : paymentStatus === 'confirmed' ? (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <Crown size={32} className="text-green-500 mx-auto mb-2" />
                    <p className="text-green-700 font-bold">You're a VIP!</p>
                    <p className="text-green-600 text-sm">Welcome to the elite</p>
                  </div>
                ) : (
                  <Button
                    onClick={confirmPayment}
                    className="w-full btn-primary py-6 text-lg"
                    disabled={paymentStatus === 'pending'}
                  >
                    {paymentStatus === 'pending' ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2" size={20} />
                        I've Sent The Money
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  * Payments are manually verified. Please allow up to 24 hours for activation.
                  <br />
                  ** No refunds. We spent it on coffee already.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-gray-500">
            <Shield size={20} />
            <span className="text-sm">Secure Crypto Payments</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Zap size={20} />
            <span className="text-sm">Instant Account Upgrade</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Crown size={20} />
            <span className="text-sm">VIP Treatment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
