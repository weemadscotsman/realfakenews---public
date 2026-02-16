import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Crown, Coins, Gift, Calendar, Shield, 
  ExternalLink, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { GlitchText } from '@/components/GlitchText';
import { ReferralCard } from '@/components/ReferralCard';


export function ProfilePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const getTierBadge = () => {
    if (!user.isPremium) return { text: 'FREE AGENT', color: 'bg-gray-700' };
    switch (user.subscriptionTier) {
      case 'ironic':
        return { text: 'IRONIC TIER', color: 'bg-purple-600' };
      case 'yearly':
        return { text: 'VIP MEMBER', color: 'bg-blue-600' };
      case 'lifetime':
        return { text: 'RESISTANCE LEGEND', color: 'bg-yellow-600' };
      default:
        return { text: 'PREMIUM AGENT', color: 'bg-[#00ff41] text-black' };
    }
  };

  const tierBadge = getTierBadge();

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            <GlitchText text="AGENT PROFILE" />
          </h1>
          <p className="text-gray-400">Manage your clearance level and assets</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-6">
              {/* Avatar & Name */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#00ff41]/10 border-2 border-[#00ff41]/30 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-[#00ff41]" />
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 font-mono text-sm mb-3">{user.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${tierBadge.color}`}>
                  {tierBadge.text}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-400">Tokens</span>
                  </div>
                  <span className="font-mono font-bold text-yellow-500">{user.tokens}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-[#00ff41]" />
                    <span className="text-gray-400">Referrals</span>
                  </div>
                  <span className="font-mono font-bold text-[#00ff41]">{user.referralCount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-400">Joined</span>
                  </div>
                  <span className="font-mono text-sm text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {user.subscriptionExpiresAt && (
                  <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-400">Expires</span>
                    </div>
                    <span className="font-mono text-sm text-gray-300">
                      {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => navigate('/membership')}
                  className="w-full py-3 bg-[#00ff41] hover:bg-[#00ff41]/90 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Crown className="w-4 h-4" />
                  {user.isPremium ? 'MANAGE_SUBSCRIPTION' : 'UPGRADE_NOW'}
                </button>
                <button
                  onClick={logout}
                  className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" />
                  TERMINATE_SESSION
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Referral & Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Referral Card */}
            <ReferralCard 
              referralCode={user.referralCode} 
              referralCount={user.referralCount}
            />

            {/* Quick Actions */}
            <div className="bg-[#111] border border-[#00ff41]/20 rounded-xl p-6">
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ff41]" />
                QUICK_ACTIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/archives')}
                  className="p-4 bg-[#0a0a0a] hover:bg-[#00ff41]/5 border border-gray-800 hover:border-[#00ff41]/30 rounded-lg text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#00ff41]">ARCHIVES</span>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00ff41]" />
                  </div>
                  <p className="text-sm text-gray-500">Browse classified articles</p>
                </button>

                <button
                  onClick={() => navigate('/dory')}
                  className="p-4 bg-[#0a0a0a] hover:bg-[#00ff41]/5 border border-gray-800 hover:border-[#00ff41]/30 rounded-lg text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#00ff41]">DETECTIVE_DORY</span>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00ff41]" />
                  </div>
                  <p className="text-sm text-gray-500">AI conspiracy investigator</p>
                </button>

                {user.isPremium && (
                  <button
                    onClick={() => navigate('/bets')}
                    className="p-4 bg-[#0a0a0a] hover:bg-[#00ff41]/5 border border-gray-800 hover:border-[#00ff41]/30 rounded-lg text-left transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[#00ff41]">CONSPIRACY_BETS</span>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00ff41]" />
                    </div>
                    <p className="text-sm text-gray-500">Wager on the truth</p>
                  </button>
                )}

                <button
                  onClick={() => navigate('/timeline')}
                  className="p-4 bg-[#0a0a0a] hover:bg-[#00ff41]/5 border border-gray-800 hover:border-[#00ff41]/30 rounded-lg text-left transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#00ff41]">RESISTANCE_TIMELINE</span>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#00ff41]" />
                  </div>
                  <p className="text-sm text-gray-500">Track the movement</p>
                </button>
              </div>
            </div>

            {/* Subscription Status */}
            {!user.isPremium && (
              <div className="bg-gradient-to-r from-[#00ff41]/10 to-blue-500/10 border border-[#00ff41]/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00ff41]/20 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-[#00ff41]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Unlock Premium Access
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Get exclusive tea drops, ad-free reading, conspiracy bets, and join the
                      elite Resistance network. Starting at just $9.99/month.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate('/membership')}
                        className="px-6 py-2 bg-[#00ff41] hover:bg-[#00ff41]/90 text-black font-bold rounded-lg transition-colors"
                      >
                        VIEW_PLANS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
