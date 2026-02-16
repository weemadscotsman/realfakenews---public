import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  adminMode: boolean;
  toggleAdminMode: () => void;
  unlockAllFeatures: boolean;
  bypassAI: boolean;
  showDebugInfo: boolean;
  mockData: boolean;
  setBypassAI: (val: boolean) => void;
  setShowDebugInfo: (val: boolean) => void;
  setMockData: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [bypassAI, setBypassAI] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [mockData, setMockData] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key].slice(-KONAMI_CODE.length);
      setKeySequence(newSequence);

      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        setIsAdmin(true);
        setAdminMode(true);
        setBypassAI(true);
        setMockData(true);
        console.log('🔓 ADMIN MODE ACTIVATED!');
        console.log('Features unlocked:');
        console.log('  - All AI generation bypassed');
        console.log('  - Mock data enabled');
        console.log('  - Debug info visible');
        alert('🔓 ADMIN MODE ACTIVATED!\n\nAll features unlocked.\nPress F12 for debug console.');
      }

      // Alternative: Triple-click on logo
      if (e.key === 'F9') {
        setIsAdmin(true);
        setAdminMode(true);
        setBypassAI(true);
        setMockData(true);
        console.log('🔓 ADMIN MODE ACTIVATED via F9!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  // Also check URL param
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('admin')) {
      setIsAdmin(true);
      setAdminMode(true);
      setBypassAI(true);
      setMockData(true);
      console.log('🔓 ADMIN MODE ACTIVATED via URL param!');
    }
  }, []);

  const toggleAdminMode = useCallback(() => {
    if (!isAdmin) {
      console.log('Enter Konami code (↑↑↓↓←→←→BA) or press F9 to activate admin');
      return;
    }
    setAdminMode(prev => !prev);
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={{
      isAdmin,
      adminMode,
      toggleAdminMode,
      unlockAllFeatures: adminMode,
      bypassAI: adminMode || bypassAI,
      showDebugInfo: adminMode && showDebugInfo,
      mockData: adminMode || mockData,
      setBypassAI,
      setShowDebugInfo,
      setMockData,
    }}>
      {children}
      {adminMode && <AdminPanel />}
    </AdminContext.Provider>
  );
};

// Admin Panel Component
const AdminPanel: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const {
    adminMode,
    toggleAdminMode,
    bypassAI,
    showDebugInfo,
    mockData,
    setBypassAI,
    setShowDebugInfo,
    setMockData,
  } = useAdmin();

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 left-4 z-[9999] bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-500"
        title="Show Admin Panel"
      >
        🔓
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/95 border-2 border-red-500 rounded-lg p-4 shadow-2xl max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-red-500 font-bold text-sm uppercase tracking-wider">🔓 Admin Mode</h3>
        <button onClick={() => setVisible(false)} className="text-gray-500 hover:text-white">×</button>
      </div>

      <div className="space-y-2 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={adminMode}
            onChange={toggleAdminMode}
            className="accent-red-500"
          />
          <span className="text-white">Admin Mode Active</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={bypassAI}
            onChange={(e) => setBypassAI(e.target.checked)}
            className="accent-red-500"
          />
          <span className="text-white">Bypass AI (Use Mock Data)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={mockData}
            onChange={(e) => setMockData(e.target.checked)}
            className="accent-red-500"
          />
          <span className="text-white">Enable Mock Data</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showDebugInfo}
            onChange={(e) => setShowDebugInfo(e.target.checked)}
            className="accent-red-500"
          />
          <span className="text-white">Show Debug Info</span>
        </label>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800 text-[10px] text-gray-500">
        <p>Konami: ↑↑↓↓←→←→BA</p>
        <p>Or: Press F9</p>
        <p>Or: Add ?admin to URL</p>
      </div>
    </div>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default useAdmin;
