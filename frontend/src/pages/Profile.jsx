import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Heart, User } from 'lucide-react';
import { useNavigate ,Link} from "react-router-dom";
const ProfilePage = () => {
  // User state with sample data
  const navigate=useNavigate();

  const [user, setUser] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fabric Lane, Textile City, TC 90210',
    profileImage: '/api/placeholder/150/150'
  });

  // Order history sample data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      date: '2025-02-15',
      status: 'Delivered',
      total: 149.99,
      items: [
        { name: 'Premium Cotton Fabric', quantity: 2, price: 49.99 },
        { name: 'Silk Brocade', quantity: 1, price: 50.01 }
      ]
    },
    {
      id: 'ORD-12346',
      date: '2025-03-01',
      status: 'Processing',
      total: 87.50,
      items: [
        { name: 'Linen Blend', quantity: 1, price: 39.99 },
        { name: 'Embroidery Thread Set', quantity: 1, price: 47.51 }
      ]
    }
  ]);

  // Saved fabrics/wishlist sample data
  const [savedItems, setSavedItems] = useState([
    { id: 'FAB-001', name: 'Organic Bamboo Fabric', price: 24.99, image: '/api/placeholder/80/80' },
    { id: 'FAB-002', name: 'Merino Wool', price: 34.99, image: '/api/placeholder/80/80' },
    { id: 'FAB-003', name: 'Japanese Indigo Denim', price: 29.99, image: '/api/placeholder/80/80' }
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 cursor-pointer md:hidden" />
              <div className="text-2xl font-bold text-indigo-600">TextileHub</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600">Home</a>
              <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
  Shop
</Link> <a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a>
              
            </div>
            
            <div className="flex items-center space-x-4">
              
              <div className="relative" onClick={()=> navigate("/fav")}>
              <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
              </div>
               <div className="relative" onClick={() => navigate("/cart")}>
                <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
            </div> 
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 bg-indigo-50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center">
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" 
              />
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600">Member since January 2025</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('orders')} 
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'orders' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setActiveTab('saved')} 
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'saved' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Saved Fabrics
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Info */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                          type="text" 
                          value={user.name} 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                          type="email" 
                          value={user.email} 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                          type="tel" 
                          value={user.phone} 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <input 
                          type="text" 
                          value={user.address} 
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="newsletter" 
                          name="newsletter" 
                          type="checkbox" 
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" 
                          defaultChecked 
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">Receive newsletter</label>
                        <p className="text-gray-500">Get updates on new fabrics, sales, and textile crafting tips.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="sms" 
                          name="sms" 
                          type="checkbox" 
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" 
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="sms" className="font-medium text-gray-700">SMS notifications</label>
                        <p className="text-gray-500">Receive text alerts about your orders and exclusive offers.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Orders</h3>
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
                        <div>
                          <span className="text-xs font-medium text-gray-500">ORDER #</span>
                          <span className="ml-2 text-sm font-medium text-gray-900">{order.id}</span>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-200">
                        <ul className="divide-y divide-gray-200">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="py-2 flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-200 bg-gray-50 flex justify-between">
                        <span className="text-sm font-medium text-gray-900">Total</span>
                        <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="px-4 py-3 sm:px-6 border-t border-gray-200 flex justify-end">
                        <button 
                          type="button" 
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium focus:outline-none"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Fabrics */}
            {activeTab === 'saved' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Fabrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.map(item => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4 flex items-start space-x-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="text-md font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} / yard</p>
                          <div className="mt-3 flex space-x-2">
                            <button 
                              type="button" 
                              className="bg-indigo-600 text-white py-1 px-3 text-xs rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Add to Cart
                            </button>
                            <button 
                              type="button" 
                              className="text-gray-500 hover:text-gray-700 py-1 px-3 text-xs focus:outline-none"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TextileTreasures</h3>
              <p className="text-sm">Your premier destination for quality fabrics and textile products since 2020.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shop All Fabrics</a></li>
                <li><a href="#" className="hover:text-white">Sewing Patterns</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-center">
            <p>&copy; 2025 TextileTreasures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;