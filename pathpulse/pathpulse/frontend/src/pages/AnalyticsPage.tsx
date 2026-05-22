import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { motion } from 'framer-motion'

const weeklyData = [
  { day: 'Mon', distance: 12.4, fuel: 1.2, co2: 2.8 },
  { day: 'Tue', distance: 8.1,  fuel: 0.8, co2: 1.8 },
  { day: 'Wed', distance: 22.7, fuel: 2.1, co2: 4.9 },
  { day: 'Thu', distance: 5.3,  fuel: 0.5, co2: 1.2 },
  { day: 'Fri', distance: 18.9, fuel: 1.7, co2: 3.9 },
  { day: 'Sat', distance: 35.2, fuel: 3.1, co2: 7.2 },
  { day: 'Sun', distance: 14.6, fuel: 1.3, co2: 3.0 },
]

const monthlySpeed = [
  { month: 'Jul', avg: 52, max: 98 },
  { month: 'Aug', avg: 55, max: 112 },
  { month: 'Sep', avg: 49, max: 95 },
  { month: 'Oct', avg: 61, max: 118 },
  { month: 'Nov', avg: 58, max: 105 },
  { month: 'Dec', avg: 63, max: 121 },
]

const modeData = [
  { name: 'Car',     value: 68, color: '#0ba1e2' },
  { name: 'Bicycle', value: 18, color: '#00d68f' },
  { name: 'Walking', value: 9,  color: '#a78bfa' },
  { name: 'Transit', value: 5,  color: '#ff8c42' },
]

const TIP = { contentStyle: { background: '#161b27', border: '1px solid #2a3245', borderRadius: 8 }, labelStyle: { color: '#e2e8f0' } }

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Analytics</h1>
        <p className="text-slate-400 mt-1">Detailed insights into your travel patterns</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Distance',  value: '2,847 km', sub: 'All time',      color: '#0ba1e2' },
          { label: 'CO₂ Emitted',    value: '342 kg',   sub: 'This year',     color: '#00d68f' },
          { label: 'Fuel Consumed',   value: '148 L',    sub: 'This year',     color: '#ff8c42' },
          { label: 'Trees to Offset', value: '17',       sub: 'CO₂ equivalent', color: '#34d399' },
        ].map(s => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            className="card">
            <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
            <div className="text-white text-sm font-medium mt-1">{s.label}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly distance + fuel */}
        <div className="lg:col-span-2 card">
          <h2 className="font-semibold text-white mb-1">Weekly Distance & Fuel</h2>
          <p className="text-slate-500 text-xs mb-5">Last 7 days</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="distG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ba1e2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ba1e2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fuelG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ff8c42" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff8c42" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TIP} />
              <Area type="monotone" dataKey="distance" stroke="#0ba1e2" strokeWidth={2} fill="url(#distG)" name="km" />
              <Area type="monotone" dataKey="fuel"     stroke="#ff8c42" strokeWidth={2} fill="url(#fuelG)" name="L" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transport mode */}
        <div className="card">
          <h2 className="font-semibold text-white mb-1">Transport Mix</h2>
          <p className="text-slate-500 text-xs mb-4">By journey count</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={modeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                dataKey="value" paddingAngle={3}>
                {modeData.map(d => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip {...TIP} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {modeData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-400">{d.name}</span>
                </div>
                <span className="text-white font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Speed over months */}
      <div className="card">
        <h2 className="font-semibold text-white mb-1">Speed Trends</h2>
        <p className="text-slate-500 text-xs mb-5">Average vs max speed per month</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlySpeed}>
            <XAxis dataKey="month" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false} unit=" km/h" />
            <Tooltip {...TIP} />
            <Line type="monotone" dataKey="avg" stroke="#0ba1e2" strokeWidth={2} dot={{ fill:'#0ba1e2' }} name="Avg" />
            <Line type="monotone" dataKey="max" stroke="#a78bfa" strokeWidth={2} dot={{ fill:'#a78bfa' }} strokeDasharray="4 2" name="Max" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
