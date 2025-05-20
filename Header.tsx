import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Map, History, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            onClick={closeMobileMenu}
          >
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">EcoRoute</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={isActive('/')} icon={<Map size={18} />} label="Plan Route" />
            <NavLink to="/history" isActive={isActive('/history')} icon={<History size={18} />} label="History" />
            <NavLink to="/profile" isActive={isActive('/profile')} icon={<User size={18} />} label="Profile" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-primary-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" icon={<Map size={18} />} label="Plan Route" onClick={closeMobileMenu} />
              <MobileNavLink to="/history" icon={<History size={18} />} label="History" onClick={closeMobileMenu} />
              <MobileNavLink to="/profile" icon={<User size={18} />} label="Profile" onClick={closeMobileMenu} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, icon, label }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
      isActive
        ? 'bg-primary-50 text-primary-600 font-medium'
        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Header;