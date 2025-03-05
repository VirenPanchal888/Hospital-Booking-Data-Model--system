
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TransitionProps {
  show: boolean;
  appear?: boolean;
  children: React.ReactNode;
  className?: string;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export function Transition({
  show,
  appear = false,
  children,
  className,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
}: TransitionProps) {
  const [isShowing, setIsShowing] = useState(appear ? false : show);
  const [classes, setClasses] = useState('');

  useEffect(() => {
    let mounted = true;
    if (show) {
      setIsShowing(true);
      setClasses(cn(enter, enterFrom));
      
      const enterTimer = setTimeout(() => {
        if (mounted) {
          setClasses(cn(enter, enterTo));
        }
      }, 10);
      
      return () => {
        mounted = false;
        clearTimeout(enterTimer);
      };
    } else {
      setClasses(cn(leave, leaveFrom));
      
      const leaveTimer = setTimeout(() => {
        if (mounted) {
          setClasses(cn(leave, leaveTo));
        }
      }, 10);
      
      const hideTimer = setTimeout(() => {
        if (mounted) {
          setIsShowing(false);
        }
      }, 300); // Match this with your transition duration
      
      return () => {
        mounted = false;
        clearTimeout(leaveTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [show, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo]);

  return isShowing ? (
    <div className={cn(className, classes)}>
      {children}
    </div>
  ) : null;
}
