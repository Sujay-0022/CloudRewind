import { Activity, AlertTriangle, CheckCircle2, Clock, Play } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// --- Mock Data ---
const METRICS = [
  { label: "Active Incidents", value: "3", change: "+1", trend: "up", icon: AlertTriangle, color: "text-amber-500" },
  { label: "Service Health", value: "94.2%", change: "-1.2%", trend: "down", icon: CheckCircle2, color: "text-green-500" },
  { label: "p95 Latency", value: "245ms", change: "+12ms", trend: "up", icon: Clock, color: "text-accent" },
  { label: "Error Rate", value: "0.14%", change: "-0.02%", trend: "down", icon: Activity, color: "text-blue-400" },
];

const INCIDENTS = [
  { id: "INC-1042", severity: "critical", service: "payment-gateway", time: "10m ago", status: "Investigating" },
  { id: "INC-1041", severity: "high", service: "auth-service", time: "1h ago", status: "Mitigated" },
  { id: "INC-1040", severity: "medium", service: "user-profile", time: "3h ago", status: "Resolved" },
];

const CHART_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  latency: 150 + Math.random() * 100 + (i === 14 ? 300 : 0),
  errors: Math.random() * 0.5 + (i === 14 ? 2 : 0),
}));

const ACTIVITY = [
  { user: "Sarah J.", action: "deployed v2.4.1", target: "auth-service", time: "5m ago" },
  { user: "System", action: "auto-scaled +2 pods", target: "payment-gateway", time: "12m ago" },
  { user: "Mike R.", action: "started replay experiment", target: "checkout-flow", time: "1h ago" },
];

// --- Components ---
export default function OverviewDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary tracking-tight">Overview</h1>
          <p className="text-sm text-muted mt-1">Staging environment operating with degraded performance.</p>
        </div>
        <button className="primary-button">
          <Play className="w-4 h-4 fill-current" />
          Launch Replay
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <div key={metric.label} className="surface-panel p-5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-muted font-medium text-xs uppercase tracking-wider">{metric.label}</span>
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary tracking-tight">{metric.value}</span>
              <span className={`text-xs font-medium ${metric.trend === 'up' && metric.label === 'Service Health' ? 'text-green-500' : (metric.trend === 'down' && metric.label !== 'Service Health' ? 'text-green-500' : 'text-amber-500')}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Charts & Table Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Chart Panel */}
          <div className="surface-panel p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-primary">System Telemetry (24h)</h2>
              <div className="flex gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-muted"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div>Latency</span>
                <span className="flex items-center gap-1.5 text-muted"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>Errors</span>
              </div>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#27272a" tick={{fill: '#a1a1aa', fontSize: 11}} tickLine={false} axisLine={false} />
                  <YAxis stroke="#27272a" tick={{fill: '#a1a1aa', fontSize: 11}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '6px', fontSize: '12px' }}
                    itemStyle={{ color: '#fafafa' }}
                  />
                  <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" />
                  <Area type="monotone" dataKey="errors" stroke="#60a5fa" strokeWidth={2} fillOpacity={1} fill="url(#colorErrors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incidents Table */}
          <div className="surface-panel overflow-hidden">
            <div className="p-4 border-b border-border bg-surface">
              <h2 className="text-sm font-semibold text-primary">Recent Incidents</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-muted border-b border-border bg-background/50">
                    <th className="py-2.5 px-4 font-medium text-xs uppercase tracking-wider">Incident ID</th>
                    <th className="py-2.5 px-4 font-medium text-xs uppercase tracking-wider">Severity</th>
                    <th className="py-2.5 px-4 font-medium text-xs uppercase tracking-wider">Service</th>
                    <th className="py-2.5 px-4 font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {INCIDENTS.map((inc) => (
                    <tr key={inc.id} className="hover:bg-surface-hover/50 transition-colors cursor-pointer">
                      <td className="py-3 px-4 font-mono text-xs text-primary">{inc.id}</td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[11px] font-medium border",
                          inc.severity === 'critical' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          inc.severity === 'high' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        )}>
                          {inc.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted text-sm">{inc.service}</td>
                      <td className="py-3 px-4 text-muted text-sm">{inc.status}</td>
                      <td className="py-3 px-4 text-muted text-sm text-right">{inc.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* Service Dependency Mini-Graph */}
          <div className="surface-panel p-5 h-[260px] flex flex-col">
            <h2 className="text-sm font-semibold text-primary mb-4">Service Topology</h2>
            <div className="flex-1 border border-border rounded-lg bg-background/50 flex items-center justify-center relative overflow-hidden">
              {/* Very basic mock graph using absolute positioning */}
              <div className="absolute top-1/2 left-4 w-10 h-10 bg-surface border border-border rounded-md flex items-center justify-center text-[10px] text-muted -translate-y-1/2 z-10 shadow-sm">API</div>
              <div className="absolute top-1/4 left-1/2 w-12 h-10 bg-surface border-2 border-amber-500/50 rounded-md flex items-center justify-center text-[10px] text-amber-400 -translate-x-1/2 -translate-y-1/2 z-10 shadow-sm">Auth</div>
              <div className="absolute bottom-1/4 left-1/2 w-12 h-10 bg-surface border border-border rounded-md flex items-center justify-center text-[10px] text-muted -translate-x-1/2 translate-y-1/2 z-10 shadow-sm">Pay</div>
              <div className="absolute top-1/2 right-4 w-10 h-10 bg-surface border-2 border-red-500/50 rounded-md flex items-center justify-center text-[10px] text-red-400 -translate-y-1/2 z-10 shadow-sm">DB</div>
              
              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 44 130 C 100 130, 100 65, 140 65" stroke="#3f3f46" strokeWidth="1.5" fill="none" strokeDasharray="4" />
                <path d="M 44 130 C 100 130, 100 195, 140 195" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
                <path d="M 172 65 C 220 65, 220 130, 260 130" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="surface-panel p-5 flex-1">
            <h2 className="text-sm font-semibold text-primary mb-6">Recent Activity</h2>
            <div className="space-y-5">
              {ACTIVITY.map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== ACTIVITY.length - 1 && (
                    <div className="absolute top-5 left-1.5 w-px h-[calc(100%+8px)] bg-border" />
                  )}
                  <div className="w-3 h-3 rounded-full bg-border border-[3px] border-surface z-10 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-primary">
                      <span className="font-medium">{act.user}</span> <span className="text-muted">{act.action}</span>
                    </p>
                    <p className="text-xs font-mono text-muted mt-1">{act.target}</p>
                    <p className="text-[11px] text-muted/70 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
