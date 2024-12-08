import React from 'react';
import { cn } from './utils';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-gray-300 px-3 py-2",
        "text-sm focus:border-green-500 focus:ring-green-500",
        "placeholder:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';