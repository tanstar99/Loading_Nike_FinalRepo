
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'red' | 'gray' | 'white' | 'green' | 'blue';
  className?: string;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'default',
  className,
  pulse = false
}) => {
  const colorStyles = {
    default: 'bg-nike-black text-white',
    red: 'bg-nike-red text-white',
    gray: 'bg-gray-200 text-gray-800',
    white: 'bg-white text-nike-black border border-gray-200',
    green: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white'
  };

  return (
    <span 
      className={cn(
        'inline-block text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300 transform hover:scale-105',
        colorStyles[color],
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
