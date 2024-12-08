import React from 'react';
import { cn } from './utils';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        "text-sm font-medium transition-colors",
        "px-4 py-2 disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';