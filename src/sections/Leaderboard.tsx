import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy, Flame, TrendingUp, Crown, Medal,
  Award, Zap, Gift, ChevronUp, ChevronDown
} from 'lucide-react';
import { getLeaderboard } from '@/lib/supabase';
// import type { User } from '@/types';

interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar_url?: string;
  level: number;
  title: string;
  xp: number;
  tea_drops_count: number;
  battle_wins: number;
  followers_count: number;
  trend?: 'up' | 'down' | 'same' | string;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('weekly');
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [myRank, setMyRank] = useState<LeaderboardUser | null>(null);
  const [prizePool, setPrizePool] = useState(5000);
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(timeframe as 'daily' | 'weekly' | 'alltime', 20);

      // Transform to leaderboard format
      const formatted = data.map((u, index) => ({
        id: u.id,
        rank: index + 1,
        username: u.username,
        avatar_url: u.avatar_url,
        level: u.level || 1,
        title: u.title || 'News Novice',
        xp: u.xp || 0,
        tea_drops_count: u.tea_drops_count || 0,
        battle_wins: u.battle_wins || 0,
        followers_count: u.followers_count || 0,
        trend: Math.random() > 0.7 ? 'up' : Math.random() > 0.5 ? 'down' : 'same',
      }));

      setLeaders(formatted);

      // Find user's rank if they're in the list
      const userInList = formatted.find(u => u.id === user?.id);
      if (userInList) {
        setMyRank(userInList);
      } else if (user) {
        // User not in top 20, create rank entry
        setMyRank({
          id: user.id,
          rank: 47 + Math.floor(Math.random() * 20),
          username: user.username,
          avatar_url: user.avatar_url,
          level: user.level || 1,
          title: user.title || 'News Novice',
          xp: user.xp || 0,
          tea_drops_count: user.tea_drops_count || 0,
          battle_wins: user.battle_wins || 0,
          followers_count: user.followers_count || 0,
          trend: 'up',
        });
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [timeframe, user]);

  useEffect(() => {
    loadLeaderboard();

    // Animate prize pool
    const interval = setInterval(() => {
      setPrizePool(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);

    return () => clearInterval(interval);
  }, [timeframe, loadLeaderboard]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown size={24} className="text-yellow-500" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Award size={24} className="text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400 w-6 text-center">{rank}</span>;
    }
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 via-yellow-50 to-transparent border-l-4 border-yellow-500';
      case 2:
        return 'bg-gradient-to-r from-gray-100 via-gray-50 to-transparent border-l-4 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-100 via-amber-50 to-transparent border-l-4 border-amber-600';
      default:
        return 'hover:bg-gray-50';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <ChevronUp size={16} className="text-green-500" />;
      case 'down':
        return <ChevronDown size={16} className="text-red-500" />;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy size={16} />
            Global Rankings
          </div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-4">
            Hall of Shame
          </h2>
          <p className="text-xl text-gray-600">
            The most roasted, the most shameless, the most legendary
          </p>
        </div>

        {/* Prize Pool Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/80 mb-1">Weekly Competition Prize Pool</p>
              <p className="text-4xl font-bold">{prizePool.toLocaleString()}🪙</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80 mb-1">Resets in</p>
              <p className="text-2xl font-mono">2d 14h 32m</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Crown size={16} className="text-yellow-300" />
              <span>1st: 40% of pool</span>
            </div>
            <div className="flex items-center gap-2">
              <Medal size={16} className="text-gray-300" />
              <span>2nd: 25% of pool</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-300" />
              <span>3rd: 15% of pool</span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <Flame size={24} className="text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">2.4M</p>
            <p className="text-xs text-red-600/70">Total Roasts</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <TrendingUp size={24} className="text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">847K</p>
            <p className="text-xs text-blue-600/70">Tea Drops</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <Trophy size={24} className="text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">42K</p>
            <p className="text-xs text-purple-600/70">Story Arcs</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Zap size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">156K</p>
            <p className="text-xs text-green-600/70">Battles</p>
          </div>
        </div>

        {/* Timeframe Tabs */}
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Row */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
              <div className="col-span-1">#</div>
              <div className="col-span-3">User</div>
              <div className="col-span-2 text-center">Tea Drops</div>
              <div className="col-span-2 text-center">Battles</div>
              <div className="col-span-2 text-center">XP</div>
              <div className="col-span-2 text-center">Trend</div>
            </div>
          </div>

          {/* Leader Rows */}
          <div className="divide-y divide-gray-100">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className={`px-6 py-4 transition-colors ${getRowStyle(leader.rank)}`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 flex justify-center">
                    {getRankIcon(leader.rank)}
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${leader.rank <= 3 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-400'
                        }`}>
                        {leader.level}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">@{leader.username}</span>
                        <p className="text-xs text-gray-500">{leader.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {leader.tea_drops_count.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-medium text-gray-700">
                      {leader.battle_wins}W
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm font-bold text-red-600">
                      {leader.xp.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-span-2 text-center flex justify-center">
                    {getTrendIcon(leader.trend)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rank */}
        {myRank && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">#{myRank.rank}</p>
                  <p className="text-xs text-blue-600/70">Your Rank</p>
                </div>
                <div className="w-px h-12 bg-blue-200" />
                <div>
                  <p className="font-bold text-lg">@{myRank.username}</p>
                  <p className="text-sm text-gray-600">{myRank.title} • Level {myRank.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold">{myRank.xp.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">XP</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-red-600">{myRank.tea_drops_count}</p>
                  <p className="text-xs text-gray-500">Tea Drops</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Referral CTA */}
        <div className="mt-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Want to Climb the Ranks?</h3>
              <p className="text-white/80">
                Share your referral code. Every signup earns you 50🪙 + 100 XP
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                <span className="text-sm text-white/60">Your Code:</span>
                <span className="ml-2 font-mono font-bold">{user?.referral_code || 'signup-for-code'}</span>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(user?.referral_code || '');
                }}
              >
                <Gift size={16} className="mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
