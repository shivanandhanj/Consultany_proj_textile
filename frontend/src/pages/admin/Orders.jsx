import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

const AdminOrdersPage = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    // Fetch orders from your API
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`${API_URL}/api/admin/orders`);
        const data = await response.json();
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sample data for demonstration
  useEffect(() => {
    const sampleOrders = [
      {
        _id: '1',
        userId: { _id: 'user1', email: 'customer1@example.com' },
        items: [
          {
            productId: { _id: 'p1', name: 'Cotton T-shirt', image: '/api/placeholder/60/60' },
            quantity: 2,
            price: 29.99,
            selectedSize: 'L',
            selectedColor: 'Blue'
          }
        ],
        shippingAddress: {
          fullName: 'John Doe',
          address: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
          contact: '+1234567890'
        },
        paymentDetails: {
          method: 'Credit Card',
          status: 'completed',
          transactionId: 'txn_123456'
        },
        totalAmount: 59.98,
        status: 'completed',
        createdAt: '2025-03-15T12:00:00Z'
      },
      {
        _id: '2',
        userId: { _id: 'user2', email: 'customer2@example.com' },
        items: [
          {
            productId: { _id: 'p2', name: 'Silk Scarf', image: '/api/placeholder/60/60' },
            quantity: 1,
            price: 45.00,
            selectedSize: 'One Size',
            selectedColor: 'Red'
          },
          {
            productId: { _id: 'p3', name: 'Linen Pants', image: '/api/placeholder/60/60' },
            quantity: 1,
            price: 79.99,
            selectedSize: 'M',
            selectedColor: 'Beige'
          }
        ],
        shippingAddress: {
          fullName: 'Jane Smith',
          address: '456 Park Ave',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA',
          contact: '+1987654321'
        },
        paymentDetails: {
          method: 'PayPal',
          status: 'completed',
          transactionId: 'txn_789012'
        },
        totalAmount: 124.99,
        status: 'processing',
        createdAt: '2025-03-16T10:30:00Z'
      },
      {
        _id: '3',
        userId: { _id: 'user3', email: 'customer3@example.com' },
        items: [
          {
            productId: { _id: 'p4', name: 'Wool Sweater', image: '/api/placeholder/60/60' },
            quantity: 1,
            price: 89.99,
            selectedSize: 'XL',
            selectedColor: 'Green'
          }
        ],
        shippingAddress: {
          fullName: 'Robert Johnson',
          address: '789 Elm St',
          city: 'Chicago',
          postalCode: '60007',
          country: 'USA',
          contact: '+1122334455'
        },
        paymentDetails: {
          method: 'Credit Card',
          status: 'pending',
          transactionId: 'txn_345678'
        },
        totalAmount: 89.99,
        status: 'pending',
        createdAt: '2025-03-17T09:15:00Z'
      }
    ];
    
    setOrders(sampleOrders);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        
        // Update selected order if it's the one being modified
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = 
      searchQuery === '' || 
      order.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.userId.email && order.userId.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FilterIcon size={16} />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full md:w-64 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pl-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Orders List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                          <div className="text-gray-500">Loading orders...</div>
                        </td>
                      </tr>
                    ) : currentOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                          <div className="text-gray-500">No orders found</div>
                        </td>
                      </tr>
                    ) : (
                      currentOrders.map((order) => (
                        <tr 
                          key={order._id} 
                          className={`hover:bg-gray-50 ${selectedOrder && selectedOrder._id === order._id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order._id.substring(0, 8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.shippingAddress.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-800" onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}>
                              View <ChevronRightIcon size={16} className="inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {!loading && filteredOrders.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastOrder, filteredOrders.length)}
                        </span>{' '}
                        of <span className="font-medium">{filteredOrders.length}</span> orders
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                          // Show pages around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = idx + 1;
                          } else if (currentPage <= 3) {
                            pageNum = idx + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + idx;
                          } else {
                            pageNum = currentPage - 2 + idx;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Details */}
          <div className="w-full lg:w-1/3">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-xs text-gray-500">Order ID</div>
                      <div className="text-sm font-medium">#{selectedOrder._id.substring(0, 8)}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        className={`px-3 py-1 text-xs rounded-full border ${selectedOrder.status === 'pending' ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleUpdateStatus(selectedOrder._id, 'pending')}
                      >
                        Pending
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs rounded-full border ${selectedOrder.status === 'processing' ? 'bg-blue-100 border-blue-400 text-blue-800' : 'border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleUpdateStatus(selectedOrder._id, 'processing')}
                      >
                        Processing
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs rounded-full border ${selectedOrder.status === 'completed' ? 'bg-green-100 border-green-400 text-green-800' : 'border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleUpdateStatus(selectedOrder._id, 'completed')}
                      >
                        Completed
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs rounded-full border ${selectedOrder.status === 'cancelled' ? 'bg-red-100 border-red-400 text-red-800' : 'border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleUpdateStatus(selectedOrder._id, 'cancelled')}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Name</div>
                        <div className="text-sm">{selectedOrder.shippingAddress.fullName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Email</div>
                        <div className="text-sm">{selectedOrder.userId.email || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Contact</div>
                        <div className="text-sm">{selectedOrder.shippingAddress.contact}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Date</div>
                        <div className="text-sm">{formatDate(selectedOrder.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <div className="text-sm">
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                  
                  {/* <div className="border-t border-gray-200 pt-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Method</div>
                        <div className="text-sm">{selectedOrder.paymentDetails.method}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Status</div>
                        <div className="text-sm capitalize">{selectedOrder.paymentDetails.status}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-gray-500">Transaction ID</div>
                        <div className="text-sm">{selectedOrder.paymentDetails.transactionId}</div>
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items ({selectedOrder.items.length})</h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-16 w-16 rounded border border-gray-200 overflow-hidden">
                            <img 
                              src={item.productId.images[0] || '/api/placeholder/60/60'} 
                              alt={item.productId.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.productId.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Size: {item.selectedSize} • Color: {item.selectedColor}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="flex justify-between text-base mt-4">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex justify-end">
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => window.print()}
                    >
                      Print Order
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-500 mb-2">Select an order to view details</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;