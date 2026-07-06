import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#172218] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-white/50 mb-6">Looks like you haven't added any plants yet.</p>
          <Link to="/" className="px-6 py-2 bg-green-500 rounded-xl text-white hover:bg-green-600 transition">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#172218] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
        
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white/[0.04] rounded-2xl border border-white/10 p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-white font-semibold">{item.name}</h3>
                <p className="text-green-400">${item.price}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-white/20 text-white hover:bg-green-500 transition"
                >
                  -
                </button>
                <span className="text-white w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-white/20 text-white hover:bg-green-500 transition"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-6 mt-8">
          <div className="flex justify-between items-center">
            <span className="text-white text-lg">Total:</span>
            <span className="text-green-400 text-2xl font-bold">${getTotalPrice()}</span>
          </div>
            <Link to="/checkout">
               <button className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition">
                  Proceed to Checkout
              </button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;