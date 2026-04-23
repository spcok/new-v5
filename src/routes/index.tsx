import { createFileRoute, redirect } from '@tanstack/react-router';
import { Calendar, ChevronLeft, ChevronRight, Activity, Plus, Filter, CloudSun, MapPin, CheckCircle2, Lock, Unlock, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Dashboard,
});

function useDashboardData() {
  return {
    stats: {
      weighed: 7,
      totalAnimals: 42,
      fed: 28,
      pendingDuties: 4,
      healthAlerts: 1
    },
    animals: [
      { id: '1', name: 'Barnaby', species: 'Barn Owl', microchip: '9810200', todaysWeight: '320g', todaysFeed: '2x Mice', lastFed: '09:00AM', location: 'Aviary 1' },
      { id: '2', name: 'Luna', species: 'European Eagle Owl', microchip: '9810201', todaysWeight: '2.1kg', todaysFeed: '1x Quail', lastFed: '10:30AM', location: 'Aviary 3' },
      { id: '3', name: 'Archimedes', species: 'Tawny Owl', microchip: '9810202', todaysWeight: '415g', todaysFeed: '-', lastFed: 'Yesterday', location: 'Aviary 2' },
      { id: '4', name: 'Ghost', species: 'Snowy Owl', microchip: '9810203', todaysWeight: '-', todaysFeed: '-', lastFed: 'Yesterday', location: 'Quarantine' },
    ]
  };
}

