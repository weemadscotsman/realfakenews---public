import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGameEconomy } from '@/hooks/useGameEconomy';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Trophy, Flame, Zap, Star, Crown,
  Users, Clock, Award, Gift, Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { ACHIEVEMENTS } from '@/types/enhanced';
import { getUserAchievements, claimAchievementReward } from '@/lib/supabase';

interface AchievementDisplay {
  id: string;
  type: keyof typeof ACHIEVEMENTS;
  name: string;
  description: string;
  reward: number;
  icon: React.ReactNode;
  unlocked: boolean;
  unlocked_at?: string;
  claimed: boolean;
  progress?: number;
  maxProgress?: number;
}

const Achievements = () => {
  const { user } = useAuth();
  const { addTokens, refreshEconomy } = useGameEconomy();
  const [achievements, setAchievements] = useState<AchievementDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadAchievements();
    }
  }, [user?.id]);

  const loadAchievements = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const userAchievements = await getUserAchievements(user.id);

      // Build achievements list with progress
      const achievementList: AchievementDisplay[] = [
        {
          id: 'first_roast',
          type: 'first_roast',
          ...ACHIEVEMENTS.first_roast,
          icon: <Flame size={24} />,
          unlocked: (user?.tea_drops_count || 0) >= 1,
          claimed: userAchievements.find(a => a.type === 'first_roast')?.claimed || false,
          progress: Math.min(1, user?.tea_drops_count || 0),
          maxProgress: 1,
        },
        {
          id: 'roast_streak_7',
          type: 'roast_streak_7',
          ...ACHIEVEMENTS.roast_streak_7,
          icon: <Clock size={24} />,
          unlocked: (user?.streak_days || 0) >= 7,
          claimed: userAchievements.find(a => a.type === 'roast_streak_7')?.claimed || false,
          progress: Math.min(7, user?.streak_days || 0),
          maxProgress: 7,
        },
        {
          id: 'roast_streak_30',
          type: 'roast_streak_30',
          ...ACHIEVEMENTS.roast_streak_30,
          icon: <CalendarIcon />,
          unlocked: (user?.streak_days || 0) >= 30,
          claimed: userAchievements.find(a => a.type === 'roast_streak_30')?.claimed || false,
          progress: Math.min(30, user?.streak_days || 0),
          maxProgress: 30,
        },
        {
          id: 'battle_winner',
          type: 'battle_winner',
          ...ACHIEVEMENTS.battle_winner,
          icon: <Trophy size={24} />,
          unlocked: (user?.battle_wins || 0) >= 1,
          claimed: userAchievements.find(a => a.type === 'battle_winner')?.claimed || false,
          progress: user?.battle_wins || 0,
          maxProgress: 1,
        },
        {
          id: 'battle_legend',
          type: 'battle_legend',
          ...ACHIEVEMENTS.battle_legend,
          icon: <Crown size={24} />,
          unlocked: (user?.battle_wins || 0) >= 10,
          claimed: userAchievements.find(a => a.type === 'battle_legend')?.claimed || false,
          progress: user?.battle_wins || 0,
          maxProgress: 10,
        },
        {
          id: 'tea_master',
          type: 'tea_master',
          ...ACHIEVEMENTS.tea_master,
          icon: <Zap size={24} />,
          unlocked: (user?.tea_drops_count || 0) >= 100,
          claimed: userAchievements.find(a => a.type === 'tea_master')?.claimed || false,
          progress: user?.tea_drops_count || 0,
          maxProgress: 100,
        },
        {
          id: 'social_butterfly',
          type: 'social_butterfly',
          ...ACHIEVEMENTS.social_butterfly,
          icon: <Users size={24} />,
          unlocked: (user?.followers_count || 0) >= 50,
          claimed: userAchievements.find(a => a.type === 'social_butterfly')?.claimed || false,
          progress: user?.followers_count || 0,
          maxProgress: 50,
        },
        {
          id: 'influencer',
          type: 'influencer',
          ...ACHIEVEMENTS.influencer,
          icon: <Star size={24} />,
          unlocked: (user?.followers_count || 0) >= 500,
          claimed: userAchievements.find(a => a.type === 'influencer')?.claimed || false,
          progress: user?.followers_count || 0,
          maxProgress: 500,
        },
      ];

      setAchievements(achievementList);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (achievement: AchievementDisplay) => {
    if (!user?.id) return;

    try {
      // Find the actual achievement ID from database
      const userAchievements = await getUserAchievements(user.id);
      const dbAchievement = userAchievements.find(a => a.type === achievement.type);

      if (!dbAchievement) {
        toast.error('Achievement not found');
        return;
      }

      await claimAchievementReward(dbAchievement.id, user.id);
      await addTokens(achievement.reward, 'achievement', `Achievement: ${achievement.name}`);
      await loadAchievements();
      await refreshEconomy();

      toast.success(`Claimed ${achievement.reward} tokens!`, {
        description: achievement.name,
      });
    } catch (error: any) {
      toast.error('Failed to claim reward', {
        description: error.message,
      });
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalRewards = achievements
    .filter(a => a.unlocked && !a.claimed)
    .reduce((sum, a) => sum + a.reward, 0);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award size={16} />
            Achievement System
          </div>
          <h2 className="newspaper-headline text-4xl md:text-5xl mb-4">
            Hall of Achievements
          </h2>
          <p className="text-xl text-gray-600">
            Unlock badges, earn tokens, become legendary
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-yellow-600">{unlockedCount}</p>
            <p className="text-gray-500">Unlocked</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-gray-400">{achievements.length}</p>
            <p className="text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-4xl font-bold text-green-600">{totalRewards}</p>
            <p className="text-gray-500">Tokens to Claim</p>
          </div>
        </div>

        {/* Claim All Button */}
        {totalRewards > 0 && (
          <div className="text-center mb-8">
            <Button
              className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
              onClick={() => {
                achievements
                  .filter(a => a.unlocked && !a.claimed)
                  .forEach(claimReward);
              }}
            >
              <Gift className="mr-2" size={20} />
              Claim All Rewards ({totalRewards}🪙)
            </Button>
          </div>
        )}

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative rounded-xl p-5 border-2 transition-all ${achievement.unlocked
                  ? 'bg-white border-yellow-200 shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
            >
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-xl">
                  <Lock size={32} className="text-gray-400" />
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-400'
                  }`}>
                  {achievement.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{achievement.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>

                  {achievement.maxProgress && achievement.maxProgress > 1 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <Progress
                        value={((achievement.progress || 0) / achievement.maxProgress) * 100}
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-600">
                      +{achievement.reward}🪙
                    </span>

                    {achievement.unlocked && (
                      <Button
                        size="sm"
                        variant={achievement.claimed ? "outline" : "default"}
                        disabled={achievement.claimed}
                        onClick={() => claimReward(achievement)}
                      >
                        {achievement.claimed ? (
                          <>
                            <Award size={14} className="mr-1" />
                            Claimed
                          </>
                        ) : (
                          <>
                            <Gift size={14} className="mr-1" />
                            Claim
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Login Bonus */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Daily Login Streak</h3>
              <p className="text-white/80">Come back every day for bonus tokens!</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{user?.streak_days || 0}</p>
                <p className="text-sm text-white/80">days</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-3xl font-bold">+{Math.min(((user?.streak_days || 0) * 0.5) + 3, 8)}</p>
                <p className="text-sm text-white/80">tokens tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default Achievements;
