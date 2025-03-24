import React from "react";
import { Calendar, Clock, FileText, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ViewerDashboardProps {
  userName?: string;
  lastUpdated?: string;
}

const ViewerDashboard = ({
  userName = "Pengguna",
  lastUpdated = "10 Mei 2023, 14:30 WIB",
}: ViewerDashboardProps) => {
  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Selamat Datang, {userName}</h1>
          <p className="text-muted-foreground">
            Jadwal terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Jadwal Kelas
              </CardTitle>
              <CardDescription>Lihat jadwal per kelas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Lihat Jadwal Kelas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Jadwal Guru
              </CardTitle>
              <CardDescription>Lihat jadwal per guru</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Lihat Jadwal Guru
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Jadwal Harian
              </CardTitle>
              <CardDescription>Lihat jadwal hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Lihat Jadwal Hari Ini
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Unduh Jadwal
              </CardTitle>
              <CardDescription>Unduh jadwal dalam format PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Unduh PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Preview */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Pratinjau Jadwal Minggu Ini</CardTitle>
            <CardDescription>Ringkasan jadwal untuk minggu ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left">Jam</th>
                    <th className="border p-2 text-left">Senin</th>
                    <th className="border p-2 text-left">Selasa</th>
                    <th className="border p-2 text-left">Rabu</th>
                    <th className="border p-2 text-left">Kamis</th>
                    <th className="border p-2 text-left">Jumat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "07:00 - 08:30",
                    "08:30 - 10:00",
                    "10:15 - 11:45",
                    "12:30 - 14:00",
                  ].map((time, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-background" : "bg-muted/30"
                      }
                    >
                      <td className="border p-2 font-medium">{time}</td>
                      {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map(
                        (day, dayIndex) => (
                          <td key={dayIndex} className="border p-2">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {getMockSubject(index, dayIndex)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {getMockTeacher(index, dayIndex)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {getMockRoom(index, dayIndex)}
                              </span>
                            </div>
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Lihat Jadwal Lengkap</Button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Pengumuman</CardTitle>
            <CardDescription>
              Informasi terbaru dari administrator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary p-4 bg-muted/30 rounded-r-lg">
                <h3 className="font-medium">Perubahan Jadwal Semester Genap</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Jadwal untuk semester genap telah diperbarui. Silakan periksa
                  jadwal terbaru.
                </p>
                <p className="text-xs text-muted-foreground mt-2">5 Mei 2023</p>
              </div>
              <div className="border-l-4 border-primary p-4 bg-muted/30 rounded-r-lg">
                <h3 className="font-medium">Libur Hari Raya</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sekolah akan libur pada tanggal 12-16 Juni 2023 untuk
                  merayakan Hari Raya.
                </p>
                <p className="text-xs text-muted-foreground mt-2">1 Mei 2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper functions to generate mock data
const getMockSubject = (timeIndex: number, dayIndex: number): string => {
  const subjects = [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sejarah",
    "Geografi",
    "Ekonomi",
    "Pemrograman Web",
    "Basis Data",
    "Jaringan Komputer",
    "Desain Grafis",
  ];
  return subjects[(timeIndex + dayIndex) % subjects.length];
};

const getMockTeacher = (timeIndex: number, dayIndex: number): string => {
  const teachers = [
    "Bpk. Agus Santoso",
    "Ibu Dewi Lestari",
    "Bpk. Budi Pratama",
    "Ibu Siti Rahayu",
    "Bpk. Joko Widodo",
    "Ibu Ratna Sari",
    "Bpk. Hendra Wijaya",
    "Ibu Rina Novita",
  ];
  return teachers[(timeIndex + dayIndex + 2) % teachers.length];
};

const getMockRoom = (timeIndex: number, dayIndex: number): string => {
  const rooms = [
    "R101",
    "R102",
    "R103",
    "R201",
    "R202",
    "R203",
    "Lab Komputer 1",
    "Lab Komputer 2",
    "Lab Fisika",
  ];
  return rooms[(timeIndex + dayIndex + 1) % rooms.length];
};

export default ViewerDashboard;
