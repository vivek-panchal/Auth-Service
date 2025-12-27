import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { server } from '../main.jsx'
import api from '../apiIntercepter.js'
import { Link } from 'react-router-dom'
import { Shield, Users, Settings, Activity, ArrowLeft, ShieldCheck, Database, Server, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const [adminData, setAdminData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetchAdminData() {
    try {
      const { data } = await api.get(`${server}/api/v1/admin`, { withCredentials: true })
      setAdminData(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

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
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-lg font-semibold gradient-text">AuthGuard</span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--text-muted)] text-sm">Admin</span>
              </div>
            </div>
            
            <Link to="/" className="btn btn-secondary text-sm py-2 px-3">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* Admin Header */}
        <div className="dashboard-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="badge badge-warning mb-3">
                <Settings className="w-3 h-3" />
                Admin Panel
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-1">
                Admin Dashboard
              </h1>
              <p className="text-[var(--text-secondary)] text-sm">
                Manage settings and view system status.
              </p>
            </div>
            
            <div className="hidden sm:flex w-16 h-16 rounded-xl bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.3)] items-center justify-center float-animation">
              <Settings className="w-8 h-8 text-[var(--warning)]" />
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-card">
          <h2 className="text-base font-medium text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--accent-light)]" />
            System Status
          </h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="flex flex-col items-center gap-3">
                <div className="spinner-lg"></div>
                <p className="text-[var(--text-muted)] text-sm">Loading...</p>
              </div>
            </div>
          ) : adminData ? (
            <div className="space-y-4">
              <div className="alert alert-success">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Connected Successfully</p>
                  <p className="text-xs mt-0.5 opacity-80">{adminData}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="stat-card">
                  <div className="stat-icon stat-icon-purple">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">Users</p>
                  <p className="text-[var(--text-primary)] font-medium">Active</p>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon stat-icon-green">
                    <Server className="w-5 h-5" />
                  </div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">Server</p>
                  <p className="text-[var(--text-primary)] font-medium">Online</p>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon stat-icon-blue">
                    <Database className="w-5 h-5" />
                  </div>
                  <p className="text-[var(--text-muted)] text-xs mb-0.5">Database</p>
                  <p className="text-[var(--text-primary)] font-medium">Connected</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-7 h-7 text-[var(--danger)]" />
                </div>
                <p className="text-[var(--danger)] font-medium text-sm">Failed to load data</p>
                <p className="text-[var(--text-muted)] text-xs mt-1">Please check connection</p>
              </div>
            </div>
          )}
        </div>

        {/* Admin Features */}
        <div className="dashboard-card">
          <h2 className="text-base font-medium text-[var(--text-primary)] mb-4">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="action-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[var(--accent-light)]" />
                </div>
                <div>
                  <p className="text-[var(--text-primary)] font-medium text-sm">User Management</p>
                  <p className="text-[var(--text-muted)] text-xs">View and manage users</p>
                </div>
              </div>
            </div>
            
            <div className="action-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.15)] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[var(--info)]" />
                </div>
                <div>
                  <p className="text-[var(--text-primary)] font-medium text-sm">System Settings</p>
                  <p className="text-[var(--text-muted)] text-xs">Configure application</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
