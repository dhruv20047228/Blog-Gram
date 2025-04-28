import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, Search, PenSquare, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { Link } from '../ui/Link';

const Navbar: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Search size={24} />, label: 'Search', path: '/search' },
    { icon: <PenSquare size={24} />, label: 'Create', path: '/create' },
    { icon: <Heart size={24} />, label: 'Notifications', path: '/notifications' },
    { 
      icon: currentUser?.profileImage ? 
        <img 
          src={currentUser.profileImage} 
          alt="Profile" 
          className="w-6 h-6 rounded-full object-cover"
        /> : 
        <User size={24} />, 
      label: 'Profile', 
      path: `/profile/${currentUser?.username || ''}` 
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <PenSquare size={28} className="text-slate-800" />
              <span className="ml-2 text-xl font-semibold text-slate-800">BlogGram</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item.icon}
                    <span className="ml-1 text-sm">{item.label}</span>
                  </Link>
                ))}
                <button 
                  onClick={logout} 
                  className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <LogOut size={24} />
                  <span className="ml-1 text-sm">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900">
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-4 space-y-1">
            {isAuthenticated ? (
              <>
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="flex items-center px-4 py-3 text-slate-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }} 
                  className="flex items-center w-full text-left px-4 py-3 text-slate-600 hover:bg-gray-50"
                >
                  <LogOut size={24} />
                  <span className="ml-3">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-4 py-3 text-slate-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-4 py-3 text-slate-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;