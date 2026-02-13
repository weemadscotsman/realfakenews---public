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
              <Route path="/tech" element={<TechPage />} />
              <Route path="/apocalypse" element={<DoomsdayPage />} />
              <Route path="/timeline" element={<Timeline />} />
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
