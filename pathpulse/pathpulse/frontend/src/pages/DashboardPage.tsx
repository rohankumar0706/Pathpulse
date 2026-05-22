import { useQuery } from '@tanstack/react-query'
import { analyticsApi, journeyApi } from '@/services/api'
import { useAuthStore }  from '@/store/authStore'
import { useJourneyStore } from '@/store/journeyStore'
import { Link } from 'react-router-dom'
import {
  Navigation, TrendingUp, Clock, Fuel, Leaf, ChevronRight,
  MapPin, Zap, Activity
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

const MOCK_CHART = [
  { day: 'Mon', distance: 12.4, speed: 48 },
  { day: 'Tue', distance: 8.1,  speed: 42 },
  { day: 'Wed', distance: 22.7, speed: 61 },
  { day: 'Thu', distance: 5.3,  speed: 35 },
  { day: 'Fri', distance: 18.9, speed: 55 },
  { day: 'Sat', distance: 35.2, speed: 72 },
  { day: 'Sun', distance: 14.6, speed: 50 },
]

const TRANSPORT_ICONS: Record<string, string> = {
  CAR: '🚗', MOTORCYCLE: '🏍️', BICYCLE: '🚴', FOOT: '🚶', TRANSIT: '🚌', ELECTRIC_CAR: '⚡'
}

export default function DashboardPage() {
  const { user }          = useAuthStore()
  const { activeJourney } = useJourneyStore()

  const { data: journeys } = useQuery({
    queryKey: ['journeys'],
    queryFn: () => journeyApi.list().then(r => r.data),
  })

  const stats = [
    { icon: Navigation, label: 'Total Distance', value: '2,847 km', delta: '+12.3%', color: 'brand' },
    { icon: Clock,      label: 'Time on Road',   value: '184 hrs',  delta: '+8.1%',  color: 'purple' },
    { icon: TrendingUp, label: 'Avg Speed',       value: '58 km/h',  delta: '+3.2%',  color: 'green' },
    { icon: Fuel,       label: 'Fuel Used',       value: '148 L',    delta: '-5.4%',  color: 'orange' },
    { icon: Leaf,       label: 'CO₂ Emitted',     value: '342 kg',   delta: '-5.4%',  color: 'green' },
    { icon: Activity,   label: 'Journeys',         value: '142',      delta: '+7',     color: 'brand' },
  ]

  const colorMap: Record<string, string> = {
    brand: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
    purple: 'text-accent-purple bg-purple-500/10 border-purple-500/20',
    green: 'text-accent-green bg-green-500/10 border-green-500/20',
    orange: 'text-accent-orange bg-orange-500/10 border-orange-500/20',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">
            Good {getGreeting()}, {user?.fullName?.split(' ')[0] ?? user?.username} 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's your journey overview</p>
        </div>
        <Link to="/track" className="btn-primary flex items-center gap-2 text-sm">
          <Navigation size={16} />
          Start Journey
        </Link>
      </div>

      {/* Active Journey Banner */}
      {activeJourney && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card border-brand-500/30 bg-brand-500/5 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center animate-pulse">
            <Navigation size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{activeJourney.title}</span>
              <span className="badge bg-brand-500/15 text-brand-400 border border-brand-500/20">LIVE</span>
            </div>
            <p className="text-slate-400 text-sm">
              {activeJourney.totalDistance.toFixed(1)} km · {formatDuration(activeJourney.duration)}
            </p>
          </div>
          <Link to="/track" className="btn-ghost text-sm flex items-center gap-1">
            View Live <ChevronRight size={14} />
          </Link>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card hover:border-slate-600 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3
                           border ${colorMap[s.color]}`}>
              <s.icon size={15} />
            </div>
            <div className="text-xl font-bold font-display text-white">{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            <div className={`text-xs mt-2 font-medium
              ${s.delta.startsWith('+') ? 'text-accent-green' : 'text-accent-red'}`}>
              {s.delta} vs last week
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Recent Journeys */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Distance Chart */}
        <div className="lg:col-span-3 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-white">Weekly Distance</h2>
            <span className="text-slate-500 text-xs">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_CHART}>
              <defs>
                <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ba1e2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ba1e2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#161b27', border: '1px solid #2a3245', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#0ba1e2' }}
              />
              <Area type="monotone" dataKey="distance" stroke="#0ba1e2" strokeWidth={2}
                    fill="url(#distGrad)" name="km" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Journeys */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Recent Journeys</h2>
            <Link to="/history" className="text-brand-400 text-xs hover:text-brand-300 flex items-center gap-1">
              All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_RECENT.map((j) => (
              <div key={j.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-tertiary
                           transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-surface-tertiary flex items-center justify-center text-lg">
                  {TRANSPORT_ICONS[j.mode]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{j.title}</div>
                  <div className="text-slate-500 text-xs">{j.distance} · {j.date}</div>
                </div>
                <div className={`badge text-xs ${j.status === 'COMPLETED'
                  ? 'bg-green-500/10 text-accent-green border border-green-500/20'
                  : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'}`}>
                  {j.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Navigation, label: 'New Journey',  to: '/track',     color: '#0ba1e2' },
          { icon: MapPin,     label: 'View History',  to: '/history',   color: '#00d68f' },
          { icon: TrendingUp, label: 'Analytics',     to: '/analytics', color: '#a78bfa' },
          { icon: Zap,        label: 'Social Feed',   to: '/social',    color: '#ff8c42' },
        ].map(a => (
          <Link key={a.label} to={a.to}
            className="card hover:border-slate-600 transition-all flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform
                           group-hover:scale-110"
                 style={{ backgroundColor: a.color + '15', border: `1px solid ${a.color}30` }}>
              <a.icon size={16} style={{ color: a.color }} />
            </div>
            <span className="text-sm font-medium text-white">{a.label}</span>
            <ChevronRight size={14} className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}

const MOCK_RECENT = [
  { id: '1', title: 'Morning Commute',  mode: 'CAR',        distance: '24.3 km', date: 'Today',     status: 'COMPLETED' },
  { id: '2', title: 'Grocery Run',      mode: 'CAR',        distance: '6.1 km',  date: 'Yesterday', status: 'COMPLETED' },
  { id: '3', title: 'Weekend Ride',     mode: 'BICYCLE',    distance: '48.7 km', date: 'Sat',       status: 'COMPLETED' },
  { id: '4', title: 'Evening Walk',     mode: 'FOOT',       distance: '3.2 km',  date: 'Fri',       status: 'COMPLETED' },
]
