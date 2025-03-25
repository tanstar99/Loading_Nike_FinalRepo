import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ShoppingBag, Heart, Share2, RotateCcw, ZoomIn, Check } from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
import Product3DModel from '../components/ui/Product3DModel';

// Sample product data
const productData = {
  'air-max-270': {
    id: 'shoe-1',
    name: 'Nike Air Max 270',
    category: "Men's Shoes",
    price: 150,
    description: "The Nike Air Max 270 delivers a sleek design that nods to the classic Air Max lineage while adding a fresh twist with its iconic heel Air unit. Experience comfort with every step thanks to its soft foam midsole and breathable upper.",
    features: [
      'Breathable mesh upper with synthetic overlays',
      'Dual-density foam midsole',
      '270-degree Max Air heel unit',
      'Rubber outsole with custom traction pattern',
      'Pull tab at heel for easy on and off'
    ],
    colors: [
      { name: 'Black/White', value: '#000000', accent: '#ffffff' },
      { name: 'Wolf Grey/Crimson', value: '#808080', accent: '#DC143C' },
      { name: 'White/Blue', value: '#ffffff', accent: '#0000FF' },
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    mainImage: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
    model: '/3d-models/NikeAM270.glb', // Add 3D model path
    images: [
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4f37fca4-6d7e-43c1-b342-9f1d14ef0a4a/air-max-270-shoes-2V5C4p.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6a85aaa-a2f7-4ed6-b37a-91ecd6c9c459/air-max-270-shoes-2V5C4p.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0c88a900-ff99-4184-80bb-804d285822a2/air-max-270-shoes-2V5C4p.png'
    ]
  },
  'air-force-1': {
    id: 'shoe-2',
    name: 'Nike Air Force 1',
    category: "Men's Shoes",
    price: 110,
    description: "The radiance lives on in the Nike Air Force 1, a basketball original that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.",
    features: [
      'Full-grain leather upper for durability',
      'Foam midsole with encapsulated Air cushioning',
      'Perforations on the toe for breathability',
      'Non-marking rubber outsole for traction',
      'Pivot point in the forefoot and heel'
    ],
    colors: [
      { name: 'White', value: '#ffffff', accent: '#ffffff' },
      { name: 'Black', value: '#000000', accent: '#000000' },
      { name: 'University Red', value: '#ff0000', accent: '#ff0000' },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    mainImage: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    model: '/3d-models/NikeAF.glb',
    images: [
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ff53c522-09a3-46c2-b652-75493ecc0de5/air-force-1-07-shoes-WrLlWX.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7d30b089-f598-4749-92a6-269e4ef8298d/air-force-1-07-shoes-WrLlWX.png',
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5a176ae7-dc1c-46cf-a9f7-7da5739fa15f/air-force-1-07-shoes-WrLlWX.png'
    ]
  }
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [scale, setScale] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  
  const productContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Check if product exists
  const product = productId && productId in productData 
    ? productData[productId as keyof typeof productData]
    : null;

  // Handle cursor animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        gsap.to(cursorRef.current, {
          x: x,
          y: y,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        // Change cursor size based on hoverable elements
        const hoverElements = document.querySelectorAll('.hoverable');
        let isHovering = false;
        
        hoverElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
          ) {
            isHovering = true;
          }
        });
        
        if (isHovering) {
          gsap.to(cursorRef.current, {
            scale: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: '#ff5a5f',
            duration: 0.3
          });
        } else {
          gsap.to(cursorRef.current, {
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            duration: 0.3
          });
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Setup animations and scroll triggers
  useEffect(() => {
    if (!product) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animations
    const tl = gsap.timeline();
    
    if (imageRef.current && titleRef.current && detailsRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      )
      .fromTo(
        detailsRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        "-=0.6"
      );
    }
    
    // Parallax effect for product image
    if (imageRef.current && productContainerRef.current) {
      ScrollTrigger.create({
        trigger: productContainerRef.current,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(imageRef.current, {
            y: self.progress * 50,
            duration: 0.5
          });
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [product, selectedImageIndex]);

  // Handle rotation animation
  useEffect(() => {
    if (isRotating) {
      rotationInterval.current = setInterval(() => {
        setRotation(prev => (prev + 2) % 360);
      }, 50);
    } else {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    }
    
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [isRotating]);

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.8));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast("Please select a size");
      return;
    }
    
    setIsInCart(true);
    toast("Product added to cart", {
      description: `${product?.name} - Size: ${selectedSize}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart")
      },
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white cursor-none">
      <Navbar />
      
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full border-2 border-white bg-white bg-opacity-10 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      ></div>
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)} 
            className="hoverable flex items-center mb-6 text-gray-600 hover:text-nike-red transition-colors group"
          >
            <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div ref={productContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-gray-100 rounded-2xl p-8 mb-6 flex items-center justify-center h-[500px] relative">
                  {/* Replace static image with 3D model */}
                  <div 
                    ref={imageRef} 
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                    style={{ 
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                    }}
                  >
                    <Product3DModel 
                      modelPath={product.model} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        transform: `scale(${scale}) rotate(${rotation}deg)` 
                      }} 
                    />
                  </div>
                  
                  {/* 3D controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-3">
                    <button 
                      className={`hoverable bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors ${isRotating ? 'bg-nike-red text-white' : ''}`}
                      onClick={toggleRotation}
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button 
                      className="hoverable bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                      onClick={zoomIn}
                    >
                      <ZoomIn size={16} />
                    </button>
                    <button 
                      className="hoverable bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                      onClick={zoomOut}
                    >
                      <ZoomIn size={16} className="rotate-180" />
                    </button>
                  </div>
                </div>
                
                {/* Thumbnail gallery */}
                <div className="flex space-x-3 justify-center">
                  {product.images.map((image, index) => (
                    <button 
                      key={index}
                      className={`hoverable w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                        ${selectedImageIndex === index ? 'border-nike-red ring-2 ring-red-200' : 'border-transparent'}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product details */}
            <div ref={detailsRef}>
              <div className="animate-item">
                <Badge color="red" className="mb-4">
                  {product.category}
                </Badge>
                <h1 ref={titleRef} className="text-4xl font-bold mb-2">
                  {product.name}
                </h1>
                <div className="text-xl font-semibold mb-6">${product.price.toFixed(2)}</div>
              </div>
              
              <div className="prose max-w-none mb-8 animate-item">
                <p>{product.description}</p>
              </div>
              
              {/* Color selection */}
              <div className="mb-8 animate-item">
                <h3 className="font-semibold mb-3">Select Color:</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`hoverable w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        selectedColor === index ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(index)}
                    >
                      {selectedColor === index && (
                        <Check size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size selection */}
              <div className="mb-8 animate-item">
                <h3 className="font-semibold mb-3">Select Size:</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`hoverable py-3 rounded-md border text-center transition-all
                        ${selectedSize === size 
                          ? 'border-nike-red bg-red-50 text-nike-red' 
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-8 animate-item">
                <h3 className="font-semibold mb-3">Features:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Checkbox options */}
              <div className="flex items-center space-x-2 mb-8 animate-item">
                <Checkbox id="notify" />
                <label
                  htmlFor="notify"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hoverable"
                >
                  Notify me when price drops
                </label>
              </div>
              
              {/* Add to cart button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-item">
                <Button 
                  variant={isInCart ? "outline" : "primary"}
                  size="lg"
                  className="flex-grow hoverable"
                  icon={isInCart ? <Check size={18} /> : <ShoppingBag size={18} />}
                  iconPosition="left"
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <Button 
                  variant="outline" 
                  className="hoverable"
                  icon={<Heart size={18} />}
                  onClick={() => toast("Added to Favorites")}
                >
                  Favorite
                </Button>
                <Button 
                  variant="outline" 
                  className="hoverable"
                  icon={<Share2 size={18} />}
                  onClick={() => toast("Share link copied to clipboard")}
                >
                  Share
                </Button>
              </div>
              
              {/* Try in AR button */}
              <div className="animate-item mb-8">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full hoverable"
                  onClick={() => navigate('/ar-vr')}
                >
                  Try in AR/VR Mode
                </Button>
              </div>
              
              {/* Additional details and policies */}
              <div className="text-sm text-gray-500 animate-item">
                <p className="mb-2">Free shipping on orders over $75</p>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
