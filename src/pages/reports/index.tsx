import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportsTabs from "@/components/reports/ReportsTabs";
import TeachingLoadReport from "@/components/reports/TeachingLoadReport";
import RoomUtilizationReport from "@/components/reports/RoomUtilizationReport";
import ScheduleQualityReport from "@/components/reports/ScheduleQualityReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Laporan Penjadwalan</h1>
          <div className="flex gap-2">
            <select className="px-3 py-1 border rounded-md text-sm">
              <option value="current">Semester Ganjil 2023/2024</option>
              <option value="previous">Semester Genap 2022/2023</option>
              <option value="previous">Semester Ganjil 2022/2023</option>
            </select>
          </div>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="detailed">Laporan Detail</TabsTrigger>
            <TabsTrigger value="comparison">Perbandingan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ReportsTabs />
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Tabs defaultValue="teaching-load" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="teaching-load">Beban Mengajar</TabsTrigger>
                <TabsTrigger value="room-utilization">
                  Penggunaan Ruangan
                </TabsTrigger>
                <TabsTrigger value="schedule-quality">
                  Kualitas Jadwal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teaching-load">
                <TeachingLoadReport />
              </TabsContent>

              <TabsContent value="room-utilization">
                <RoomUtilizationReport />
              </TabsContent>

              <TabsContent value="schedule-quality">
                <ScheduleQualityReport />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">
                Perbandingan Antar Jadwal
              </h2>
              <p className="text-gray-500 mb-6">
                Bandingkan metrik kualitas antara jadwal yang berbeda
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Jadwal A</h3>
                  <select className="w-full px-3 py-2 border rounded-md text-sm mb-4">
                    <option value="current">
                      Jadwal Terbaru (15 Mei 2023)
                    </option>
                    <option value="previous1">Jadwal 10 Mei 2023</option>
                    <option value="previous2">Jadwal 5 Mei 2023</option>
                  </select>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Skor Kualitas</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Batasan Terpenuhi</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "98%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Preferensi Terpenuhi</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Jadwal B</h3>
                  <select className="w-full px-3 py-2 border rounded-md text-sm mb-4">
                    <option value="previous1">Jadwal 10 Mei 2023</option>
                    <option value="current">
                      Jadwal Terbaru (15 Mei 2023)
                    </option>
                    <option value="previous2">Jadwal 5 Mei 2023</option>
                  </select>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Skor Kualitas</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Batasan Terpenuhi</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Preferensi Terpenuhi</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Analisis Perbandingan</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Peningkatan Skor Kualitas</span>
                    <span className="text-green-600 font-medium">+3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peningkatan Batasan Terpenuhi</span>
                    <span className="text-green-600 font-medium">+3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peningkatan Preferensi Terpenuhi</span>
                    <span className="text-green-600 font-medium">+3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pengurangan Konflik</span>
                    <span className="text-green-600 font-medium">-2</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
