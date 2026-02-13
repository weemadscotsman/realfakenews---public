import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { GameEconomyProvider } from '@/hooks/useGameEconomy';
import { Toaster } from 'sonner';
import { useState } from 'react';
import Home from '@/pages/Home';
import ArticlePage from '@/pages/ArticlePage';
import TechPage from '@/pages/TechPage';
import DoomsdayPage from '@/pages/DoomsdayPage';
import Timeline from '@/pages/Timeline';
import LoginModal from '@/components/LoginModal';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BreakingNewsBar from '@/components/BreakingNewsBar';
import Masthead from '@/components/Masthead';
import MembershipPage from '@/pages/MembershipPage';
import PoliticsPage from '@/pages/PoliticsPage';
import SciencePage from '@/pages/SciencePage';
import EntertainmentPage from '@/pages/EntertainmentPage';
import SportsPage from '@/pages/SportsPage';
import ConspiracyPage from '@/pages/ConspiracyPage';
import ResistancePage from '@/pages/ResistancePage';
import BetsPage from '@/pages/BetsPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');

  const openLogin = (mode: 'login' | 'signup' = 'login') => {
    setLoginMode(mode);
    setShowLogin(true);
  };

  return (
    <Router>
      <AuthProvider>
        <GameEconomyProvider>
          <div className="min-h-screen bg-white">
            <BreakingNewsBar />
            <Masthead />
            <Navigation onLoginClick={() => openLogin('login')} />

            <Routes>
              <Route path="/" element={<Home onLoginClick={openLogin} />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/politics" element={<PoliticsPage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/entertainment" element={<EntertainmentPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/conspiracy" element={<ConspiracyPage />} />
              <Route path="/resistance" element={<ResistancePage />} />
              <Route path="/bets" element={<BetsPage />} />
              <Route path="/apocalypse" element={<DoomsdayPage />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/membership" element={<MembershipPage />} />
            </Routes>

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
        </GameEconomyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
