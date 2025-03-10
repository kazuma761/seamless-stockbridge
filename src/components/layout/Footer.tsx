
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('py-4 px-6 border-t border-border/30 bg-background/50 text-sm text-muted-foreground', className)}>
      <div className="flex justify-between items-center">
        <p>© 2023 InventTrack. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
