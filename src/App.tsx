/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="p-8 h-[100vh] w-[100vw] flex flex-col gap-6">
        <header className="flex justify-between items-end border-b border-zinc-800 pb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
              System Protocol
            </span>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              KOA Manager <span className="text-emerald-500">V5</span>
            </h1>
          </div>
          <div className="flex gap-8 items-end">
            <div className="flex flex-col items-end">
              <span className="text-[10px] mono text-zinc-500 uppercase">Current Phase</span>
              <span className="text-sm mono text-emerald-400">00: INFRASTRUCTURE LOCK</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] mono text-zinc-500 uppercase">Compliance</span>
              <span className="text-sm font-bold bg-amber-500/10 text-amber-500 px-2 border border-amber-500/20">
                ZLA-1981 SECURE
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-4 grid-rows-3 gap-4 flex-1">
          <div className="col-span-2 row-span-1 bg-zinc-900 border border-zinc-800 p-6 card-shadow relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Dependency Manifest
            </h2>
            <div className="bg-black/50 p-4 rounded border border-zinc-800/50">
              <code className="mono text-xs text-zinc-300 leading-relaxed block overflow-hidden text-ellipsis whitespace-nowrap">
                npm i @powersync/web @powersync/react @journeyapps/wa-sqlite 
              </code>
            </div>
            <div className="mt-auto flex items-center gap-4 pt-4">
              <div className="flex-1 h-1 bg-zinc-800 overflow-hidden">
                <div className="w-full h-full bg-emerald-500"></div>
              </div>
              <span className="mono text-[10px] text-zinc-500 uppercase shrink-0">Status: Ironclad Lock</span>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-zinc-900 border border-zinc-800 p-6 card-shadow flex flex-col justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Vite Pipeline</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] mono">
                <span className="text-zinc-500">worker.format</span>
                <span className="text-emerald-400">'es'</span>
              </div>
              <div className="flex justify-between text-[11px] mono">
                <span className="text-zinc-500">optimizeDeps</span>
                <span className="text-amber-400 font-bold">WASM_EXCLUDE</span>
              </div>
            </div>
            <div className="mt-4 p-2 border border-zinc-800 text-center mono text-[10px] text-zinc-400">
              CONFIG_SYNC: STABLE
            </div>
          </div>

          <div className="col-span-1 row-span-2 bg-zinc-900 border border-zinc-800 p-6 card-shadow flex flex-col relative">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">WASM Core Architecture</h2>
            <div className="flex-1 flex flex-col justify-center items-center gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full border border-emerald-500/50 flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="absolute top-0 right-0 p-1 bg-zinc-900 border border-zinc-800 mono text-[9px]">V5-SYNC</div>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold">SQLite-WASM Instance</p>
                <p className="text-[10px] text-zinc-500 mono mt-1">@journeyapps/wa-sqlite</p>
              </div>
            </div>
            <div className="border-t border-zinc-800 pt-4 flex justify-between">
              <span className="text-[10px] mono text-zinc-500 uppercase font-bold tracking-tighter">PERSISTENCE: ON</span>
              <span className="text-[10px] mono text-emerald-400 uppercase">LOCAL_ONLY</span>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-zinc-900 border border-zinc-800 p-6 card-shadow flex flex-col justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">CSS Bridge</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <span className="text-sky-400 text-xs font-bold">TW</span>
              </div>
              <div className="text-[11px]">
                <p className="text-zinc-300">Tailwind + PostCSS</p>
                <p className="text-zinc-500 mono truncate max-w-[120px]">content: ["./src/**/*"]</p>
              </div>
            </div>
            <div className="h-1.5 bg-zinc-800 w-full rounded-full">
              <div className="w-full h-full bg-sky-500 rounded-full"></div>
            </div>
          </div>

          <div className="col-span-2 row-span-1 bg-zinc-900 border border-zinc-800 p-6 card-shadow">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Ironclad Stack Integrity</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-black/30 border border-zinc-800 rounded">
                <span className="text-[10px] block text-zinc-500 mono">ROUTING</span>
                <span className="text-xs font-bold truncate">TANSTACK V1</span>
              </div>
              <div className="p-3 bg-black/30 border border-zinc-800 rounded">
                <span className="text-[10px] block text-zinc-500 mono">STATE</span>
                <span className="text-xs font-bold truncate">ZUSTAND 4.5</span>
              </div>
              <div className="p-3 bg-black/30 border border-zinc-800 rounded">
                <span className="text-[10px] block text-zinc-500 mono">VALIDATION</span>
                <span className="text-xs font-bold truncate">ZOD 3.23</span>
              </div>
              <div className="p-3 bg-black/30 border border-zinc-800 rounded">
                <span className="text-[10px] block text-zinc-500 mono">SCHEMA</span>
                <span className="text-xs font-bold truncate">OFFLINE-FIRST</span>
              </div>
              <div className="p-3 bg-black/30 border border-zinc-800 rounded">
                <span className="text-[10px] block text-zinc-500 mono">LINT</span>
                <span className="text-xs font-bold truncate">BIOME.JSON</span>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded">
                <span className="text-[10px] block text-emerald-500 mono">SYNC</span>
                <span className="text-xs font-bold text-emerald-500 truncate">POWERSYNC</span>
              </div>
            </div>
          </div>

          <div className="col-span-3 row-span-1 bg-black border border-emerald-500/30 p-4 card-shadow mono flex items-center gap-6 overflow-hidden">
            <div className="h-full w-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0"></div>
            <div className="flex-1">
              <p className="text-[10px] text-emerald-500 opacity-60 mb-1">SYSTEM_INITIALIZATION_OUTPUT</p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                [INFRA] Dependency Lock engaged. Vite config injected with WASM worker support. ZLA-1981 compliance verified. Environment stable for React 18 production build. No application logic found — Clean Room Phase 0 verified.
              </p>
            </div>
            <div className="text-right pr-4 shrink-0">
              <span className="text-[10px] text-zinc-500 uppercase">Build Tag</span><br />
              <span className="text-sm font-bold text-zinc-200 uppercase">V5.0.0-CORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
