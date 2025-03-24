
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import Badge from '../components/ui/Badge';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample product data
const productCategories = [
  {
    id: 'shoes',
    name: 'Shoes',
    items: [
      {
        id: 'shoe-1',
        name: 'Nike Air Max 270',
        category: 'Men\'s Shoes',
        price: 150,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
        isNew: true,
        href: '/shoes/air-max-270'
      },
      {
        id: 'shoe-2',
        name: 'Nike Air Force 1',
        category: 'Men\'s Shoes',
        price: 110,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
        isNew: false,
        href: '/shoes/air-force-1'
      },
      {
        id: 'shoe-3',
        name: 'Nike Zoom Pegasus 39',
        category: 'Women\'s Running Shoes',
        price: 120,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e8e530a1-0c8a-4a9e-9bd0-9e2b5ffe28fd/pegasus-39-road-running-shoes-kmZSD6.png',
        isNew: true,
        href: '/shoes/pegasus-39'
      },
      {
        id: 'shoe-4',
        name: 'Nike Blazer Mid \'77',
        category: 'Men\'s Shoes',
        price: 100,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-vintage-shoes-CBDjT0.png',
        isNew: false,
        href: '/shoes/blazer-mid-77'
      }
    ]
  },
  {
    id: 'shirts',
    name: 'Shirts',
    items: [
      {
        id: 'shirt-1',
        name: 'Nike Dri-FIT ADV',
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
      }
    ]
  },
  {
    id: 'bottles',
    name: 'Bottles',
    items: [
      {
        id: 'bottle-1',
        name: 'Nike 32 oz Bottle',
        category: 'Training Bottle',
        price: 25,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/bd6b5d65-6754-4c54-a46a-f4ce761b87f1/32-oz-tr-hypercharge-straw-bottle-Fn14SW.png',
        isNew: true,
        href: '/bottles/hypercharge'
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    items: [
      {
        id: 'acc-1',
        name: 'Nike Everyday Plus',
        category: 'Cushioned Crew Socks',
        price: 18,
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7abcf15a-5665-41e3-81b5-f0c7df914ca4/everyday-plus-cushioned-crew-socks-L9l3Kq.png',
        isNew: false,
        href: '/accessories/socks'
      }
    ]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation when the page loads
    const tl = gsap.timeline();
    tl.fromTo(
      pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Add scroll animations for each category
    productCategories.forEach((category, index) => {
      const categoryEl = document.getElementById(`category-${category.id}`);
      if (categoryEl) {
        gsap.fromTo(
          categoryEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            scrollTrigger: {
              trigger: categoryEl,
              start: 'top 80%',
            }
          }
        );
      }
    });

    // Clean up ScrollTrigger when component unmounts
    return () => {
      gsap.killTweensOf(pageRef.current);
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Products</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore our collection of premium footwear, apparel, and accessories designed
              for performance and style.
            </p>
          </div>
          
          {productCategories.map((category) => (
            <div 
              key={category.id}
              id={`category-${category.id}`}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <button 
                  className="flex items-center text-sm font-medium text-nike-black hover:text-nike-red transition-colors"
                  onClick={() => navigate(`/${category.id}`)}
                >
                  View All <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    image={product.image}
                    isNew={product.isNew}
                    href={product.href}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
