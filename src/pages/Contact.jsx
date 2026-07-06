// Contact.jsx
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiClock,FiMapPin } from "react-icons/fi";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your Form Submitted Sucessfully");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172218] to-[#0f1810] py-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/[0.06] border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <span className="text-2xl"><FiMapPin className="text-white/70 hover:text-blue-500 cursor-pointer text-2xl" /></span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Address</h3>
                    <p className="text-white/60 text-sm">123 Plant Street, Garden City, PC 12345</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <span className="text-2xl"><FiMail className="text-white/70 hover:text-blue-500 cursor-pointer text-2xl" /></span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-white/60 text-sm">hello@planto.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <span className="text-2xl"><FiPhone className="text-white/70 hover:text-blue-500 cursor-pointer text-2xl" /></span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <p className="text-white/60 text-sm">+1 234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <span className="text-2xl"><FiClock className="text-white/70 hover:text-blue-500 cursor-pointer text-2xl" /></span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Working Hours</h3>
                    <p className="text-white/60 text-sm">Mon-Fri: 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/[0.06] border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <FaFacebook className="text-white/70 hover:text-blue-500 cursor-pointer text-2xl" />
                <FaInstagram className="text-white/70 hover:text-pink-500 cursor-pointer text-2xl" />
                <FaTwitter className="text-white/70 hover:text-blue-400 cursor-pointer text-2xl" />
                <FaLinkedin className="text-white/70 hover:text-blue-600 cursor-pointer text-2xl" />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/[0.06] border border-white/20 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Tell us about your query..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}