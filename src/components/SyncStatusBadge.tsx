import { useStatus } from '@powersync/react';

export function SyncStatusBadge() {
  const status = useStatus();
  const isConnected = status.connected;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
        isConnected
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : 'bg-amber-500/10 border-amber-500/30'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
        }`}
      ></span>
      <span
        className={`text-[10px] font-bold mono uppercase tracking-widest ${
          isConnected ? 'text-emerald-400' : 'text-amber-400'
        }`}
      >
        {isConnected ? 'Sync Online' : 'Offline Mode'}
      </span>
    </div>
  );
}
