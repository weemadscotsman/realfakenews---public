import { Crown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

interface PremiumGateProps {
  children: React.ReactNode;
  featureName: string;
  fallback?: React.ReactNode;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({ 
  children, 
  featureName,
  fallback 
}) => {
  const { user } = useAuth();
  const isSubscribed = user?.is_subscribed;

  // If subscribed, show the content
  if (isSubscribed) {
    return <>{children}</>;
  }

  // If custom fallback provided, show it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default locked state
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
          <p className="text-zinc-400 text-sm mb-4 max-w-xs">
            {featureName} is only available to premium subscribers. 
            Upgrade to unlock this and other exclusive features.
          </p>
          <Link to="/membership">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      </div>
      <div className="opacity-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

// Hook for checking premium status
export const usePremium = () => {
  const { user } = useAuth();
  return {
    isPremium: user?.is_subscribed ?? false,
    tier: user?.subscription_tier ?? 'free',
    isFeatureAvailable: (requiredTier: 'premium' | 'vip' = 'premium') => {
      if (!user?.is_subscribed) return false;
      if (requiredTier === 'vip') return user.subscription_tier === 'vip';
      return true;
    }
  };
};
