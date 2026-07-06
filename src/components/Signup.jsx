// components/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    setError(" Please Enter Correct Details");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setError("oh my yes");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-20 bg-gradient-to-b from-[#172218] to-[#0f1810] flex items-center justify-center py-1  px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/6 backdrop-blur-sm rounded-3xl border border-white/20 p-4 md:p-10 shadow-2xl">
          
          <div className="text-center mb-0">
            <h1 className="text-4xl font-bold text-white mb-1">Sign Up</h1>
            <p className="text-white/50 text-sm">Create your Planto account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="block text-white/70 text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500 transition-all"
                placeholder="Create a password"
              />
            </div>

            <div className="text-right">
              <Link to="/login" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
                Login
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-green-500/30"
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <div className="text-center pt-2">
              <p className="text-white/50 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;