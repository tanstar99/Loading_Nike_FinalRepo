
import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
}

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
  onIntersect
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isFullyInView, setIsFullyInView] = useState(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
          
          // Element is fully in view when the intersection ratio is 1
          setIsFullyInView(entry.intersectionRatio >= 1);
          
          if (entry.isIntersecting && onIntersect) {
            onIntersect();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [root, rootMargin, threshold, onIntersect]);

  return { targetRef, isIntersecting, isFullyInView };
};

export default useIntersectionObserver;
