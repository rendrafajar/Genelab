import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Users,
  BookOpen,
  ArrowRight,
  Bell,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScheduleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
}

const ScheduleCard = ({
  title = "Jadwal",
  description = "Lihat jadwal pelajaran terbaru",
  icon = <Calendar className="h-6 w-6" />,
  linkTo = "/schedule-view",
  linkText = "Lihat Jadwal",
}: ScheduleCardProps) => {
  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Placeholder content */}
        <div className="h-32 rounded-md bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Pratinjau jadwal tidak tersedia
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link
            to={linkTo}
            className="flex items-center justify-between w-full"
          >
            <span>{linkText}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface NotificationProps {
  title: string;
  time: string;
  isNew?: boolean;
}

const Notification = ({
  title = "Jadwal baru telah dibuat",
  time = "Hari ini, 10:30",
  isNew = false,
}: NotificationProps) => {
  return (
    <div className="flex items-start gap-3 p-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
      <div
        className={`p-2 rounded-full ${isNew ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"}`}
      >
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-grow">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      {isNew && <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>}
    </div>
  );
};

interface UserDashboardProps {
  userName?: string;
  recentSchedules?: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  notifications?: NotificationProps[];
}

const UserDashboard = ({
  userName = "Pengguna",
  recentSchedules = [
    {
      id: "1",
      title: "Jadwal Semester Ganjil 2023/2024",
      date: "15 Juli 2023",
    },
    { id: "2", title: "Jadwal Ujian Tengah Semester", date: "10 Oktober 2023" },
  ],
  notifications = [
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
  ],
}: UserDashboardProps) => {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Selamat Datang, {userName}
          </h1>
          <p className="text-gray-500">
            Kelola dan lihat jadwal pelajaran SMK dengan mudah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ScheduleCard
            title="Jadwal Kelas"
            description="Lihat jadwal pelajaran per kelas"
            icon={<Users className="h-6 w-6" />}
            linkTo="/schedule-view?view=class"
            linkText="Lihat Jadwal Kelas"
          />
          <ScheduleCard
            title="Jadwal Guru"
            description="Lihat jadwal mengajar per guru"
            icon={<BookOpen className="h-6 w-6" />}
            linkTo="/schedule-view?view=teacher"
            linkText="Lihat Jadwal Guru"
          />
          <ScheduleCard
            title="Jadwal Ruangan"
            description="Lihat penggunaan ruangan"
            icon={<Clock className="h-6 w-6" />}
            linkTo="/schedule-view?view=room"
            linkText="Lihat Jadwal Ruangan"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Jadwal Terbaru</CardTitle>
                <CardDescription>
                  Jadwal yang baru dibuat atau diperbarui
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentSchedules.length > 0 ? (
                  <div className="space-y-4">
                    {recentSchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h3 className="font-medium">{schedule.title}</h3>
                          <p className="text-sm text-gray-500">
                            Dibuat pada {schedule.date}
                          </p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/schedule-view/${schedule.id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            Lihat
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Belum ada jadwal yang dibuat</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/schedule-generator">
                    <Calendar className="h-4 w-4 mr-2" />
                    Buat Jadwal Baru
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>Pemberitahuan terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="divide-y">
                    {notifications.map((notification, index) => (
                      <Notification
                        key={index}
                        title={notification.title}
                        time={notification.time}
                        isNew={notification.isNew}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Tidak ada notifikasi baru</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm">
                  Lihat Semua Notifikasi
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
