
import React, { useEffect } from 'react';
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initial animation when the page loads
    const tl = gsap.timeline();
    tl.to('body', { opacity: 1, duration: 0.5 });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <CustomerReviews />
        <NikeHistory />
        
        {/* CTA Section */}
        <section className="py-20 bg-nike-black text-white">
          <div className="container mx-auto text-center container-padding">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future of Sport?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Join us on a journey of innovation, style, and performance.
              Discover products that help you reach your full potential.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="mx-auto"
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
