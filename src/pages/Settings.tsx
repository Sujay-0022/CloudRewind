import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-xl font-semibold text-primary tracking-tight">Settings</h1>
        <p className="text-sm text-muted mt-1">Configure workspace and integration preferences.</p>
      </div>
      <div className="surface-panel p-6 flex flex-col items-center justify-center min-h-[400px] bg-background/50">
        <SettingsIcon className="w-8 h-8 text-muted mb-3 opacity-60" />
        <h2 className="text-sm font-semibold text-primary mb-1">Workspace Settings</h2>
        <p className="text-xs text-muted">Manage users, roles, and connected platforms.</p>
      </div>
    </div>
  );
}
