// HistoryPage.tsx
import { journeyApi } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Clock, Gauge, Fuel, ChevronRight, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const MOCK = [
  { id:'1', title:'Morning Commute',  mode:'🚗', distance:'24.3 km', duration:'28 min', speed:'52 km/h', fuel:'1.9 L', date:'Today, 08:14',      status:'COMPLETED' },
  { id:'2', title:'Grocery Run',      mode:'🚗', distance:'6.1 km',  duration:'12 min', speed:'31 km/h', fuel:'0.5 L', date:'Yesterday, 17:42',  status:'COMPLETED' },
  { id:'3', title:'Weekend Ride',     mode:'🚴', distance:'48.7 km', duration:'2h 14m', speed:'21 km/h', fuel:'0 L',   date:'Sat, 09:30',        status:'COMPLETED' },
  { id:'4', title:'Evening Walk',     mode:'🚶', distance:'3.2 km',  duration:'38 min', speed:'5 km/h',  fuel:'0 L',   date:'Fri, 19:05',        status:'COMPLETED' },
  { id:'5', title:'Airport Transfer', mode:'🚗', distance:'62.8 km', duration:'54 min', speed:'70 km/h', fuel:'5.0 L', date:'Thu, 06:15',        status:'COMPLETED' },
  { id:'6', title:'Lunch Ride',       mode:'🚴', distance:'12.1 km', duration:'41 min', speed:'18 km/h', fuel:'0 L',   date:'Wed, 12:35',        status:'COMPLETED' },
]

export function HistoryPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Journey History</h1>
          <p className="text-slate-400 mt-1">All your past trips in one place</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="input-field py-2 text-sm w-auto">
            <option>All modes</option>
            <option>Car</option>
            <option>Bicycle</option>
            <option>Walking</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK.map((j, i) => (
          <motion.div key={j.id}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.05 }}
            className="card hover:border-slate-600 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-tertiary flex items-center justify-center text-2xl flex-shrink-0">
                {j.mode}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{j.title}</span>
                  <span className="badge bg-green-500/10 text-accent-green border border-green-500/20 text-xs">{j.status}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    { icon: MapPin, val: j.distance },
                    { icon: Clock,  val: j.duration },
                    { icon: Gauge,  val: j.speed },
                    { icon: Fuel,   val: j.fuel },
                  ].map(s => (
                    <span key={s.val} className="flex items-center gap-1 text-slate-400 text-xs">
                      <s.icon size={11} /> {s.val}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-slate-500 text-xs">{j.date}</div>
                <div className="flex items-center gap-2 mt-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                  <button className="text-slate-500 hover:text-brand-400 transition-colors">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage

// ── Social Page ───────────────────────────────────────────────────────
const FEED = [
  { id:'1', user:'alex_r', avatar:'A', mode:'🚗', title:'Cross-city commute', distance:'38.2 km', speed:'61 km/h', time:'2h ago',  likes:12 },
  { id:'2', user:'priya_m', avatar:'P', mode:'🚴', title:'Sunday morning ride', distance:'55.1 km', speed:'24 km/h', time:'5h ago', likes:34 },
  { id:'3', user:'carlos_g', avatar:'C', mode:'🚶', title:'Park evening walk', distance:'4.8 km', speed:'5 km/h',  time:'1d ago',  likes:8  },
]

export function SocialPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Social Feed</h1>
        <p className="text-slate-400 mt-1">See what your friends are tracking</p>
      </div>
      <div className="space-y-4">
        {FEED.map((p, i) => (
          <motion.div key={p.id}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.07 }}
            className="card hover:border-slate-600 transition-colors">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center
                             text-white text-sm font-bold flex-shrink-0">
                {p.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">@{p.user}</span>
                  <span className="text-slate-600 text-xs">·</span>
                  <span className="text-slate-500 text-xs">{p.time}</span>
                </div>
                <div className="text-slate-300 text-sm mt-0.5">{p.title} {p.mode}</div>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-slate-400 bg-surface rounded-xl px-4 py-3">
              <span className="flex items-center gap-1.5"><MapPin size={13} /> {p.distance}</span>
              <span className="flex items-center gap-1.5"><Gauge   size={13} /> {p.speed}</span>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-surface-border">
              <button className="text-slate-500 hover:text-red-400 transition-colors text-xs flex items-center gap-1">
                ♥ {p.likes}
              </button>
              <button className="text-slate-500 hover:text-brand-400 transition-colors text-xs">
                View Route
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
