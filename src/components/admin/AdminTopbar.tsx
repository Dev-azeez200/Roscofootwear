import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

type AdminTopbarProps = {
  username?: string;
  isSidebarOpen: boolean;
  onMenuClick: () => void;
};

const AdminTopbar = ({
  username = "RA",
  isSidebarOpen,
  onMenuClick,
}: AdminTopbarProps) => {
  const getProfileInitials = (name: string) => {
    if (!name) return "";
    const cleanName = name.trim().replace(/\s+/g, "");
    if (cleanName.length === 1) return cleanName.toUpperCase();
    return (cleanName[0] + cleanName[cleanName.length - 1]).toUpperCase();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label={
              isSidebarOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link
            to="/admin/overview"
            className="text-lg font-semibold text-gray-900"
          >
            Rosco Admin
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="cursor-pointer text-gray-600 hover:text-gray-900">
            <FaRegBell className="h-5 w-5" />
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rosco font-semibold text-white">
            {getProfileInitials(username)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
