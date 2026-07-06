import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiClock, FiBell
} from "react-icons/fi";

const DashboardMain = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch stats
      const statsRes = await fetch("http://localhost:5000/api/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsData.stats) {
        setDashboardStats(statsData.stats);
      }

      // Fetch orders
      const ordersRes = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ordersData = await ordersRes.json();
      if (ordersData.success && ordersData.orders) {
        setRecentOrders(ordersData.orders);
        // Count pending orders for bell notification
        const pendingCount = ordersData.orders.filter(o => o.status === "Pending").length;
        setPendingOrdersCount(pendingCount);
      }

      // Fetch products (for top selling)
      const productsRes = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsData = await productsRes.json();
      if (productsData.success && productsData.products) {
        // Sort by stock and get top 5
        const sorted = [...productsData.products]
          .sort((a, b) => (b.stock || 0) - (a.stock || 0))
          .slice(0, 5)
          .map(p => ({ name: p.name, sales: p.stock || 0 }));
        setTopProducts(sorted);
      }

      // Fetch weekly sales
      const salesRes = await fetch("http://localhost:5000/api/analytics/sales/weekly", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const salesData = await salesRes.json();
      if (salesData.weeklySales) {
        setWeeklySalesData(salesData.weeklySales);
      }

      // Fetch recent activity
      const activityRes = await fetch("http://localhost:5000/api/analytics/recent-activity", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const activityData = await activityRes.json();
      if (activityData.recentOrders && activityData.recentUsers) {
        const activities = [];
        activityData.recentOrders.forEach(order => {
          activities.push({ 
            action: `New order ${order.orderId} received`, 
            time: new Date(order.createdAt).toLocaleDateString() 
          });
        });
        activityData.recentUsers.forEach(user => {
          activities.push({ 
            action: `New user ${user.username} registered`, 
            time: new Date(user.createdAt).toLocaleDateString() 
          });
        });
        setRecentActivity(activities.slice(0, 5));
      }
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, [navigate]);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username || "Admin"}! 👋
          </h1>
          <p className="text-white/50">Here's your overview</p>
        </div>

        {/* Right Side - Avatar + Notifications */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
  <button 
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative text-white/70 hover:text-white transition  cursor-pointer"
  >
    <FiBell className="w-6 h-6  cursor-pointer" />
    {pendingOrdersCount > 0 && (
      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ">
        {pendingOrdersCount}
      </span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 top-12 w-72 bg-[#1a2a1a] rounded-2xl border border-white/10 p-4 shadow-xl z-50 r">
      <h3 className="text-white font-semibold mb-2">Pending Orders</h3>
      {recentOrders.filter(o => o.status === "Pending").length > 0 ? (
        recentOrders.filter(o => o.status === "Pending").map(order => (
          <div key={order._id} className="text-white/70 text-sm py-1 border-b border-white/5">
            {order.orderId} - {order.customer}
          </div>
        ))
      ) : (
        <p className="text-white/50 text-sm">No pending orders</p>
      )}
      <button 
        onClick={() => {
          setShowNotifications(false);
          handleNavigation("/dashboard/orders");
        }}
        className="mt-2 text-green-400 text-sm hover:text-green-300"
      >
        View All Orders →
      </button>
    </div>
  )}
</div>

          {/* Admin Avatar */}
          {user?.profileImage ? (
            <img 
              src={`http://localhost:5000${user.profileImage}`} 
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <FiPackage className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-white">{dashboardStats?.totalProducts || 0}</span>
          </div>
          <h3 className="text-white/60 text-sm">Total Products</h3>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center">
              <FiShoppingBag className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-white">{dashboardStats?.totalOrders || 0}</span>
          </div>
          <h3 className="text-white/60 text-sm">Total Orders</h3>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
              <FiUsers className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-white">{dashboardStats?.totalUsers || 0}</span>
          </div>
          <h3 className="text-white/60 text-sm">Total Users</h3>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
              <FiDollarSign className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-white">${dashboardStats?.totalRevenue || 0}</span>
          </div>
          <h3 className="text-white/60 text-sm">Total Revenue</h3>
        </div>
      </div>

      {/* Recent Orders & Top Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <div className="lg:col-span-2 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <button 
              onClick={() => handleNavigation("/dashboard/orders")}
              className="text-green-400 text-sm hover:text-green-300"
            >
              View All →
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-white/40 text-xs font-medium">Order ID</th>
                  <th className="text-left py-3 text-white/40 text-xs font-medium">Customer</th>
                  <th className="text-left py-3 text-white/40 text-xs font-medium">Product</th>
                  <th className="text-left py-3 text-white/40 text-xs font-medium">Amount</th>
                  <th className="text-left py-3 text-white/40 text-xs font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-3 text-white/80 text-sm">{order.orderId || order.id}</td>
                    <td className="py-3 text-white/80 text-sm">{order.customer}</td>
                    <td className="py-3 text-white/80 text-sm">{order.product || order.products?.[0]?.name}</td>
                    <td className="py-3 text-white/80 text-sm">${order.total || order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Shipped" ? "bg-blue-500/20 text-blue-300" :
                        order.status === "Processing" ? "bg-yellow-500/20 text-yellow-300" :
                        order.status === "Delivered" ? "bg-green-500/20 text-green-300" :
                        "bg-gray-500/20 text-gray-300"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-bold text-sm">#{index + 1}</span>
                  <span className="text-white/80 text-sm">{product.name}</span>
                </div>
                <span className="text-white/50 text-sm">{product.sales} sold</span>
              </div>
            ))}
            {topProducts.length === 0 && (
              <div className="text-white/50 text-center py-4">No products sold yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Sales Chart & Recent Activity */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="lg:col-span-2 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Weekly Sales</h2>
          {weeklySalesData.length > 0 ? (
            <>
              <div className="flex items-end gap-3 h-48">
                {weeklySalesData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-lg transition-all hover:opacity-80"
                      style={{ height: `${Math.min((day.sales / 10000) * 100, 100)}%` }}
                    ></div>
                    <span className="text-white/40 text-xs">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-white/50 text-xs">Sales ($)</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-white/50 text-center py-12">No sales data available</div>
          )}
        </div>

       
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                <FiClock className="text-green-400 mt-0.5 text-sm" />
                <div>
                  <p className="text-white/80 text-sm">{activity.action}</p>
                  <p className="text-white/30 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="text-white/50 text-center py-4">No recent activity</div>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardMain;