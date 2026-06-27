import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Eye, Calendar, Download, Filter, RefreshCw } from 'lucide-react';

const TextileAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  const [dashboardData, setDashboardData] = useState({
    // Key Performance Indicators
    kpis: {
      totalRevenue: { value: 28750, change: 12.5, period: 'vs last month' },
      totalOrders: { value: 70, change: -3.2, period: 'vs last month' },
      activeCustomers: { value: 3247, change: 8.7, period: 'vs last month' },
      inventoryValue: { value: 18500, change: 5.3, period: 'vs last month' },
      conversionRate: { value: 3.8, change: 0.5, period: 'vs last month' },
      avgOrderValue: { value: 290.85, change: 15.2, period: 'vs last month' }
    },

    // Revenue trend data
    revenueData: [
      { date: '2025-05-11', revenue: 1850, orders: 40, customers: 5 },
      { date: '2025-05-12', revenue: 1950, orders: 80, customers: 5 },
      { date: '2025-05-13', revenue: 1780, orders: 10, customers: 4 },
      { date: '2025-05-14', revenue: 2050, orders: 20, customers: 5 },
      { date: '2025-05-15', revenue: 2250, orders: 80, customers: 6 },
      { date: '2025-05-16', revenue: 2100, orders: 30, customers: 5 },
      { date: '2025-05-17', revenue: 2350, orders: 20, customers: 6 },
      { date: '2025-05-18', revenue: 2480, orders: 60, customers: 6 },
      { date: '2025-05-19', revenue: 2200, orders: 60, customers: 6 },
      { date: '2025-05-20', revenue: 2550, orders: 90, customers: 7 },
      { date: '2025-05-22', revenue: 2700, orders: 40, customers: 7 },
      { date: '2025-05-23', revenue: 2850, orders: 80, customers: 7 }
    ],

    // Product category performance
    categoryData: [
      { name: 'Cotton Fabrics', revenue: 5000, orders: 40, percentage: 27.8, growth: 8.5 },
      { name: 'Silk Materials', revenue: 2000, orders: 10, percentage: 21.2, growth: 12.3 },
      { name: 'Wool & Cashmere', revenue: 5000, orders: 10, percentage: 15.7, growth: -2.1 },
      { name: 'Synthetic Blends', revenue: 3000, orders: 16, percentage: 13.8, growth: 15.6 },
      { name: 'Linen & Hemp', revenue: 1000, orders: 10, percentage: 12.0, growth: 6.8 },
      { name: 'Denim & Canvas', revenue: 1000, orders: 17, percentage: 9.5, growth: 4.2 }
    ],

    // Customer demographics
    customerSegments: [
      { segment: 'Designers', value: 1247, percentage: 38.4, color: '#8B5CF6' },
      { segment: 'Retailers', value: 952, percentage: 29.3, color: '#10B981' },
      { segment: 'Wholesale Buyers', value: 658, percentage: 20.3, color: '#F59E0B' },
      { segment: 'Individual Customers', value: 390, percentage: 12.0, color: '#3B82F6' }
    ],

    // Geographic distribution
    geographicData: [
      { region: 'Nammakal', revenue: 8000, orders: 32, percentage: 39.9 },
      { region: 'krishagiri', revenue: 2200, orders: 24, percentage: 29.3 },
      { region: 'Salem', revenue: 5000, orders: 16, percentage: 19.7 },
      { region: 'Erore', revenue: 5000, orders: 30, percentage: 7.5 },
     
    ],
    // Top selling products
    topProducts: [
      { name: 'Premium Cotton Poplin - White', sales: 2340, revenue: 93600, category: 'Cotton Fabrics' },
      { name: 'Mulberry Silk Charmeuse - Navy', sales: 1890, revenue: 151200, category: 'Silk Materials' },
      { name: 'Organic Linen Blend - Natural', sales: 1650, revenue: 82500, category: 'Linen & Hemp' },
      { name: 'Merino Wool Jersey - Black', sales: 1420, revenue: 113600, category: 'Wool & Cashmere' },
      { name: 'Stretch Denim - Indigo', sales: 1380, revenue: 69000, category: 'Denim & Canvas' },
      { name: '100% Silk Dupioni - Ivory', sales: 1250, revenue: 125000, category: 'Silk Materials' },
      { name: 'Cotton Canvas - Khaki', sales: 1180, revenue: 47200, category: 'Cotton Fabrics' },
      { name: 'Polyester Crepe - Burgundy', sales: 1050, revenue: 52500, category: 'Synthetic Blends' }
    ],

    // Monthly trends
    monthlyTrends: [
      { month: 'Jan', revenue: 2100, orders: 20, newCustomers: 5 },
      { month: 'Feb', revenue: 1950, orders: 80, newCustomers: 8 },
      { month: 'Mar', revenue: 2250, orders: 80, newCustomers: 2 },
      { month: 'Apr', revenue: 2180, orders: 50, newCustomers: 8 },
      { month: 'May', revenue: 2350, orders: 10, newCustomers: 9 },
      { month: 'Jun', revenue: 2280, orders: 90, newCustomers: 1 },
      { month: 'Jul', revenue: 2450, orders: 40, newCustomers: 3 },
      { month: 'Aug', revenue: 2380, orders: 20, newCustomers: 8 },
      { month: 'Sep', revenue: 2520, orders: 60, newCustomers: 7 },
      { month: 'Oct', revenue: 2680, orders: 10, newCustomers: 2 },
      { month: 'Nov', revenue: 2850, orders: 50, newCustomers: 8 },
      { month: 'Dec', revenue: 2750, orders: 20, newCustomers: 9 }
    ]
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Textile E-commerce Performance Overview</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(dashboardData.kpis.totalRevenue.value)}</p>
                <div className="flex items-center mt-1">
                  {dashboardData.kpis.totalRevenue.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${dashboardData.kpis.totalRevenue.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(dashboardData.kpis.totalRevenue.change)}% {dashboardData.kpis.totalRevenue.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.kpis.totalOrders.value)}</p>
                <div className="flex items-center mt-1">
                  {dashboardData.kpis.totalOrders.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${dashboardData.kpis.totalOrders.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(dashboardData.kpis.totalOrders.change)}% {dashboardData.kpis.totalOrders.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-semibold text-gray-900">{formatNumber(dashboardData.kpis.activeCustomers.value)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    {dashboardData.kpis.activeCustomers.change}% {dashboardData.kpis.activeCustomers.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(dashboardData.kpis.inventoryValue.value)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    {dashboardData.kpis.inventoryValue.change}% {dashboardData.kpis.inventoryValue.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Eye className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardData.kpis.conversionRate.value}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    +{dashboardData.kpis.conversionRate.change}% {dashboardData.kpis.conversionRate.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(dashboardData.kpis.avgOrderValue.value)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    +{dashboardData.kpis.avgOrderValue.change}% {dashboardData.kpis.avgOrderValue.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Orders</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis yAxisId="revenue" orientation="left" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis yAxisId="orders" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : 'Orders'
                  ]}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Area yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                <Line yAxisId="orders" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Segments Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                >
                  {dashboardData.customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNumber(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="revenue" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="revenue" orientation="left" tickFormatter={(value) => `$${value/1000000}M`} />
                <YAxis yAxisId="customers" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : formatNumber(value),
                    name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'New Customers'
                  ]}
                />
                <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                <Line yAxisId="customers" type="monotone" dataKey="newCustomers" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.topProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatNumber(product.sales)}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Geographic Performance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.geographicData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{region.region}</span>
                        <span className="text-sm text-gray-500">{region.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{formatCurrency(region.revenue)}</span>
                        <span className="text-xs text-gray-500">{formatNumber(region.orders)} orders</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Details Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Share</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dashboardData.categoryData.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(category.revenue)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatNumber(category.orders)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{category.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {category.growth > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${category.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {Math.abs(category.growth)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextileAnalyticsDashboard;