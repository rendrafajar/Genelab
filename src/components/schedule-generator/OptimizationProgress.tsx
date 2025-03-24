import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface OptimizationProgressProps {
  isRunning?: boolean;
  currentGeneration?: number;
  totalGenerations?: number;
  bestFitness?: number;
  averageFitness?: number;
  fitnessHistory?: {
    generation: number;
    bestFitness: number;
    averageFitness: number;
  }[];
  conflicts?: {
    teacherConflicts: number;
    roomConflicts: number;
    classConflicts: number;
    preferenceViolations: number;
  };
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onReset?: () => void;
}

const OptimizationProgress = ({
  isRunning = false,
  currentGeneration = 0,
  totalGenerations = 100,
  bestFitness = 0,
  averageFitness = 0,
  fitnessHistory = Array.from({ length: 20 }, (_, i) => ({
    generation: i,
    bestFitness: Math.random() * 100,
    averageFitness: Math.random() * 80,
  })),
  conflicts = {
    teacherConflicts: 5,
    roomConflicts: 3,
    classConflicts: 2,
    preferenceViolations: 8,
  },
  onPause = () => {},
  onResume = () => {},
  onStop = () => {},
  onReset = () => {},
}: OptimizationProgressProps) => {
  const [activeTab, setActiveTab] = useState("grafik");
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    setProgressPercentage((currentGeneration / totalGenerations) * 100);
  }, [currentGeneration, totalGenerations]);

  const totalConflicts =
    conflicts.teacherConflicts +
    conflicts.roomConflicts +
    conflicts.classConflicts +
    conflicts.preferenceViolations;

  // Normalize data for chart
  const chartData = fitnessHistory.map((data) => ({
    x: data.generation,
    bestFitness: data.bestFitness,
    averageFitness: data.averageFitness,
  }));

  // Find max value for chart scaling
  const maxFitness = Math.max(
    ...fitnessHistory.map((data) =>
      Math.max(data.bestFitness, data.averageFitness),
    ),
  );

  return (
    <Card className="w-full max-w-4xl bg-white shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Progres Optimasi Jadwal
          </CardTitle>
          <div className="flex space-x-2">
            {isRunning ? (
              <Button variant="outline" size="sm" onClick={onPause}>
                <PauseCircle className="mr-2 h-4 w-4" />
                Jeda
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={onResume}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Lanjutkan
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onStop}>
              <AlertCircle className="mr-2 h-4 w-4" />
              Berhenti
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
        <CardDescription>
          Generasi: {currentGeneration} dari {totalGenerations}
        </CardDescription>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Fitness Terbaik</div>
            <div className="text-2xl font-bold">{bestFitness.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Fitness Rata-rata</div>
            <div className="text-2xl font-bold">
              {averageFitness.toFixed(2)}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grafik">Grafik Fitness</TabsTrigger>
            <TabsTrigger value="konflik">Konflik Jadwal</TabsTrigger>
          </TabsList>

          <TabsContent value="grafik" className="pt-4">
            <div className="h-64 w-full relative">
              {/* Simple SVG chart visualization */}
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${fitnessHistory.length} ${maxFitness}`}
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1="0"
                    y1={maxFitness - (i * maxFitness) / 4}
                    x2={fitnessHistory.length}
                    y2={maxFitness - (i * maxFitness) / 4}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}

                {/* Best fitness line */}
                <polyline
                  points={chartData
                    .map(
                      (point) => `${point.x},${maxFitness - point.bestFitness}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />

                {/* Average fitness line */}
                <polyline
                  points={chartData
                    .map(
                      (point) =>
                        `${point.x},${maxFitness - point.averageFitness}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
              </svg>

              {/* Legend */}
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-md flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                  <span className="text-xs">Fitness Terbaik</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-2"></div>
                  <span className="text-xs">Fitness Rata-rata</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="konflik" className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Konflik:</span>
                <Badge
                  variant={totalConflicts > 0 ? "destructive" : "outline"}
                  className="ml-2"
                >
                  {totalConflicts}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Konflik Guru</span>
                  <Badge
                    variant={
                      conflicts.teacherConflicts > 0 ? "destructive" : "outline"
                    }
                    className="ml-2"
                  >
                    {conflicts.teacherConflicts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Konflik Ruangan</span>
                  <Badge
                    variant={
                      conflicts.roomConflicts > 0 ? "destructive" : "outline"
                    }
                    className="ml-2"
                  >
                    {conflicts.roomConflicts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Konflik Kelas</span>
                  <Badge
                    variant={
                      conflicts.classConflicts > 0 ? "destructive" : "outline"
                    }
                    className="ml-2"
                  >
                    {conflicts.classConflicts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pelanggaran Preferensi</span>
                  <Badge
                    variant={
                      conflicts.preferenceViolations > 0
                        ? "destructive"
                        : "outline"
                    }
                    className="ml-2"
                  >
                    {conflicts.preferenceViolations}
                  </Badge>
                </div>
              </div>

              {totalConflicts === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-md mt-4"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <span>Jadwal optimal tanpa konflik!</span>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="text-sm text-gray-500 pt-2 border-t">
        <div className="w-full flex justify-between items-center">
          <span>Status: {isRunning ? "Sedang Berjalan" : "Berhenti"}</span>
          <span>Waktu: {new Date().toLocaleTimeString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OptimizationProgress;
