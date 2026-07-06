import { useState } from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Handle subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-[#1a2620] text-white">
      <div className="max-w-7xl mx-auto px-6 py-1 lg:px-8 pt-13">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left Section - Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-6 mt-0">
              <img src={logo} alt="Planto" className="h-10 w-10 object-contain mb-4"  />
              <h2 className="text-2xl font-bold text-white">Planto.</h2>
            </div>
            <p className="text-sm leading-6 text-white/70 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-7 mt-2 pb-0 pt-1" >
              <a href="#" className="text-base font-semibold text-white/80 hover:text-white transition">
                FB
              </a>
              <a href="#" className="text-base font-semibold text-white/80 hover:text-white transition">
                TW
              </a>
              <a href="#" className="text-base font-semibold text-white/80 hover:text-white transition">
                LI
              </a>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="pl-1 lg:pl-28">
            <h3 className="text-xl font-bold text-white mb-8 ">Quick Link's</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-base text-white/75 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/75 hover:text-white transition flex items-center gap-2">
                  Plant Types
                  <span className="text-xs">▼</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/75 hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-white/75 hover:text-white transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8">For Every Update's</h3>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 text-sm text-white bg-transparent border border-white/40 rounded-l-lg focus:outline-none focus:border-white/60 placeholder-white/50"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 bg-white text-[#1a2620] font-semibold text-sm rounded-r-lg hover:bg-white/90 transition"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className=" border-white/15 " >
          <p className="text-center text-sm text-white/60">
            Planto © All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
