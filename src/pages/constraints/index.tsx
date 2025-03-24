import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ConstraintsTabs from "@/components/constraints/ConstraintsTabs";

const ConstraintsPage = () => {
  const handleTabChange = (tab: string) => {
    console.log(`Tab changed to: ${tab}`);
    // Here you could update URL params or state if needed
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4">
        <ConstraintsTabs activeTab="teacher" onTabChange={handleTabChange} />
      </div>
    </DashboardLayout>
  );
};

export default ConstraintsPage;
