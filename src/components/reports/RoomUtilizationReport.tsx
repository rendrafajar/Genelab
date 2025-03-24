import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "../ui/button";
import {
  Download,
  FileSpreadsheet,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface RoomUtilizationReportProps {
  data?: {
    rooms: RoomData[];
    weeklyUtilization: WeeklyUtilizationData[];
    utilizationByType: UtilizationByTypeData[];
  };
}

interface RoomData {
  id: string;
  name: string;
  type: string;
  capacity: number;
  utilization: number;
  hoursUsed: number;
  totalHours: number;
}

interface WeeklyUtilizationData {
  day: string;
  theory: number;
  lab: number;
}

interface UtilizationByTypeData {
  name: string;
  value: number;
}

const RoomUtilizationReport = ({ data }: RoomUtilizationReportProps) => {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [selectedRoomType, setSelectedRoomType] = useState<string>("all");

  // Mock data if no data is provided
  const mockRooms: RoomData[] = [
    {
      id: "1",
      name: "Ruang 101",
      type: "Teori",
      capacity: 30,
      utilization: 75,
      hoursUsed: 30,
      totalHours: 40,
    },
    {
      id: "2",
      name: "Ruang 102",
      type: "Teori",
      capacity: 30,
      utilization: 65,
      hoursUsed: 26,
      totalHours: 40,
    },
    {
      id: "3",
      name: "Ruang 103",
      type: "Teori",
      capacity: 30,
      utilization: 85,
      hoursUsed: 34,
      totalHours: 40,
    },
    {
      id: "4",
      name: "Lab Komputer 1",
      type: "Praktikum",
      capacity: 24,
      utilization: 90,
      hoursUsed: 36,
      totalHours: 40,
    },
    {
      id: "5",
      name: "Lab Komputer 2",
      type: "Praktikum",
      capacity: 24,
      utilization: 80,
      hoursUsed: 32,
      totalHours: 40,
    },
    {
      id: "6",
      name: "Lab Fisika",
      type: "Praktikum",
      capacity: 20,
      utilization: 60,
      hoursUsed: 24,
      totalHours: 40,
    },
    {
      id: "7",
      name: "Lab Kimia",
      type: "Praktikum",
      capacity: 20,
      utilization: 50,
      hoursUsed: 20,
      totalHours: 40,
    },
  ];

  const mockWeeklyUtilization: WeeklyUtilizationData[] = [
    { day: "Senin", theory: 85, lab: 90 },
    { day: "Selasa", theory: 80, lab: 85 },
    { day: "Rabu", theory: 75, lab: 80 },
    { day: "Kamis", theory: 70, lab: 75 },
    { day: "Jumat", theory: 60, lab: 65 },
    { day: "Sabtu", theory: 40, lab: 45 },
  ];

  const mockUtilizationByType: UtilizationByTypeData[] = [
    { name: "Ruang Teori", value: 75 },
    { name: "Lab Komputer", value: 85 },
    { name: "Lab Fisika", value: 60 },
    { name: "Lab Kimia", value: 50 },
  ];

  const rooms = data?.rooms || mockRooms;
  const weeklyUtilization = data?.weeklyUtilization || mockWeeklyUtilization;
  const utilizationByType = data?.utilizationByType || mockUtilizationByType;

  const filteredRooms =
    selectedRoomType === "all"
      ? rooms
      : rooms.filter((room) => room.type === selectedRoomType);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Laporan Pemanfaatan Ruangan</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              <span>Ekspor</span>
            </Button>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              <span>Excel</span>
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              <span>PDF</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="weekly">Pemanfaatan Mingguan</TabsTrigger>
            <TabsTrigger value="details">Detail Ruangan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pemanfaatan Berdasarkan Jenis Ruangan</CardTitle>
                  <CardDescription>
                    Persentase pemanfaatan ruangan berdasarkan jenis
                  </CardDescription>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant={chartType === "bar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("bar")}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={chartType === "pie" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("pie")}
                    >
                      <PieChartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {chartType === "bar" ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={utilizationByType}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis
                            label={{
                              value: "Persentase (%)",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="value"
                            fill="#8884d8"
                            name="Pemanfaatan (%)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={utilizationByType}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {utilizationByType.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Pemanfaatan</CardTitle>
                  <CardDescription>
                    Ringkasan statistik pemanfaatan ruangan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Rata-rata Pemanfaatan
                        </p>
                        <p className="text-2xl font-bold">
                          {Math.round(
                            rooms.reduce(
                              (acc, room) => acc + room.utilization,
                              0,
                            ) / rooms.length,
                          )}
                          %
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Total Ruangan
                        </p>
                        <p className="text-2xl font-bold">{rooms.length}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Ruang Teori
                        </p>
                        <p className="text-2xl font-bold">
                          {rooms.filter((room) => room.type === "Teori").length}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Ruang Praktikum
                        </p>
                        <p className="text-2xl font-bold">
                          {
                            rooms.filter((room) => room.type === "Praktikum")
                              .length
                          }
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Ruangan dengan Pemanfaatan Tertinggi
                      </h3>
                      <div className="space-y-2">
                        {[...rooms]
                          .sort((a, b) => b.utilization - a.utilization)
                          .slice(0, 3)
                          .map((room) => (
                            <div
                              key={room.id}
                              className="flex justify-between items-center p-2 bg-slate-50 rounded"
                            >
                              <span>{room.name}</span>
                              <span className="font-medium">
                                {room.utilization}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Ruangan dengan Pemanfaatan Terendah
                      </h3>
                      <div className="space-y-2">
                        {[...rooms]
                          .sort((a, b) => a.utilization - b.utilization)
                          .slice(0, 3)
                          .map((room) => (
                            <div
                              key={room.id}
                              className="flex justify-between items-center p-2 bg-slate-50 rounded"
                            >
                              <span>{room.name}</span>
                              <span className="font-medium">
                                {room.utilization}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pemanfaatan Ruangan Mingguan</CardTitle>
                <CardDescription>
                  Persentase pemanfaatan ruangan per hari dalam seminggu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyUtilization}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis
                        label={{
                          value: "Persentase (%)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="theory" fill="#8884d8" name="Ruang Teori" />
                      <Bar
                        dataKey="lab"
                        fill="#82ca9d"
                        name="Ruang Praktikum"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedRoomType}
                  onValueChange={setSelectedRoomType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Jenis Ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Ruangan</SelectItem>
                    <SelectItem value="Teori">Ruang Teori</SelectItem>
                    <SelectItem value="Praktikum">Ruang Praktikum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewType === "chart" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("chart")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Grafik</span>
                </Button>
                <Button
                  variant={viewType === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("table")}
                >
                  <span>Tabel</span>
                </Button>
              </div>
            </div>

            {viewType === "chart" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Pemanfaatan Per Ruangan</CardTitle>
                  <CardDescription>
                    Persentase pemanfaatan untuk setiap ruangan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={filteredRooms}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="utilization"
                          fill="#8884d8"
                          name="Pemanfaatan (%)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Detail Pemanfaatan Ruangan</CardTitle>
                  <CardDescription>
                    Informasi detail pemanfaatan untuk setiap ruangan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="text-left p-2 border">Nama Ruangan</th>
                          <th className="text-left p-2 border">Jenis</th>
                          <th className="text-left p-2 border">Kapasitas</th>
                          <th className="text-left p-2 border">Jam Terpakai</th>
                          <th className="text-left p-2 border">Total Jam</th>
                          <th className="text-left p-2 border">Pemanfaatan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRooms.map((room) => (
                          <tr
                            key={room.id}
                            className="border-b hover:bg-slate-50"
                          >
                            <td className="p-2 border">{room.name}</td>
                            <td className="p-2 border">{room.type}</td>
                            <td className="p-2 border">{room.capacity}</td>
                            <td className="p-2 border">{room.hoursUsed}</td>
                            <td className="p-2 border">{room.totalHours}</td>
                            <td className="p-2 border">
                              <div className="flex items-center">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 mr-2">
                                  <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${room.utilization}%` }}
                                  ></div>
                                </div>
                                <span>{room.utilization}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoomUtilizationReport;
