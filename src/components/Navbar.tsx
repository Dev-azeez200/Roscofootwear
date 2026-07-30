import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiHeart, FiShoppingBag } from "react-icons/fi";
import assets from "../assets/assets";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/aboutus", name: "About Us" },
    { path: "/shop", name: "Shop" },
    { path: "/men", name: "Men" },
    { path: "/women", name: "Women" },
    { path: "/collections", name: "Collections" },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-17.5 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto h-full px-2 gap-62 md:gap-[570px] lg:px-6 flex items-center lg:justify-between lg:gap-0">
        <img
          src={assets.Goldlogo}
          alt="Logo"
          className="w-28 md:w-34 lg:w-36 object-contain"
        />

        <ul
          className={`flex lg:flex-row flex-col items-center gap-8 text-[15px]
          lg:static absolute left-0 top-17.5 w-full lg:w-auto
          bg-white lg:bg-transparent
          h-[calc(100vh-70px)] lg:h-auto
          p-8 lg:p-0
          transition-all duration-300
          ${open ? "translate-y-0" : "translate-y-[-120%] lg:translate-y-0 "}`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `transition  ${
                  isActive
                    ? "border-b-2 hover:border-rosco text-rosco font-medium"
                    : "text-black hover:text-rosco"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex lg:hidden items-center gap-8 pt-8 border-t border-gray-200 w-full justify-center ">
            <button className="text-2xl">
              <FiSearch />
            </button>

            <button className="text-2xl">
              <FiHeart />
            </button>

            <button
              className="relative text-2xl"
              onClick={() => navigate("/cart")}
            >
              <FiShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </ul>

        <div className="hidden lg:flex items-center gap-5  lg:px-4">
          <button className="text-xl hover:text-rosco transition">
            <FiSearch />
          </button>

          <button className="text-xl hover:text-rosco transition">
            <FiHeart />
          </button>

          <button
            className="relative text-xl hover:text-rosco transition"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
