import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Crown } from 'lucide-react';

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Timeline', href: '/timeline', isRoute: true },
    { label: 'Archives', href: '/archives', isRoute: true },
    { label: 'Politics', href: '/politics', isRoute: true },
    { label: 'Science', href: '/science', isRoute: true },
    { label: 'Tech', href: '/tech', isRoute: true },
    { label: 'Apocalypse', href: '/apocalypse', isRoute: true },
    { label: 'Entertainment', href: '/entertainment', isRoute: true },
    { label: 'Sports', href: '/sports', isRoute: true },
    { label: 'Conspiracy', href: '/conspiracy', isRoute: true },
    { label: 'Resistance', href: '/resistance', isRoute: true },
    { label: 'Bets', href: '/bets', isRoute: true },
    { label: 'Investigation', href: '/investigation', isRoute: true },
    { label: 'System Leak', href: '/system-leak', isRoute: true },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      if (location.pathname !== '/') {
        navigate('/' + item.href);
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {user.isPremium && (
                  <span className="sub-badge flex items-center gap-1">
                    <Crown size={12} />
                    VIP
                  </span>
                )}
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  className="text-gray-500"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/signin')}
                  className="text-gray-700"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/signup')}
                  className="btn-primary"
                >
                  Join
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-gray-700 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
