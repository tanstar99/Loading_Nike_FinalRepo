
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, RotateCcw, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';

interface ProductCard3DProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  href: string;
  bgColor?: string;
}

const ProductCard3D: React.FC<ProductCard3DProps> = ({
  id,
  name,
  category,
  price,
  image,
  isNew = false,
  href,
  bgColor = 'bg-gradient-to-br from-gray-900 to-black'
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [scale, setScale] = useState(1);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    if (!isRotating) {
      navigate(href);
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !isRotating) {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };
  
  const handleCardMouseLeave = () => {
    if (cardRef.current && !isRotating) {
      gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

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

  const toggleRotation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(!isRotating);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.1, 0.8));
  };

  return (
    <div 
      ref={cardRef}
      className="product-card group cursor-pointer perspective-1000 transform-style-3d hoverable"
      onClick={handleClick}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
    >
      <div className={`relative overflow-hidden aspect-square ${bgColor}`}>
        {isNew && (
          <div className="absolute top-4 left-4 z-10 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            className="bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hoverable"
            onClick={(e) => {
              e.stopPropagation();
              // Add to favorites logic
            }}
          >
            <Heart className="w-4 h-4 text-gray-700 hover:text-nike-vibrant-red transition-colors" />
          </button>
          <button 
            className={`bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hoverable ${isRotating ? 'bg-nike-vibrant-red text-white' : ''}`}
            onClick={toggleRotation}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            className="bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hoverable"
            onClick={zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            className="bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hoverable"
            onClick={zoomOut}
          >
            <ZoomIn className="w-4 h-4 rotate-180" />
          </button>
        </div>
        <div className="flex items-center justify-center h-full p-6">
          <img 
            src={image} 
            alt={name} 
            className="product-image w-4/5 h-4/5 object-contain transition-all duration-300 hoverable"
            style={{ 
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4 bg-black">
        <div className="text-xs text-gray-400 mb-1">{category}</div>
        <h3 className="font-medium text-base mb-1 text-white group-hover:text-nike-vibrant-red transition-colors">{name}</h3>
        <div className="text-sm font-semibold text-white">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard3D;
