
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const statsCardVariants = cva(
  "relative rounded-xl border p-6 shadow-sm transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary/10 border-primary/20",
        secondary: "bg-secondary",
        outline: "bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
  trend,
  variant,
  className,
}) => {
  // Function to render the icon based on the icon name string
  const renderIcon = () => {
    // This approach allows using string names for icons
    const iconElement = React.createElement('div', {
      className: "rounded-lg bg-primary/10 p-2 text-primary",
      children: icon
    });
    
    return iconElement;
  };

  return (
    <div className={cn(statsCardVariants({ variant }), className)}>
      <div className="flex items-start justify-between">
        {icon && renderIcon()}
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-1 text-2xl font-semibold">{value}</p>
        
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        
        {change && (
          <p className="mt-1 text-xs text-muted-foreground">{change}</p>
        )}
        
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            <span className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
