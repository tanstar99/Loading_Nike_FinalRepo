
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { gsap } from 'gsap';

// Sample accessories data
const accessoriesData = [
  {
    id: 'acc-1',
    name: 'Nike Everyday Plus',
    category: 'Cushioned Crew Socks',
    price: 18,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7abcf15a-5665-41e3-81b5-f0c7df914ca4/everyday-plus-cushioned-crew-socks-L9l3Kq.png',
    isNew: false,
    href: '/accessories/socks'
  },
  {
    id: 'acc-2',
    name: 'Nike Heritage',
    category: 'Hip Pack',
    price: 35,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ptzfumvtjfkqezfpvjnt/heritage-hip-pack-Z0r12r.png',
    isNew: true,
    href: '/accessories/hip-pack'
  },
  {
    id: 'acc-3',
    name: 'Nike Pro',
    category: 'Wrist Wraps 2.0',
    price: 25,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9cbfd6d6-55d6-4916-8e3e-fb5d81e53ebd/pro-wrist-wraps-2-cLc2Rz.png',
    isNew: false,
    href: '/accessories/wrist-wraps'
  },
  {
    id: 'acc-4',
    name: 'Nike Structured Training',
    category: 'Fitness Gloves',
    price: 30,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/49c77608-ef70-4cca-a3c5-2a0b3e698100/structured-training-gloves-rjTW0m.png',
    isNew: true,
    href: '/accessories/training-gloves'
  }
];

const Accessories = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessories</h1>
            <p className="text-gray-600 max-w-2xl">
              Complete your athletic kit with Nike accessories designed for performance and style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accessoriesData.map((accessory) => (
              <div key={accessory.id} className="product-card">
                <ProductCard
                  id={accessory.id}
                  name={accessory.name}
                  category={accessory.category}
                  price={accessory.price}
                  image={accessory.image}
                  isNew={accessory.isNew}
                  href={accessory.href}
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

export default Accessories;
