
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import CustomerReviews from '../components/sections/CustomerReviews';
import NikeHistory from '../components/sections/NikeHistory';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import { ArrowRight, Rocket } from 'lucide-react';
import AnimatedCursor from '../components/ui/AnimatedCursor';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();
  const textLinesRef = useRef<HTMLDivElement>(null);
  const interactiveSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation when the page loads
    const tl = gsap.timeline();
    tl.to('body', { opacity: 1, duration: 0.5 });

    // Animate text lines with a split text effect
    if (textLinesRef.current) {
      const words = textLinesRef.current.querySelectorAll('.word');
      gsap.set(words, { y: 50, opacity: 0 });
      
      gsap.to(words, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textLinesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Animation for scroll-triggered elements
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate cards in interactive section
    if (interactiveSectionRef.current) {
      const cards = interactiveSectionRef.current.querySelectorAll('.card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: interactiveSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Parallax effect for CTA section
    if (ctaSectionRef.current) {
      gsap.fromTo(
        ctaSectionRef.current,
        { backgroundPosition: '50% 0%' },
        {
          backgroundPosition: '50% 20%',
          ease: "none",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedCursor />
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Announcement Banner */}
        <div className="bg-gradient-to-r from-nike-black to-gray-800 text-white py-3 px-6 text-center">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Badge color="red" pulse>NEW</Badge>
            <p className="text-sm sm:text-base">Experience our products in AR/VR mode!</p>
            <button 
              className="hoverable text-sm font-medium underline flex items-center hover:text-nike-red transition-colors"
              onClick={() => navigate('/ar-vr')}
            >
              Try Now <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
        
        <FeaturedProducts />
        
        {/* Animated Text Section */}
        <section className="py-16 bg-nike-black text-white overflow-hidden">
          <div className="container mx-auto text-center container-padding">
            <div ref={textLinesRef} className="mb-12">
              <div className="overflow-hidden mb-2">
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold">Unleash</span>{' '}
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold">your</span>{' '}
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-nike-red">potential</span>
              </div>
              <div className="overflow-hidden mb-2">
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold">with</span>{' '}
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold">Nike</span>{' '}
                <span className="word inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-nike-red">innovation</span>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="hoverable"
              onClick={() => navigate('/dashboard')}
            >
              Explore Collection
            </Button>
          </div>
        </section>
        
        {/* Interactive Feature Section */}
        <section ref={interactiveSectionRef} className="py-24 bg-gradient-to-b from-white to-gray-100 animate-section">
          <div className="container mx-auto text-center container-padding">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Pushing Boundaries in Sport</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hoverable">
                <div className="bg-nike-red h-16 w-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                  <Rocket size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">Pushing the boundaries of what's possible in athletic footwear and apparel.</p>
              </div>
              
              <div className="card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hoverable">
                <div className="bg-nike-black h-16 w-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Performance</h3>
                <p className="text-gray-600">Designed for athletes who demand the very best from their equipment.</p>
              </div>
              
              <div className="card bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hoverable">
                <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-gray-600">Creating products with the planet in mind, reducing our environmental footprint.</p>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="mx-auto hoverable"
            >
              Explore Technology
            </Button>
          </div>
        </section>
        
        <CustomerReviews />
        <NikeHistory />
        
        {/* CTA Section with parallax */}
        <section 
          ref={ctaSectionRef} 
          className="py-20 text-white animate-section relative"
          style={{
            backgroundImage: 'url(https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/fd21b157-7d10-4ed5-855a-c9f6fa582bdf/nike-just-do-it.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="container mx-auto text-center container-padding relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future of Sport?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Join us on a journey of innovation, style, and performance.
              Discover products that help you reach your full potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="hoverable"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/ar-vr')}
                className="text-white border-white hover:bg-white hover:text-nike-black hoverable"
              >
                Try in AR
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
