import { useState } from 'react';

import { 
  Wallet, Copy, Check, Clock, AlertTriangle, 
  Bitcoin, CircleDollarSign, ArrowRightLeft, Hexagon
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface CryptoPaymentProps {
  plan: 'monthly' | 'yearly' | 'ironic' | 'lifetime';
  onSuccess?: () => void;
}

const PLAN_DETAILS = {
  monthly: { price: 9.99, name: 'Premium Monthly' },
  yearly: { price: 99.99, name: 'Premium Yearly' },
  ironic: { price: 2.50, name: 'Ironic Tier' },
  lifetime: { price: 299.99, name: 'Lifetime Access' },
};

const CRYPTO_OPTIONS = [
  { 
    id: 'usdt', 
    name: 'USDT', 
    icon: CircleDollarSign, 
    color: '#26A17B',
    network: 'Tron Network (TRC20)',
    warning: null
  },
  { 
    id: 'btc', 
    name: 'Bitcoin', 
    icon: Bitcoin, 
    color: '#F7931A',
    network: 'Bitcoin Network',
    warning: 'Bitcoin transactions may take 10-60 minutes to confirm'
  },
  { 
    id: 'xrp', 
    name: 'XRP', 
    icon: ArrowRightLeft, 
    color: '#23292F',
    network: 'XRP Ledger',
    warning: 'REQUIRED: Include the destination tag or payment will be lost!'
  },
  { 
    id: 'polygon', 
    name: 'Polygon', 
    icon: Hexagon, 
    color: '#8247E5',
    network: 'Polygon Network',
    warning: null
  },
];

export function CryptoPayment({ plan, onSuccess }: CryptoPaymentProps) {
  const { user } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const planDetails = PLAN_DETAILS[plan];

  const initiatePayment = async (currency: string) => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create-crypto-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('rfns_token')}`,
        },
        body: JSON.stringify({ plan, currency }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentData(data);
        setSelectedCrypto(currency);
        toast.success('Payment details generated!');
      } else {
        toast.error(data.error || 'Failed to create payment');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPayment = async () => {
    if (!paymentData?.paymentId) return;
    
    setChecking(true);
    try {
      const response = await fetch(
        `/.netlify/functions/check-crypto-payment?paymentId=${paymentData.paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('rfns_token')}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === 'confirmed') {
        toast.success('Payment confirmed! Welcome to the Inner Circle!');
        onSuccess?.();
      } else if (data.status === 'expired') {
        toast.error('Payment expired. Please create a new one.');
        setPaymentData(null);
        setSelectedCrypto(null);
      } else {
        toast.info(`Payment pending... ${data.confirmations || 0} confirmations`);
      }
    } catch (error) {
      toast.error('Error checking payment');
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (paymentData) {
    const cryptoOption = CRYPTO_OPTIONS.find(c => c.id === selectedCrypto);
    const Icon = cryptoOption?.icon || Wallet;

    return (
      <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${cryptoOption?.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: cryptoOption?.color }} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Pay with {cryptoOption?.name}
            </h3>
            <p className="text-gray-500 text-sm">{cryptoOption?.network}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-[#0a0a0a] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Amount to Send:</span>
            <span className="font-mono text-xl font-bold text-[#00ff41]">
              {paymentData.cryptoAmount} {paymentData.cryptoCurrency}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Fiat Value:</span>
            <span className="text-gray-400">${paymentData.fiatAmount} USD</span>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-mono text-[#00ff41] mb-2">
            SEND TO ADDRESS
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 font-mono text-sm text-gray-300 break-all">
              {paymentData.address}
            </div>
            <button
              onClick={() => copyToClipboard(paymentData.address, 'address')}
              className="px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedField === 'address' ? (
                <Check className="w-5 h-5 text-[#00ff41]" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Destination Tag (XRP only) */}
        {paymentData.destinationTag && (
          <div className="mb-4">
            <label className="block text-sm font-mono text-red-400 mb-2">
              DESTINATION TAG (REQUIRED!)
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-lg p-3 font-mono text-sm text-white">
                {paymentData.destinationTag}
              </div>
              <button
                onClick={() => copyToClipboard(paymentData.destinationTag, 'tag')}
                className="px-4 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                {copiedField === 'tag' ? (
                  <Check className="w-5 h-5 text-red-400" />
                ) : (
                  <Copy className="w-5 h-5 text-red-400" />
                )}
              </button>
            </div>
            <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Without this tag, your payment will be lost!
            </p>
          </div>
        )}

        {/* Warning */}
        {cryptoOption?.warning && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-400 text-sm">{cryptoOption.warning}</p>
            </div>
          </div>
        )}

        {/* Timer */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <Clock className="w-4 h-4" />
          <span>Payment expires in 30 minutes</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={checkPayment}
            disabled={checking}
            className="flex-1 bg-[#00ff41] hover:bg-[#00ff41]/90 disabled:bg-gray-800 text-black font-bold py-3 rounded-lg transition-colors font-mono"
          >
            {checking ? 'CHECKING...' : 'I\'VE SENT PAYMENT'}
          </button>
          <button
            onClick={() => {
              setPaymentData(null);
              setSelectedCrypto(null);
            }}
            className="px-4 py-3 border border-gray-700 hover:border-gray-600 text-gray-400 rounded-lg transition-colors"
          >
            BACK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-6">
      <h3 className="font-display text-xl font-bold text-white mb-2">
        Pay with Crypto
      </h3>
      <p className="text-gray-400 mb-6">
        Select your preferred cryptocurrency for {planDetails.name}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {CRYPTO_OPTIONS.map((crypto) => {
          const Icon = crypto.icon;
          return (
            <button
              key={crypto.id}
              onClick={() => initiatePayment(crypto.id)}
              disabled={isLoading}
              className="p-4 bg-[#0a0a0a] border border-gray-800 hover:border-[#00ff41]/50 rounded-lg transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `${crypto.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: crypto.color }} />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-[#00ff41] transition-colors">
                    {crypto.name}
                  </div>
                  <div className="text-xs text-gray-500">{crypto.network}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-gray-900/50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total:</span>
          <span className="font-display text-2xl font-bold text-white">
            ${planDetails.price}
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-4 text-center">
        Crypto payments are processed manually. Please allow 10-30 minutes for confirmation.
      </p>
    </div>
  );
}
