import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AppSettings from "@/components/settings/AppSettings";

const SettingsPage = () => {
  return (
    <>
      <Helmet>
        <title>Pengaturan - Sistem Penjadwalan SMK</title>
      </Helmet>
      <DashboardLayout userRole="admin">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
          </div>
          <div className="rounded-lg border bg-card">
            <AppSettings />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
