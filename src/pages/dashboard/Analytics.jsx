// src/pages/dashboard/Analytics.jsx
import { useState, useEffect } from "react";
import { 
  FiPackage, FiShoppingBag, FiUsers, FiDollarSign, 
  FiTruck, FiCheckCircle, FiClock, FiTrendingUp
} from "react-icons/fi";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [dailySales, setDailySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [recentActivity, setRecentActivity] = useState({ recentOrders: [], recentUsers: [] });

  const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const [statsRes, dailyRes, monthlyRes, topProductsRes, categoriesRes, statusRes, activityRes] = await Promise.all([
        fetch("https://planto-backend-production.up.railway.app/api/analytics/stats", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/sales/daily", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/sales/monthly", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/top-products", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/categories", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/order-status", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("https://planto-backend-production.up.railway.app/api/analytics/recent-activity", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const statsData = await statsRes.json();
      const dailyData = await dailyRes.json();
      const monthlyData = await monthlyRes.json();
      const topProductsData = await topProductsRes.json();
      const categoriesData = await categoriesRes.json();
      const statusData = await statusRes.json();
      const activityData = await activityRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (dailyData.success) setDailySales(dailyData.dailySales);
      if (monthlyData.success) setMonthlySales(monthlyData.monthlySales);
      if (topProductsData.success) setTopProducts(topProductsData.topProducts);
      if (categoriesData.success) setCategories(categoriesData.categories);
      if (statusData.success) setOrderStatuses(statusData.statuses);
      if (activityData.success) setRecentActivity(activityData);

    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: FiPackage, color: "from-green-500 to-emerald-600" },
    { title: "Total Orders", value: stats.totalOrders, icon: FiShoppingBag, color: "from-blue-500 to-cyan-600" },
    { title: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "from-purple-500 to-pink-600" },
    { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: "from-yellow-500 to-orange-600" }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-white/50">Track your store performance and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Sales Chart */}
      <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp className="text-green-400" />
          <h2 className="text-lg font-semibold text-white">Daily Sales Trend</h2>
        </div>

        {dailySales.length === 0 ? (
          <div className="text-white/50 text-center py-12">
            No sales data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a2a" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a2a1a', borderColor: '#2a3a2a' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#22c55e" 
                strokeWidth={2} 
                dot={{ fill: '#22c55e' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Products */}
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🏆 Top Selling Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-bold">#{index + 1}</span>
                  <span className="text-white">{product._id}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/60">{product.totalSold} sold</span>
                  <span className="text-green-400">${product.revenue}</span>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-white/50 text-center py-4">No orders yet</p>
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📊 Products by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Status */}
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">📦 Order Status Distribution</h2>
          <div className="space-y-3">
            {orderStatuses.map((status, index) => {
              const getIcon = () => {
                switch(status._id) {
                  case 'Pending': return <FiClock className="text-yellow-400" />;
                  case 'Shipped': return <FiTruck className="text-purple-400" />;
                  case 'Delivered': return <FiCheckCircle className="text-green-400" />;
                  default: return <FiShoppingBag className="text-blue-400" />;
                }
              };
              return (
                <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    {getIcon()}
                    <span className="text-white">{status._id}</span>
                  </div>
                  <span className="text-white/80 font-semibold">{status.count} orders</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🔔 Recent Activity</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            <div>
              <p className="text-white/50 text-xs mb-2">Latest Orders</p>
              {recentActivity.recentOrders?.map((order, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 text-sm">
                  <span className="text-white/80">{order.orderId} - {order.customer}</span>
                  <span className="text-green-400">${order.total}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-white/50 text-xs mb-2">New Users</p>
              {recentActivity.recentUsers?.map((user, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 text-sm">
                  <span className="text-white/80">{user.username}</span>
                  <span className="text-white/50 text-xs">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;