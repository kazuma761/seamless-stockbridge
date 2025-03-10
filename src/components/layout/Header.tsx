
import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { signOut, profile } = useAuth();
  
  return (
    <header className="flex items-center justify-between p-6 border-b border-border/30 bg-background/50 backdrop-blur-md">
      <div className="flex items-center">
        <button className="md:hidden mr-4">
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-lg bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium">{profile?.first_name || 'User'} {profile?.last_name || ''}</div>
            <div className="text-xs text-muted-foreground capitalize">{profile?.role || 'User'}</div>
          </div>
          
          <div className="relative">
            <button className="overflow-hidden rounded-full w-10 h-10 bg-secondary/20 flex items-center justify-center hover:ring-2 hover:ring-accent/50 transition-all">
              <User className="h-5 w-5" />
            </button>
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <button 
            onClick={() => signOut()}
            className="hidden md:block text-sm text-ocean hover:text-teal transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
