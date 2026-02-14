import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import {
  spendTokens as spendTokensApi,
  addTokens as addTokensApi,
  claimDailyReward as claimDailyRewardApi,
  addXp as addXpApi,
  getUserAchievements,
  claimAchievementReward
} from '@/lib/supabase';
import { toast } from 'sonner';
import { LEVELS } from '@/types/enhanced';

interface GameEconomyContextType {
  xp: number;
  level: number;
  title: string;
  roastTokens: number;
  streakDays: number;
  nextLevelXp: number;
  xpProgress: number;
  achievements: any[];
  unclaimedRewards: number;
  loading: boolean;

  // Actions
  addXp: (amount: number, reason?: string) => Promise<void>;
  addTokens: (amount: number, type: string, reason: string) => Promise<void>;
  spendTokens: (amount: number, reason: string) => Promise<boolean>;
  claimDailyReward: () => Promise<{ tokens: number; xp: number; streak: number } | null>;
  claimAchievement: (achievementId: string) => Promise<void>;
  refreshEconomy: () => Promise<void>;
}

const GameEconomyContext = createContext<GameEconomyContextType | undefined>(undefined);

export const GameEconomyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, refreshUser } = useAuth();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Derived values from user
  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const title = user?.title || 'News Novice';
  const roastTokens = user?.roast_tokens || 0;
  const streakDays = user?.streak_days || 0;

  // Calculate level progress
  const currentLevelConfig = LEVELS.find(l => l.level === level) || LEVELS[0];
  const nextLevelConfig = LEVELS.find(l => l.level === level + 1);
  const nextLevelXp = nextLevelConfig?.xp_required || currentLevelConfig.xp_required;
  const xpProgress = Math.min(100, (xp / nextLevelXp) * 100);

  // Calculate unclaimed rewards
  const unclaimedRewards = achievements
    .filter(a => !a.claimed)
    .reduce((sum, a) => sum + (a.reward_tokens || 0), 0);

  // Load achievements
  useEffect(() => {
    if (user?.id) {
      loadAchievements();
    }
  }, [user?.id]);

  const loadAchievements = async () => {
    if (!user?.id) return;
    try {
      const data = await getUserAchievements(user.id);
      setAchievements(data);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    }
  };

  const addXp = useCallback(async (amount: number, reason?: string) => {
    if (!user?.id) return;

    try {
      await addXpApi(user.id, amount);
      await refreshUser();
      toast.success(`+${amount} XP`, {
        description: reason || 'Keep grinding!'
      });
    } catch (error) {
      console.error('Add XP error:', error);
    }
  }, [user?.id, refreshUser]);

  const addTokens = useCallback(async (amount: number, type: string, reason: string) => {
    if (!user?.id) return;

    try {
      await addTokensApi(user.id, amount, type, reason);
      await refreshUser();
      toast.success(`+${amount} Roast Tokens`, { description: reason });
    } catch (error) {
      console.error('Add tokens error:', error);
      toast.error('Failed to add tokens');
    }
  }, [user?.id, refreshUser]);

  const spendTokens = useCallback(async (amount: number, reason: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const success = await spendTokensApi(user.id, amount, reason);

      if (success) {
        await refreshUser();
        toast.success(`-${amount} Tokens`, { description: reason });
        return true;
      } else {
        toast.error('Not enough Roast Tokens!', {
          description: 'Buy more or wait for daily refresh',
          action: {
            label: 'Buy Tokens',
            onClick: () => window.location.href = '/membership',
          },
        });
        return false;
      }
    } catch (error) {
      console.error('Spend tokens error:', error);
      toast.error('Transaction failed');
      return false;
    }
  }, [user?.id, refreshUser]);

  const claimDailyReward = useCallback(async () => {
    if (!user?.id) return null;

    setLoading(true);
    try {
      const result = await claimDailyRewardApi(user.id);

      if (result) {
        await refreshUser();
        toast.success('Daily Reward Claimed!', {
          description: `${result.tokens} tokens + ${result.xp} XP (${result.streak}-day streak)`,
        });
        return result;
      }
      return null;
    } catch (error: any) {
      toast.error('Failed to claim reward', {
        description: error.message,
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id, refreshUser]);

  const claimAchievement = useCallback(async (achievementId: string) => {
    if (!user?.id) return;

    try {
      await claimAchievementReward(achievementId, user.id);
      await loadAchievements();
      await refreshUser();
      toast.success('Reward claimed!');
    } catch (error: any) {
      toast.error('Failed to claim reward', {
        description: error.message,
      });
    }
  }, [user?.id, refreshUser]);

  const refreshEconomy = useCallback(async () => {
    await refreshUser();
    await loadAchievements();
  }, [refreshUser]);

  return (
    <GameEconomyContext.Provider value={{
      xp,
      level,
      title,
      roastTokens,
      streakDays,
      nextLevelXp,
      xpProgress,
      achievements,
      unclaimedRewards,
      loading,
      addXp,
      addTokens,
      spendTokens,
      claimDailyReward,
      claimAchievement,
      refreshEconomy,
    }}>
      {children}
    </GameEconomyContext.Provider>
  );
};

export const useGameEconomy = () => {
  const context = useContext(GameEconomyContext);
  if (context === undefined) {
    throw new Error('useGameEconomy must be used within a GameEconomyProvider');
  }
  return context;
};
