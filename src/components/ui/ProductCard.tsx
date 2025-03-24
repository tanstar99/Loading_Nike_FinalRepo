
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
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  image,
  isNew = false,
  href
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div 
      className="product-card group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-square">
        {isNew && (
          <div className="absolute top-4 left-4 z-10 bg-nike-red text-white text-xs px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        <button className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Heart className="w-4 h-4 text-gray-700 hover:text-nike-red transition-colors" />
        </button>
        <img 
          src={image} 
          alt={name} 
          className="product-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <h3 className="font-medium text-base mb-1 group-hover:text-nike-red transition-colors">{name}</h3>
        <div className="text-sm font-semibold">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
