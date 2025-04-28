import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'button' | 'plain';
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ 
  to, 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  const baseStyles = 'transition-colors';
  
  const variants = {
    default: 'text-slate-800 hover:text-slate-600 font-medium',
    button: 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium bg-slate-800 text-white hover:bg-slate-700',
    plain: ''
  };
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // In a real app, we would use a router's navigation.
    // For this demo, we'll just prevent the default behavior.
    e.preventDefault();
    
    // In a real app with a router:
    // navigate(to);
    
    console.log(`Navigating to: ${to}`);
  };
  
  return (
    <a 
      href={to} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};