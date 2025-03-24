
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import Badge from '../components/ui/Badge';
import { gsap } from 'gsap';
import { Filter, X, ChevronDown } from 'lucide-react';

// Sample shoes data
const shoesData = [
  {
    id: 'shoe-1',
    name: 'Nike Air Max 270',
    category: 'Men\'s Shoes',
    price: 150,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
    isNew: true,
    href: '/shoes/air-max-270',
    tags: ['Men', 'Running', 'New Arrivals']
  },
  {
    id: 'shoe-2',
    name: 'Nike Air Force 1',
    category: 'Men\'s Shoes',
    price: 110,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
    isNew: false,
    href: '/shoes/air-force-1',
    tags: ['Men', 'Lifestyle', 'Classics']
  },
  {
    id: 'shoe-3',
    name: 'Nike Zoom Pegasus 39',
    category: 'Women\'s Running Shoes',
    price: 120,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e8e530a1-0c8a-4a9e-9bd0-9e2b5ffe28fd/pegasus-39-road-running-shoes-kmZSD6.png',
    isNew: true,
    href: '/shoes/pegasus-39',
    tags: ['Women', 'Running', 'New Arrivals']
  },
  {
    id: 'shoe-4',
    name: 'Nike Blazer Mid \'77',
    category: 'Men\'s Shoes',
    price: 100,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/blazer-mid-77-vintage-shoes-CBDjT0.png',
    isNew: false,
    href: '/shoes/blazer-mid-77',
    tags: ['Men', 'Lifestyle', 'Classics']
  },
  {
    id: 'shoe-5',
    name: 'Nike Air Zoom Alphafly',
    category: 'Men\'s Racing Shoes',
    price: 275,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c0684c21-7760-4a9d-9a75-67a351e988e3/air-zoom-alphafly-next-2-road-racing-shoes-jDXSks.png',
    isNew: true,
    href: '/shoes/alphafly',
    tags: ['Men', 'Racing', 'New Arrivals']
  },
  {
    id: 'shoe-6',
    name: 'Nike React Infinity',
    category: 'Women\'s Running Shoes',
    price: 160,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c1d66374-abb1-4656-9b27-f469bd1d3160/react-infinity-3-road-running-shoes-XZ3NrZ.png',
    isNew: false,
    href: '/shoes/react-infinity',
    tags: ['Women', 'Running', 'Cushioned']
  },
  {
    id: 'shoe-7',
    name: 'Nike Air Zoom GT Jump',
    category: 'Basketball Shoes',
    price: 180,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/32e90300-63f1-4e6d-8793-e2a88698fe0a/air-zoom-gt-jump-basketball-shoes-lcFXqB.png',
    isNew: true,
    href: '/shoes/gt-jump',
    tags: ['Men', 'Basketball', 'New Arrivals']
  },
  {
    id: 'shoe-8',
    name: 'Nike Air Max 97',
    category: 'Men\'s Shoes',
    price: 175,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4b079271-7f28-4c94-9503-ec76255ed16e/air-max-97-shoes-jDlcQ2.png',
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
                    <div key={shoe.id} className="product-card">
                      <ProductCard
                        id={shoe.id}
                        name={shoe.name}
                        category={shoe.category}
                        price={shoe.price}
                        image={shoe.image}
                        isNew={shoe.isNew}
                        href={shoe.href}
                      />
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
