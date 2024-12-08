// src/components/layout/Header.js
import React from 'react';
import { Bell, ChevronDown, Settings, LogOut, Leaf } from 'lucide-react';

export const Header = ({ isProfileOpen, setIsProfileOpen }) => {
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl font-semibold text-gray-900">EchoTrack Enterprise</span>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell />
            <ProfileMenu isOpen={isProfileOpen} onClick={handleProfileClick} />
          </div>
        </div>
      </div>
    </header>
  );
};

const NotificationBell = () => (
  <div className="relative">
    <button className="p-2 hover:bg-gray-100 rounded-full relative">
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
    </button>
  </div>
);

const ProfileMenu = ({ isOpen, onClick }) => (
  <div className="relative">
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
        <span className="text-white font-medium">JD</span>
      </div>
      <ChevronDown className="w-4 h-4 text-gray-600" />
    </button>
    
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
        <div className="p-4 border-b">
          <p className="font-medium">Jean Dupont</p>
          <p className="text-sm text-gray-500">j.dupont@company.fr</p>
        </div>
        <div className="py-1">
          <MenuButton icon={Settings} label="Paramètres" />
          <MenuButton icon={LogOut} label="Déconnexion" variant="danger" />
        </div>
      </div>
    )}
  </div>
);

const MenuButton = ({ icon: Icon, label, variant = 'default' }) => (
  <button 
    className={`flex w-full items-center px-4 py-2 text-sm hover:bg-gray-50
      ${variant === 'danger' ? 'text-red-600' : 'text-gray-700'}`}
  >
    <Icon className="mr-3 h-4 w-4" />
    {label}
  </button>
);

