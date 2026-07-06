import { Link } from "react-router-dom";
import { FiChevronDown, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import FiMenu from "../assets/hamburger.svg";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const navItems = [
  { name: "Home", path: "/" },
  { name: "Plant Types", path: "/plant-type" },
  { name: "More", path: "/#more" },
  { name: "Contact", path: "/contact" }
];

const plantCategories = [
  { name: "Succulents Plants", path: "/SucculentsPlants" },
  { name: "Indoor Plants", path: "/IndoorPlants" },
  { name: "Outdoor Plants", path: "/OutdoorPlants" }
];

const NavBar = () => {
  const navigate = useNavigate();
const { getTotalItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMoreClick = () => {
    window.location.href = "/#more";
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full bg-[#172218] relative z-50">
      <nav className="mx-auto flex h-[70px] max-w-[1633px] items-center justify-between px-7 text-white">
        <Link to="/" className="flex items-center gap-0.2 mx-[0px]" onClick={() => setIsMobileMenuOpen(false)}>
          <img
            src={logo}
            alt="Planto"
            className="h-[52px] w-[52px] object-contain pb-[3px] px-[0px] mt-[-15px]"
          />
          <span className="text-[23px] font-bold leading-none text-white px-[-20px] pb-[0px]">
            Planto.
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-[43px] text-[15px] font-normal text-white/90 md:flex">
          {navItems.map((item) => (
            <li key={item.name} className={item.name === "Plant Types" ? "relative" : ""}>
              {item.name === "More" ? (
                <button
                  onClick={handleMoreClick}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{item.name}</span>
                </button>
              ) : item.name === "Plant Types" ? (
                <div ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
                  >
                    <span>{item.name}</span>
                    <FiChevronDown 
                      className={`h-3 w-3 stroke-[1.8] transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-[#1a2820] border border-white/20 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                      {plantCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item.path} className="flex items-center gap-1.5">
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[19px] text-white/80">
          <button type="button" aria-label="Search" className="grid h-5 w-5 place-items-center">
            <FiSearch className="h-[17px] w-[17px] stroke-[1.6] cursor-pointer" />
          </button>
          <button 
  type="button" 
  aria-label="Cart" 
  className="grid h-5 w-5 place-items-center relative cursor-pointer"
  onClick={() => navigate("/cart")}
>
  <FiShoppingBag className="h-[17px] w-[17px] stroke-[1.6]" />
  {getTotalItems() > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
      {getTotalItems()}
    </span>
  )}
</button>
          <Link to="/signup">
          <button type="button" aria-label="User" className="grid h-5 w-5 place-items-center">
          <FiUser className="h-[17px] w-[17px] stroke-[1.6] cursor-pointer" />
          </button>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            type="button" 
            aria-label="Menu" 
            className="grid h-5 w-5 place-items-center md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <FiX className="h-[20px] w-[20px] stroke-[1.7]" />
            ) : (
              <img src={FiMenu} className="h-[17px] w-[17px] stroke-[1.7]" alt="menu" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile Menu */}
          <div className="md:hidden absolute top-[70px] left-0 right-0 bg-[#172218] border-t border-white/20 py-6 px-6 z-50 shadow-xl max-h-[calc(100vh-70px)] overflow-y-auto">
            <ul className="flex flex-col gap-5">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.name === "More" ? (
                    <button
                      onClick={handleMoreClick}
                      className="flex items-center justify-between w-full text-white/90 hover:text-green-400 py-2 text-[17px]"
                    >
                      <span>{item.name}</span>
                    </button>
                  ) : item.name === "Plant Types" ? (
                    <div>
                      <div className="flex items-center justify-between w-full text-white/90 py-2 text-[17px]">
                        <span>{item.name}</span>
                        <FiChevronDown 
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {isDropdownOpen && (
                        <div className="ml-4 mt-2 space-y-2 border-l border-white/20 pl-4">
                          {plantCategories.map((category) => (
                            <Link
                              key={category.name}
                              to={category.path}
                              className="block text-white/70 hover:text-green-400 py-2 text-[15px]"
                              onClick={() => {
                                setIsDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center justify-between w-full text-white/90 hover:text-green-400 py-2 text-[17px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default NavBar;