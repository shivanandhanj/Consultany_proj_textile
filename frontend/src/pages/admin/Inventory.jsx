import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Package, AlertTriangle } from 'lucide-react';

const TextileInventoryAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy textile inventory data
  const inventoryData = [
    {
      id: 'TXT001',
      name: 'Premium Cotton Twill',
      category: 'Cotton',
      type: 'Fabric',
      color: 'Navy Blue',
      weight: '220 GSM',
      width: '58 inches',
      stock: 450,
      minStock: 100,
      price: 12.50,
      supplier: 'Cotton Mills Ltd',
      lastUpdated: '2024-05-20',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT002',
      name: 'Silk Chiffon',
      category: 'Silk',
      type: 'Fabric',
      color: 'Cream',
      weight: '60 GSM',
      width: '44 inches',
      stock: 25,
      minStock: 50,
      price: 45.00,
      supplier: 'Luxury Silk Co',
      lastUpdated: '2024-05-22',
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT003',
      name: 'Denim Stretch',
      category: 'Denim',
      type: 'Fabric',
      color: 'Indigo',
      weight: '320 GSM',
      width: '60 inches',
      stock: 280,
      minStock: 80,
      price: 18.75,
      supplier: 'Denim Works',
      lastUpdated: '2024-05-21',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT004',
      name: 'Wool Blend Suiting',
      category: 'Wool',
      type: 'Fabric',
      color: 'Charcoal',
      weight: '280 GSM',
      width: '150 cm',
      stock: 0,
      minStock: 30,
      price: 65.00,
      supplier: 'Premium Wool Inc',
      lastUpdated: '2024-05-18',
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT005',
      name: 'Linen Blend',
      category: 'Linen',
      type: 'Fabric',
      color: 'Natural',
      weight: '140 GSM',
      width: '54 inches',
      stock: 120,
      minStock: 40,
      price: 22.30,
      supplier: 'Eco Textiles',
      lastUpdated: '2024-05-23',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1566479179817-c3bea57e7c68?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT006',
      name: 'Polyester Satin',
      category: 'Synthetic',
      type: 'Fabric',
      color: 'Rose Gold',
      weight: '95 GSM',
      width: '60 inches',
      stock: 90,
      minStock: 60,
      price: 8.50,
      supplier: 'Synthetic Solutions',
      lastUpdated: '2024-05-19',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT007',
      name: 'Bamboo Jersey',
      category: 'Bamboo',
      type: 'Knit',
      color: 'White',
      weight: '180 GSM',
      width: '72 inches',
      stock: 35,
      minStock: 50,
      price: 28.00,
      supplier: 'Sustainable Fabrics',
      lastUpdated: '2024-05-22',
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=100&h=100&fit=crop'
    },
    {
      id: 'TXT008',
      name: 'Velvet Upholstery',
      category: 'Velvet',
      type: 'Upholstery',
      color: 'Deep Purple',
      weight: '450 GSM',
      width: '54 inches',
      stock: 75,
      minStock: 25,
      price: 55.75,
      supplier: 'Luxury Interiors',
      lastUpdated: '2024-05-21',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
    }
  ];

  // Filter data based on search and filters
  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.color.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (status, stock, minStock) => {
    if (status === 'Out of Stock' || stock === 0) {
      return 'bg-red-100 text-red-800 border border-red-200';
    } else if (status === 'Low Stock' || stock <= minStock) {
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    } else {
      return 'bg-green-100 text-green-800 border border-green-200';
    }
  };

  const getStatusIcon = (status, stock, minStock) => {
    if (status === 'Out of Stock' || stock === 0) {
      return <AlertTriangle className="w-3 h-3" />;
    } else if (status === 'Low Stock' || stock <= minStock) {
      return <AlertTriangle className="w-3 h-3" />;
    } else {
      return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Textile Inventory</h1>
              <p className="text-gray-600 mt-1">Manage your fabric and textile inventory</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Add New Item
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryData.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {inventoryData.filter(item => item.status === 'In Stock').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {inventoryData.filter(item => item.status === 'Low Stock' || item.stock <= item.minStock).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventoryData.filter(item => item.status === 'Out of Stock' || item.stock === 0).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, category, or color..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Cotton">Cotton</option>
                <option value="Silk">Silk</option>
                <option value="Denim">Denim</option>
                <option value="Wool">Wool</option>
                <option value="Linen">Linen</option>
                <option value="Synthetic">Synthetic</option>
                <option value="Bamboo">Bamboo</option>
                <option value="Velvet">Velvet</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specifications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-lg object-cover" src={item.image} alt={item.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Color: {item.color}</div>
                      <div className="text-sm text-gray-500">{item.weight} • {item.width}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.stock} units</div>
                      <div className="text-sm text-gray-500">Min: {item.minStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${item.price}</div>
                      <div className="text-sm text-gray-500">per yard</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status, item.stock, item.minStock)}`}>
                        {getStatusIcon(item.status, item.stock, item.minStock)}
                        {item.stock === 0 ? 'Out of Stock' : item.stock <= item.minStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of{' '}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextileInventoryAdmin;