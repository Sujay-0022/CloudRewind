import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const getPageName = () => {
    const path = location.pathname;
    if (path === '/') return 'Overview';
    return path.substring(1).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-background shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-1.5 text-muted hover:text-primary transition-colors">
          <Menu className="w-4 h-4" />
        </button>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-muted text-sm font-medium">Acme Corp</span>
          <span className="hidden md:inline text-muted">/</span>
          <span className="text-primary text-sm font-medium">{getPageName()}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="relative hidden md:block group">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search commands... (Cmd+K)"
            className="bg-surface border border-border rounded-md pl-9 pr-4 py-1.5 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-muted focus:ring-0 transition-colors w-64"
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="md:hidden p-1.5 text-muted hover:text-primary transition-colors">
          <Search className="w-4 h-4" />
        </button>

        {/* Environment Selector */}
        <button className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-surface border border-border rounded-md hover:bg-surface-hover transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-sm font-medium text-primary">Demo</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted" />
        </button>

        {/* Notifications */}
        <button className="p-1.5 text-muted hover:text-primary transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full border border-background"></span>
        </button>

        {/* Profile */}
        <button className="w-7 h-7 rounded-full bg-surface-hover border border-border flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity ml-1">
          <span className="text-[10px] font-semibold text-primary">JD</span>
        </button>
      </div>
    </header>
  );
}
