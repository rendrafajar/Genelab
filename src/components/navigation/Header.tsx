import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
  userName?: string;
  userRole?: "admin" | "user" | "viewer";
  notificationCount?: number;
}

const Header = ({
  title = "Dashboard",
  onToggleSidebar = () => {},
  userName = "Admin Sekolah",
  userRole = "admin",
  notificationCount = 3,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="hidden md:flex">
            <nav className="flex">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                {title !== "Dashboard" && (
                  <>
                    <li>
                      <ChevronDown className="h-4 w-4" />
                    </li>
                    <li className="font-medium text-foreground">{title}</li>
                  </>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Cari..."
            className="w-[200px] rounded-md border border-input bg-background py-2 pl-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Jadwal Berhasil Dibuat</p>
                  <p className="text-xs text-muted-foreground">
                    Jadwal untuk semester ganjil telah berhasil dibuat
                  </p>
                  <p className="text-xs text-muted-foreground">
                    2 jam yang lalu
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Perubahan Jadwal</p>
                  <p className="text-xs text-muted-foreground">
                    Ada perubahan jadwal untuk kelas X RPL 1
                  </p>
                  <p className="text-xs text-muted-foreground">
                    5 jam yang lalu
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Guru Baru Ditambahkan</p>
                  <p className="text-xs text-muted-foreground">
                    Budi Santoso telah ditambahkan sebagai guru Matematika
                  </p>
                  <p className="text-xs text-muted-foreground">
                    1 hari yang lalu
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-sm font-medium">
              Lihat Semua Notifikasi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pl-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt={userName}
                />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </span>
              </div>
              <ChevronDown className="hidden h-4 w-4 md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
