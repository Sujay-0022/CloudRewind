import { AlertCircle } from "lucide-react";

export default function Incidents() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-semibold text-primary tracking-tight">Incidents</h1>
        <p className="text-sm text-muted mt-1">Review active and past incidents.</p>
      </div>
      <div className="surface-panel p-6 flex flex-col items-center justify-center min-h-[400px] bg-background/50">
        <AlertCircle className="w-8 h-8 text-muted mb-3 opacity-60" />
        <h2 className="text-sm font-semibold text-primary mb-1">No Active Incidents</h2>
        <p className="text-xs text-muted">All services are currently healthy.</p>
      </div>
    </div>
  );
}
