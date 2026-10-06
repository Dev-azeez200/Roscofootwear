import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminTopbar from "../components/admin/AdminTopbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />

      <div className="flex min-w-0">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 pt-16 lg:ml-64">
          <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
