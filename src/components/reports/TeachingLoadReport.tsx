import React, { useState } from "react";
import { BarChart, Search, Download, Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TeacherLoadData {
  id: string;
  name: string;
  department: string;
  totalHours: number;
  maxHours: number;
  subjects: {
    name: string;
    hours: number;
    classes: string[];
  }[];
}

interface TeachingLoadReportProps {
  data?: TeacherLoadData[];
  title?: string;
  description?: string;
}

const TeachingLoadReport = ({
  data = mockTeacherData,
  title = "Laporan Beban Mengajar Guru",
  description = "Visualisasi dan analisis beban mengajar untuk semua guru berdasarkan jumlah jam dan mata pelajaran",
}: TeachingLoadReportProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "totalHours">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get unique departments for filter
  const departments = [...new Set(data.map((teacher) => teacher.department))];

  // Filter and sort data
  const filteredData = data
    .filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterDepartment || teacher.department === filterDepartment),
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.totalHours - b.totalHours
          : b.totalHours - a.totalHours;
      }
    });

  // Calculate statistics
  const totalTeachers = filteredData.length;
  const averageLoad =
    filteredData.reduce((sum, teacher) => sum + teacher.totalHours, 0) /
      totalTeachers || 0;
  const maxLoad = Math.max(
    ...filteredData.map((teacher) => teacher.totalHours),
  );
  const minLoad = Math.min(
    ...filteredData.map((teacher) => teacher.totalHours),
  );

  // Teachers with high load (>90% of max hours)
  const highLoadTeachers = filteredData.filter(
    (teacher) => teacher.totalHours / teacher.maxHours > 0.9,
  ).length;

  return (
    <div className="w-full bg-white p-6 rounded-lg space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari guru..."
              className="pl-8 h-9 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={filterDepartment || ""}
            onChange={(e) => setFilterDepartment(e.target.value || null)}
          >
            <option value="">Semua Jurusan</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            onClick={() => {
              // Export functionality would go here
              alert("Ekspor data ke Excel/PDF");
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Ekspor
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              Guru yang terdaftar dalam sistem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Rata-rata Beban
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageLoad.toFixed(1)} jam
            </div>
            <p className="text-xs text-muted-foreground">
              Rata-rata jam mengajar per minggu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Beban Tertinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maxLoad} jam</div>
            <p className="text-xs text-muted-foreground">
              Jam mengajar tertinggi per minggu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Guru Beban Tinggi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highLoadTeachers}</div>
            <p className="text-xs text-muted-foreground">
              Guru dengan beban {">"}90% dari maksimum
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Distribusi Beban Mengajar</CardTitle>
            <div className="flex items-center gap-2">
              <button
                className={`px-2 py-1 text-xs rounded ${sortBy === "name" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                onClick={() => {
                  if (sortBy === "name") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("name");
                    setSortOrder("asc");
                  }
                }}
              >
                Nama {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                className={`px-2 py-1 text-xs rounded ${sortBy === "totalHours" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                onClick={() => {
                  if (sortBy === "totalHours") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("totalHours");
                    setSortOrder("desc");
                  }
                }}
              >
                Jam{" "}
                {sortBy === "totalHours" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>
          <CardDescription>
            Perbandingan beban mengajar antar guru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((teacher) => (
              <div key={teacher.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{teacher.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {teacher.department}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{teacher.totalHours} jam</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(
                        (teacher.totalHours / teacher.maxHours) * 100,
                      )}
                      % dari maksimum
                    </div>
                  </div>
                </div>
                <Progress
                  value={(teacher.totalHours / teacher.maxHours) * 100}
                  className={`h-2 ${teacher.totalHours / teacher.maxHours > 0.9 ? "bg-red-200" : ""}`}
                />
                <div className="text-xs text-muted-foreground pl-2">
                  {teacher.subjects.map((subject) => subject.name).join(", ")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Menampilkan {filteredData.length} dari {data.length} guru
          </div>
          <button className="text-sm text-primary hover:underline">
            Lihat Detail Lengkap
          </button>
        </CardFooter>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Beban Mengajar Per Guru</CardTitle>
          <CardDescription>
            Rincian mata pelajaran dan kelas yang diampu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Guru
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jurusan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mata Pelajaran
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kelas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jam
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((teacher) =>
                  teacher.subjects.map((subject, subjectIndex) => (
                    <tr key={`${teacher.id}-${subjectIndex}`}>
                      {subjectIndex === 0 ? (
                        <>
                          <td
                            rowSpan={teacher.subjects.length}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <div className="font-medium">{teacher.name}</div>
                          </td>
                          <td
                            rowSpan={teacher.subjects.length}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {teacher.department}
                          </td>
                        </>
                      ) : null}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {subject.classes.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {subject.hours} jam
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock data for demonstration
const mockTeacherData: TeacherLoadData[] = [
  {
    id: "1",
    name: "Budi Santoso",
    department: "Teknik Komputer dan Jaringan",
    totalHours: 24,
    maxHours: 24,
    subjects: [
      { name: "Jaringan Dasar", hours: 8, classes: ["X TKJ 1", "X TKJ 2"] },
      {
        name: "Administrasi Server",
        hours: 8,
        classes: ["XI TKJ 1", "XI TKJ 2"],
      },
      { name: "Keamanan Jaringan", hours: 8, classes: ["XII TKJ 1"] },
    ],
  },
  {
    id: "2",
    name: "Dewi Lestari",
    department: "Rekayasa Perangkat Lunak",
    totalHours: 20,
    maxHours: 24,
    subjects: [
      {
        name: "Pemrograman Dasar",
        hours: 12,
        classes: ["X RPL 1", "X RPL 2", "X RPL 3"],
      },
      { name: "Basis Data", hours: 8, classes: ["XI RPL 1", "XI RPL 2"] },
    ],
  },
  {
    id: "3",
    name: "Ahmad Hidayat",
    department: "Teknik Komputer dan Jaringan",
    totalHours: 16,
    maxHours: 24,
    subjects: [
      { name: "Sistem Operasi", hours: 8, classes: ["X TKJ 1", "X TKJ 2"] },
      {
        name: "Troubleshooting Jaringan",
        hours: 8,
        classes: ["XII TKJ 1", "XII TKJ 2"],
      },
    ],
  },
  {
    id: "4",
    name: "Siti Rahayu",
    department: "Multimedia",
    totalHours: 22,
    maxHours: 24,
    subjects: [
      {
        name: "Desain Grafis",
        hours: 12,
        classes: ["X MM 1", "X MM 2", "X MM 3"],
      },
      { name: "Animasi 2D", hours: 10, classes: ["XI MM 1", "XI MM 2"] },
    ],
  },
  {
    id: "5",
    name: "Eko Prasetyo",
    department: "Rekayasa Perangkat Lunak",
    totalHours: 18,
    maxHours: 24,
    subjects: [
      { name: "Pemrograman Web", hours: 10, classes: ["XI RPL 1", "XI RPL 2"] },
      {
        name: "Pemrograman Mobile",
        hours: 8,
        classes: ["XII RPL 1", "XII RPL 2"],
      },
    ],
  },
  {
    id: "6",
    name: "Rina Wijaya",
    department: "Multimedia",
    totalHours: 24,
    maxHours: 24,
    subjects: [
      { name: "Fotografi", hours: 8, classes: ["X MM 1", "X MM 2"] },
      { name: "Videografi", hours: 8, classes: ["XI MM 1", "XI MM 2"] },
      { name: "Animasi 3D", hours: 8, classes: ["XII MM 1", "XII MM 2"] },
    ],
  },
  {
    id: "7",
    name: "Hadi Nugroho",
    department: "Teknik Komputer dan Jaringan",
    totalHours: 12,
    maxHours: 24,
    subjects: [
      {
        name: "Komputer dan Jaringan Dasar",
        hours: 12,
        classes: ["X TKJ 1", "X TKJ 2", "X TKJ 3"],
      },
    ],
  },
  {
    id: "8",
    name: "Maya Indah",
    department: "Rekayasa Perangkat Lunak",
    totalHours: 22,
    maxHours: 24,
    subjects: [
      {
        name: "Algoritma dan Pemrograman",
        hours: 12,
        classes: ["X RPL 1", "X RPL 2", "X RPL 3"],
      },
      {
        name: "Pemrograman Berorientasi Objek",
        hours: 10,
        classes: ["XI RPL 1", "XI RPL 2"],
      },
    ],
  },
];

export default TeachingLoadReport;
