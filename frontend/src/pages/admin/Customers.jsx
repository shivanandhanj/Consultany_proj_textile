import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Download, UserPlus, Settings, Mail, Phone, MapPin, Calendar, Activity } from 'lucide-react';

const CustomerAdminPanel = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view'); // 'view', 'edit', 'add'
  const API_URL = import.meta.env.VITE_API_URL; // Use import.meta.env for Vite environment variables
  
  // Mock data - replace with API calls
  // useEffect(() => {
  //   const mockCustomers = [
  //     {
  //       _id: '1',
  //       name: 'Sarah Johnson',
  //       email: 'sarah.j@email.com',
  //       MobileNumber: '+1234567890',
  //       role: 'Designer',
  //       isActive: true,
  //       lastLogin: new Date('2024-01-15'),
  //       createdAt: new Date('2023-06-15'),
  //       shippingAddress: {
  //         address: '123 Main St',
  //         city: 'New York',
  //         postalCode: '10001',
  //         State: 'NY'
  //       },
  //       preferences: {
  //         notifications: true,
  //         newsletter: true,
  //         currency: 'USD',
  //         measurementUnit: 'Inches'
  //       },
  //       measurements: {
  //         bust: '36',
  //         waist: '28',
  //         hips: '38'
  //       },
  //       favoriteCategories: ['Silk', 'Cotton', 'Linen']
  //     },
  //     {
  //       _id: '2',
  //       name: 'Michael Chen',
  //       email: 'michael.chen@email.com',
  //       MobileNumber: '+1234567891',
  //       role: 'Wholesale Buyer',
  //       isActive: true,
  //       lastLogin: new Date('2024-01-20'),
  //       createdAt: new Date('2023-08-20'),
  //       shippingAddress: {
  //         address: '456 Oak Ave',
  //         city: 'Los Angeles',
  //         postalCode: '90210',
  //         State: 'CA'
  //       },
  //       preferences: {
  //         notifications: false,
  //         newsletter: true,
  //         currency: 'USD',
  //         measurementUnit: 'Yards/Meters'
  //       },
  //       measurements: {
  //         bust: '',
  //         waist: '',
  //         hips: ''
  //       },
  //       favoriteCategories: ['Wool', 'Polyester']
  //     },
  //     {
  //       _id: '3',
  //       name: 'Emma Williams',
  //       email: 'emma.w@email.com',
  //       MobileNumber: '+1234567892',
  //       role: 'Customer',
  //       isActive: false,
  //       lastLogin: new Date('2023-12-10'),
  //       createdAt: new Date('2023-04-10'),
  //       shippingAddress: {
  //         address: '789 Pine St',
  //         city: 'Chicago',
  //         postalCode: '60601',
  //         State: 'IL'
  //       },
  //       preferences: {
  //         notifications: true,
  //         newsletter: false,
  //         currency: 'EUR',
  //         measurementUnit: 'Centimeters'
  //       },
  //       measurements: {
  //         bust: '92',
  //         waist: '70',
  //         hips: '96'
  //       },
  //       favoriteCategories: ['Denim', 'Canvas']
  //     }
  //   ];
  //   setCustomers(mockCustomers);
  //   setFilteredCustomers(mockCustomers);
  // }, []);






useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        
        const response = await fetch(`${API_URL}/api/user`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

       

        

        const userData = await response.json();
        console.log(userData);

        setCustomers(userData);
    setFilteredCustomers(userData);
        
      } catch (err) {
        console.error("Error fetching user data:", err);
       
      } 
    };

    fetchUserData();
  }, []);




  // Filter customers based on search and role
  useEffect(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.MobileNumber.includes(searchTerm);
      const matchesRole = selectedRole === 'All' || customer.role === selectedRole;
      return matchesSearch && matchesRole;
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, selectedRole, customers]);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalType('view');
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalType('edit');
    setShowModal(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setModalType('add');
    setShowModal(true);
  };

 const handleDeleteCustomer = async (customerId) => {
  if (window.confirm('Are you sure you want to delete this customer?')) {
    try {
      const response = await fetch(`${API_URL}/api/user/${customerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.message || 'Server error'}`);
        return;
      }

      setCustomers(prev => prev.filter(c => c._id !== customerId));
      alert('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred. Please try again.');
    }
  }
};


  const getRoleColor = (role) => {
    const colors = {
      'Customer': 'bg-blue-100 text-blue-800',
      'Wholesale Buyer': 'bg-green-100 text-green-800',
      'Designer': 'bg-purple-100 text-purple-800',
      'Retailer': 'bg-orange-100 text-orange-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
          <p className="text-gray-600">Manage and monitor your customer base</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.filter(c => c.isActive).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Designers</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.filter(c => c.role === 'Designer').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Wholesale Buyers</p>
                <p className="text-2xl font-semibold text-gray-900">{customers.filter(c => c.role === 'Wholesale Buyer').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    <option value="Customer">Customer</option>
                    <option value="Wholesale Buyer">Wholesale Buyer</option>
                    <option value="Designer">Designer</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddCustomer}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Customer
              </button>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(customer.role)}`}>
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-gray-400" />
                        {customer.MobileNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {modalType === 'view' ? 'Customer Details' : 
                     modalType === 'edit' ? 'Edit Customer' : 'Add New Customer'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {selectedCustomer && modalType === 'view' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="mt-1 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <div className="mt-1 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-sm text-gray-900">{selectedCustomer.MobileNumber}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedCustomer.role)}`}>
                          {selectedCustomer.role}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedCustomer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedCustomer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Address & Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <div className="mt-1 flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                          <div className="text-sm text-gray-900">
                            <p>{selectedCustomer.shippingAddress.address}</p>
                            <p>{selectedCustomer.shippingAddress.city}, {selectedCustomer.shippingAddress.State} {selectedCustomer.shippingAddress.postalCode}</p>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">Account Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Member Since</label>
                        <div className="mt-1 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-sm text-gray-900">{formatDate(selectedCustomer.createdAt)}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Login</label>
                        <div className="mt-1 flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-gray-400" />
                          <p className="text-sm text-gray-900">{formatDate(selectedCustomer.lastLogin)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Currency</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedCustomer.preferences.currency}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Measurement Unit</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedCustomer.preferences.measurementUnit}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notifications</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" checked={selectedCustomer.preferences.notifications} disabled className="mr-2" />
                            <span className="text-sm text-gray-700">Email Notifications</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" checked={selectedCustomer.preferences.newsletter} disabled className="mr-2" />
                            <span className="text-sm text-gray-700">Newsletter</span>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" checked={selectedCustomer.preferences.fabricAlerts} disabled className="mr-2" />
                            <span className="text-sm text-gray-700">Fabric Alerts</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Measurements & Categories */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Measurements</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bust</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedCustomer.measurements.bust || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Waist</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedCustomer.measurements.waist || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Hips</label>
                          <p className="mt-1 text-sm text-gray-900">{selectedCustomer.measurements.hips || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Favorite Categories</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCustomer.favoriteCategories.map((category, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {modalType === 'edit' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Edit form would be implemented here with all customer fields</p>
                  </div>
                )}

                {modalType === 'add' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Add customer form would be implemented here with all required fields</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {modalType !== 'view' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                    {modalType === 'edit' ? 'Save Changes' : 'Create Customer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAdminPanel;