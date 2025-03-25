
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { gsap } from 'gsap';

// Sample shirts data
const shirtsData = [
  {
    id: 'shirt-1',
    name: 'Nike Art-Tee',
    category: 'Men\'s Running Shirt',
    price: 90,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/dri-fit-adv-running-shirt-H3Klr9.png',
    isNew: false,
    href: '/shirts/dri-fit-adv'
  },
  {
    id: 'shirt-2',
    name: 'Nike Sportswear Tech Fleece',
    category: 'Men\'s Hoodie',
    price: 110,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0e103920-0d3d-4a05-9a1f-6c855f5e1210/sportswear-tech-fleece-hoodie-pcjXJm.png',
    isNew: false,
    href: '/shirts/tech-fleece'
  },
  {
    id: 'shirt-3',
    name: 'Nike Sportswear Club',
    category: 'Men\'s T-Shirt',
    price: 25,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/qwqbj87gfbwespndwfti/sportswear-club-t-shirt-DvWfXG.png',
    isNew: false,
    href: '/shirts/club-tshirt'
  },
  {
    id: 'shirt-4',
    name: 'Nike Dri-FIT One',
    category: 'Women\'s Tank',
    price: 35,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a402ac0d-6506-44af-b684-ba60f94b7078/dri-fit-one-standard-fit-tank-n0ptps.png',
    isNew: true,
    href: '/shirts/dri-fit-one'
  }
];

const Shirts = () => {
  const [shirts, setShirts] = useState(shirtsData);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shirts & Apparel</h1>
            <p className="text-gray-600 max-w-2xl">
              Performance wear designed for comfort, style, and athletic excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shirts.map((shirt) => (
              <div key={shirt.id} className="product-card">
                <ProductCard
                  id={shirt.id}
                  name={shirt.name}
                  category={shirt.category}
                  price={shirt.price}
                  image={shirt.image}
                  isNew={shirt.isNew}
                  href={shirt.href}
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

export default Shirts;
