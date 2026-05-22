// TrackPage.tsx
import { useState } from 'react'
import { useJourneyStore } from '@/store/journeyStore'
import { journeyApi } from '@/services/api'
import { Navigation, Square, Pause, Play, Zap, Clock, Gauge, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const MODES = [
  { id: 'CAR',          label: 'Car',          icon: '🚗' },
  { id: 'MOTORCYCLE',   label: 'Moto',         icon: '🏍️' },
  { id: 'BICYCLE',      label: 'Bicycle',      icon: '🚴' },
  { id: 'FOOT',         label: 'Walking',      icon: '🚶' },
  { id: 'TRANSIT',      label: 'Transit',      icon: '🚌' },
  { id: 'ELECTRIC_CAR', label: 'Electric',     icon: '⚡' },
]

export default function TrackPage() {
  const { activeJourney, setActiveJourney, isTracking, setTracking } = useJourneyStore()
  const [mode, setMode]   = useState('CAR')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const startJourney = async () => {
    setLoading(true)
    try {
      const { data } = await journeyApi.start({
        title: title || `${MODES.find(m => m.id === mode)?.label} Journey`,
        transportMode: mode,
        isPublic: false,
      })
      setActiveJourney({ ...data, route: [], currentSpeed: 0, duration: 0 })
      setTracking(true)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const endJourney = async () => {
    if (!activeJourney) return
    await journeyApi.end(activeJourney.id)
    setActiveJourney(null); setTracking(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Track Journey</h1>
        <p className="text-slate-400 mt-1">Start real-time GPS tracking for your trip</p>
      </div>

      {!activeJourney ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Mode selector */}
          <div className="card">
            <h2 className="font-semibold text-white mb-4">Transport Mode</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {MODES.map(m => (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all
                             ${mode === m.id
                               ? 'bg-brand-500/15 border-brand-500/40 text-brand-400'
                               : 'border-surface-border text-slate-400 hover:border-slate-500'}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-white mb-4">Journey Title (optional)</h2>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Morning commute, Weekend ride..."
              className="input-field" />
          </div>

          {/* Map placeholder */}
          <div className="card p-0 overflow-hidden h-64 relative">
            <div className="absolute inset-0 bg-brand-950 flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
              <div className="relative text-center">
                <MapPin size={32} className="text-brand-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Map view initialises when tracking starts</p>
                <p className="text-slate-600 text-xs mt-1">Powered by Mapbox GL JS</p>
              </div>
            </div>
          </div>

          <button onClick={startJourney} disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base">
            <Navigation size={18} />
            {loading ? 'Starting...' : 'Start Journey'}
          </button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          {/* Live stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock,      label: 'Duration',   value: `${Math.floor(activeJourney.duration/60)}m` },
              { icon: Navigation, label: 'Distance',   value: `${activeJourney.totalDistance.toFixed(1)} km` },
              { icon: Gauge,      label: 'Speed',      value: `${activeJourney.currentSpeed.toFixed(0)} km/h` },
              { icon: Zap,        label: 'Max Speed',  value: `${activeJourney.maxSpeed.toFixed(0)} km/h` },
            ].map(s => (
              <div key={s.label} className="card text-center">
                <s.icon size={18} className="text-brand-400 mx-auto mb-2" />
                <div className="text-xl font-bold font-display text-white">{s.value}</div>
                <div className="text-slate-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="card p-0 overflow-hidden h-72 relative">
            <div className="absolute inset-0 bg-brand-950">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg,#0ba1e215 0,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#0ba1e215 0,transparent 1px,transparent 40px)' }} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
                <polyline points="50,250 120,200 200,160 280,140 360,100 440,60"
                  fill="none" stroke="#0ba1e2" strokeWidth="3" strokeLinecap="round" />
                <circle cx="440" cy="60" r="8" fill="#0ba1e2" className="animate-pulse" />
                <circle cx="50" cy="250" r="6" fill="#00d68f" />
              </svg>
              <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 text-xs text-brand-400 font-mono">
                ● LIVE TRACKING
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button onClick={endJourney}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl
                        bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors font-semibold">
              <Square size={16} /> End Journey
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
