import React from 'react';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary-400 mr-2" />
            <span className="text-lg font-semibold">EcoRoute</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 mb-4 md:mb-0">
            <a href="#" className="hover:text-primary-300 transition-colors">About</a>
            <a href="#" className="hover:text-primary-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-300 transition-colors">Contact</a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} EcoRoute. All rights reserved.</p>
          <p className="mt-1">Helping you reduce your carbon footprint, one journey at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;