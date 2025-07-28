import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiMessageCircle, FiUser, FiLogOut } = FiIcons;

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <SafeIcon icon={FiMessageCircle} className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">ReviewGenie.ai</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <SafeIcon icon={FiUser} className="w-5 h-5" />
                <span className="hidden sm:block">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;