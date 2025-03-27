import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ScheduleTabs from "@/components/schedule-view/ScheduleTabs";
import ScheduleTable from "@/components/schedule-view/ScheduleTable";
import ExportOptions from "@/components/schedule-view/ExportOptions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const ScheduleViewPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("class");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [userRole] = useState<"admin" | "user" | "viewer">("admin"); // In a real app, this would come from auth context
  const [scheduleData, setScheduleData] = useState<any[]>([]);

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

  // Handle save changes
  const handleSaveChanges = (updatedSchedule: any[]) => {
    console.log("Saving schedule changes:", updatedSchedule);
    setScheduleData(updatedSchedule);
    // Here you would typically save to a database
  };

  // Handle delete item
  const handleDeleteItem = (itemId: string) => {
    console.log("Deleting schedule item:", itemId);
    // Here you would typically delete from a database
  };

  // Handle export functions
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    try {
      const doc = new jsPDF();
      doc.text(`Jadwal ${getViewTypeLabel(activeTab)}`, 20, 20);
      doc.save(
        `jadwal_${activeTab}_${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      // Fallback to print if jsPDF is not available
      window.print();
    }
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    try {
      const worksheet = XLSX.utils.json_to_sheet(scheduleData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Jadwal");
      XLSX.writeFile(
        workbook,
        `jadwal_${activeTab}_${new Date().toISOString().split("T")[0]}.xlsx`,
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Ekspor ke Excel gagal. Silakan coba lagi nanti.");
    }
  };

  const handlePrint = () => {
    console.log("Printing schedule...");
    window.print();
  };

  const getViewTypeLabel = (tab: string) => {
    switch (tab) {
      case "class":
        return "Kelas";
      case "teacher":
        return "Guru";
      case "room":
        return "Ruangan";
      case "subject":
        return "Mata Pelajaran";
      case "weekly":
        return "Mingguan";
      case "daily":
        return "Harian";
      default:
        return "";
    }
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
              onSaveChanges={handleSaveChanges}
              onDeleteItem={handleDeleteItem}
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
