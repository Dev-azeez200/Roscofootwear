import { FaGlobe, FaShareAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold">
                R
              </div>

              <h2 className="text-2xl font-semibold text-black">Rosco</h2>
            </div>

            <p className="mt-5 text-gray-500 text-sm leading-7 max-w-xs">
              Refining the landscape of luxury footwear through intentional
              design and unparalleled craftsmanship since 2024.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <FaGlobe size={16} />
              </button>

              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <FaShareAlt size={15} />
              </button>

              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
                <FiMail size={16} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Shop
            </h3>

            <ul className="space-y-4 text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  Men
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Women
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-gray-500">
              <li>
                <a href="#" className="hover:text-black transition">
                  Care Guide
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Shipping
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Size Chart
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Join the Circle
            </h3>

            <p className="text-gray-500 text-sm leading-6 mb-5">
              Stay updated on limited collection drops and private events.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 h-11 rounded-lg bg-gray-100 px-4 text-sm outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="submit"
                className="h-11 px-7 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-gray-500">
          <p>© 2024 Rosco Footwear. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-black transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-black transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
