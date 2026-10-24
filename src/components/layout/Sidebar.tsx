import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  History,
  FlaskConical,
  Network,
  Activity,
  FileText,
  Settings,
  Cloud,
  X
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Incidents", path: "/incidents", icon: AlertCircle },
  { name: "Time Machine", path: "/time-machine", icon: History },
  { name: "Experiments", path: "/experiments", icon: FlaskConical },
  { name: "Services", path: "/services", icon: Network },
  { name: "Telemetry", path: "/telemetry", icon: Activity },
  { name: "Reports", path: "/reports", icon: FileText },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-surface flex flex-col h-full">
      {/* Brand */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-2.5 text-primary font-medium">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Cloud className="w-4 h-4 text-background" />
          </div>
          <span className="tracking-tight text-sm">CloudRewind</span>
        </div>
        <button onClick={onClose} className="md:hidden p-1 text-muted hover:text-primary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[11px] font-medium text-muted mb-2 px-2 uppercase tracking-wider">Workspace</div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors text-sm font-medium",
                isActive
                  ? "bg-surface-hover text-primary"
                  : "text-muted hover:text-primary hover:bg-surface-hover/50"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-border">
        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors text-sm font-medium",
              isActive
                ? "bg-surface-hover text-primary"
                : "text-muted hover:text-primary hover:bg-surface-hover/50"
            )
          }
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
      </div>
    </div>
  );
}
