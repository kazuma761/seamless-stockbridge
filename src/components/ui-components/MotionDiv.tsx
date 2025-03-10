
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideInRight';
}

const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  delay = 0,
  animation = 'fadeIn'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  const animationClass = {
    fadeIn: 'opacity-0 animate-fadeIn',
    slideUp: 'opacity-0 translate-y-4 animate-slideUp',
    slideInRight: 'opacity-0 translate-x-4 animate-slideInRight'
  }[animation];

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible ? animationClass : 'opacity-0',
        'transition-all duration-700 ease-out'
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};

export default MotionDiv;
