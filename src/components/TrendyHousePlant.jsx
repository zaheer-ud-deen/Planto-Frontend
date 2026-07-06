import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const TrendyHousePlant = () => {
  const [plants, setPlants] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // First try to get featured products
      const response = await fetch("http://localhost:5000/api/products?isFeatured=true");
      const data = await response.json();
      
      if (data.success && data.products.length > 0) {
        // If featured products exist, use them
        const formattedPlants = data.products.map(product => ({
          id: product._id,
          label: product.category,
          name: product.name,
          image: product.image,
          price: product.price,
          _id: product._id
        }));
        setPlants(formattedPlants);
      } else {
        // If no featured products, get any products
        const allResponse = await fetch("http://localhost:5000/api/products");
        const allData = await allResponse.json();
        if (allData.success && allData.products.length > 0) {
          const formattedPlants = allData.products.map(product => ({
            id: product._id,
            label: product.category,
            name: product.name,
            image: product.image,
            price: product.price,
            _id: product._id
          }));
          setPlants(formattedPlants);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + plants.length) % plants.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % plants.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Add to Cart Function
  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id || product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    addToCart(cartProduct);
     toast.success(`${product.name} added to cart! 🛒`, {
  position: "top-right"
});
  };

  if (loading) {
    return (
      <aside className="rounded-[64px] border border-white/25 bg-white/[0.06] px-17 pb-6 pt-1 text-white shadow-2xl shadow-black/25 backdrop-blur-sm lg:mt-8 mx-[40px] relative min-h-[400px]">
        <div className="text-center py-10 text-white/50">Loading...</div>
      </aside>
    );
  }

  if (plants.length === 0) {
    return (
      <aside className="rounded-[64px] border border-white/25 bg-white/[0.06] px-17 pb-6 pt-1 text-white shadow-2xl shadow-black/25 backdrop-blur-sm lg:mt-8 mx-[40px] relative min-h-[400px]">
        <div className="text-center py-10 text-white/50">No products available</div>
      </aside>
    );
  }

  const current = plants[currentSlide];

  return (
    <aside className="rounded-[64px] border border-white/25 bg-white/[0.06] px-17 pb-1 pt-1 text-white shadow-2xl shadow-black/25 backdrop-blur-sm lg:mt-8 mx-[40px] relative min-h-[400px]">
      {/* <Toaster position="top-right" /> */}

      <div className="h-64 flex items-center justify-center -mt-20">
        <img
          src={current.image.startsWith("http") ? current.image : `http://localhost:5000${current.image}`}
          alt={current.name}
          className="h-56 w-48 object-contain"
        />
      </div>

      <div className="-mt-9">
        <p className="text-sm text-white/75">{current.label}</p>
        <div className="mt-3 flex items-center justify-between gap-5">
          <h2 className="text-1xl font-medium text-white">
            {current.name}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous plant"
              className="text-2xl text-white/80 hover:text-white transition"
            >
              <span className="cursor-pointer">
                <FiChevronLeft />
              </span>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next plant"
              className="text-2xl text-white/80 hover:text-white transition"
            >
              <span className="cursor-pointer">
                <FiChevronRight />
              </span>
            </button>
          </div>
        </div>
        <p className="text-sm text-green-400 mt-1">${current.price}</p>
        
        {/* Updated Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(current)}
          className="mt-3 w-full rounded-lg border border-white/50 px-6 py-2 text-sm font-medium text-white transition hover:border-green-500 hover:bg-green-700 cursor-pointer"
        >
          Add to Cart 🛒
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {plants.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition ${
              index === currentSlide
                ? "h-2 w-6 rounded-full bg-white/80"
                : "h-2 w-2 rounded-full bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to plant ${index + 1}`}
          />
        ))}
      </div>
    </aside>
  );
};

export default TrendyHousePlant;