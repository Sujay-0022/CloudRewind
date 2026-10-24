import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import OverviewDashboard from "./pages/OverviewDashboard";
import TimeMachine from "./pages/TimeMachine";
import Incidents from "./pages/Incidents";
import Experiments from "./pages/Experiments";
import Services from "./pages/Services";
import Telemetry from "./pages/Telemetry";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/time-machine" element={<TimeMachine />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/telemetry" element={<Telemetry />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="flex items-center justify-center h-full text-muted">Page not found</div>} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
