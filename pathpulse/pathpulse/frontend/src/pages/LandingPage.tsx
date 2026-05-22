import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Navigation, Zap, BarChart3, Users, Shield, Fuel,
  ArrowRight, Github, Globe, ChevronRight
} from 'lucide-react'

const FEATURES = [
  { icon: Navigation, title: 'Live GPS Tracking', color: '#0ba1e2',
    desc: 'Sub-100ms real-time position updates streamed via WebSocket. Track yourself or watch friends move across the map.' },
  { icon: Zap, title: 'Instant Alerts', color: '#00d68f',
    desc: 'Set geo-fence boundaries and receive instant push notifications when entering or exiting any defined zone.' },
  { icon: BarChart3, title: 'Deep Analytics', color: '#a78bfa',
    desc: 'Speed heatmaps, distance trends, CO₂ footprint, and fuel analytics visualised with beautiful interactive charts.' },
  { icon: Fuel, title: 'Fuel Intelligence', color: '#ff8c42',
    desc: 'ML-powered consumption estimates per vehicle type. Track your environmental impact with CO₂ offset metrics.' },
  { icon: Users, title: 'Social Layer', color: '#f472b6',
    desc: 'Follow friends, share your best routes, compete on leaderboards, and explore crowd-sourced path data.' },
  { icon: Shield, title: 'Privacy First', color: '#34d399',
    desc: 'End-to-end JWT auth, granular visibility controls, and zero-PII telemetry logging by default.' },
]

const STATS = [
  { value: '< 100ms', label: 'GPS Update Latency' },
  { value: '1M+',     label: 'Events/sec via Kafka' },
  { value: '6',       label: 'Transport Modes' },
  { value: '99.9%',   label: 'Uptime SLA' },
]

