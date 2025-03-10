import React, { useState } from 'react';
import { 
  Bell, Settings, Search, Package, Users, DollarSign, 
  TrendingUp, ShoppingBag, Menu, X, Home, Activity, 
  FileText, BarChart2, LogOut
} from 'lucide-react';

const TextileEcommerceDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data for dashboard
  const stats = [
    { title: "Total Revenue", value: "$284,546.90", change: "+12.3%", icon: <DollarSign className="h-6 w-6" /> },
    { title: "Total Orders", value: "5,423", change: "+8.1%", icon: <ShoppingBag className="h-6 w-6" /> },
    { title: "Total Customers", value: "3,752", change: "+5.4%", icon: <Users className="h-6 w-6" /> },
    { title: "Conversion Rate", value: "3.24%", change: "+1.2%", icon: <TrendingUp className="h-6 w-6" /> }
  ];
  
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 720, returns: 32 },
    { month: 'Feb', sales: 52000, orders: 830, returns: 45 },
    { month: 'Mar', sales: 61000, orders: 950, returns: 50 },
    { month: 'Apr', sales: 58000, orders: 910, returns: 48 },
    { month: 'May', sales: 63000, orders: 980, returns: 52 },
    { month: 'Jun', sales: 71000, orders: 1120, returns: 60 }
  ];
  
  const recentOrders = [
    { id: "#ORD-7391", customer: "Emma Wilson", product: "Cotton Bedsheets (Queen)", amount: "$89.99", status: "Delivered" },
    { id: "#ORD-7392", customer: "Michael Brown", product: "Silk Curtains (Set of 2)", amount: "$129.99", status: "Processing" },
    { id: "#ORD-7393", customer: "Sophia Garcia", product: "Linen Table Runners", amount: "$45.50", status: "Shipped" },
    { id: "#ORD-7394", customer: "James Johnson", product: "Wool Blankets (King)", amount: "$149.99", status: "Pending" },
    { id: "#ORD-7395", customer: "Olivia Martinez", product: "Decorative Pillowcases (Set of 4)", amount: "$65.75", status: "Delivered" }
  ];
  
  const topProducts = [
    { name: "Luxury Cotton Bedsheets", sales: 745, revenue: "$66,955" },
    { name: "Premium Silk Curtains", sales: 632, revenue: "$81,528" },
    { name: "Organic Linen Tablecloths", sales: 521, revenue: "$36,993" },
    { name: "Handcrafted Wool Blankets", sales: 438, revenue: "$65,481" },
    { name: "Designer Throw Pillows", sales: 412, revenue: "$28,840" }
  ];
  
  const categoryData = [
    { name: 'Cotton', value: 35 },
    { name: 'Silk', value: 25 },
    { name: 'Linen', value: 15 },
    { name: 'Polyester', value: 12 },
    { name: 'Wool', value: 8 },
    { name: 'Other', value: 5 }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "text-green-600 bg-green-100";
      case "Processing": return "text-blue-600 bg-blue-100";
      case "Shipped": return "text-purple-600 bg-purple-100";
      case "Pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };
  
  return (
    <div className="flex bg-gray-50">
      
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                TA
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-600 font-medium text-sm">
                    {stat.change} <span className="text-gray-500">from last month</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Overview Chart */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
                <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
              
              <div className="h-64 w-full">
                {/* This would be replaced with an actual chart component in a full implementation */}
                <div className="bg-gray-100 h-full w-full rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Sales Line Chart Visualization]</p>
                </div>
              </div>
            </div>
            
            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Product Categories</h2>
              
              <div className="h-64 w-full">
                {/* This would be replaced with an actual pie chart component */}
                <div className="bg-gray-100 h-full w-full rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Category Pie Chart]</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className={`h-3 w-3 rounded-full mr-2 bg-indigo-${300 + (index * 100)}`}
                      ></div>
                      <span className="text-sm text-gray-600">{category.name}: {category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View All Orders</button>
              </div>
            </div>
            
            {/* Top Selling Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.sales}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View All Products</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TextileEcommerceDashboard;