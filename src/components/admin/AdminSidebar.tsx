import { NavLink } from "react-router-dom";

import { BiSolidDashboard, BiBox } from "react-icons/bi";
import { MdOutlineShoppingBag, MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const links = [
  { to: "/admin/overview", label: "Overview", icon: BiSolidDashboard },
  { to: "/admin/order", label: "Order", icon: MdOutlineShoppingBag },
  { to: "/admin/product", label: "Products", icon: BiBox },
  { to: "/admin/custormars", label: "Customers", icon: MdOutlinePeopleAlt },
  { to: "/admin/performance", label: "Performance", icon: MdOutlineAnalytics },
  { to: "/admin/settings", label: "Settings", icon: IoSettingsOutline },
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 z-50
          h-[calc(100vh-4rem)]
          w-64
          rounded-r-2xl
          border-r border-gray-200
          bg-white
          p-5
          shadow-lg
          transition-transform duration-300
          lg:translate-x-0 lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3
                text-[16px] font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-rosco text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-rosco"
                }`
              }
            >
              <link.icon className="text-xl shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
