
import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nikeLogoRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Background animation
    tl.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
    
    // Nike logo animation
    tl.fromTo(
      nikeLogoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
    
    // Content animation
    tl.fromTo(
      contentRef.current?.querySelectorAll('h1, p, .cta-buttons'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out" 
      },
      "-=0.5"
    );
    
    // Product image animation
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9, rotation: -10 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 1.2, 
        ease: "elastic.out(1, 0.5)" 
      },
      "-=0.8"
    );
    
    // Mouse parallax effect
    if (heroRef.current) {
      const heroElement = heroRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { width, height } = heroElement.getBoundingClientRect();
        
        const xPos = (clientX / width - 0.5) * 20;
        const yPos = (clientY / height - 0.5) * 20;
        
        if (nikeLogoRef.current) {
          gsap.to(nikeLogoRef.current, {
            x: xPos * 0.5,
            y: yPos * 0.5,
            duration: 1,
            ease: "power2.out"
          });
        }
        
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            x: xPos * -1,
            y: yPos * -1,
            duration: 1,
            ease: "power2.out"
          });
        }
      };
      
      heroElement.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-80"
      ></div>
      
      <div 
        ref={nikeLogoRef} 
        className="absolute right-10 top-40 opacity-0"
      >
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5132 35.2373C5.03386 41.5962 0 49.2667 0 54.4887C0 57.4293 1.88506 60.991 6.66048 60.991C10.7936 60.991 15.5691 58.8718 18.9395 56.5121C25.2984 52.2491 54.3067 29.4954 115.068 0C115.068 0 76.9088 29.6537 46.3155 47.5816C34.2172 54.3263 27.6216 56.6858 23.0115 56.6858C19.8818 56.6858 18.2012 55.006 18.2012 52.097C18.2012 48.8099 20.7955 44.7031 24.6956 41.5962L11.5132 35.2373Z" fill="rgba(0,0,0,0.8)"/>
        </svg>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 container-padding relative z-10">
        <div 
          ref={contentRef}
          className="flex flex-col justify-center"
        >
          <div className="mb-4">
            <span className="inline-block bg-nike-red text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              NEW COLLECTION
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
              <span className="block">JUST</span>
              <span className="block text-nike-red neon-text">DO IT</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Discover the latest Nike innovations, designed to help you run, jump, and achieve your athletic potential.
            </p>
            <div className="flex flex-wrap gap-4 cta-buttons">
              <Button 
                variant="primary" 
                size="lg"
                icon={<ShoppingBag size={18} />}
                iconPosition="left"
                onClick={() => navigate('/dashboard')}
                className="neon-glow"
              >
                Shop Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={() => navigate('/ar-vr')}
              >
                Try in AR
              </Button>
            </div>
          </div>
        </div>
        
        <div 
          ref={imageRef}
          className="flex items-center justify-center opacity-0"
        >
          <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-nike-red rounded-full opacity-10 animate-pulse-soft"></div>
            <img 
              src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png" 
              alt="Nike Shoes" 
              className="relative z-10 w-full h-auto transform hover:rotate-12 transition-all duration-700 animate-float"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-1">
            <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
