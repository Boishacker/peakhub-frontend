import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: { height: '50px', width: 'auto' },
    md: { height: '80px', width: 'auto' },
    lg: { height: '100px', width: 'auto' },
  };

  return (
    <Link to="/" className={`font-bold ${className}`}>
      <span className="flex items-center">
        <img 
          src="/images/logo.png" 
          alt="PeakHub Logo" 
          style={sizeClasses[size]}
          className="mr-3 object-contain" 
        />
        
      </span>
    </Link>
  );
};

export default Logo; 