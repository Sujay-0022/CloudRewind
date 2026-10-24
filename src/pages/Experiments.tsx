import { FlaskConical } from "lucide-react";

export default function Experiments() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-semibold text-primary tracking-tight">Experiments</h1>
        <p className="text-sm text-muted mt-1">Manage and launch controlled replay experiments.</p>
      </div>
      <div className="surface-panel p-6 flex flex-col items-center justify-center min-h-[400px] bg-background/50">
        <FlaskConical className="w-8 h-8 text-muted mb-3 opacity-60" />
        <h2 className="text-sm font-semibold text-primary mb-1">Experiment Hub</h2>
        <p className="text-xs text-muted mb-4 max-w-sm text-center">Run hypotheses against historical traces to validate configurations.</p>
        <button className="surface-button">Create New Experiment</button>
      </div>
    </div>
  );
}
