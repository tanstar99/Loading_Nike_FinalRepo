
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Nike Air Max Plus',
    category: 'Men\'s Shoes',
    price: 199,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
    isNew: true,
    href: '/shoes/air-max-270',
    bgColor: 'bg-nike-vibrant-red'
  },
  {
    id: '2',
    name: 'Nike Tech Fleece',
    category: 'Men\'s Shoes',
    price: 129,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-vintage-shoes-CBDjT0.png',
    isNew: false,
    href: '/shoes/blazer-mid-77',
    bgColor: 'bg-nike-vibrant-teal'
  },
  {
    id: '3',
    name: 'Nike Pro Elite',
    category: 'Women\'s Running Shoes',
    price: 159,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e8e530a1-0c8a-4a9e-9bd0-9e2b5ffe28fd/pegasus-39-road-running-shoes-kmZSD6.png',
    isNew: true,
    href: '/shoes/pegasus-39',
    bgColor: 'bg-nike-vibrant-green'
  }
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.add('animate-fade-in');
          }
          if (productsRef.current) {
            productsRef.current.classList.add('animate-fade-in');
            
            // Animate each product with delay
            const products = productsRef.current.querySelectorAll('.product-item');
            products.forEach((product, index) => {
              setTimeout(() => {
                product.classList.add('animate-scale-in');
              }, 200 * index);
            });
          }
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleProductClick = (href: string) => {
    navigate(href);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto container-padding">
        <div ref={titleRef} className="mb-12 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Featured</span> 
            <span className="text-nike-vibrant-pink ml-2">Products</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Discover our latest innovations, designed to help you achieve your potential
          </p>
        </div>
        
        <div 
          ref={productsRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0"
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-item opacity-0 cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => handleProductClick(product.href)}
            >
              <div className={`${product.bgColor} p-6 h-full flex flex-col`}>
                <div className="aspect-square overflow-hidden flex items-center justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image w-4/5 h-4/5 object-contain transition-all duration-500 hover:scale-110"
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="font-bold text-xl mb-1 text-white">{product.name}</h3>
                  <div className="text-xl font-bold text-white">${product.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
