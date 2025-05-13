import React, { useState } from 'react';

const UserProfile = () => {
  // Initial user state with sample data
  const [user, setUser] = useState({
    name: "Shiv",
    email: "jane.smith@example.com",
    password: "••••••••••",
    role: "Customer",
    phone: "+1 (555) 123-4567",
    address: "123 Fabric Lane, Textile City, TC 12345",
    profileImage: "/api/placeholder/150/150",
    // Additional fields for textile e-commerce
    favoriteCategories: ["Cotton", "Silk", "Linen"],
    recentOrders: [
      { id: "ORD-2025-001", date: "2025-03-15", status: "Delivered", amount: "$245.99" },
      { id: "ORD-2025-002", date: "2025-03-22", status: "Processing", amount: "$178.50" }
    ],
    preferences: {
      notifications: true,
      newsletter: true,
      fabricAlerts: true
    },
    measurements: {
      bust: "36 inches",
      waist: "28 inches",
      hips: "38 inches"
    }
  });

  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  
  // Form state for editing
  const [formData, setFormData] = useState({...user});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [name]: checked
      }
    }));
  };
  
  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TextileTreasures</h1>
          <div className="flex items-center space-x-4">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                {editing && (
                  <button className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-1 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-indigo-100">{user.role} since January 2025</p>
                {!editing ? (
                  <button 
                    onClick={() => setEditing(true)} 
                    className="mt-2 px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm font-medium hover:bg-indigo-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="mt-2 flex space-x-2 justify-center md:justify-start">
                    <button 
                      onClick={handleSave} 
                      className="px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm font-medium hover:bg-indigo-50 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        setEditing(false);
                        setFormData({...user});
                      }} 
                      className="px-4 py-2 bg-indigo-700 text-white rounded-lg shadow-sm font-medium hover:bg-indigo-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Navigation */}
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              <button 
                onClick={() => setActiveTab("personal")}
                className={`px-6 py-4 font-medium text-sm ${activeTab === "personal" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
              >
                Personal Info
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`px-6 py-4 font-medium text-sm ${activeTab === "orders" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
              >
                Orders
              </button>
              <button 
                onClick={() => setActiveTab("preferences")}
                className={`px-6 py-4 font-medium text-sm ${activeTab === "preferences" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
              >
                Preferences
              </button>
              <button 
                onClick={() => setActiveTab("measurements")}
                className={`px-6 py-4 font-medium text-sm ${activeTab === "measurements" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}
              >
                Measurements
              </button>
            </nav>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.name}</p>
                    ) : (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.email}</p>
                    ) : (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.phone}</p>
                    ) : (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.role}</p>
                    ) : (
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option>Customer</option>
                        <option>Wholesale Buyer</option>
                        <option>Designer</option>
                        <option>Retailer</option>
                      </select>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.address}</p>
                    ) : (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      ></textarea>
                    )}
                  </div>
                  {editing && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">Leave blank to keep your current password</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Favorite Fabric Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.favoriteCategories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                    {editing && (
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                              order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                            <button className="text-indigo-600 hover:text-indigo-900">Track</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                    View All Orders
                  </button>
                </div>
              </div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications"
                        name="notifications"
                        type="checkbox"
                        checked={editing ? formData.preferences.notifications : user.preferences.notifications}
                        onChange={handleCheckboxChange}
                        disabled={!editing}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications" className="font-medium text-gray-700">Order Notifications</label>
                      <p className="text-gray-500">Receive notifications about your order status and updates.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={editing ? formData.preferences.newsletter : user.preferences.newsletter}
                        onChange={handleCheckboxChange}
                        disabled={!editing}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                      <p className="text-gray-500">Receive our weekly newsletter with new fabrics and special offers.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="fabricAlerts"
                        name="fabricAlerts"
                        type="checkbox"
                        checked={editing ? formData.preferences.fabricAlerts : user.preferences.fabricAlerts}
                        onChange={handleCheckboxChange}
                        disabled={!editing}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="fabricAlerts" className="font-medium text-gray-700">Fabric Alerts</label>
                      <p className="text-gray-500">Get notified when your favorite fabric categories are restocked or on sale.</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4 pt-4 border-t">Display Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      disabled={!editing}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measurement</label>
                    <select
                      disabled={!editing}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>Inches</option>
                      <option>Centimeters</option>
                      <option>Yards/Meters</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {/* Measurements Tab */}
            {activeTab === "measurements" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Saved Measurements</h3>
                  {editing && (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm font-medium hover:bg-indigo-700 transition-colors">
                      Add New
                    </button>
                  )}
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-indigo-700">
                    Your measurements help us recommend the right amount of fabric for your projects.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bust</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.measurements.bust}</p>
                    ) : (
                      <input
                        type="text"
                        name="bust"
                        value={user.measurements.bust}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waist</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.measurements.waist}</p>
                    ) : (
                      <input
                        type="text"
                        name="waist"
                        value={user.measurements.waist}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hips</label>
                    {!editing ? (
                      <p className="text-gray-900">{user.measurements.hips}</p>
                    ) : (
                      <input
                        type="text"
                        name="hips"
                        value={user.measurements.hips}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-4">Saved Pattern Sizes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">Women's Blouse</h5>
                          <p className="text-sm text-gray-500">Size 10, US Standard</p>
                        </div>
                        {editing && (
                          <button className="text-gray-400 hover:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">Men's Shirt</h5>
                          <p className="text-sm text-gray-500">Size L, European</p>
                        </div>
                        {editing && (
                          <button className="text-gray-400 hover:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;