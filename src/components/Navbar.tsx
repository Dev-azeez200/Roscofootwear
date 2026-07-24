import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import assets from "../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-12">
        <div>
          <img
            src={assets.FootLogo}
            className="w-24 sm:w-28 md:w-32 lg:w-36"
            alt="logo"
          />
        </div>

        <div className="hidden lg:flex items-center gap-8 xl:gap-10 font-semibold">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="#shop" className="hover:underline">
            Shop
          </a>
        </div>

        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col gap-6 px-6 pb-6 font-semibold bg-white shadow-md border-t">
          <a href="/" onClick={() => setOpen(false)}>
            Home
          </a>
          <a href="#shop" onClick={() => setOpen(false)}>
            About
          </a>

          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-lg w-45"
          >
            Reserve A Sit Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
