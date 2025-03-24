import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TeacherManagement from "./TeacherManagement";
import ClassManagement from "./ClassManagement";
import RoomManagement from "./RoomManagement";
import SubjectManagement from "./SubjectManagement";
import TimeSlotManagement from "./TimeSlotManagement";

interface DataTabsProps {
  defaultTab?: string;
}

const DataTabs = ({ defaultTab = "teachers" }: DataTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manajemen Data</h1>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full flex justify-start mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="teachers" className="flex-1">
            Data Guru
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex-1">
            Data Kelas
          </TabsTrigger>
          <TabsTrigger value="rooms" className="flex-1">
            Data Ruangan
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex-1">
            Mata Pelajaran
          </TabsTrigger>
          <TabsTrigger value="timeSlots" className="flex-1">
            Slot Waktu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="mt-4">
          <TeacherManagement />
        </TabsContent>

        <TabsContent value="classes" className="mt-4">
          <ClassManagement />
        </TabsContent>

        <TabsContent value="rooms" className="mt-4">
          <RoomManagement />
        </TabsContent>

        <TabsContent value="subjects" className="mt-4">
          <SubjectManagement />
        </TabsContent>

        <TabsContent value="timeSlots" className="mt-4">
          <TimeSlotManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataTabs;
