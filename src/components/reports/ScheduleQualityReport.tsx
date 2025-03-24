import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface ScheduleQualityReportProps {
  qualityScore?: number;
  constraintsSatisfied?: number;
  softConstraintsSatisfied?: number;
  conflictRate?: number;
  teacherSatisfaction?: number;
  roomUtilization?: number;
  classDistribution?: number;
  generationHistory?: Array<{
    generation: number;
    fitnessScore: number;
  }>;
  constraintViolations?: Array<{
    type: string;
    count: number;
    severity: "high" | "medium" | "low";
  }>;
}

const ScheduleQualityReport = ({
  qualityScore = 85,
  constraintsSatisfied = 98,
  softConstraintsSatisfied = 78,
  conflictRate = 2,
  teacherSatisfaction = 88,
  roomUtilization = 92,
  classDistribution = 85,
  generationHistory = [
    { generation: 1, fitnessScore: 45 },
    { generation: 10, fitnessScore: 62 },
    { generation: 20, fitnessScore: 75 },
    { generation: 30, fitnessScore: 82 },
    { generation: 40, fitnessScore: 85 },
    { generation: 50, fitnessScore: 85 },
  ],
  constraintViolations = [
    { type: "Bentrok Jadwal Guru", count: 2, severity: "high" },
    { type: "Preferensi Guru Tidak Terpenuhi", count: 5, severity: "medium" },
    { type: "Ruangan Tidak Sesuai", count: 3, severity: "medium" },
    {
      type: "Distribusi Mata Pelajaran Tidak Merata",
      count: 8,
      severity: "low",
    },
  ],
}: ScheduleQualityReportProps) => {
  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getSeverityIcon = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Laporan Kualitas Jadwal</h2>
      <p className="text-gray-500">
        Analisis kualitas jadwal yang dihasilkan oleh algoritma genetika
      </p>

      {/* Skor Kualitas Keseluruhan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Skor Kualitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{qualityScore}%</div>
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <Progress value={qualityScore} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Batasan Terpenuhi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{constraintsSatisfied}%</div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <Progress value={constraintsSatisfied} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Preferensi Terpenuhi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {softConstraintsSatisfied}%
              </div>
              <CheckCircle className="h-6 w-6 text-blue-500" />
            </div>
            <Progress value={softConstraintsSatisfied} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tingkat Konflik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{conflictRate}%</div>
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
            <Progress value={conflictRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Metrik Kualitas Lainnya */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Kepuasan Guru</CardTitle>
            <CardDescription>
              Persentase preferensi guru yang terpenuhi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{teacherSatisfaction}%</div>
              <div className="p-2 bg-blue-50 rounded-full">
                <BarChart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <Progress value={teacherSatisfaction} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pemanfaatan Ruangan</CardTitle>
            <CardDescription>Efisiensi penggunaan ruangan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{roomUtilization}%</div>
              <div className="p-2 bg-green-50 rounded-full">
                <PieChart className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <Progress value={roomUtilization} className="h-2 mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribusi Kelas</CardTitle>
            <CardDescription>
              Keseimbangan distribusi mata pelajaran
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{classDistribution}%</div>
              <div className="p-2 bg-purple-50 rounded-full">
                <LineChart className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <Progress value={classDistribution} className="h-2 mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Riwayat Generasi */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Riwayat Generasi Algoritma</CardTitle>
          <CardDescription>
            Peningkatan skor fitness selama proses optimasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {/* Placeholder untuk grafik riwayat generasi */}
            <div className="h-full w-full flex items-end justify-between gap-2 border-b border-l">
              {generationHistory.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className="w-10 bg-primary rounded-t"
                    style={{ height: `${(item.fitnessScore / 100) * 180}px` }}
                  ></div>
                  <span className="text-xs mt-1">{item.generation}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">Generasi</div>
        </CardContent>
      </Card>

      {/* Pelanggaran Batasan */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Pelanggaran Batasan</CardTitle>
          <CardDescription>Daftar batasan yang tidak terpenuhi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {constraintViolations.map((violation, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  {getSeverityIcon(violation.severity)}
                  <span>{violation.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{violation.count}</span>
                  <span
                    className={`text-xs ${getSeverityColor(violation.severity)}`}
                  >
                    {violation.severity === "high"
                      ? "Kritis"
                      : violation.severity === "medium"
                        ? "Sedang"
                        : "Rendah"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleQualityReport;
