import React, { useState, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Product3DModel from '../components/ui/Product3DModel';
import Badge from '../components/ui/Badge';
import { gsap } from 'gsap';
import { Filter, X, ChevronDown } from 'lucide-react';

// Sample shoes data with 3D model paths
const shoesData = [
  {
    id: 'air-max-270',  // Updated to match ProductDetail.tsx
    name: 'Nike Air Max 270',
    category: 'Men\'s Shoes',
    price: 150,
    model: '/3d-models/NikeAM270.glb',
    isNew: true,
    href: '/shoes/air-max-270',
    tags: ['Men', 'Running', 'New Arrivals']
  },
  {
    id: 'air-force-1',  // Updated to match ProductDetail.tsx
    name: 'Nike Air Force 1',
    category: 'Men\'s Shoes',
    price: 110,
    model: '/3d-models/NikeAF.glb',
    isNew: false,
    href: '/shoes/air-force-1',
    tags: ['Men', 'Lifestyle', 'Classics']
  },
  {
    id: 'shoe-3',
    name: 'Nike Zoom Pegasus 39',
    category: 'Women\'s Running Shoes',
    price: 120,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: true,
    href: '/shoes/pegasus-39',
    tags: ['Women', 'Running', 'New Arrivals']
  },
  {
    id: 'shoe-4',
    name: 'Nike Blazer Mid \'77',
    category: 'Men\'s Shoes',
    price: 100,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: false,
    href: '/shoes/blazer-mid-77',
    tags: ['Men', 'Lifestyle', 'Classics']
  },
  {
    id: 'shoe-5',
    name: 'Nike Air Zoom Alphafly',
    category: 'Men\'s Racing Shoes',
    price: 275,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: true,
    href: '/shoes/alphafly',
    tags: ['Men', 'Racing', 'New Arrivals']
  },
  {
    id: 'shoe-6',
    name: 'Nike React Infinity',
    category: 'Women\'s Running Shoes',
    price: 160,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: false,
    href: '/shoes/react-infinity',
    tags: ['Women', 'Running', 'Cushioned']
  },
  {
    id: 'shoe-7',
    name: 'Nike Air Zoom GT Jump',
    category: 'Basketball Shoes',
    price: 180,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: true,
    href: '/shoes/gt-jump',
    tags: ['Men', 'Basketball', 'New Arrivals']
  },
  {
    id: 'shoe-8',
    name: 'Nike Air Max 97',
    category: 'Men\'s Shoes',
    price: 175,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: false,
    href: '/shoes/air-max-97',
    tags: ['Men', 'Lifestyle', 'Classics']
  }
];

// Filter categories
const filterCategories = [
  {
    name: 'Gender',
    options: ['Men', 'Women', 'Kids']
  },
  {
    name: 'Category',
    options: ['Running', 'Lifestyle', 'Basketball', 'Racing', 'Training']
  },
  {
    name: 'Collection',
    options: ['New Arrivals', 'Classics', 'Cushioned']
  }
];

const Shoes = () => {
  const [shoes, setShoes] = useState(shoesData);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
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

  // Filter shoes based on active filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      setShoes(shoesData);
    } else {
      const filteredShoes = shoesData.filter(shoe => 
        activeFilters.some(filter => shoe.tags.includes(filter))
      );
      setShoes(filteredShoes);
    }
  }, [activeFilters]);

  const handleShoeClick = (shoe: typeof shoesData[0]) => {
    // Navigate to the product details page using the shoe's id
    navigate(`/shoes/${shoe.id}`);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shoes</h1>
            <p className="text-gray-600 max-w-2xl">
              From classic to cutting-edge, find the perfect Nike shoes for your style and sport.
            </p>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <button 
              className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  {activeFilters.length > 0 && (
                    <button 
                      className="text-sm text-gray-500 hover:text-nike-red transition-colors"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                {filterCategories.map((category) => (
                  <div key={category.name} className="mb-6">
                    <div 
                      className="flex items-center justify-between mb-2 cursor-pointer"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <h3 className="font-medium">{category.name}</h3>
                      <ChevronDown 
                        size={16}
                        className={`transition-transform ${
                          expandedCategories.includes(category.name) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div 
                      className={`space-y-2 transition-all duration-300 ${
                        expandedCategories.includes(category.name) ? 'max-h-60' : 'max-h-0 overflow-hidden'
                      }`}
                    >
                      {category.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input 
                            type="checkbox"
                            id={`filter-${option}`}
                            className="mr-2"
                            checked={activeFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                          />
                          <label 
                            htmlFor={`filter-${option}`}
                            className="text-sm cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Filter Menu */}
            <div 
              className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
                isFilterMenuOpen ? 'translate-y-0' : 'translate-y-full'
              } md:hidden`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setIsFilterMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                
                {activeFilters.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Active Filters</h3>
                      <button 
                        className="text-sm text-gray-500"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeFilters.map((filter) => (
                        <Badge 
                          key={filter}
                          color="gray"
                          className="flex items-center"
                        >
                          {filter}
                          <button 
                            className="ml-1"
                            onClick={() => toggleFilter(filter)}
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {filterCategories.map((category) => (
                  <div key={category.name} className="mb-6">
                    <div 
                      className="flex items-center justify-between mb-2 cursor-pointer"
                      onClick={() => toggleCategory(category.name)}
                    >
                      <h3 className="font-medium">{category.name}</h3>
                      <ChevronDown 
                        size={16}
                        className={`transition-transform ${
                          expandedCategories.includes(category.name) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div 
                      className={`space-y-2 transition-all duration-300 ${
                        expandedCategories.includes(category.name) ? 'max-h-60' : 'max-h-0 overflow-hidden'
                      }`}
                    >
                      {category.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input 
                            type="checkbox"
                            id={`mobile-filter-${option}`}
                            className="mr-2"
                            checked={activeFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                          />
                          <label 
                            htmlFor={`mobile-filter-${option}`}
                            className="text-sm cursor-pointer"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <button 
                  className="w-full py-3 bg-nike-black text-white rounded-lg"
                  onClick={() => setIsFilterMenuOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              {/* Active Filters - Desktop */}
              {activeFilters.length > 0 && (
                <div className="hidden md:block mb-6">
                  <div className="flex items-center flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                      <Badge 
                        key={filter}
                        color="gray"
                        className="flex items-center"
                      >
                        {filter}
                        <button 
                          className="ml-1"
                          onClick={() => toggleFilter(filter)}
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {shoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shoes.map((shoe) => (
                <div 
                  key={shoe.id} 
                  className="product-card group relative cursor-pointer"
                  onClick={() => handleShoeClick(shoe)}  // Add click handler
                >
                  <ErrorBoundary fallback={<div>Failed to load 3D model</div>}>
                    <div className="w-full h-64 mb-4">
                      <Product3DModel modelPath={shoe.model} />
                    </div>
                  </ErrorBoundary>
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold">{shoe.name}</h3>
                    <p className="text-gray-600">{shoe.category}</p>
                    <p className="font-bold">${shoe.price}</p>
                    {shoe.isNew && (
                      <span className="absolute top-2 right-2 bg-nike-red text-white px-2 py-1 rounded-full text-xs">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="text-lg font-medium mb-2">No matching products found</div>
                  <p className="text-gray-500 mb-6">Try adjusting your filters for more results</p>
                  <button 
                    className="px-4 py-2 bg-nike-black text-white rounded-full"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shoes;