import { useState, useEffect } from "react";
import SucculentsSection from "../components/SucculentsPlants";
import out1 from "../assets/out1.jpg"
import out2 from "../assets/out2.jpg"
import out3 from "../assets/out3.jpg"
import out4 from "../assets/out4.jpg"
import out5 from "../assets/out5.jpg"
import out6 from "../assets/out6.jpg"
import out7 from "../assets/out7.jpg"
import Footer from "../components/Footer"

function OutdoorPlants() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://planto-backend-production.up.railway.app/api/products?category=Outdoor%20Plants");
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#172218]">
      {/* Product Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-2">Outdoor Plants Collection</h2>
        <p className="text-white/50 mb-8">Transform your garden into a paradise</p>
        
        {loading ? (
          <div className="text-white text-center py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-white/50 text-center py-12">No products in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/[0.06] transition-all">
                <img 
                  src={`https://planto-backend-production.up.railway.app${product.image}`}
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-green-400 font-bold text-xl">${product.price}</span>
                    <span className="text-white/40 text-xs">Stock: {product.stock}</span>
                  </div>
                  <button className="mt-3 w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-medium hover:shadow-lg transition">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     
      
      <Footer />
    </div>
  )
}

export default OutdoorPlants  