import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
}

export type { CardProps };
