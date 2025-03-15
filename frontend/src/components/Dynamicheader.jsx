import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Home, Info, ShoppingBag } from 'lucide-react';

const DynamicHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Header configuration for different pages
  const headerConfig = {
    '/': {
      title: 'Home',
      icon: <Home className="mr-2" size={24} />,
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    '/about': {
      title: 'About Us',
      icon: <Info className="mr-2" size={24} />,
      bgColor: 'bg-green-500',
      textColor: 'text-white'
    },
    '/shop': {
      title: 'Shop',
      icon: <ShoppingBag className="mr-2" size={24} />,
      bgColor: 'bg-purple-500',
      textColor: 'text-white'
    },
    '/profile': {
      title: 'Your Profile',
      icon: <User className="mr-2" size={24} />,
      bgColor: 'bg-yellow-500',
      textColor: 'text-black'
    },
    '/cart': {
      title: 'Shopping Cart',
      icon: <ShoppingCart className="mr-2" size={24} />,
      bgColor: 'bg-red-500',
      textColor: 'text-white'
    },
    '/favorite': {
      title: 'Your Favorites',
      icon: <Heart className="mr-2" size={24} />,
      bgColor: 'bg-pink-500',
      textColor: 'text-white'
    }
  };

  // Get current page config or use a default
  const currentConfig = headerConfig[pathname] || {
    title: 'Page Not Found',
    icon: null,
    bgColor: 'bg-gray-500',
    textColor: 'text-white'
  };

  return (
    <header className={`w-full py-4 ${currentConfig.bgColor} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title with icon */}
          <div className="flex items-center">
            {currentConfig.icon}
            <h1 className={`text-2xl font-bold ${currentConfig.textColor}`}>
              {currentConfig.title}
            </h1>
          </div>
          
          {/* Right side - Navigation Icons */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-white hover:text-gray-200">
              <Home size={20} />
            </a>
            <a href="/shop" className="text-white hover:text-gray-200">
              <ShoppingBag size={20} />
            </a>
            <a href="/favorite" className="text-white hover:text-gray-200">
              <Heart size={20} />
            </a>
            <a href="/cart" className="text-white hover:text-gray-200">
              <ShoppingCart size={20} />
            </a>
            <a href="/profile" className="text-white hover:text-gray-200">
              <User size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DynamicHeader;