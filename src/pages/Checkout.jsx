import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    
    customer: "",
    email: "",
    phone: "",
    shippingAddress: ""
  });
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.customer || !formData.email || !formData.shippingAddress) {
    toast.error("Please fill all required fields");
    return;
  }

  setLoading(true);

  try {
    // ✅ Step 1: Save order to database FIRST
    const orderResponse = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: formData.customer,
        email: formData.email,
        products: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotalPrice(),
        shippingAddress: formData.shippingAddress,
        status: "Pending"
      })
    });

    const orderData = await orderResponse.json();

    if (!orderData.success) {
      toast.error("Failed to create order");
      setLoading(false);
      return;
    }

    // ✅ Step 2: Then create Stripe session with order ID
    const stripeResponse = await fetch("http://localhost:5000/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        customer: formData.customer,
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        orderId: orderData.order._id
      })
    });

    const stripeData = await stripeResponse.json();

    if (stripeData.url) {
      window.location.href = stripeData.url;
    } else {
      toast.error("Failed to create checkout session");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#172218] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-white/50 mb-6">Add some plants to your cart first!</p>
          <Link to="/" className="px-6 py-2 bg-green-500 rounded-xl text-white hover:bg-green-600 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#172218] py-12 px-6">
      {/* <Toaster position="top-right" /> */}
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Order Summary */}
          <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-green-400">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-semibold">Total:</span>
                <span className="text-green-400 text-2xl font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Shipping Form */}
          <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Shipping Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">Full Name *</label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">Shipping Address *</label>
                <textarea
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  placeholder="123 Plant Street, Garden City"
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-green-500/30"
                }`}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <Link to="/cart" className="block text-center text-white/50 text-sm hover:text-white transition">
                ← Back to Cart
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;