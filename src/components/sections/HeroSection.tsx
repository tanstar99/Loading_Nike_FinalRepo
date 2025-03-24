
import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (contentRef.current) {
            contentRef.current.classList.add('animate-slide-in-left');
          }
          if (imageRef.current) {
            imageRef.current.classList.add('animate-slide-in-right');
          }
        }
      });
    }, { threshold: 0.1 });

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-80"></div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 container-padding relative z-10">
        <div 
          ref={contentRef}
          className="flex flex-col justify-center opacity-0"
        >
          <div className="mb-4">
            <span className="inline-block bg-nike-red text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              NEW COLLECTION
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
              <span className="block">JUST</span>
              <span className="block">DO IT</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Discover the latest Nike innovations, designed to help you run, jump, and achieve your athletic potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={() => navigate('/dashboard')}
              >
                Explore Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg"
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
