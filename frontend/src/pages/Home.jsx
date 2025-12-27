import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, LogOut, Shield, Settings } from 'lucide-react';

const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full animate-fadeIn">
        {/* Welcome Card */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-2xl border border-[var(--border-color)] text-center mb-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
            Welcome Back!
          </h1>
          
          {user && (
            <p className="text-lg text-[var(--text-secondary)] mb-6">
              Hello, <span className="text-[var(--accent-primary)] font-semibold">{user.name}</span>
            </p>
          )}
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--success)] bg-opacity-20 text-[var(--success)] rounded-lg text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse"></div>
            Authenticated
          </div>

          {/* User Info */}
          {user && (
            <div className="bg-[var(--bg-secondary)] rounded-lg p-6 mb-6 border border-[var(--border-color)]">
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4">Account Details</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Email:</span>
                  <span className="text-[var(--text-primary)] font-medium break-all ml-2">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Role:</span>
                  <span className="text-[var(--text-primary)] font-medium capitalize">{user.role || 'User'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Status:</span>
                  <span className="text-[var(--success)] font-medium">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user && user.role === 'admin' && (
              <Link 
                to="/dashboard" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-hover)] hover:to-[var(--accent-primary)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <Settings className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}
            
            <button 
              onClick={() => logoutUser(navigate)} 
              className="inline-flex items-center justify-center gap-2 bg-[var(--bg-secondary)] hover:bg-[var(--error)] text-[var(--text-primary)] hover:text-white font-semibold py-3 px-6 rounded-lg border border-[var(--border-color)] hover:border-[var(--error)] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-color)] text-center">
            <Shield className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Secure</h4>
            <p className="text-xs text-[var(--text-muted)]">End-to-end encryption</p>
          </div>
          
          <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-color)] text-center">
            <HomeIcon className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Protected</h4>
            <p className="text-xs text-[var(--text-muted)]">24/7 monitoring</p>
          </div>
          
          <div className="bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-color)] text-center">
            <Settings className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Compliant</h4>
            <p className="text-xs text-[var(--text-muted)]">GDPR certified</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
