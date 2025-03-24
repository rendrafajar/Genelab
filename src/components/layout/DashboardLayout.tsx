import React, { useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "admin" | "user" | "viewer";
}

const DashboardLayout = ({
  children,
  userRole = "admin",
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Extract the current page title from the path
  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];
    if (!path) return "Dashboard";

    // Convert path to title case with spaces
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    // Redirect to login page or clear auth state
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "block" : "hidden"} h-full lg:block`}>
        <Sidebar userRole={userRole} onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={getPageTitle()}
          onToggleSidebar={handleToggleSidebar}
          userName="Admin Sekolah"
          userRole={userRole}
          notificationCount={3}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} SMK Scheduler - Sistem Penjadwalan
            Otomatis dengan Algoritma Genetika
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
