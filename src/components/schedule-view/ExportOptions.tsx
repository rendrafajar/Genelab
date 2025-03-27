import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Download,
  Printer,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";

interface ExportOptionsProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
  onPrint?: () => void;
  disabled?: boolean;
}

const ExportOptions = ({
  onExportPDF = () => {},
  onExportExcel = () => {},
  onPrint = () => {},
  disabled = false,
}: ExportOptionsProps) => {
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // Implement actual PDF export functionality
    window.print(); // Temporary solution
    onExportPDF();
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // Implement actual Excel export functionality
    onExportExcel();
  };

  const handlePrint = () => {
    console.log("Printing schedule...");
    window.print();
    onPrint();
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Opsi Ekspor Jadwal</h3>
          <p className="text-sm text-gray-500">
            Ekspor jadwal dalam berbagai format atau cetak langsung
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  disabled={disabled}
                  className="flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Cetak</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cetak jadwal langsung</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  disabled={disabled}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">PDF</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ekspor ke format PDF</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExcel}
                  disabled={disabled}
                  className="flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="hidden sm:inline">Excel</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ekspor ke format Excel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                disabled={disabled}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Ekspor</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileText className="h-4 w-4 mr-2" />
                <span>Ekspor ke PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                <span>Ekspor ke Excel</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                <span>Cetak Jadwal</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
