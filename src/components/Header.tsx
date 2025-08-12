import React from 'react';
import { Paintbrush, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentUser: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogin, onLogout }) => {
  return (
    <header className="text-center mb-4 sm:mb-6 lg:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Paintbrush className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            INCOlors
          </h1>
        </div>
        
        <div className="flex-1 flex justify-end">
          {currentUser ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 bg-white rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-sm">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">@{currentUser}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-1 sm:gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-colors"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              Connect X
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
        Express your creativity with the INCO logo! Click on different parts and paint them with your favorite colors, then share your unique creation with Incommunity.
      </p>
    </header>
  );
};

export default Header;