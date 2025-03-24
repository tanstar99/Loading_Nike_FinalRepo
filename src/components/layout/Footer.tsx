import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nike-black text-white pt-20 pb-10">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-6">NIKE</h3>
            <p className="text-gray-400 mb-6">
              Nike delivers innovative products, experiences and services to inspire athletes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-nike-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-nike-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-nike-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-nike-red transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">PRODUCTS</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shoes" className="text-gray-400 hover:text-white transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/shirts" className="text-gray-400 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/bottles" className="text-gray-400 hover:text-white transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/ar-vr" className="text-gray-400 hover:text-white transition-colors">
                  AR/VR Experience
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">HELP</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">ABOUT NIKE</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span>© 2023 Nike, Inc. All Rights Reserved</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
