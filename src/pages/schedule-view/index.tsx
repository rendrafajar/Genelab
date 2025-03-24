import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScheduleTabs from "@/components/schedule-view/ScheduleTabs";
import ScheduleTable from "@/components/schedule-view/ScheduleTable";
import ExportOptions from "@/components/schedule-view/ExportOptions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";

const ScheduleViewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("class");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [userRole] = useState<"admin" | "user" | "viewer">("admin"); // In a real app, this would come from auth context

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery("");
    setFilterValue("");
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterValue(searchQuery);
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setSearchQuery("");
    setFilterValue("");
  };

  // Handle export functions
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // Implementation would go here
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // Implementation would go here
  };

  const handlePrint = () => {
    console.log("Printing schedule...");
    // Implementation would go here
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6 bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Tampilan Jadwal
            </h1>
            <p className="text-muted-foreground">
              Lihat dan kelola jadwal pelajaran dalam berbagai format tampilan.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Cari ${activeTab === "class" ? "kelas" : activeTab === "teacher" ? "guru" : activeTab === "room" ? "ruangan" : "mata pelajaran"}...`}
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="default">
              Cari
            </Button>
            {filterValue && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResetFilter}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </form>
        </div>

        <Card>
          <CardContent className="p-0">
            <ScheduleTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <ScheduleTable
              viewType={activeTab as "class" | "teacher" | "room" | "subject"}
              filterValue={filterValue}
              isEditable={userRole !== "viewer"}
            />
          </CardContent>
        </Card>

        <ExportOptions
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
          onPrint={handlePrint}
          disabled={false}
        />
      </div>
    </DashboardLayout>
  );
};

export default ScheduleViewPage;
