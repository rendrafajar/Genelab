import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface ReportsTabsProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ReportsTabs: React.FC<ReportsTabsProps> = ({
  activeTab = "teaching-load",
  onTabChange = () => {},
}) => {
  return (
    <div className="w-full bg-white">
      <Tabs
        defaultValue={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Laporan Penjadwalan</h2>
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="teaching-load"
              className="flex items-center gap-2"
            >
              <BarChart className="h-4 w-4" />
              <span>Beban Mengajar</span>
            </TabsTrigger>
            <TabsTrigger
              value="room-utilization"
              className="flex items-center gap-2"
            >
              <PieChart className="h-4 w-4" />
              <span>Penggunaan Ruangan</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule-quality"
              className="flex items-center gap-2"
            >
              <LineChart className="h-4 w-4" />
              <span>Kualitas Jadwal</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="teaching-load" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Laporan Beban Mengajar Guru
              </h3>
              <div className="flex gap-2">
                <select className="px-3 py-1 border rounded-md text-sm">
                  <option value="all">Semua Jurusan</option>
                  <option value="rpl">Rekayasa Perangkat Lunak</option>
                  <option value="tkj">Teknik Komputer Jaringan</option>
                  <option value="mm">Multimedia</option>
                </select>
                <select className="px-3 py-1 border rounded-md text-sm">
                  <option value="current">Semester Ini</option>
                  <option value="previous">Semester Lalu</option>
                </select>
              </div>
            </div>
            <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Grafik beban mengajar guru akan ditampilkan di sini
              </p>
            </div>
            <div className="mt-4 overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Nama Guru</th>
                    <th className="border p-2 text-left">Mata Pelajaran</th>
                    <th className="border p-2 text-left">Jumlah Kelas</th>
                    <th className="border p-2 text-left">Total Jam</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Budi Santoso, S.Pd",
                      subject: "Matematika",
                      classes: 5,
                      hours: 20,
                      status: "Optimal",
                    },
                    {
                      name: "Dewi Lestari, M.Pd",
                      subject: "Bahasa Inggris",
                      classes: 6,
                      hours: 24,
                      status: "Optimal",
                    },
                    {
                      name: "Ahmad Hidayat, S.Kom",
                      subject: "Pemrograman Web",
                      classes: 4,
                      hours: 16,
                      status: "Kurang",
                    },
                    {
                      name: "Siti Rahayu, S.Pd",
                      subject: "Bahasa Indonesia",
                      classes: 8,
                      hours: 32,
                      status: "Berlebih",
                    },
                    {
                      name: "Rudi Hartono, S.T",
                      subject: "Jaringan Komputer",
                      classes: 5,
                      hours: 20,
                      status: "Optimal",
                    },
                  ].map((teacher, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2">{teacher.name}</td>
                      <td className="border p-2">{teacher.subject}</td>
                      <td className="border p-2">{teacher.classes}</td>
                      <td className="border p-2">{teacher.hours}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            teacher.status === "Optimal"
                              ? "bg-green-100 text-green-800"
                              : teacher.status === "Kurang"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {teacher.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="room-utilization" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Laporan Penggunaan Ruangan
              </h3>
              <div className="flex gap-2">
                <select className="px-3 py-1 border rounded-md text-sm">
                  <option value="all">Semua Ruangan</option>
                  <option value="theory">Ruang Teori</option>
                  <option value="lab">Laboratorium</option>
                </select>
                <select className="px-3 py-1 border rounded-md text-sm">
                  <option value="weekly">Mingguan</option>
                  <option value="daily">Harian</option>
                </select>
              </div>
            </div>
            <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Grafik penggunaan ruangan akan ditampilkan di sini
              </p>
            </div>
            <div className="mt-4 overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Nama Ruangan</th>
                    <th className="border p-2 text-left">Tipe</th>
                    <th className="border p-2 text-left">Kapasitas</th>
                    <th className="border p-2 text-left">Jam Terpakai</th>
                    <th className="border p-2 text-left">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "R101",
                      type: "Teori",
                      capacity: 30,
                      hours: 32,
                      percentage: 80,
                    },
                    {
                      name: "R102",
                      type: "Teori",
                      capacity: 30,
                      hours: 28,
                      percentage: 70,
                    },
                    {
                      name: "LAB-RPL1",
                      type: "Praktikum",
                      capacity: 24,
                      hours: 36,
                      percentage: 90,
                    },
                    {
                      name: "LAB-TKJ1",
                      type: "Praktikum",
                      capacity: 24,
                      hours: 30,
                      percentage: 75,
                    },
                    {
                      name: "R201",
                      type: "Teori",
                      capacity: 35,
                      hours: 20,
                      percentage: 50,
                    },
                  ].map((room, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2">{room.name}</td>
                      <td className="border p-2">{room.type}</td>
                      <td className="border p-2">{room.capacity}</td>
                      <td className="border p-2">{room.hours}/40</td>
                      <td className="border p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                room.percentage >= 90
                                  ? "bg-red-500"
                                  : room.percentage >= 70
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${room.percentage}%` }}
                            />
                          </div>
                          <span>{room.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule-quality" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Laporan Kualitas Jadwal</h3>
              <div className="flex gap-2">
                <select className="px-3 py-1 border rounded-md text-sm">
                  <option value="current">Jadwal Terbaru</option>
                  <option value="previous">Jadwal Sebelumnya</option>
                </select>
              </div>
            </div>
            <div className="h-[500px] bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Grafik kualitas jadwal akan ditampilkan di sini
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-lg font-medium text-green-800">
                  Batasan Terpenuhi
                </h4>
                <p className="text-3xl font-bold text-green-600 mt-2">98%</p>
                <p className="text-sm text-green-700 mt-1">
                  245/250 batasan terpenuhi
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-medium text-yellow-800">
                  Preferensi Terpenuhi
                </h4>
                <p className="text-3xl font-bold text-yellow-600 mt-2">85%</p>
                <p className="text-sm text-yellow-700 mt-1">
                  102/120 preferensi terpenuhi
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-lg font-medium text-blue-800">
                  Skor Fitness
                </h4>
                <p className="text-3xl font-bold text-blue-600 mt-2">0.92</p>
                <p className="text-sm text-blue-700 mt-1">Dari maksimum 1.0</p>
              </div>
            </div>
            <div className="mt-4 overflow-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Jenis Batasan</th>
                    <th className="border p-2 text-left">Total</th>
                    <th className="border p-2 text-left">Terpenuhi</th>
                    <th className="border p-2 text-left">Persentase</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Bentrok Jadwal Guru",
                      total: 120,
                      fulfilled: 120,
                      percentage: 100,
                      status: "Sempurna",
                    },
                    {
                      type: "Bentrok Ruangan",
                      total: 80,
                      fulfilled: 80,
                      percentage: 100,
                      status: "Sempurna",
                    },
                    {
                      type: "Ketersediaan Guru",
                      total: 50,
                      fulfilled: 45,
                      percentage: 90,
                      status: "Baik",
                    },
                    {
                      type: "Preferensi Mata Pelajaran",
                      total: 70,
                      fulfilled: 62,
                      percentage: 88.6,
                      status: "Baik",
                    },
                    {
                      type: "Distribusi Jam Pelajaran",
                      total: 50,
                      fulfilled: 40,
                      percentage: 80,
                      status: "Cukup",
                    },
                  ].map((constraint, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2">{constraint.type}</td>
                      <td className="border p-2">{constraint.total}</td>
                      <td className="border p-2">{constraint.fulfilled}</td>
                      <td className="border p-2">{constraint.percentage}%</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            constraint.status === "Sempurna"
                              ? "bg-green-100 text-green-800"
                              : constraint.status === "Baik"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {constraint.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsTabs;
