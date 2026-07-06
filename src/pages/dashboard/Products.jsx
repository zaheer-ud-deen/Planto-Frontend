// src/pages/dashboard/Products.jsx
import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from "react-icons/fi";
import { productApi } from "../../api/productApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Succulents Plants",
    image: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAll();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🔍 DEBUG: Check what's being sent
    console.log("📤 Submitting product:", {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      category: formData.category,
      stock: formData.stock,
      image: formData.image instanceof File ? formData.image.name : formData.image
    });
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);
    
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    }
    
    try {
      if (editingProduct) {
        await productApi.update(editingProduct._id, formDataToSend);
      } else {
        await productApi.create(formDataToSend);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("❌ Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await productApi.delete(id);
      fetchProducts();
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "Succulents Plants",
        image: product.image || "",
        stock: product.stock || ""
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        name: "", 
        price: "", 
        description: "", 
        category: "Succulents Plants", 
        image: "", 
        stock: "" 
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white hover:shadow-lg transition cursor-pointer"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#1a2a1a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-[#1a2a1a] rounded-2xl border border-white/10 overflow-hidden hover:bg-[#1e2e1e] transition">
            <img 
                 src={`https://planto-backend-production.up.railway.app${product.image}`} 
                 alt={product.name} 
                 className="w-full h-48 object-cover" 
              />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openModal(product)} 
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    <FiEdit2 />
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-400 font-bold text-lg">${product.price}</span>
                <span className="text-white/50 text-xs">Stock: {product.stock}</span>
              </div>
              <span className="inline-block mt-2 px-2 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-white/50 py-12">No products found</div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2a1a] rounded-2xl w-full max-w-md p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{editingProduct ? "Edit Product" : "Add Product"}</h2>
              <button 
                onClick={closeModal} 
                className="text-white/50 hover:text-white cursor-pointer"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Product Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" 
                required 
              />

              <input 
                type="number" 
                placeholder="Price" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" 
                required 
              />

              <textarea 
                placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" 
                rows="3" 
                required 
              />

              <select 
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white focus:outline-none focus:border-green-500 cursor-pointer"
              >
                <option>Succulents Plants</option>
                <option>Indoor Plants</option>
                <option>Outdoor Plants</option>
              </select>

              <div>
                <label className="block text-white/70 text-sm mb-2">Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
                  required={!editingProduct}
                />
                {editingProduct && formData.image && typeof formData.image === 'string' && (
                  <p className="text-white/50 text-xs mt-1">Current image: {formData.image}</p>
                )}
              </div>

              <input 
                type="number" 
                placeholder="Stock" 
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 bg-[#0a1a0a] border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-green-500" 
                required 
              />

              <button 
                type="submit" 
                className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition cursor-pointer"
              >
                {editingProduct ? "Update" : "Create"} Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;