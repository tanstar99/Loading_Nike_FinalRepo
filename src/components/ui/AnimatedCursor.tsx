
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedCursorProps {
  color?: string;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  outerScale?: number;
  innerScale?: number;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  color = '#ff5a5f',
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 30,
  outerScale = 1.5,
  innerScale = 0.7
}) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  
  const mousePosRef = useRef({ x: 0, y: 0 });
  const mouseLastPosRef = useRef({ x: 0, y: 0 });
  const isVisible = useRef<boolean>(false);
  
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };
    
    const onMouseDown = () => {
      gsap.to(cursorInnerRef.current, {
        scale: innerScale,
        duration: 0.25
      });
      gsap.to(cursorOuterRef.current, {
        scale: outerScale,
        duration: 0.25
      });
    };
    
    const onMouseUp = () => {
      gsap.to(cursorInnerRef.current, {
        scale: 1,
        duration: 0.25
      });
      gsap.to(cursorOuterRef.current, {
        scale: 1,
        duration: 0.25
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursorInnerRef.current, {
        opacity: 1,
        duration: 0.3
      });
      gsap.to(cursorOuterRef.current, {
        opacity: 1,
        duration: 0.3
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursorInnerRef.current, {
        opacity: 0,
        duration: 0.3
      });
      gsap.to(cursorOuterRef.current, {
        opacity: 0,
        duration: 0.3
      });
      isVisible.current = false;
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Track hoverable elements
    const onElementMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('hoverable')) {
        gsap.to(cursorInnerRef.current, {
          scale: innerScale,
          duration: 0.3
        });
        gsap.to(cursorOuterRef.current, {
          scale: outerScale,
          duration: 0.3,
          backgroundColor: color,
          opacity: outerAlpha,
        });
      }
    };
    
    const onElementMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('hoverable')) {
        gsap.to(cursorInnerRef.current, {
          scale: 1,
          duration: 0.3
        });
        gsap.to(cursorOuterRef.current, {
          scale: 1,
          duration: 0.3,
          backgroundColor: 'transparent',
          opacity: outerAlpha
        });
      }
    };
    
    // Add event delegation for hoverable elements
    document.addEventListener('mouseover', onElementMouseEnter);
    document.addEventListener('mouseout', onElementMouseLeave);
    
    // Animation loop
    const animateCursor = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        // Smooth animation using lerp (linear interpolation)
        mouseLastPosRef.current.x += (mousePosRef.current.x - mouseLastPosRef.current.x) * 0.2;
        mouseLastPosRef.current.y += (mousePosRef.current.y - mouseLastPosRef.current.y) * 0.2;
        
        if (cursorInnerRef.current) {
          cursorInnerRef.current.style.transform = `translate3d(${mouseLastPosRef.current.x}px, ${mouseLastPosRef.current.y}px, 0)`;
        }
        
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.transform = `translate3d(${mouseLastPosRef.current.x - outerSize/2}px, ${mouseLastPosRef.current.y - outerSize/2}px, 0)`;
        }
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);
    
    // Clean up
    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onElementMouseEnter);
      document.removeEventListener('mouseout', onElementMouseLeave);
    };
  }, [color, innerScale, outerAlpha, outerScale, outerSize]);

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border border-white mix-blend-difference opacity-0"
        style={{
          width: outerSize,
          height: outerSize,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 bg-white mix-blend-difference opacity-0"
        style={{
          width: innerSize,
          height: innerSize,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </>
  );
};

export default AnimatedCursor;
