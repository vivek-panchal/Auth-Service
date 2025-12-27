import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, LogOut, Settings, User, ChevronRight, ShieldCheck, Activity } from 'lucide-react'

const Home = () => {
  const { logoutUser, user } = AppData()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <div className="auth-bg"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 py-3">
        <div className="max-w-5xl mx-auto">
          <nav className="dashboard-header">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold gradient-text hidden sm:block">AuthGuard</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)]">
                <div className="avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-[var(--text-secondary)] text-sm">{user?.name || 'User'}</span>
              </div>
              <button onClick={() => logoutUser(navigate)} className="btn btn-danger text-sm py-2 px-3">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Welcome Section */}
        <div className="dashboard-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="badge badge-success mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse"></div>
                Authenticated
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-1">
                Welcome, <span className="gradient-text">{user?.name || 'User'}</span>
              </h1>
              <p className="text-[var(--text-secondary)] text-sm">
                Your account is secure and protected.
              </p>
            </div>
            
            <div className="hidden sm:flex w-16 h-16 rounded-xl bg-[var(--accent-glow)] border border-[var(--border-accent)] items-center justify-center float-animation">
              <ShieldCheck className="w-8 h-8 text-[var(--accent-light)]" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-[var(--text-muted)] text-xs mb-0.5">Security</p>
            <p className="text-[var(--text-primary)] font-medium">Protected</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon stat-icon-green">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-[var(--text-muted)] text-xs mb-0.5">Status</p>
            <p className="text-[var(--text-primary)] font-medium">Active</p>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon stat-icon-blue">
              <User className="w-5 h-5" />
            </div>
            <p className="text-[var(--text-muted)] text-xs mb-0.5">Role</p>
            <p className="text-[var(--text-primary)] font-medium capitalize">{user?.role || 'User'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        {user?.role === 'admin' && (
          <div className="dashboard-card">
            <h2 className="text-base font-medium text-[var(--text-primary)] mb-4">Quick Actions</h2>
            <Link to="/dashboard" className="action-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[var(--accent-light)]" />
                </div>
                <div>
                  <p className="text-[var(--text-primary)] font-medium text-sm">Admin Dashboard</p>
                  <p className="text-[var(--text-muted)] text-xs">Manage users & settings</p>
                </div>
              </div>
              <ChevronRight className="action-arrow w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Account Info */}
        <div className="dashboard-card">
          <h2 className="text-base font-medium text-[var(--text-primary)] mb-4">Account Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
              <p className="text-[var(--text-muted)] text-xs mb-1">Email</p>
              <p className="text-[var(--text-primary)] text-sm font-medium truncate">{user?.email || 'N/A'}</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
              <p className="text-[var(--text-muted)] text-xs mb-1">Name</p>
              <p className="text-[var(--text-primary)] text-sm font-medium">{user?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