function Dashboard() {
  const { stats, animals } = useDashboardData();
  const [viewDate, setViewDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('Owls');
  const [sortOption, setSortOption] = useState('alpha-asc');
  const [isOrderLocked, setIsOrderLocked] = useState(false);

  const tabs = ['Owls', 'Raptors', 'Mammals', 'Exotics', 'Archived'];

  const cycleSort = () => setSortOption(prev => prev === 'alpha-asc' ? 'alpha-desc' : 'alpha-asc');

  const shiftDate = (days: number) => {
    const d = new Date(viewDate);
    d.setDate(d.getDate() + days);
    setViewDate(d.toISOString().split('T')[0]);
  };

  const setToday = () => {
    setViewDate(new Date().toISOString().split('T')[0]);
  };

  const getFormattedDate = () => {
    const today = new Date().toISOString().split('T')[0];
    if (viewDate === today) return "Today";
    const d = new Date(viewDate);
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
  };

  return (
    <div className="p-4 lg:p-8 h-full w-full flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-1">
            Dashboard
          </h1>
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <span className="font-medium">Thursday, 24 October 2026</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <div className="flex items-center gap-1">
              <CloudSun className="w-4 h-4" />
              <span>14°C Mostly Cloudy</span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-[#1c1f26] border border-slate-800 rounded-xl p-5 flex flex-col md:col-span-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            Pending Duties
            <span className="bg-slate-800 text-slate-300 px-2 rounded-full text-[10px]">{stats.pendingDuties}</span>
          </h3>
          <div className="flex-1 flex flex-col gap-3">
             <div className="flex items-start gap-3">
               <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-slate-500" /></div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-slate-200">Enclosure Cleaning Phase 1</p>
                 <p className="text-xs text-slate-500">Aviaries 1-4</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
               <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-slate-500" /></div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-slate-200">Prepare PM feeds</p>
                 <p className="text-xs text-slate-500">Food prep area</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-[#1c1f26] border border-slate-800 rounded-xl p-5 flex flex-col md:col-span-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            Health Rota
            <span className="bg-red-500/20 text-red-400 px-2 rounded-full text-[10px] border border-red-500/20">{stats.healthAlerts} Action</span>
          </h3>
          <div className="flex-1 flex flex-col gap-3">
             <div className="flex items-start gap-3 p-2 bg-red-500/5 border border-red-500/10 rounded">
               <Activity className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
               <div>
                 <p className="text-sm font-medium text-red-400">Ghost (Snowy Owl)</p>
                 <p className="text-xs text-slate-400">Vet check scheduled 14:00</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex flex-col justify-center relative overflow-hidden md:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="w-24 h-24 text-emerald-500" />
          </div>
          <p className="text-xs font-bold text-emerald-400/80 uppercase tracking-widest mb-1 z-10">Weighed Today</p>
          <div className="flex items-end gap-2 z-10">
            <span className="text-4xl font-black text-emerald-400">{stats.weighed}</span>
            <span className="text-sm text-emerald-500/60 font-medium mb-1.5">/ {stats.totalAnimals}</span>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 flex flex-col justify-center relative overflow-hidden md:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Activity className="w-24 h-24 text-amber-500" />
          </div>
          <p className="text-xs font-bold text-amber-400/80 uppercase tracking-widest mb-1 z-10">Fed Today</p>
          <div className="flex items-end gap-2 z-10">
            <span className="text-4xl font-black text-amber-400">{stats.fed}</span>
            <span className="text-sm text-amber-500/60 font-medium mb-1.5">/ {stats.totalAnimals}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#1c1f26] border border-slate-800 rounded-xl overflow-hidden shadow-lg min-h-[400px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between bg-[#111318]/50">
           <div className="flex items-center bg-[#0f1115] border border-slate-700 rounded-lg w-full xl:w-auto p-1 divide-x divide-slate-800 shadow-inner">
             <button onClick={() => shiftDate(-1)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-l transition-colors"><ChevronLeft className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 font-medium text-sm text-slate-200 px-4 flex-1 justify-center whitespace-nowrap">
               <Calendar className="w-4 h-4 text-emerald-500" />
               <div className="relative flex items-center">
                 <input 
                   type="date"
                   value={viewDate}
                   onChange={(e) => setViewDate(e.target.value)}
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 />
                 <span>Viewing Date: {getFormattedDate()}</span>
               </div>
             </div>
             <button onClick={() => shiftDate(1)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><ChevronRight className="w-4 h-4" /></button>
             <button onClick={setToday} className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-white hover:bg-slate-800 rounded-r transition-colors">Today</button>
           </div>
           
           <div className="flex items-center gap-3 w-full xl:w-auto flex-wrap">
             <button 
               onClick={cycleSort}
               className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#0f1115] hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700 shadow-sm"
             >
               {sortOption === 'alpha-asc' ? <ArrowDownAZ className="w-4 h-4 text-slate-400" /> : <ArrowUpAZ className="w-4 h-4 text-slate-400" />}
               <span className="whitespace-nowrap">Sort: {sortOption === 'alpha-asc' ? 'A-Z' : 'Z-A'}</span>
             </button>
             <button 
               onClick={() => setIsOrderLocked(!isOrderLocked)}
               className={`flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border shadow-sm ${isOrderLocked ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-[#0f1115] border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
               title="Lock list order"
             >
               {isOrderLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
               <span className="whitespace-nowrap">{isOrderLocked ? 'Locked' : 'Unlocked'}</span>
             </button>
             <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#3b5b88] hover:bg-[#4a72aa] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#3b5b88] shadow-sm">
               <Plus className="w-4 h-4" /> <span className="whitespace-nowrap">Add Animal</span>
             </button>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-4 pt-4 border-b border-slate-800 overflow-x-auto select-none no-scrollbar bg-[#1c1f26]">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Desktop Data Table */}
        <div className="flex-1 overflow-x-auto bg-[#1c1f26]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0f1115]/80">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Name</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Species</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap hidden lg:table-cell">Ring/Microchip</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Today's Weight</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Today's Feed</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Last Fed</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap hidden sm:table-cell">Location</th>
              </tr>
            </thead>
            <tbody>
              {animals.map((animal) => (
                <tr key={animal.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <span className="font-bold text-slate-100 block">{animal.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono lg:hidden block mt-0.5">{animal.microchip}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">{animal.species}</td>
                  <td className="p-4 text-sm font-mono text-slate-400 hidden lg:table-cell">{animal.microchip}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 xl:px-3 py-1 rounded text-xs font-medium border ${
                      animal.todaysWeight !== '-' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700/50'
                    }`}>
                      {animal.todaysWeight}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">{animal.todaysFeed}</td>
                  <td className="p-4 text-sm text-slate-400">{animal.lastFed}</td>
                  <td className="p-4 hidden sm:table-cell">
                     <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded w-fit">
                       <MapPin className="w-3 h-3 text-emerald-500" />
                       {animal.location}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
