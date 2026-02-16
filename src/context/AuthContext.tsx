import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  isPremium: boolean;
  is_subscribed?: boolean;
  subscriptionTier?: 'monthly' | 'yearly' | 'ironic' | 'lifetime';
  subscription_tier?: string;
  subscriptionExpiresAt?: string;
  referralCode: string;
  referral_code?: string;
  referralCount: number;
  tokens: number;
  roast_tokens?: number;
  xp?: number;
  level?: number;
  title?: string;
  streak_days?: number;
  tea_drops_count?: number;
  battle_wins?: number;
  followers_count?: number;
  avatar_url?: string;
  createdAt: string;
  walletAddresses?: {
    usdt?: string;
    xrp?: string;
    btc?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: Error }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: Error }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('rfns_token');
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('/.netlify/functions/get-user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalid, clear it
        localStorage.removeItem('rfns_token');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string): Promise<{ error?: Error }> => {
    try {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('rfns_token', data.token);
        setUser(data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        return {};
      } else {
        const error = new Error(data.error || 'Login failed');
        toast.error(data.error || 'Login failed');
        return { error };
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Network error. Please try again.');
      toast.error('Network error. Please try again.');
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<{ error?: Error }> => {
    try {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('rfns_token', data.token);
        setUser(data.user);
        toast.success(`Welcome to RFNS, ${data.user.name}!`);
        return {};
      } else {
        const error = new Error(data.error || 'Registration failed');
        toast.error(data.error || 'Registration failed');
        return { error };
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Network error. Please try again.');
      toast.error('Network error. Please try again.');
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('rfns_token');
    setUser(null);
    toast.info('Logged out successfully');
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('rfns_token');
    if (token) {
      await fetchUser(token);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>): Promise<boolean> => {
    try {
      const token = localStorage.getItem('rfns_token');
      if (!token) return false;

      const response = await fetch('/.netlify/functions/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        toast.success('Profile updated!');
        return true;
      } else {
        const error = await response.json();
        toast.error(error.message || 'Update failed');
        return false;
      }
    } catch (error) {
      toast.error('Network error');
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
