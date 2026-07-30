import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import assets from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <img
              src={assets.Goldlogo}
              alt="Rosco Footwear"
              className="lg:w-35 w-30"
            />

            <p className="mt-8 max-w-sm text-black leading-5 text-sm">
              Redefining modern luxury through heritage craftsmanship and
              minimalist design.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-rosco hover:text-white transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-rosco hover:text-white transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-rosco hover:text-white transition"
              >
                <FaXTwitter size={14} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-6">Shop Categories</h3>

            <ul className="space-y-3 text-black  text-sm">
              <li className="hover:text-rosco">
                <a href="#">Sneakers</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Boots</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Loafers</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Formal</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-6">Support</h3>

            <ul className="space-y-3 text-black text-sm">
              <li className="hover:text-rosco">
                <a href="#">Shipping Policy</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Returns & Exchanges</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Size Guide</a>
              </li>
              <li className="hover:text-rosco">
                <a href="#">Track Order</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black mb-6">Contact</h3>

            <ul className="space-y-3 text-black text-sm">
              <li className="hover:text-rosco">Gbomosho</li>
              <li className="hover:text-rosco">aladet@.com</li>
              <li className="hover:text-rosco">+234 8103007867</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Rosco Footwear. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-rosco transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-rosco transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-rosco transition">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
