
import React from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { user } = useAuth();
  
  return (
    <footer className={cn('py-4 px-6 border-t border-border/30 bg-background/50 text-sm text-muted-foreground', className)}>
      <div className="flex justify-between items-center">
        <p>© 2023 InventTrack. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          {user ? (
            <button onClick={() => {}} className="hover:text-accent transition-colors">Support</button>
          ) : (
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
