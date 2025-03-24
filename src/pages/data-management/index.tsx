import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTabs from "@/components/data-management/DataTabs";

interface DataManagementPageProps {
  userRole?: "admin" | "user" | "viewer";
  defaultTab?: string;
}

const DataManagementPage = ({
  userRole = "admin",
  defaultTab = "teachers",
}: DataManagementPageProps) => {
  const navigate = useNavigate();

  // Redirect viewers who shouldn't have access to this page
  React.useEffect(() => {
    if (userRole === "viewer") {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  return (
    <DashboardLayout userRole={userRole}>
      <div className="container mx-auto py-6 bg-slate-50">
        <DataTabs defaultTab={defaultTab} />
      </div>
    </DashboardLayout>
  );
};

export default DataManagementPage;
