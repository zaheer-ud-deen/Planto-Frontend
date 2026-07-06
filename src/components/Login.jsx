// components/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect to dashboard
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172218] to-[#0f1810] flex items-center justify-center py-2 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/[0.06] backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-10 shadow-2xl">
          
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
            <p className="text-white/50 text-sm">Welcome back to Planto</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* forgot password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-green-400 hover:text-green-300 text-sm transition">
                
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={` cursor-pointer w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-green-500/30"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Signup Link */}
            <div className="text-center pt-2">
              <p className="text-white/50 text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium transition">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;