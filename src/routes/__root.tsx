import { createRootRouteWithContext, Outlet, Link, useNavigate } from '@tanstack/react-router';
import { 
  Home, PawPrint, ClipboardList, Menu, X, LogOut, 
  CheckSquare, CalendarDays, Syringe, HeartPulse, 
  ShieldAlert, Truck, PlaneTakeoff, Wrench, Utensils
} from 'lucide-react';
import { useState } from 'react';
import type { AuthState } from '../features/auth/authStore';
import { useAuthStore } from '../features/auth/authStore';
import { SyncStatusBadge } from '../components/SyncStatusBadge';

interface MyRouterContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const userName = useAuthStore((state) => state.userName);
  const userInitials = useAuthStore((state) => state.userInitials);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Outlet />;
  }

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const NavItem = ({ to, icon: Icon, label, onClick }: any) => {
    if (to === '/') {
      return (
        <Link
          to="/"
          onClick={onClick}
          className="flex items-center gap-3 px-3 py-2 rounded text-slate-400 hover:bg-slate-800 transition-colors [&.active]:bg-slate-800 [&.active]:text-emerald-400"
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium text-sm">{label}</span>
        </Link>
      );
    }
    return (
      <button className="w-full flex items-center justify-start gap-3 px-3 py-2 rounded text-slate-400 hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed">
        <Icon className="w-4 h-4" />
        <span className="font-medium text-sm">{label}</span>
      </button>
    );
  };

  const NavCategory = ({ title, children }: any) => (
    <div className="mb-6">
      <span className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2 block">{title}</span>
      <div className="flex flex-col gap-1">
        {children}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-[#0f1115] text-slate-100 overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1f26] border-r border-slate-800 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 h-16 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <img src="/logo.png" alt="KOA Logo" className="w-8 h-8 object-contain" />
             <span className="font-bold tracking-widest text-xs uppercase text-slate-200">KOA Manager</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={closeSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto no-scrollbar">
          <NavCategory title="Overview">
            <NavItem to="/" icon={Home} label="Dashboard" onClick={closeSidebar} />
          </NavCategory>

          <NavCategory title="Husbandry">
            <NavItem to="/daily-logs" icon={ClipboardList} label="Daily Logs" onClick={closeSidebar} />
            <NavItem to="/daily-rounds" icon={CalendarDays} label="Daily Rounds" onClick={closeSidebar} />
            <NavItem to="/tasks" icon={CheckSquare} label="Tasks" onClick={closeSidebar} />
            <NavItem to="/feeding-schedule" icon={Utensils} label="Feeding Schedule" onClick={closeSidebar} />
          </NavCategory>

          <NavCategory title="Animals">
            <NavItem to="/animals" icon={PawPrint} label="Animals" onClick={closeSidebar} />
            <NavItem to="/clinical-notes" icon={HeartPulse} label="Clinical Notes" onClick={closeSidebar} />
            <NavItem to="/medications" icon={Syringe} label="Medications" onClick={closeSidebar} />
            <NavItem to="/quarantine" icon={ShieldAlert} label="Quarantine" onClick={closeSidebar} />
          </NavCategory>

          <NavCategory title="Logistics">
            <NavItem to="/movements" icon={Truck} label="Movements" onClick={closeSidebar} />
            <NavItem to="/flight-records" icon={PlaneTakeoff} label="Flight Records" onClick={closeSidebar} />
          </NavCategory>

          <NavCategory title="Safety">
            <NavItem to="/maintenance" icon={Wrench} label="Maintenance" onClick={closeSidebar} />
          </NavCategory>
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <button 
            className="flex items-center gap-3 w-full px-3 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium text-sm">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0f1115]">
        {/* Top Header */}
        <header className="h-16 bg-[#1c1f26] border-b border-slate-800 flex items-center justify-between px-4 shrink-0 transition-all">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <SyncStatusBadge />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300 hidden sm:block">{userName || 'Keeper'}</span>
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold font-mono text-xs text-slate-300">
              {userInitials || 'KA'}
            </div>
          </div>
        </header>

        {/* Dashboard/Outlet content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
