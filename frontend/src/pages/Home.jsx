import React from 'react';
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import ShineButton from '../components/Button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
              <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Shop</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
              <User className="h-6 w-6 text-gray-600 cursor-pointer" />
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
          <ShineButton
  text="Premium Textiles for Your Lifestyle" 
  className="text-4xl md:text-5xl font-bold mb-6"
/>
             <p className="text-lg md:text-xl mb-8 opacity-90">Discover our curated collection of sustainable, high-quality fabrics and home textiles.</p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all">
              Shop Collection
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="h-full w-full bg-[url('/api/placeholder/600/800')] bg-cover opacity-30"></div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Bed Linens', 'Curtains', 'Upholstery', 'Apparel Fabric'].map((category) => (
              <div key={category} className="group relative cursor-pointer overflow-hidden rounded-lg">
                <div className="aspect-square bg-[url('/api/placeholder/400/400')] bg-cover bg-center w-full"></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all group-hover:bg-opacity-50">
                  <h3 className="text-white text-xl font-bold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}

      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {name: 'Cotton Bedsheet Set', price: '$89.99'},
              {name: 'Silk Pillowcase', price: '$35.00'},
              {name: 'Linen Table Runner', price: '$45.50'},
              {name: 'Wool Blend Throw', price: '$65.00'}
            ].map((product, idx) => (
              <div key={idx} className="group">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-60 bg-[url('/api/placeholder/500/500')] bg-cover bg-center w-full transform transition-transform group-hover:scale-105"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-gray-700 font-medium">{product.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">{product.price}</p>
                  </div>
                  <button className="text-gray-400 hover:text-indigo-600">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
                <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quality of their bed linens is exceptional. I've never slept better!",
                name: "Sarah Johnson",
                title: "Interior Designer"
              },
              {
                quote: "Fast shipping, beautiful products, and excellent customer service. Highly recommend!",
                name: "Michael Chen",
                title: "Loyal Customer"
              },
              {
                quote: "Their sustainable fabrics helped me create an eco-friendly home I'm proud of.",
                name: "Emma Rodriguez",
                title: "Eco Lifestyle Blogger"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-indigo-600 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-indigo-100">Stay updated with our latest products, trends, and exclusive offers.</p>
            </div>
            <div className="md:w-1/3">
              <form className="flex flex-col sm:flex-row w-full">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none"
                />
                <button className="bg-indigo-800 px-6 py-3 rounded-r-md font-semibold mt-2 sm:mt-0 hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                      <h3 className="text-lg font-semibold mb-4">Shop</h3>
                      <ul className="space-y-2">
                          <li><a href ="#" className="hover:text-white">All Products</a></li>
                      <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                      <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                      <li><a href="#" className="hover:text-white">Sale Items</a></li>
                  </ul>
              </div>
              <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                      <li><a href="#" className="hover:text-white">Contact Us</a></li>
                      <li><a href="#" className="hover:text-white">FAQs</a></li>
                      <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
                      <li><a href="#" className="hover:text-white">Order Tracking</a></li>
                  </ul>
              </div>
              <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                      <li><a href="#" className="hover:text-white">About Us</a></li>
                      <li><a href="#" className="hover:text-white">Sustainability</a></li>
                      <li><a href ="#" className="hover:text-white">Press</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
          </div><div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4 mb-4">
                      <a href="#" className="hover:text-white">
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                      </a>
                      <a href ="#" className="hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                  </a>
                  <a href="#" className="hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                  </a>
                  <a href="#" className="hover:text-white">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                  </a>
              </div><h3 className="text-lg font-semibold mb-4">Payment Methods</h3><div className="flex space-x-3">
                  <div className="w-10 h-6 bg-white rounded"></div>
                  <div className="w-10 h-6 bg-white rounded"></div>
                  <div className="w-10 h-6 bg-white rounded"></div>
                  <div className="w-10 h-6 bg-white rounded"></div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-center">
            <p>&copy; 2025 TextileHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;