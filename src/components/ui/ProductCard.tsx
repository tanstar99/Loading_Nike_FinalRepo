
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  href: string;
  bgColor?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
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

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div 
      className="product-card group cursor-pointer overflow-hidden rounded-2xl"
      onClick={handleClick}
    >
      <div className={`${bgColor} h-full flex flex-col`}>
        <div className="relative overflow-hidden aspect-square p-6 flex items-center justify-center">
          {isNew && (
            <div className="absolute top-4 left-4 z-10 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </div>
          )}
          <button className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Heart className="w-4 h-4 text-black hover:text-nike-vibrant-red transition-colors" />
          </button>
          <img 
            src={image} 
            alt={name} 
            className="product-image w-4/5 h-4/5 object-contain"
          />
        </div>
        <div className="p-4 mt-auto">
          <div className="text-xs text-gray-300 mb-1">{category}</div>
          <h3 className="font-bold text-base mb-1 text-white group-hover:text-white transition-colors">{name}</h3>
          <div className="text-sm font-bold text-white">${price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
