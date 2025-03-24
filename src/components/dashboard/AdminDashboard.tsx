import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  Database,
  Filter,
  Users,
  Settings,
  ArrowRight,
  Clock,
  School,
  BookOpen,
  Home,
} from "lucide-react";

interface AdminDashboardProps {
  userName?: string;
  schoolName?: string;
  stats?: {
    teachers: number;
    classes: number;
    rooms: number;
    subjects: number;
  };
  recentSchedules?: {
    id: string;
    name: string;
    date: string;
    status: "active" | "draft" | "archived";
  }[];
}

const AdminDashboard = ({
  userName = "Admin",
  schoolName = "SMK Negeri 1",
  stats = {
    teachers: 45,
    classes: 24,
    rooms: 30,
    subjects: 38,
  },
  recentSchedules = [
    {
      id: "1",
      name: "Jadwal Semester Ganjil 2023/2024",
      date: "15 Juli 2023",
      status: "active",
    },
    {
      id: "2",
      name: "Jadwal Ujian Akhir Semester",
      date: "10 Desember 2023",
      status: "draft",
    },
    {
      id: "3",
      name: "Jadwal Semester Genap 2022/2023",
      date: "5 Januari 2023",
      status: "archived",
    },
  ],
}: AdminDashboardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "draft":
        return "Draft";
      case "archived":
        return "Diarsipkan";
      default:
        return status;
    }
  };

  const quickAccessItems = [
    {
      title: "Manajemen Data",
      description: "Kelola data guru, kelas, ruangan, dan mata pelajaran",
      icon: <Database className="h-10 w-10 text-blue-600" />,
      link: "/data-management",
      color: "bg-blue-50",
    },
    {
      title: "Batasan Penjadwalan",
      description: "Atur batasan dan preferensi untuk penjadwalan",
      icon: <Filter className="h-10 w-10 text-purple-600" />,
      link: "/constraints",
      color: "bg-purple-50",
    },
    {
      title: "Generator Jadwal",
      description: "Buat jadwal baru menggunakan algoritma genetika",
      icon: <Calendar className="h-10 w-10 text-green-600" />,
      link: "/schedule-generator",
      color: "bg-green-50",
    },
    {
      title: "Laporan",
      description: "Lihat statistik dan laporan jadwal",
      icon: <BarChart3 className="h-10 w-10 text-orange-600" />,
      link: "/reports",
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="flex min-h-full w-full flex-col bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Selamat Datang, {userName}!</h1>
            <p className="mt-2 text-blue-100">
              Sistem Penjadwalan Otomatis {schoolName}
            </p>
          </div>
          <School className="h-16 w-16 text-white opacity-80" />
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link to="/schedule-generator">
              Buat Jadwal Baru <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link to="/schedule-view">
              Lihat Jadwal Aktif <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Guru</p>
              <h3 className="text-2xl font-bold">{stats.teachers}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-green-100 p-3">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kelas</p>
              <h3 className="text-2xl font-bold">{stats.classes}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-purple-100 p-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Mata Pelajaran
              </p>
              <h3 className="text-2xl font-bold">{stats.subjects}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-orange-100 p-3">
              <Home className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Ruangan
              </p>
              <h3 className="text-2xl font-bold">{stats.rooms}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Akses Cepat</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {quickAccessItems.map((item, index) => (
            <Card
              key={index}
              className="border-none shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div
                  className={`mb-4 inline-block rounded-lg p-3 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link to={item.link}>
                    Akses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Schedules Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Jadwal Terbaru</h2>
          <Button variant="ghost" asChild>
            <Link to="/schedule-view">Lihat Semua</Link>
          </Button>
        </div>
        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                      Nama Jadwal
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                      Tanggal Dibuat
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentSchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-b transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4 text-sm">{schedule.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {schedule.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                            schedule.status,
                          )}`}
                        >
                          {getStatusText(schedule.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/schedule-view/${schedule.id}`}>
                            Lihat
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
