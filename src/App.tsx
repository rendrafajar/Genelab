import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import DashboardPage from "./pages/dashboard";
import DataManagementPage from "./pages/data-management";
import ConstraintsPage from "./pages/constraints";
import ScheduleGeneratorPage from "./pages/schedule-generator";
import ScheduleViewPage from "./pages/schedule-view";
import ReportsPage from "./pages/reports";
import UserManagementPage from "./pages/user-management";
import SettingsPage from "./pages/settings";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/data-management" element={<DataManagementPage />} />
          <Route path="/data-management/*" element={<DataManagementPage />} />
          <Route path="/constraints" element={<ConstraintsPage />} />
          <Route path="/constraints/*" element={<ConstraintsPage />} />
          <Route
            path="/schedule-generator"
            element={<ScheduleGeneratorPage />}
          />
          <Route
            path="/schedule-generator/*"
            element={<ScheduleGeneratorPage />}
          />
          <Route path="/schedule-view" element={<ScheduleViewPage />} />
          <Route path="/schedule-view/*" element={<ScheduleViewPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/*" element={<ReportsPage />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path="/user-management/*" element={<UserManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
