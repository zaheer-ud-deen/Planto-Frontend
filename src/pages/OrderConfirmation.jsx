import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`https://planto-backend-production.up.railway.app/api/orders/${id}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#172218] flex items-center justify-center">
        <div className="text-white text-xl">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#172218] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
          <Link to="/" className="text-green-400 hover:text-green-300">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#172218] flex items-center justify-center px-6">
      <div className="bg-white/[0.06] rounded-3xl border border-white/20 p-8 max-w-lg w-full text-center">
        <FiCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Order Placed! 🎉</h1>
        <p className="text-white/60 mb-2">Thank you for your order!</p>
        <p className="text-white/40 text-sm mb-4">Order ID: <span className="text-green-400 font-semibold">{order.orderId}</span></p>
        
        <div className="bg-white/5 rounded-xl p-4 text-left mb-6">
          <p className="text-white/70 text-sm">Total: <span className="text-green-400 font-bold">${order.total}</span></p>
          <p className="text-white/50 text-sm mt-1">Status: <span className="text-yellow-400">{order.status}</span></p>
        </div>

        <Link to="/">
          <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;