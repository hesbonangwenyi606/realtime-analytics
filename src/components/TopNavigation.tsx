import React, { useState } from 'react';
import { Bell, Settings, User, LogOut, BarChart3, Wifi, WifiOff } from 'lucide-react';

interface TopNavigationProps {
  isConnected: boolean;
  userName?: string;
  userAvatar?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  isConnected,
  userName = 'Admin User',
  userAvatar
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);

  return (
    <nav className="bg-[#2d3142] border-b border-gray-700/50 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-[#00d9ff]" size={32} />
          <div>
            <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-xs text-gray-400">Real-time data monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isConnected ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="text-sm font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-[#1a1d29] rounded-lg transition-colors">
            <Bell className="text-gray-400" size={20} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-[#1a1d29] rounded-lg transition-colors">
            <Settings className="text-gray-400" size={20} />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-[#1a1d29] rounded-lg transition-colors"
            >
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 bg-[#00d9ff] rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
              <span className="text-sm text-white">{userName}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1d29] rounded-lg shadow-xl border border-gray-700/50 py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2d3142] flex items-center gap-2">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-[#2d3142] flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </button>
                <hr className="my-2 border-gray-700" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#2d3142] flex items-center gap-2">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
