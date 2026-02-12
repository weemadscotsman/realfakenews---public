import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, getCurrentUser, signUp as supabaseSignUp, signIn as supabaseSignIn, signOut as supabaseSignOut } from '@/lib/supabase';
import type { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error?: Error }>;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const profile = await getCurrentUser();
        setUser(profile);
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const profile = await getCurrentUser();
          setUser(profile);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Auth state change error:', error);
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      await supabaseSignUp(email, password, username);
      toast.success('Account created!', {
        description: 'Please check your email to verify your account.',
      });
      return {};
    } catch (error: any) {
      toast.error('Sign up failed', {
        description: error.message || 'Something went wrong',
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      await supabaseSignIn(email, password);
      const profile = await getCurrentUser();
      setUser(profile);
      toast.success('Welcome back!', {
        description: `Logged in as @${profile?.username}`,
      });
      return {};
    } catch (error: any) {
      toast.error('Sign in failed', {
        description: error.message || 'Invalid credentials',
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabaseSignOut();
      setUser(null);
      toast.success('Signed out');
    } catch (error: any) {
      toast.error('Sign out failed', {
        description: error.message,
      });
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const profile = await getCurrentUser();
    setUser(profile);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      signUp,
      signIn,
      signOut,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
