import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import HTKLogo from './HTKLogo';

const ProfessionalNavigation = ({ user = null, onLogout = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Work', path: '/jobs' },
    { name: 'Find Tradespeople', path: '/tradespeople' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Community', path: '/community-hub' }
  ];

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Logout', action: onLogout, icon: LogOut }
  ];

  return (
    <nav className="htk-nav">
      <div className="htk-nav-container">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <HTKLogo size="medium" variant="full" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`htk-nav-link ${
                isActive(item.path) ? 'text-[#B9975B]' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* User Menu / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 htk-button-secondary px-4 py-2"
              >
                <User size={18} />
                <span>{user.name || 'User'}</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#333] rounded-lg shadow-xl z-50">
                  {userMenuItems.map((item) => (
                    <div key={item.name}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-[#222] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            item.action();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-2 px-4 py-3 text-white hover:bg-[#222] transition-colors w-full text-left"
                        >
                          <item.icon size={16} />
                          <span>{item.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="htk-nav-link">
                Login
              </Link>
              <Link to="/register/customer" className="htk-button-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#B9975B] hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111] border-t border-[#333]">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block htk-nav-link ${
                  isActive(item.path) ? 'text-[#B9975B]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-[#333] pt-4 mt-4">
              {user ? (
                <div className="space-y-3">
                  {userMenuItems.map((item) => (
                    <div key={item.name}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="flex items-center space-x-2 text-white hover:text-[#B9975B] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            item.action();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center space-x-2 text-white hover:text-[#B9975B] transition-colors"
                        >
                          <item.icon size={16} />
                          <span>{item.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    className="block htk-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register/customer"
                    className="block htk-button-primary text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProfessionalNavigation;
