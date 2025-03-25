
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, Smartphone, RotateCcw, ZoomIn, Eye } from 'lucide-react';

// Sample shoes data for AR/VR experience
const arShoes = [
  {
    id: 'shoe-1',
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers a plush ride with large window in the heel for visible cushioning.',
    images: {
      main: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5e4c1ce1-b014-4bf2-8edc-8ef6a3068e25/air-max-270-shoes-2V5C4p.png',
      side: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/40209bce-39f6-4f45-8a7e-92a3e7eff65c/air-max-270-shoes-2V5C4p.png',
      top: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2c2fab5e-ed07-4cdc-b24c-57d395aedcb7/air-max-270-shoes-2V5C4p.png',
      sole: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/88c3380a-1191-4be7-9551-95202e07639e/air-max-270-shoes-2V5C4p.png'
    }
  },
  {
    id: 'shoe-2',
    name: 'Nike Air Force 1',
    description: 'The radiance lives on with the Nike Air Force 1, the basketball icon that puts a fresh spin on a classic design.',
    images: {
      main: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1e9dc8/air-force-1-07-shoes-WrLlWX.png',
      side: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-shoes-WrLlWX.png',
      top: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9a4081ff5eb4/air-force-1-07-shoes-WrLlWX.png',
      sole: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/120a31b0-2d5a-4929-b22c-52e1a3c4c9a8/air-force-1-07-shoes-WrLlWX.png'
    }
  },
  {
    id: 'shoe-3',
    name: 'Nike Zoom Pegasus 39',
    description: 'Let the Nike Zoom Pegasus 39 help you ascend to new heights, whether you\'re training or completing your long run.',
    images: {
      main: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e8e530a1-0c8a-4a9e-9bd0-9e2b5ffe28fd/pegasus-39-road-running-shoes-kmZSD6.png',
      side: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/47bdb84c-ca16-4570-9602-a7825108e958/pegasus-39-road-running-shoes-kmZSD6.png',
      top: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/4499bfb2-0a79-4b41-84d6-639a795ed618/pegasus-39-road-running-shoes-kmZSD6.png',
      sole: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/15761836-98b6-4e34-93f8-40d4aa88cb43/pegasus-39-road-running-shoes-kmZSD6.png'
    }
  }
];

type ViewMode = 'main' | 'side' | 'top' | 'sole';

const ArVr = () => {
  const [activeShoeIndex, setActiveShoeIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const pageRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);
  
  const activeShoe = arShoes[activeShoeIndex];
  
  // Initialize page animations
  useEffect(() => {
    // Initial animation when the page loads
    const tl = gsap.timeline();
    tl.fromTo(
      pageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
      gsap.killTweensOf(pageRef.current);
    };
  }, []);
  
  // Handle shoe change animation
  useEffect(() => {
    if (shoeRef.current) {
      gsap.fromTo(
        shoeRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
    }
  }, [activeShoeIndex, viewMode]);
  
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
  
  const nextShoe = () => {
    setActiveShoeIndex((prev) => (prev + 1) % arShoes.length);
    resetView();
  };
  
  const prevShoe = () => {
    setActiveShoeIndex((prev) => (prev - 1 + arShoes.length) % arShoes.length);
    resetView();
  };
  
  const resetView = () => {
    setViewMode('main');
    setIsRotating(false);
    setRotation(0);
    setScale(1);
  };
  
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };
  
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };
  
  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Virtual Try-On Experience</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore Nike shoes in interactive 3D. Rotate, zoom, and view from different angles to see every detail before you buy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - Controls */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">{activeShoe.name}</h2>
                  <p className="text-gray-600 mb-6">
                    {activeShoe.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">View Controls</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className={`p-3 rounded-lg flex items-center justify-center ${
                            viewMode === 'main' ? 'bg-nike-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setViewMode('main')}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className={`p-3 rounded-lg flex items-center justify-center ${
                            viewMode === 'side' ? 'bg-nike-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setViewMode('side')}
                        >
                          Side View
                        </button>
                        <button
                          className={`p-3 rounded-lg flex items-center justify-center ${
                            viewMode === 'top' ? 'bg-nike-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setViewMode('top')}
                        >
                          Top View
                        </button>
                        <button
                          className={`p-3 rounded-lg flex items-center justify-center ${
                            viewMode === 'sole' ? 'bg-nike-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={() => setViewMode('sole')}
                        >
                          Sole View
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Interactive Controls</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className={`p-3 rounded-lg flex items-center justify-center ${
                            isRotating ? 'bg-nike-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          onClick={toggleRotation}
                        >
                          <RotateCcw size={18} />
                        </button>
                        <button
                          className="p-3 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                          onClick={zoomIn}
                        >
                          <ZoomIn size={18} />
                        </button>
                        <button
                          className="p-3 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                          onClick={zoomOut}
                        >
                          <ZoomIn size={18} className="rotate-180" />
                        </button>
                        <button
                          className="p-3 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200"
                          onClick={resetView}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Try On Options</h3>
                      <Button
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 mb-3"
                      >
                        <Smartphone size={18} />
                        Try On Your Device
                      </Button>
                      <p className="text-xs text-gray-500">
                        Scan the QR code with your phone to try these shoes in augmented reality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - 3D Visualization */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-gray-50 rounded-2xl p-4 md:p-8 relative min-h-[500px] flex items-center justify-center">
                {/* Shoe Navigation */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
                  onClick={prevShoe}
                >
                  <ArrowLeft size={20} />
                </button>
                
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
                  onClick={nextShoe}
                >
                  <ArrowRight size={20} />
                </button>
                
                {/* Shoe Display */}
                <div 
                  ref={shoeRef}
                  className="max-w-full max-h-full transition-all duration-300 transform"
                  style={{ 
                    transform: `scale(${scale}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={activeShoe.images[viewMode]}
                    alt={activeShoe.name}
                    className="max-w-full max-h-full object-contain"
                    draggable="false"
                  />
                </div>
                
                {/* Shoe Selector */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {arShoes.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        activeShoeIndex === index ? 'bg-nike-black' : 'bg-gray-300'
                      }`}
                      onClick={() => {
                        setActiveShoeIndex(index);
                        resetView();
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Color Options */}
              <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Available Colors</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-black border-2 border-gray-300"></button>
                  <button className="w-10 h-10 rounded-full bg-red-600 border-2 border-transparent"></button>
                  <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-transparent"></button>
                  <button className="w-10 h-10 rounded-full bg-gray-200 border-2 border-transparent"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArVr;
