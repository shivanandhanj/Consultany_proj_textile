import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import { useNavigate ,Link} from "react-router-dom";
import LogoutButton from '../components/LogoutButton';
export default function ContactUs() {
  return (
    <div className="bg-white">
         <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
                      <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
        
                      <Link to="/" className="text-gray-600 hover:text-indigo-600">
          Home
        </Link> 
                      
                      <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
          Shop
        </Link> 
        
         <Link to="/category" className="text-gray-600 hover:text-indigo-600">
              Category
            </Link>
                             <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                               Contact
                             </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                     
                      <div className="relative" onClick={()=> navigate("/fav")}>
                      <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
                      </div>
                      <div className="relative" onClick={()=> navigate("/profile")}>
                      <User className="h-6 w-6 text-gray-600 cursor-pointer" />
                      </div>
                      
                      <div className="relative" onClick={() => navigate("/cart")}>
                        <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                               </div>
                       <div> <LogoutButton /></div>
                    </div> 
                  </div>
                </div>
              </header>
        
      {/* Hero Section */}
      <div className=" relative bg-gradient-to-r from-indigo-500 to-purple-600 py-20 px-6 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Contact Our Textile Experts</h1>
        <p className="text-lg max-w-2xl mx-auto">
          We're here to assist you with fabric orders, custom designs, bulk inquiries, and anything else you need.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                placeholder="Inquiry about cotton fabrics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="5"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
            <div className="flex items-start space-x-4">
              <Phone className="text-indigo-600 w-6 h-6" />
              <div>
                <p className="font-medium text-gray-700">Phone</p>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="text-indigo-600 w-6 h-6" />
              <div>
                <p className="font-medium text-gray-700">Email</p>
                <p className="text-gray-600">support@textilestore.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="text-indigo-600 w-6 h-6" />
              <div>
                <p className="font-medium text-gray-700">Address</p>
                <p className="text-gray-600">
                  101 Cotton Street, Tirupur, TN, India - 641604
                </p>
              </div>
            </div>
          </div>

          {/* Map Section (You can embed real Google Maps here) */}
          <div className="overflow-hidden rounded-xl shadow-md">
            <iframe
              title="Google Map"
              className="w-full h-64 rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.482730699153!2d77.339014!3d11.108500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907e6ecf8e1d1%3A0x4120d24d6b7b0804!2sTirupur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1683695399000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
