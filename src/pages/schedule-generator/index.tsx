import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GeneticAlgorithmConfig from "@/components/schedule-generator/GeneticAlgorithmConfig";
import OptimizationProgress from "@/components/schedule-generator/OptimizationProgress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

interface ScheduleGeneratorPageProps {
  userRole?: "admin" | "user" | "viewer";
}

const ScheduleGeneratorPage = ({
  userRole = "admin",
}: ScheduleGeneratorPageProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState(0);
  const [totalGenerations, setTotalGenerations] = useState(100);
  const [bestFitness, setBestFitness] = useState(0);
  const [averageFitness, setAverageFitness] = useState(0);
  const [activeTab, setActiveTab] = useState("konfigurasi");
  const [fitnessHistory, setFitnessHistory] = useState<
    Array<{ generation: number; bestFitness: number; averageFitness: number }>
  >([]);
  const [conflicts, setConflicts] = useState({
    teacherConflicts: 0,
    roomConflicts: 0,
    classConflicts: 0,
    preferenceViolations: 0,
  });

  // Mock function to simulate algorithm running
  const simulateAlgorithm = (config: any) => {
    setIsRunning(true);
    setCurrentGeneration(0);
    setTotalGenerations(config.generations);
    setFitnessHistory([]);
    setConflicts({
      teacherConflicts: 5,
      roomConflicts: 3,
      classConflicts: 2,
      preferenceViolations: 8,
    });

    // Switch to optimization tab
    setActiveTab("optimasi");

    // Simulate generations
    const interval = setInterval(() => {
      if (isPaused) return;

      setCurrentGeneration((prev) => {
        const next = prev + 1;

        // Update fitness values
        const newBestFitness =
          50 + (next / config.generations) * 50 * (0.9 + Math.random() * 0.2);
        const newAvgFitness = newBestFitness * (0.7 + Math.random() * 0.2);

        setBestFitness(newBestFitness);
        setAverageFitness(newAvgFitness);

        // Update history
        setFitnessHistory((prev) => [
          ...prev,
          {
            generation: next,
            bestFitness: newBestFitness,
            averageFitness: newAvgFitness,
          },
        ]);

        // Update conflicts (gradually reduce them)
        if (next % 10 === 0) {
          setConflicts((prev) => ({
            teacherConflicts: Math.max(0, prev.teacherConflicts - 1),
            roomConflicts: Math.max(0, prev.roomConflicts - 1),
            classConflicts: Math.max(0, prev.classConflicts - 1),
            preferenceViolations: Math.max(0, prev.preferenceViolations - 1),
          }));
        }

        // Check if we've reached the end
        if (next >= config.generations) {
          clearInterval(interval);
          setIsRunning(false);
        }

        return next;
      });
    }, 100);
  };

  const handleStartAlgorithm = (config: any) => {
    simulateAlgorithm(config);
  };

  const handlePauseAlgorithm = () => {
    setIsPaused(true);
  };

  const handleResumeAlgorithm = () => {
    setIsPaused(false);
  };

  const handleStopAlgorithm = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleResetAlgorithm = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentGeneration(0);
    setBestFitness(0);
    setAverageFitness(0);
    setFitnessHistory([]);
    setConflicts({
      teacherConflicts: 0,
      roomConflicts: 0,
      classConflicts: 0,
      preferenceViolations: 0,
    });
  };

  return (
    <DashboardLayout userRole={userRole}>
      <Helmet>
        <title>Generator Jadwal | SMK Scheduler</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Generator Jadwal
          </h1>
          <p className="text-muted-foreground">
            Gunakan algoritma genetika untuk menghasilkan jadwal pelajaran yang
            optimal
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Pastikan Anda telah mengisi data guru, kelas, ruangan, mata
            pelajaran, dan batasan sebelum menjalankan generator jadwal.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="konfigurasi">Konfigurasi</TabsTrigger>
            <TabsTrigger value="optimasi">Optimasi</TabsTrigger>
          </TabsList>

          <TabsContent value="konfigurasi" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>Persiapan Penjadwalan</CardTitle>
                <CardDescription>
                  Sebelum menjalankan algoritma, pastikan semua data dan batasan
                  telah dikonfigurasi dengan benar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Peringatan</AlertTitle>
                  <AlertDescription>
                    Proses penjadwalan akan menggantikan jadwal yang sudah ada.
                    Pastikan untuk menyimpan jadwal lama jika diperlukan.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
                  <GeneticAlgorithmConfig
                    onSubmit={handleStartAlgorithm}
                    onReset={handleResetAlgorithm}
                    isRunning={isRunning}
                  />

                  <Card className="w-full max-w-md bg-white">
                    <CardHeader>
                      <CardTitle>Petunjuk Penggunaan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium">Ukuran Populasi</h4>
                        <p className="text-sm text-muted-foreground">
                          Jumlah jadwal yang dibuat dalam satu generasi. Nilai
                          lebih tinggi meningkatkan keragaman tetapi
                          memperlambat proses.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Jumlah Generasi</h4>
                        <p className="text-sm text-muted-foreground">
                          Jumlah iterasi maksimum algoritma. Nilai lebih tinggi
                          memberikan hasil lebih baik tetapi membutuhkan waktu
                          lebih lama.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Tingkat Mutasi</h4>
                        <p className="text-sm text-muted-foreground">
                          Probabilitas perubahan acak pada jadwal. Nilai yang
                          tepat membantu menghindari solusi lokal optimal.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Tingkat Crossover</h4>
                        <p className="text-sm text-muted-foreground">
                          Probabilitas penggabungan dua jadwal untuk
                          menghasilkan jadwal baru. Nilai lebih tinggi
                          meningkatkan eksplorasi.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimasi" className="space-y-4 py-4">
            <div className="flex justify-center">
              <OptimizationProgress
                isRunning={isRunning}
                currentGeneration={currentGeneration}
                totalGenerations={totalGenerations}
                bestFitness={bestFitness}
                averageFitness={averageFitness}
                fitnessHistory={fitnessHistory}
                conflicts={conflicts}
                onPause={handlePauseAlgorithm}
                onResume={handleResumeAlgorithm}
                onStop={handleStopAlgorithm}
                onReset={handleResetAlgorithm}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleGeneratorPage;
