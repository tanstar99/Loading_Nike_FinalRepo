
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { gsap } from 'gsap';

// Sample bottles data
const bottlesData = [
  {
    id: 'bottle-1',
    name: 'Nike 32 oz Bottle',
    category: 'Training Bottle',
    price: 25,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/bd6b5d65-6754-4c54-a46a-f4ce761b87f1/32-oz-tr-hypercharge-straw-bottle-Fn14SW.png',
    isNew: true,
    href: '/bottles/hypercharge'
  },
  {
    id: 'bottle-2',
    name: 'Nike 24 oz Water Bottle',
    category: 'Training Equipment',
    price: 20,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7b04adde-0014-499c-9de2-df6e87434234/24oz-tr-hypercharge-chug-bottle-NfnQ7V.png',
    isNew: false,
    href: '/bottles/hypercharge-chug'
  },
  {
    id: 'bottle-3',
    name: 'Nike Fuel Jug',
    category: 'Training Equipment',
    price: 35,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b9c94eb5-31ab-4de6-b31e-c4f206e9b4e1/64oz-fuel-jug-HMWhbz.png',
    isNew: false,
    href: '/bottles/fuel-jug'
  }
];

const Bottles = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initial animation when the page loads
    const tl = gsap.timeline();
    tl.fromTo(
      pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Animate the product grid
    const productCards = document.querySelectorAll('.product-card');
    gsap.fromTo(
      productCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
      }
    );

    return () => {
      gsap.killTweensOf(pageRef.current);
      gsap.killTweensOf(productCards);
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bottles & Hydration</h1>
            <p className="text-gray-600 max-w-2xl">
              Stay hydrated and perform at your best with Nike's range of water bottles and hydration products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottlesData.map((bottle) => (
              <div key={bottle.id} className="product-card">
                <ProductCard
                  id={bottle.id}
                  name={bottle.name}
                  category={bottle.category}
                  price={bottle.price}
                  image={bottle.image}
                  isNew={bottle.isNew}
                  href={bottle.href}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bottles;
