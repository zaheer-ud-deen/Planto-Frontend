// src/pages/dashboard/Orders.jsx
import { useState, useEffect } from "react";
import { 
  FiSearch, FiEye, FiEdit2, FiTrash2, FiX, FiFilter, 
  FiPackage, FiTruck, FiCheckCircle, FiClock, FiDollarSign
} from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/stats/summary");
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: "DELETE"
        });
        const data = await response.json();
        if (data.success) {
          fetchOrders();
          fetchStats();
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Shipped': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Delivered': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <FiClock className="text-yellow-400" />;
      case 'Processing': return <FiPackage className="text-blue-400" />;
      case 'Shipped': return <FiTruck className="text-purple-400" />;
      case 'Delivered': return <FiCheckCircle className="text-green-400" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Orders Management</h1>
        <p className="text-white/50">Manage and track all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
            </div>
            <FiPackage className="text-green-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</p>
            </div>
            <FiClock className="text-yellow-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Shipped</p>
              <p className="text-2xl font-bold text-purple-400">{stats.shippedOrders}</p>
            </div>
            <FiTruck className="text-purple-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Delivered</p>
              <p className="text-2xl font-bold text-green-400">{stats.deliveredOrders}</p>
            </div>
            <FiCheckCircle className="text-green-400 text-3xl" />
          </div>
        </div>
        <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-400">${stats.totalRevenue}</p>
            </div>
            <FiDollarSign className="text-green-400 text-3xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-11 pr-8 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 cursor-pointer"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#1a2a1a] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Order ID</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Email</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Total</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Date</th>
                <th className="text-left py-4 px-6 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="py-4 px-6 text-white/80 text-sm font-medium">{order.orderId}</td>
                  <td className="py-4 px-6 text-white/80 text-sm">{order.customer}</td>
                  <td className="py-4 px-6 text-white/60 text-sm">{order.email}</td>
                  <td className="py-4 px-6 text-green-400 text-sm font-semibold">${order.total}</td>
                  <td className="py-4 px-6">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/50 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => deleteOrder(order._id)}
                        className="text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center text-white/50 py-12">No orders found</div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2a1a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Order Details</h2>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white cursor-pointer">
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Order ID</p>
                  <p className="text-white font-semibold">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Date</p>
                  <p className="text-white">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Customer</p>
                  <p className="text-white">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="text-white">{selectedOrder.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Payment Method</p>
                  <p className="text-white">{selectedOrder.paymentMethod || 'Card'}</p>
                </div>
              </div>

              <div>
                <p className="text-white/50 text-sm mb-2">Shipping Address</p>
                <p className="text-white bg-white/5 p-3 rounded-xl">{selectedOrder.shippingAddress}</p>
              </div>

              <div>
                <p className="text-white/50 text-sm mb-2">Products</p>
                <div className="space-y-2">
                  {selectedOrder.products?.map((product, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                      <div>
                        <p className="text-white">{product.name}</p>
                        <p className="text-white/50 text-sm">Qty: {product.quantity}</p>
                      </div>
                      <p className="text-green-400">${product.price * product.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold">Total Amount</p>
                  <p className="text-2xl font-bold text-green-400">${selectedOrder.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;