import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherConstraints from "./TeacherConstraints";
import RoomConstraints from "./RoomConstraints";
import ClassConstraints from "./ClassConstraints";
import SubjectConstraints from "./SubjectConstraints";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

interface ConstraintsTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const ConstraintsTabs: React.FC<ConstraintsTabsProps> = ({
  activeTab = "teacher",
  onTabChange = () => {},
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Batasan dan Preferensi Penjadwalan
        </h1>
        <p className="text-gray-500 mt-1">
          Atur berbagai batasan dan preferensi untuk menghasilkan jadwal yang
          optimal
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Informasi Penting</CardTitle>
              <CardDescription>
                Batasan yang diatur di sini akan mempengaruhi hasil penjadwalan.
                Semakin banyak batasan yang ditambahkan, semakin sulit algoritma
                menemukan solusi optimal.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              Batasan guru menentukan ketersediaan dan preferensi waktu mengajar
            </li>
            <li>
              Batasan ruangan menentukan ruangan mana yang dapat digunakan oleh
              jurusan tertentu
            </li>
            <li>
              Batasan kelas menentukan preferensi jadwal untuk kelas tertentu
            </li>
            <li>
              Batasan mata pelajaran menentukan kapan sebaiknya mata pelajaran
              tertentu dijadwalkan
            </li>
          </ul>
        </CardContent>
      </Card>

      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="teacher">Guru</TabsTrigger>
          <TabsTrigger value="room">Ruangan</TabsTrigger>
          <TabsTrigger value="class">Kelas</TabsTrigger>
          <TabsTrigger value="subject">Mata Pelajaran</TabsTrigger>
        </TabsList>
        <TabsContent value="teacher" className="mt-0">
          <TeacherConstraints />
        </TabsContent>
        <TabsContent value="room" className="mt-0">
          <RoomConstraints />
        </TabsContent>
        <TabsContent value="class" className="mt-0">
          <ClassConstraints />
        </TabsContent>
        <TabsContent value="subject" className="mt-0">
          <SubjectConstraints />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConstraintsTabs;