const STACK = [
  { name: 'Spring Boot', role: 'Backend API' },
  { name: 'Apache Kafka', role: 'Event Streaming' },
  { name: 'PostgreSQL', role: 'Primary DB' },
  { name: 'Redis', role: 'Cache & Pub/Sub' },
  { name: 'ScyllaDB', role: 'Time-Series GPS' },
  { name: 'React 18', role: 'Web Frontend' },
  { name: 'Flutter', role: 'Mobile App' },
  { name: 'WebSocket', role: 'Real-time Layer' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-slate-100 overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Navigation size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold font-display tracking-tight">PathPulse</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stack"    className="hover:text-white transition-colors">Stack</a>
            <a href="#stats"    className="hover:text-white transition-colors">Stats</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"    className="btn-ghost text-sm py-2 px-4">Sign In</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 bg-grid-pattern bg-grid">
        {/* Glow blobs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px]
                        bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-brand-500/10 border border-brand-500/20 text-brand-400
                       text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Real-time journey intelligence platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.05] mb-6"
          >
            Track every{' '}
            <span className="text-gradient">journey.</span>
            <br />
            Understand every{' '}
            <span className="text-gradient">mile.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            PathPulse is a production-grade GPS tracking platform built on a microservices
            architecture. Real-time telemetry via Kafka, interactive maps, fuel analytics,
            and a social layer — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
              Start Tracking Free
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://github.com/yourusername/pathpulse"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex items-center gap-2 text-base px-8 py-3.5"
            >
              <Github size={18} />
              View Source
            </a>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto mt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface pointer-events-none z-10" />
          <div className="glass rounded-2xl border border-surface-border overflow-hidden shadow-2xl shadow-black/50 glow-brand">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-surface-tertiary">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-slate-500 bg-surface px-3 py-1 rounded-md">
                  app.pathpulse.io/dashboard
                </span>
              </div>
            </div>
            {/* Dashboard mock */}
            <DashboardMock />
          </div>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section id="stats" className="py-16 px-6 border-y border-surface-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold font-display text-gradient mb-2">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Everything you need to{' '}
              <span className="text-gradient">move smarter</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From real-time GPS telemetry to social route sharing — PathPulse covers
              the full journey lifecycle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="card group hover:border-brand-500/30 transition-all duration-300
                           hover:-translate-y-1"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: f.color + '15', border: `1px solid ${f.color}30` }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────────── */}
      <section id="stack" className="py-24 px-6 bg-surface-secondary border-y border-surface-border">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Production-grade <span className="text-gradient">tech stack</span>
            </h2>
            <p className="text-slate-400">
              Built on technologies used by the world's largest real-time systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STACK.map((s, i) => (
              <motion.div
                key={s.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.05 }}
                className="bg-surface border border-surface-border rounded-xl p-4
                           hover:border-brand-500/30 transition-colors text-center group"
              >
                <div className="font-semibold text-white text-sm group-hover:text-brand-400
                               transition-colors">{s.name}</div>
                <div className="text-slate-500 text-xs mt-1">{s.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-5xl font-bold font-display mb-6">
              Ready to track your <span className="text-gradient">first journey?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Free to use. No credit card required. Set up in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary flex items-center gap-2 text-lg px-10 py-4">
                Create Free Account
                <ChevronRight size={20} />
              </Link>
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium
                                         flex items-center gap-1 transition-colors">
                Sign in to existing account
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-surface-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center
                        justify-between gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Navigation size={14} className="text-brand-500" />
            <span>PathPulse © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/yourusername/pathpulse" target="_blank" rel="noreferrer"
               className="hover:text-white transition-colors flex items-center gap-1.5">
              <Github size={14} /> GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Globe size={14} /> Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── Inline Dashboard Mock Component ─────────────────────────────────── */
function DashboardMock() {
  return (
    <div className="bg-surface p-5 grid grid-cols-12 gap-4 min-h-[360px]">
      {/* Sidebar */}
      <div className="col-span-2 space-y-1">
        {['Dashboard','Track','History','Analytics','Social'].map((item, i) => (
          <div key={item}
            className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors
                       ${i === 0 ? 'bg-brand-500/15 text-brand-400' : 'text-slate-500 hover:text-white'}`}>
            {item}
          </div>
        ))}
      </div>
      {/* Main content */}
      <div className="col-span-10 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Distance', value: '2,847 km', color: '#0ba1e2' },
            { label: 'Journeys',       value: '142',       color: '#00d68f' },
            { label: 'Avg Speed',      value: '62 km/h',   color: '#a78bfa' },
            { label: 'CO₂ Saved',      value: '18.4 kg',   color: '#ff8c42' },
          ].map(stat => (
            <div key={stat.label}
              className="bg-surface-secondary rounded-xl p-3 border border-surface-border">
              <div className="text-slate-500 text-xs mb-1">{stat.label}</div>
              <div className="text-base font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3 bg-surface-secondary rounded-xl p-3 border border-surface-border h-[180px] relative overflow-hidden">
            <div className="text-xs text-slate-500 mb-2">Live Map View</div>
            {/* Fake map dots */}
            <div className="absolute inset-3 rounded-lg bg-brand-950 overflow-hidden">
              <div className="absolute w-full h-full opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, #0ba1e215 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #0ba1e215 0px, transparent 1px, transparent 30px)' }} />
              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
                <polyline points="20,120 60,90 100,70 140,55 180,60 220,45 260,30"
                  fill="none" stroke="#0ba1e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="260" cy="30" r="5" fill="#0ba1e2" className="animate-pulse" />
                <circle cx="20"  cy="120" r="4" fill="#00d68f" />
              </svg>
            </div>
          </div>
          <div className="col-span-2 bg-surface-secondary rounded-xl p-3 border border-surface-border h-[180px]">
            <div className="text-xs text-slate-500 mb-2">Speed (km/h)</div>
            <svg viewBox="0 0 160 100" className="w-full h-[120px]">
              <polyline
                points="0,90 20,70 40,60 60,65 80,40 100,45 120,30 140,35 160,20"
                fill="none" stroke="#a78bfa" strokeWidth="2" />
              <polyline
                points="0,90 20,70 40,60 60,65 80,40 100,45 120,30 140,35 160,20 160,100 0,100"
                fill="url(#grad)" opacity="0.3" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#a78bfa00" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
