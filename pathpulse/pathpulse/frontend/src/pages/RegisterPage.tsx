import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/services/api'
import { Navigation, Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { motion } from 'framer-motion'

const PERKS = [
  'Real-time GPS tracking across 6 transport modes',
  'Smart fuel & CO₂ estimation',
  'Social route sharing & leaderboards',
  'Interactive analytics dashboard',
]

export default function RegisterPage() {
  const [form, setForm]       = useState({ username: '', email: '', password: '', fullName: '' })
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const { setAuth }           = useAuthStore()
  const navigate              = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await authApi.register(form)
      setAuth(data.user, data.accessToken, data.refreshToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left - branding */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center p-12
                      bg-surface-secondary border-r border-surface-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px]
                        bg-accent-green/8 rounded-full blur-3xl" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <Navigation size={18} className="text-white" />
            </div>
            <span className="font-bold font-display text-white text-lg">PathPulse</span>
          </Link>
          <h2 className="text-3xl font-bold font-display text-white mb-3">
            Your journey starts here.
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Join thousands of travelers tracking smarter with PathPulse.
          </p>
          <ul className="space-y-3">
            {PERKS.map(p => (
              <li key={p} className="flex items-start gap-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-accent-green/15 border border-accent-green/30
                               flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={11} className="text-accent-green" />
                </div>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Navigation size={15} className="text-white" />
            </div>
            <span className="font-bold font-display text-white">PathPulse</span>
          </div>

          <h1 className="text-3xl font-bold font-display text-white mb-2">Create your account</h1>
          <p className="text-slate-400 mb-8">Free forever. No credit card required.</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <input type="text" value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="John Doe" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Username <span className="text-red-400">*</span></label>
                <input type="text" value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="john_doe" className="input-field" required minLength={3} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email <span className="text-red-400">*</span></label>
              <input type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="john@example.com" className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min 8 characters" className="input-field pr-11" required minLength={8} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
