import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch(`https://planto-backend-production.up.railway.app/api/verify-payment/${sessionId}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#172218] flex items-center justify-center">
        <div className="text-white text-xl">Verifying payment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#172218] flex items-center justify-center px-6">
      <div className="bg-white/[0.06] rounded-3xl border border-white/20 p-8 max-w-lg w-full text-center">
        <FiCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful! 🎉</h1>
        <p className="text-white/60 mb-2">Thank you for your order!</p>
        {order && (
          <p className="text-white/40 text-sm mb-4">
            Order ID: <span className="text-green-400 font-semibold">{order.orderId}</span>
          </p>
        )}
        <Link to="/">
          <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;