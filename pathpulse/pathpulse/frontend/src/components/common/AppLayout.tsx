import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import {
  Navigation, LayoutDashboard, MapPin, BarChart3,
  Users, LogOut, Settings, Bell
} from 'lucide-react'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/track',     icon: Navigation,      label: 'Track'     },
  { to: '/history',   icon: MapPin,          label: 'History'   },
  { to: '/analytics', icon: BarChart3,       label: 'Analytics' },
  { to: '/social',    icon: Users,           label: 'Social'    },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { pathname }  = useLocation()
  const { user, clearAuth } = useAuthStore()
  const navigate      = useNavigate()

  const handleLogout = () => { clearAuth(); navigate('/') }

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 glass border-r border-surface-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-surface-border">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <Navigation size={15} className="text-white" />
          </div>
          <span className="font-bold font-display text-white tracking-tight">PathPulse</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                           transition-all duration-150
                           ${active
                             ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                             : 'text-slate-400 hover:text-white hover:bg-surface-tertiary'}`}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-surface-border space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                            text-slate-400 hover:text-white hover:bg-surface-tertiary transition-colors">
            <Bell size={16} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                            text-slate-400 hover:text-white hover:bg-surface-tertiary transition-colors">
            <Settings size={16} /> Settings
          </button>
          <div className="flex items-center gap-3 px-3 py-2.5 mt-2">
            <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center
                           text-white text-xs font-bold flex-shrink-0">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{user?.username}</div>
              <div className="text-slate-500 text-xs truncate">{user?.email}</div>
            </div>
            <button onClick={handleLogout}
              className="text-slate-500 hover:text-red-400 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}
