import React from 'react';
import { cn } from './utils';

export const Dialog = ({ children, open, onClose }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
          {children}
        </div>
      </div>
    </div>
  );
};
export const DialogFooter = ({ children, className }) => (
  <div className={cn("mt-4 flex justify-end", className)}>
    {children}
  </div>
);
export const DialogContent = ({ children, className }) => (
  <div className={cn("mt-4", className)}>
    {children}
  </div>
);

export const DialogHeader = ({ children, className }) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

export const DialogTitle = ({ children, className }) => (
  <h3 className={cn("text-lg font-medium text-gray-900", className)}>
    {children}
  </h3>
);

export const DialogDescription = ({ children, className }) => (
  <p className={cn("text-sm text-gray-500 mt-2", className)}>
    {children}
  </p>

);