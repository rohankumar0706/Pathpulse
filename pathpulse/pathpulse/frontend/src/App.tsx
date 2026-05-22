import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import LandingPage    from '@/pages/LandingPage'
import LoginPage      from '@/pages/LoginPage'
import RegisterPage   from '@/pages/RegisterPage'
import DashboardPage  from '@/pages/DashboardPage'
import TrackPage      from '@/pages/TrackPage'
import HistoryPage    from '@/pages/HistoryPage'
import AnalyticsPage  from '@/pages/AnalyticsPage'
import SocialPage     from '@/pages/SocialPage'
import AppLayout      from '@/components/common/AppLayout'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected app routes */}
        <Route path="/dashboard" element={<PrivateRoute><AppLayout><DashboardPage /></AppLayout></PrivateRoute>} />
        <Route path="/track"     element={<PrivateRoute><AppLayout><TrackPage /></AppLayout></PrivateRoute>} />
        <Route path="/history"   element={<PrivateRoute><AppLayout><HistoryPage /></AppLayout></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><AppLayout><AnalyticsPage /></AppLayout></PrivateRoute>} />
        <Route path="/social"    element={<PrivateRoute><AppLayout><SocialPage /></AppLayout></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
