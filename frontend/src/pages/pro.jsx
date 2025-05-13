import { useState, useEffect } from "react";
import { Loader2, Save, Edit, CheckCircle, X, ShoppingBag, User, Settings, Ruler } from "lucide-react";
import { useNavigate ,Link} from "react-router-dom";
import { Search, ShoppingCart, Menu, Heart } from 'lucide-react';
import React from "react";
import { jwtDecode } from "jwt-decode";
const UserProfile = () => {
  const [orders, setOrders] = useState([]);
   
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({});
   const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [updateStatus, setUpdateStatus] = useState({ success: false, message: "" });
  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  
  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // This could come from auth context or URL params
        // For now we'll use a placeholder - in production, get this from your auth system
        const userId = await getUserDetails();
        console.log(userId);
        const response = await fetch(`${API_URL}/api/user/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const response1=await fetch(`${API_URL}/api/user/Id/${userId}`);
        if (!response1.ok) {
          throw new Error(`Failed to fetch user data: ${response1.status}`);
        }

        const orderData=await response1.json();
        setOrders(orderData.data);

        const userData = await response.json();
        setUser(userData);
        setFormData(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
          console.error("Token not found");
          return null;
      }
  
      try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded.userId); // Ensure userId exists
  
          if (!decoded.userId) {
              console.error("User ID not found in token");
              return null;
          }
  
          return decoded.userId; // Return user ID instead of fetching name
      } catch (error) {
          console.error("Error decoding token:", error);
          return null;
      }
  };

  // Handle nested object changes
  const handleNestedChange = (objectName, fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [objectName]: {
        ...prevData[objectName],
        [fieldName]: value
      }
    }));
  };
  
  // Handle basic field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle checkbox changes for preferences
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

  // Handle select changes for preferences
  const handlePreferenceSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [name]: value
      }
    }));
  };

  // Handle adding a new pattern size
  const handleAddPatternSize = () => {
    setFormData(prevData => ({
      ...prevData,
      patternSizes: [
        ...(prevData.patternSizes || []),
        { name: "", size: "", standard: "" }
      ]
    }));
  };

  // Handle updating a pattern size
  const handlePatternSizeChange = (index, field, value) => {
    setFormData(prevData => {
      const updatedSizes = [...(prevData.patternSizes || [])];
      if (!updatedSizes[index]) {
        updatedSizes[index] = {};
      }
      updatedSizes[index][field] = value;
      return {
        ...prevData,
        patternSizes: updatedSizes
      };
    });
  };

  // Handle removing a pattern size
  const handleRemovePatternSize = (index) => {
    setFormData(prevData => {
      const updatedSizes = [...(prevData.patternSizes || [])];
      updatedSizes.splice(index, 1);
      return {
        ...prevData,
        patternSizes: updatedSizes
      };
    });
  };

  const handleSave = async () => {
    try {
      setUpdateStatus({ success: false, message: "Saving changes..." });
      
      // Create a copy of form data to ensure password is handled correctly
      const dataToSubmit = { ...formData };
      
      // Don't send empty password (prevents accidental password reset)
      if (dataToSubmit.password === "") {
        delete dataToSubmit.password;
      }
      const userId = await getUserDetails();
      
      // Call the update API endpoint
      const response = await fetch(`${API_URL}/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token if needed
        },
        body: JSON.stringify(dataToSubmit)
      });
      
      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
      setUpdateStatus({ success: true, message: "Profile updated successfully!" });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateStatus({ success: false, message: "" });
      }, 3000);
    } catch (err) {
      console.error("Error updating user:", err);
      setUpdateStatus({ success: false, message: `Error: ${err.message}` });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Profile</h2>
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-600">User Not Found</h2>
        <p>Unable to load user profile data.</p>
      </div>
    );
  }

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
                  <Link to="/productList" className="text-gray-600 hover:text-indigo-600">
      Shop
    </Link> <a href="#" className="text-gray-600 hover:text-indigo-600">Categories</a>
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
                  <div className="relative" onClick={()=> navigate("/fav")}>
                  <Heart className="h-6 w-6 text-gray-600 cursor-pointer" />
                  </div>
                  <User className="h-6 w-6 text-gray-600 cursor-pointer" />
                  <div className="relative" onClick={() => navigate("/cart")}>
                    <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer" />
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </div>
                </div> 
              </div>
            </div>
          </header>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">


    
    

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="relative mb-4 md:mb-0 md:mr-8">
          <img 
            src={user.profileImage || "/default-profile.jpg"} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-sm bg-blue-100 text-blue-700 inline-block px-2 py-1 rounded">
            {user.role}
          </p>
        </div>
        <div>
          {editing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData(user);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Status message */}
      {updateStatus.message && (
        <div className={`mb-6 p-3 rounded-md ${updateStatus.success ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
          {updateStatus.success && <CheckCircle className="inline w-5 h-5 mr-2" />}
          {updateStatus.message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 border-b">
        <nav className="flex flex-wrap">
          <button
            className={`pb-2 px-4 ${activeTab === "personal" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("personal")}
          >
            <User className="w-4 h-4 inline mr-1" />
            Personal Info
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "shipping" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("shipping")}
          >
            <ShoppingBag className="w-4 h-4 inline mr-1" />
            Shipping
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "orders" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="w-4 h-4 inline mr-1" />
            Orders
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "preferences" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("preferences")}
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Preferences
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === "measurements" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("measurements")}
          >
            <Ruler className="w-4 h-4 inline mr-1" />
            Measurements
          </button>
        </nav>
      </div>

      {/* Personal Info Tab */}
      {activeTab === "personal" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              {editing ? (
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password (leave empty to keep current)"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>••••••••••</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              {editing ? (
                <input
                  type="tel"
                  name="MobileNumber"
                  value={formData.MobileNumber || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.MobileNumber || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              {editing ? (
                <select
                  name="role"
                  value={formData.role || "Customer"}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Customer">Customer</option>
                  <option value="Wholesale Buyer">Wholesale Buyer</option>
                  <option value="Designer">Designer</option>
                  <option value="Retailer">Retailer</option>
                </select>
              ) : (
                <p>{user.role}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
              <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Shipping Address Tab */}
      {activeTab === "shipping" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              {editing ? (
                <textarea
                  name="address"
                  value={formData.shippingAddress?.address || ""}
                  onChange={(e) => handleNestedChange('shippingAddress', 'address', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                />
              ) : (
                <p>{user.shippingAddress?.address || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              {editing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.shippingAddress?.city || ""}
                  onChange={(e) => handleNestedChange('shippingAddress', 'city', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.shippingAddress?.city || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              {editing ? (
                <input
                  type="text"
                  name="State"
                  value={formData.shippingAddress?.State || ""}
                  onChange={(e) => handleNestedChange('shippingAddress', 'State', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.shippingAddress?.State || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              {editing ? (
                <input
                  type="text"
                  name="postalCode"
                  value={formData.shippingAddress?.postalCode || ""}
                  onChange={(e) => handleNestedChange('shippingAddress', 'postalCode', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.shippingAddress?.postalCode || "Not specified"}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
     {activeTab === "orders" && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
    {orders && orders.length > 0 ? (
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <React.Fragment key={order._id}>
                <tr>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.userId?.name || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">₹{order.totalAmount}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "completed" ? "bg-green-100 text-green-800" :
                      order.status === "processing" ? "bg-blue-100 text-blue-800" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setExpandedOrderId(prev => prev === order._id ? null : order._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order._id && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-4 py-4">
                      <div>
                        <h3 className="font-semibold mb-2">Items:</h3>
                        <ul className="mb-4">
                          {order.items.map(item => (
                            <li key={item._id} className="mb-2">
                              <div className="flex items-center gap-4">
                                <img src={item.productId?.images?.[0]} alt="Product" className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="font-medium">{item.productId?.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        <h3 className="font-semibold">Shipping Address:</h3>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>

                        <h3 className="font-semibold mt-2">Payment Status:</h3>
                        <p className="text-sm text-gray-600">{order.paymentDetails?.status || "N/A"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500">No recent orders found.</p>
    )}
  </div>
)}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={formData.preferences?.notifications || false}
                    onChange={handleCheckboxChange}
                    disabled={!editing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="notifications" className="ml-2 text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.preferences?.newsletter || false}
                    onChange={handleCheckboxChange}
                    disabled={!editing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-gray-700">
                    Weekly Newsletter
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fabricAlerts"
                    name="fabricAlerts"
                    checked={formData.preferences?.fabricAlerts || false}
                    onChange={handleCheckboxChange}
                    disabled={!editing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="fabricAlerts" className="ml-2 text-gray-700">
                    New Fabric Alerts
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Favorite Categories</h3>
              {user.favoriteCategories && user.favoriteCategories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.favoriteCategories.map((category, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No favorite categories selected.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Measurements Tab */}
      {activeTab === "measurements" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Body Measurements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bust</label>
              {editing ? (
                <input
                  type="text"
                  name="bust"
                  value={formData.measurements?.bust || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    measurements: {
                      ...formData.measurements,
                      bust: e.target.value
                    }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.measurements?.bust || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Waist</label>
              {editing ? (
                <input
                  type="text"
                  name="waist"
                  value={formData.measurements?.waist || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    measurements: {
                      ...formData.measurements,
                      waist: e.target.value
                    }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.measurements?.waist || "Not specified"}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hips</label>
              {editing ? (
                <input
                  type="text"
                  name="hips"
                  value={formData.measurements?.hips || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    measurements: {
                      ...formData.measurements,
                      hips: e.target.value
                    }
                  })}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <p>{user.measurements?.hips || "Not specified"}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
      </div>
    
  );
};

export default UserProfile;