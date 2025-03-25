import React, { useState, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Filter, X, ChevronDown } from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Product3DModel from '../components/ui/Product3DModel';
import Badge from '../components/ui/Badge';

// Sample shirts data with 3D model paths
const shirtsData = [
  {
    id: 'nike-art-tee',
    name: 'Nike Art-Tee',
    category: 'Men\'s Running Shirt',
    price: 90,
    model: '/3d-models/NikeTee.glb', // Add 3D model path
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ed291e67-4618-49ec-8dda-2c2221a5df41/dri-fit-adv-running-shirt-H3Klr9.png',
    isNew: false,
    href: '/shirts/dri-fit-adv',
    tags: ['Men', 'Running', 'Performance']
  },
  {
    id: 'tech-fleece-hoodie',
    name: 'Nike Sportswear Tech Fleece',
    category: 'Men\'s Hoodie',
    price: 110,
    // model: '/3d-models/TechFleeceHoodie.glb',
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0e103920-0d3d-4a05-9a1f-6c855f5e1210/sportswear-tech-fleece-hoodie-pcjXJm.png',
    isNew: false,
    href: '/shirts/tech-fleece',
    tags: ['Men', 'Lifestyle', 'Fleece']
  },
  {
    id: 'sportswear-club',
    name: 'Nike Sportswear Club',
    category: 'Men\'s T-Shirt',
    price: 25,
    // model: '/3d-models/SportswearClub.glb',
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/qwqbj87gfbwespndwfti/sportswear-club-t-shirt-DvWfXG.png',
    isNew: false,
    href: '/shirts/club-tshirt',
    tags: ['Men', 'Casual', 'Basics']
  },
  {
    id: 'dri-fit-one',
    name: 'Nike Dri-FIT One',
    category: 'Women\'s Tank',
    price: 35,
    // model: '/3d-models/DriFitOne.glb',
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a402ac0d-6506-44af-b684-ba60f94b7078/dri-fit-one-standard-fit-tank-n0ptps.png',
    isNew: true,
    href: '/shirts/dri-fit-one',
    tags: ['Women', 'Training', 'New Arrivals']
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
    options: ['Running', 'Lifestyle', 'Training', 'Performance', 'Casual']
  },
  {
    name: 'Collection',
    options: ['New Arrivals', 'Basics', 'Fleece']
  }
];

const Shirts = () => {
  const [shirts, setShirts] = useState(shirtsData);
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

  // Filter shirts based on active filters
  useEffect(() => {
    if (activeFilters.length === 0) {
      setShirts(shirtsData);
    } else {
      const filteredShirts = shirtsData.filter(shirt => 
        activeFilters.some(filter => shirt.tags.includes(filter))
      );
      setShirts(filteredShirts);
    }
  }, [activeFilters]);

  const handleShirtClick = (shirt: typeof shirtsData[0]) => {
    // Navigate to the product details page using the shirt's id
    navigate(`/shirts/${shirt.id}`);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shirts & Apparel</h1>
            <p className="text-gray-600 max-w-2xl">
              Performance wear designed for comfort, style, and athletic excellence.
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
              
              {shirts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {shirts.map((shirt) => (
                    <div 
                      key={shirt.id} 
                      className="product-card group relative cursor-pointer"
                      onClick={() => handleShirtClick(shirt)}
                    >
                      <ErrorBoundary fallback={<div>Failed to load 3D model</div>}>
                        <div className="w-full h-64 mb-4">
                          <Product3DModel modelPath={shirt.model} />
                        </div>
                      </ErrorBoundary>
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold">{shirt.name}</h3>
                        <p className="text-gray-600">{shirt.category}</p>
                        <p className="font-bold">${shirt.price.toFixed(2)}</p>
                        {shirt.isNew && (
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

export default Shirts;