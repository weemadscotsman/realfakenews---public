import { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { GameEconomyProvider } from '@/hooks/useGameEconomy';
import Navigation from '@/components/Navigation';
import BreakingNewsBar from '@/components/BreakingNewsBar';
import Masthead from '@/components/Masthead';
import HeroSection from '@/sections/HeroSection';
import NewsGrid from '@/sections/NewsGrid';
import DropTheTea from '@/sections/DropTheTea';
import Leaderboard from '@/sections/Leaderboard';
import Achievements from '@/sections/Achievements';
import StoryArcs from '@/sections/StoryArcs';
import Subscription from '@/sections/Subscription';
import FakeBets from '@/sections/FakeBets';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import { Toaster } from 'sonner';

function AppContent() {
  const { loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');

  const openLogin = (mode: 'login' | 'signup' = 'login') => {
    setLoginMode(mode);
    setShowLogin(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RealFake News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BreakingNewsBar />
      <Masthead />
      <Navigation onLoginClick={() => openLogin('login')} />

      <main>
        <HeroSection />
        <NewsGrid />
        <FakeBets />
        <DropTheTea onLoginRequired={() => openLogin('login')} />
        <Leaderboard />
        <StoryArcs />
        <Achievements />
        <Subscription />
      </main>

      <Footer />

      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          initialMode={loginMode}
        />
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GameEconomyProvider>
        <AppContent />
      </GameEconomyProvider>
    </AuthProvider>
  );
}

export default App;
