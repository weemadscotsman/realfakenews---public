import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { GameEconomyProvider } from '@/hooks/useGameEconomy';
import { Toaster } from 'sonner';

import Home from '@/pages/Home';
import ArticlePage from '@/pages/ArticlePage';
import TechPage from '@/pages/TechPage';
import DoomsdayPage from '@/pages/DoomsdayPage';
import Timeline from '@/pages/Timeline';

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
import AboutPage from '@/pages/AboutPage';
import CareersPage from '@/pages/CareersPage';
import EthicsPage from '@/pages/EthicsPage';
import FactCheckPage from '@/pages/FactCheckPage';
import CorrectionsPage from '@/pages/CorrectionsPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiesPage from '@/pages/CookiesPage';
import DisclaimerPage from '@/pages/DisclaimerPage';
import Unit404Page from '@/pages/Unit404Page';
import Unit404AGCReport from '@/pages/Unit404AGCReport';
import FinalAuditPage from '@/pages/FinalAuditPage';
import { RealityTicker } from '@/components/RealityTicker';
import SuccessPage from '@/pages/payment/SuccessPage';
import CancelPage from '@/pages/payment/CancelPage';
import SurveillanceDashboard from '@/pages/SurveillanceDashboard';
import DetectiveDoryPage from '@/pages/DetectiveDoryPage';
import InvestigationPage from '@/pages/InvestigationPage';
import SystemLeakPage from '@/pages/SystemLeakPage';
import { SystemLeakArticle } from '@/pages/SystemLeakArticle';
import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { ProfilePage } from '@/pages/auth/ProfilePage';
import { BatteryWarning } from 'lucide-react';

function App() {
  const gridStability = 67;

  return (
    <Router>
      <AuthProvider>
        <GameEconomyProvider>
          {/* Scarcity Mechanic: Grid Stability Widget */}
          <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded-full border border-zinc-700 flex items-center gap-2 text-xs font-mono shadow-xl pointer-events-none">
            <BatteryWarning size={12} className={gridStability < 30 ? "text-red-500 animate-pulse" : "text-yellow-500"} />
            <span className="opacity-70 uppercase tracking-wider">Grid Stability:</span>
            <span className={gridStability < 30 ? "text-red-500 font-bold" : "text-yellow-400 font-bold"}>{gridStability}%</span>
          </div>

          <RealityTicker />

          <div className="min-h-screen bg-white">
            <BreakingNewsBar />
            <Masthead />
            <Navigation />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/politics" element={<PoliticsPage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/entertainment" element={<EntertainmentPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/conspiracy" element={<ConspiracyPage />} />
              <Route path="/resistance" element={<ResistancePage />} />
              <Route path="/investigation" element={<InvestigationPage />} />
              <Route path="/system-leak" element={<SystemLeakPage />} />
              <Route path="/system-leak/:slug" element={<SystemLeakArticle />} />
              <Route path="/bets" element={<BetsPage />} />
              <Route path="/apocalypse" element={<DoomsdayPage />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/doomsday" element={<DoomsdayPage />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/logs/darren-03" element={<DarrenHiddenLog />} />
              <Route path="/admin/surveillance" element={<SurveillanceDashboard />} />
              <Route path="/dory" element={<DetectiveDoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/ethics" element={<EthicsPage />} />
              <Route path="/fact-check" element={<FactCheckPage />} />
              <Route path="/corrections" element={<CorrectionsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/unit-404" element={<Unit404Page />} />
              <Route path="/agc/unit-404-report" element={<Unit404AGCReport />} />
              <Route path="/agc/final-audit" element={<FinalAuditPage />} />
              <Route path="/payment/success" element={<SuccessPage />} />
              <Route path="/payment/cancel" element={<CancelPage />} />
              {/* Auth Routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>

            <Footer />
            <NarrativeOverlay />


            <Toaster position="bottom-right" richColors />
          </div>
        </GameEconomyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
