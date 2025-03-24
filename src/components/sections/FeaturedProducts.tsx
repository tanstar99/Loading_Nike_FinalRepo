
import React, { useRef, useEffect } from 'react';
import ProductCard from '../ui/ProductCard';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    category: 'Men\'s Shoes',
    price: 150,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
    isNew: true,
    href: '/shoes/air-max-270'
  },
  {
    id: '2',
    name: 'Nike Dri-FIT ADV',
    category: 'Men\'s Running Shirt',
    price: 90,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/dri-fit-adv-running-shirt-H3Klr9.png',
    isNew: false,
    href: '/shirts/dri-fit-adv'
  },
  {
    id: '3',
    name: 'Nike Zoom Pegasus 39',
    category: 'Women\'s Running Shoes',
    price: 120,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e8e530a1-0c8a-4a9e-9bd0-9e2b5ffe28fd/pegasus-39-road-running-shoes-kmZSD6.png',
    isNew: true,
    href: '/shoes/pegasus-39'
  },
  {
    id: '4',
    name: 'Nike Sportswear Tech Fleece',
    category: 'Men\'s Hoodie',
    price: 110,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0e103920-0d3d-4a05-9a1f-6c855f5e1210/sportswear-tech-fleece-hoodie-pcjXJm.png',
    isNew: false,
    href: '/shirts/tech-fleece'
  }
];

const FeaturedProducts = () => {
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

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto container-padding">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest innovations, designed to help you achieve your potential
          </p>
        </div>
        
        <div 
          ref={productsRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0"
        >
          {products.map((product) => (
            <div key={product.id} className="product-item opacity-0">
              <ProductCard
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                image={product.image}
                isNew={product.isNew}
                href={product.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
