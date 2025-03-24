
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'red' | 'gray' | 'white';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'default',
  className
}) => {
  const colorStyles = {
    default: 'bg-nike-black text-white',
    red: 'bg-nike-red text-white',
    gray: 'bg-gray-200 text-gray-800',
    white: 'bg-white text-nike-black border border-gray-200'
  };

  return (
    <span 
      className={cn(
        'inline-block text-xs font-medium px-2.5 py-1 rounded-full',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
