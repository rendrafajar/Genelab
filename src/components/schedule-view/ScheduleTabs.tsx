import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Home, School, User, Users } from "lucide-react";

interface ScheduleTabsProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const ScheduleTabs = ({
  activeTab = "class",
  onTabChange = () => {},
}: ScheduleTabsProps) => {
  const tabs = [
    {
      id: "class",
      label: "Jadwal Per Kelas",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      id: "teacher",
      label: "Jadwal Per Guru",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      id: "room",
      label: "Jadwal Per Ruangan",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      id: "subject",
      label: "Jadwal Per Mata Pelajaran",
      icon: <School className="mr-2 h-4 w-4" />,
    },
    {
      id: "weekly",
      label: "Jadwal Mingguan",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      id: "daily",
      label: "Jadwal Harian",
      icon: <Clock className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tampilan Jadwal
          </h2>
          <TabsList className="bg-gray-100">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default ScheduleTabs;
