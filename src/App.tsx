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
import { NarrativeOverlay } from '@/components/NarrativeOverlay';
import PoliticsPage from '@/pages/PoliticsPage';
import SciencePage from '@/pages/SciencePage';
import EntertainmentPage from '@/pages/EntertainmentPage';
import SportsPage from '@/pages/SportsPage';
import ConspiracyPage from '@/pages/ConspiracyPage';
import ResistancePage from '@/pages/ResistancePage';
import BetsPage from '@/pages/BetsPage';
import { ArchivesPage } from '@/pages/ArchivesPage';
import { DarrenHiddenLog } from '@/components/DarrenHiddenLog';
import { RealityTicker } from '@/components/RealityTicker';
import SurveillanceDashboard from '@/pages/SurveillanceDashboard';
import { BatteryWarning } from 'lucide-react';

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
          {/* Scarcity Mechanic: Grid Stability Widget */}
          <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded-full border border-zinc-700 flex items-center gap-2 text-xs font-mono shadow-xl pointer-events-none">
            <BatteryWarning size={12} className={67 < 30 ? "text-red-500 animate-pulse" : "text-yellow-500"} />
            <span className="opacity-70 uppercase tracking-wider">Grid Stability:</span>
            <span className={67 < 30 ? "text-red-500 font-bold" : "text-yellow-400 font-bold"}>67%</span>
          </div>

          <RealityTicker />

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
              <Route path="/doomsday" element={<DoomsdayPage />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/logs/darren-03" element={<DarrenHiddenLog />} />
              <Route path="/admin/surveillance" element={<SurveillanceDashboard />} />
            </Routes>

            <Footer />
            <NarrativeOverlay />

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
