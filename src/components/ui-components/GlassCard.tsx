
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high';
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  elevation = 'medium',
  hover = true,
  onClick,
}) => {
  const elevationClasses = {
    low: 'bg-white/5 backdrop-blur-sm border border-white/10 shadow-sm',
    medium: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-md',
    high: 'bg-white/15 backdrop-blur-lg border border-white/30 shadow-lg',
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        elevationClasses[elevation],
        hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
