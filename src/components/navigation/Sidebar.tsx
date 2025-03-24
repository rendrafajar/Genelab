import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Database,
  Filter,
  Calendar,
  BarChart3,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  School,
} from "lucide-react";

interface SidebarProps {
  userRole?: "admin" | "user" | "viewer";
  onLogout?: () => void;
}

const Sidebar = ({ userRole = "admin", onLogout = () => {} }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      roles: ["admin", "user", "viewer"],
    },
    {
      title: "Manajemen Data",
      path: "/data-management",
      icon: <Database size={20} />,
      roles: ["admin", "user"],
    },
    {
      title: "Batasan",
      path: "/constraints",
      icon: <Filter size={20} />,
      roles: ["admin", "user"],
    },
    {
      title: "Generator Jadwal",
      path: "/schedule-generator",
      icon: <Calendar size={20} />,
      roles: ["admin", "user"],
    },
    {
      title: "Lihat Jadwal",
      path: "/schedule-view",
      icon: <Calendar size={20} />,
      roles: ["admin", "user", "viewer"],
    },
    {
      title: "Laporan",
      path: "/reports",
      icon: <BarChart3 size={20} />,
      roles: ["admin", "user", "viewer"],
    },
    {
      title: "Manajemen Pengguna",
      path: "/user-management",
      icon: <Users size={20} />,
      roles: ["admin"],
    },
    {
      title: "Pengaturan",
      path: "/settings",
      icon: <Settings size={20} />,
      roles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <School size={24} className="text-primary" />
            <h1 className="text-xl font-bold">SMK Scheduler</h1>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <School size={24} className="text-primary" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-2">
        <nav className="space-y-1">
          {filteredNavItems.map((item) => (
            <TooltipProvider key={item.path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-slate-800 text-primary"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    )}
                  >
                    <span className="mr-3 text-slate-400">{item.icon}</span>
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.title}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-slate-800 p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "flex w-full items-center justify-start rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                  collapsed && "justify-center px-0",
                )}
                onClick={onLogout}
              >
                <LogOut size={20} className="mr-3 text-slate-400" />
                {!collapsed && <span>Keluar</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Keluar</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
