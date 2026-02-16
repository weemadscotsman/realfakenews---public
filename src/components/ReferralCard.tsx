import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Users, Copy, Check, Share2, Gift } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralStats {
  total: number;
  pending: number;
  completed: number;
  totalEarned: number;
}

export const ReferralCard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      generateReferralCode();
      loadStats();
    }
  }, [isAuthenticated, user?.id]);

  const generateReferralCode = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', userId: user?.id }),
      });

      const data = await response.json();
      if (data.success) {
        setReferralCode(data.code);
        setReferralLink(data.link);
      }
    } catch (error) {
      console.error('Failed to generate referral code:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stats', userId: user?.id }),
      });

      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load referral stats:', error);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const shareReferral = async () => {
    const shareData = {
      title: 'Join RealFake News Premium',
      text: `Use my code ${referralCode} to get started with RealFake News! Get roasted by AI.`,
      url: referralLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      copyToClipboard(referralLink, 'Referral link');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 text-center">
        <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Referral Program</h3>
        <p className="text-zinc-500 text-sm">Sign in to get your referral code</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
          <Gift className="w-5 h-5 text-yellow-500" />
        </div>
        <div>
          <h3 className="font-bold">Refer & Earn</h3>
          <p className="text-zinc-500 text-sm">100 tokens per friend who subscribes</p>
        </div>
      </div>

      {/* Referral Code */}
      <div className="bg-zinc-950 rounded-lg p-4 mb-4">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Your Code</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xl font-mono font-bold text-yellow-500">
            {referralCode || 'Loading...'}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(referralCode, 'Code')}
            disabled={!referralCode}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Share Button */}
      <Button
        onClick={shareReferral}
        className="w-full mb-6"
        variant="outline"
        disabled={!referralCode}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Referral Link
      </Button>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-zinc-500">Total Referrals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">{stats.completed}</p>
            <p className="text-xs text-zinc-500">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">{stats.totalEarned}</p>
            <p className="text-xs text-zinc-500">Tokens Earned</p>
          </div>
        </div>
      )}
    </div>
  );
};
