import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import ViewerDashboard from "@/components/dashboard/ViewerDashboard";

interface DashboardPageProps {
  userRole?: "admin" | "user" | "viewer";
  userName?: string;
  schoolName?: string;
}

const DashboardPage = (props: DashboardPageProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "user" | "viewer">(
    props.userRole || "admin",
  );
  const [userName, setUserName] = useState<string>(
    props.userName || "Admin Sekolah",
  );
  const [schoolName, setSchoolName] = useState<string>(
    props.schoolName || "SMK Negeri 1",
  );

  // Get user data from localStorage on component mount
  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole") as
      | "admin"
      | "user"
      | "viewer"
      | null;
    const storedUserName = localStorage.getItem("userName");
    const storedSchoolName = localStorage.getItem("schoolName");

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedSchoolName) {
      setSchoolName(storedSchoolName);
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Stats data for admin dashboard
  const adminStats = {
    teachers: 45,
    classes: 24,
    rooms: 30,
    subjects: 38,
  };

  // Recent schedules for admin dashboard
  const recentSchedules = [
    {
      id: "1",
      name: "Jadwal Semester Ganjil 2023/2024",
      date: "15 Juli 2023",
      status: "active" as const,
    },
    {
      id: "2",
      name: "Jadwal Ujian Akhir Semester",
      date: "10 Desember 2023",
      status: "draft" as const,
    },
    {
      id: "3",
      name: "Jadwal Semester Genap 2022/2023",
      date: "5 Januari 2023",
      status: "archived" as const,
    },
  ];

  // User dashboard data
  const userRecentSchedules = [
    {
      id: "1",
      title: "Jadwal Semester Ganjil 2023/2024",
      date: "15 Juli 2023",
    },
    {
      id: "2",
      title: "Jadwal Ujian Tengah Semester",
      date: "10 Oktober 2023",
    },
  ];

  const userNotifications = [
    { title: "Jadwal baru telah dibuat", time: "Hari ini, 10:30", isNew: true },
    {
      title: "Perubahan jadwal ruang Lab Komputer",
      time: "Kemarin, 14:15",
      isNew: true,
    },
    {
      title: "Pengumuman libur nasional",
      time: "3 hari yang lalu",
      isNew: false,
    },
  ];

  // Render loading state
  if (isLoading) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-lg font-medium">Memuat Dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Render appropriate dashboard based on user role
  return (
    <DashboardLayout userRole={userRole}>
      {userRole === "admin" && (
        <AdminDashboard
          userName={userName}
          schoolName={schoolName}
          stats={adminStats}
          recentSchedules={recentSchedules}
        />
      )}

      {userRole === "user" && (
        <UserDashboard
          userName={userName}
          recentSchedules={userRecentSchedules}
          notifications={userNotifications}
        />
      )}

      {userRole === "viewer" && (
        <ViewerDashboard
          userName={userName}
          lastUpdated="10 Mei 2023, 14:30 WIB"
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
