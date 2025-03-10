
import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <GlassCard className={cn('p-6', className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className={cn('p-3 rounded-full bg-primary/10', iconClassName)}>
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </GlassCard>
  );
};

export default StatsCard;
