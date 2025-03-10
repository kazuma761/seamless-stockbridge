
import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('w-full py-3 px-6 border-b border-border/30 backdrop-blur-md bg-background/50 z-50 sticky top-0', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-medium">InventTrack</h1>
          
          <div className="hidden md:flex items-center space-x-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="bg-secondary/5 border border-border/50 rounded-full h-10 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-accent/50 w-64 text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 hover:bg-secondary/10 transition-colors">
            <Bell className="h-5 w-5 text-foreground/80" />
          </button>
          
          <button className="rounded-full p-2 hover:bg-secondary/10 transition-colors">
            <Settings className="h-5 w-5 text-foreground/80" />
          </button>
          
          <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
