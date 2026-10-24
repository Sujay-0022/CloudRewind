import { FileText } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-semibold text-primary tracking-tight">Reports</h1>
        <p className="text-sm text-muted mt-1">Incident post-mortems and performance summaries.</p>
      </div>
      <div className="surface-panel p-6 flex flex-col items-center justify-center min-h-[400px] bg-background/50">
        <FileText className="w-8 h-8 text-muted mb-3 opacity-60" />
        <h2 className="text-sm font-semibold text-primary mb-1">Generated Reports</h2>
        <p className="text-xs text-muted">No recent reports generated.</p>
      </div>
    </div>
  );
}
