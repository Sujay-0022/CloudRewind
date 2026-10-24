import { 
  Play, Pause, SkipBack, SkipForward, RefreshCw, 
  GitCommit, FileText, Database, Activity, Server, Settings2, ShieldAlert
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function TimeMachine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>("auth-service");
  
  return (
    <div className="h-[calc(100vh-88px)] flex flex-col gap-4 animate-in fade-in duration-500">
      
      {/* Top Bar: Replay Controls & Context */}
      <div className="surface-panel p-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-r border-border pr-4">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <div>
              <h2 className="text-sm font-semibold text-primary">INC-1042: Auth Latency Spike</h2>
              <p className="text-[11px] text-muted">Started 10m ago • Impact: High</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="surface-button">
              <Settings2 className="w-3.5 h-3.5" />
              <span className="text-xs text-muted">Scenario: <span className="text-primary font-medium">Load Spike + DB Fail</span></span>
            </button>
            <button className="text-xs text-accent hover:text-accent/80 font-medium px-3 py-1.5 transition-colors">
              Change Config
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="primary-button">
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch Replay
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* Left Column: Graph & Timeline */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          
          {/* Service Dependency Graph */}
          <div className="surface-panel flex-1 relative overflow-hidden group bg-background/50">
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-sm font-semibold text-primary">Service Topology</h3>
              <p className="text-xs text-muted">T-5m: Peak Anomaly</p>
            </div>
            
            {/* Mock Graph Canvas */}
            <div className="absolute inset-0 flex items-center justify-center cursor-move">
               {/* Edges */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 300 200 C 400 200, 400 150, 500 150" stroke="#27272a" strokeWidth="1.5" fill="none" />
                <path d="M 500 150 C 600 150, 600 250, 700 250" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="4" />
                <path d="M 300 200 C 400 200, 400 300, 500 300" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
              </svg>

              {/* Nodes */}
              <div 
                className="absolute top-[180px] left-[260px] w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:border-muted transition-colors cursor-pointer shadow-sm"
                onClick={() => setSelectedNode("api-gateway")}
              >
                <Activity className="w-4 h-4 text-muted" />
              </div>

              <div 
                className={cn(
                  "absolute top-[130px] left-[480px] w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 shadow-sm z-10",
                  selectedNode === "auth-service" 
                    ? "bg-surface border-2 border-amber-500 scale-105" 
                    : "bg-surface border border-amber-500/30"
                )}
                onClick={() => setSelectedNode("auth-service")}
              >
                <Server className={cn("w-5 h-5", selectedNode === "auth-service" ? "text-amber-500" : "text-amber-500/70")} />
                {selectedNode === "auth-service" && (
                  <span className="absolute -top-6 whitespace-nowrap text-[10px] font-mono text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">auth-service</span>
                )}
              </div>

              <div 
                className="absolute top-[280px] left-[480px] w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:border-muted transition-colors cursor-pointer shadow-sm"
                onClick={() => setSelectedNode("payment-svc")}
              >
                <Activity className="w-4 h-4 text-muted" />
              </div>

              <div 
                className="absolute top-[230px] left-[680px] w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer bg-surface border border-red-500/30 shadow-sm"
                onClick={() => setSelectedNode("users-db")}
              >
                <Database className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="surface-panel h-48 shrink-0 flex flex-col">
            <div className="p-3 border-b border-border flex items-center justify-between bg-surface">
              <h3 className="text-sm font-semibold text-primary">Timeline</h3>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded hover:bg-surface-hover text-muted transition-colors"><SkipBack className="w-3.5 h-3.5" /></button>
                <button 
                  className="p-1.5 rounded bg-surface-hover hover:bg-border text-primary transition-colors border border-border"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button className="p-1.5 rounded hover:bg-surface-hover text-muted transition-colors"><SkipForward className="w-3.5 h-3.5" /></button>
                <div className="w-px h-4 bg-border mx-1"></div>
                <button className="p-1.5 rounded hover:bg-surface-hover text-muted transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            
            <div className="flex-1 relative bg-background/50">
              {/* Timeline Ruler */}
              <div className="absolute inset-x-0 top-0 h-full flex items-start justify-between px-2 pt-2 text-[10px] text-muted font-mono">
                <span>10:30:00</span>
                <span>10:32:00</span>
                <span>10:34:00</span>
                <span>10:36:00</span>
                <span>10:38:00</span>
                <span>10:40:00</span>
              </div>
              
              {/* Event Markers */}
              <div className="absolute top-1/2 left-[15%] w-2.5 h-2.5 bg-blue-500 rounded-full -translate-y-1/2 cursor-pointer group shadow-[0_0_0_4px_rgba(59,130,246,0.1)]">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-surface border border-border p-2 rounded-md text-[11px] shadow-lg z-50">
                  <span className="text-blue-400 font-medium">Deployment</span>: auth-service v2.1
                </div>
              </div>
              <div className="absolute top-1/2 left-[45%] w-2.5 h-2.5 bg-amber-500 rounded-full -translate-y-1/2 cursor-pointer group shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-surface border border-border p-2 rounded-md text-[11px] shadow-lg z-50">
                  <span className="text-amber-500 font-medium">Latency Spike</span>: p95 &gt; 2s
                </div>
              </div>
              <div className="absolute top-1/2 left-[75%] w-2.5 h-2.5 bg-red-500 rounded-full -translate-y-1/2 cursor-pointer group shadow-[0_0_0_4px_rgba(239,68,68,0.1)]">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-surface border border-border p-2 rounded-md text-[11px] shadow-lg z-50">
                  <span className="text-red-400 font-medium">Error Burst</span>: Rate &gt; 5%
                </div>
              </div>

              {/* Playhead */}
              <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-accent z-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-accent"></div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">10:37:12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Evidence & Comparison */}
        <div className="w-[360px] flex flex-col gap-4 shrink-0">
          
          {/* Evidence Panel */}
          <div className="surface-panel flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-border bg-surface">
              <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-muted" />
                Evidence Context
              </h3>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 space-y-6 bg-background/50">
              {/* Selected Node Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">Target</span>
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">{selectedNode}</span>
                </div>
                <p className="text-sm text-primary">Experiencing elevated latency downstream from <code className="text-[11px] bg-surface border border-border px-1 py-0.5 rounded text-muted">users-db</code>.</p>
              </div>

              {/* AI Hypothesis */}
              <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span className="text-xs font-semibold text-indigo-400">Analysis</span>
                </div>
                <p className="text-[13px] text-primary/80 leading-relaxed">
                  The latency spike in <span className="font-mono text-amber-500">auth-service</span> strongly correlates with a missing index in <span className="font-mono text-red-400">users-db</span> after the v2.1 schema migration at 10:30:00.
                </p>
              </div>

              {/* Logs/Traces */}
              <div>
                <span className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-2 block">Recent Traces</span>
                <div className="space-y-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-surface p-2 rounded-md border border-border font-mono text-[10px]">
                      <div className="flex justify-between text-muted mb-1">
                        <span>trace-{Math.floor(Math.random()*10000)}</span>
                        <span className={i === 1 ? "text-red-400" : "text-amber-500"}>{i===1 ? '500' : '2.1s'}</span>
                      </div>
                      <div className="text-primary/70 truncate">SELECT * FROM users WHERE last_login &gt; ?</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Replay Comparison Mini-Chart */}
          <div className="surface-panel h-[220px] shrink-0 flex flex-col">
            <div className="p-3 border-b border-border bg-surface flex justify-between items-center">
              <h3 className="text-sm font-semibold text-primary">Replay Simulation</h3>
              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">Ready</span>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center items-center text-center bg-background/50">
              <GitCommit className="w-6 h-6 text-muted mb-3 opacity-60" />
              <p className="text-[13px] text-primary font-medium mb-1">Compare Configurations</p>
              <p className="text-[11px] text-muted mb-4 max-w-[220px]">Visualize performance differences against the recorded incident.</p>
              <button className="surface-button w-full">
                Select Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
