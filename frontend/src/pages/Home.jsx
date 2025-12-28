import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Shield, Settings, User, Mail, BadgeCheck, Lock, Zap, Eye } from 'lucide-react';

const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[900px] mx-auto animate-fadeIn">
        
        {/* Main Card */}
        <div className="form-card p-8 lg:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center animate-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Welcome Back
            </h1>
            
            {user && (
              <p className="text-lg text-[var(--text-secondary)]">
                Hello, <span className="text-[var(--accent-primary)] font-semibold">{user.name}</span>
              </p>
            )}
            
            <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[var(--success-bg)] text-[var(--success)] rounded-lg text-sm font-medium">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse"></div>
              Authenticated
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="bg-[var(--bg-secondary)] rounded-xl p-5 mb-8 border border-[var(--border-color)]">
              <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Account Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[var(--accent-glow)] rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm">Email</span>
                  </div>
                  <span className="text-[var(--text-primary)] font-medium text-sm truncate max-w-[200px]">{user.email}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[var(--accent-glow)] rounded-lg flex items-center justify-center">
                      <BadgeCheck className="w-4 h-4 text-[var(--accent-primary)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm">Role</span>
                  </div>
                  <span className="px-3 py-1 bg-[var(--accent-glow)] text-[var(--accent-primary)] rounded-lg text-sm font-medium capitalize">
                    {user.role || 'User'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[var(--success-bg)] rounded-lg flex items-center justify-center">
                      <BadgeCheck className="w-4 h-4 text-[var(--success)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm">Status</span>
                  </div>
                  <span className="px-3 py-1 bg-[var(--success-bg)] text-[var(--success)] rounded-lg text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user && user.role === 'admin' && (
              <Link to="/dashboard" className="btn-primary">
                <Settings className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}
            
            <button onClick={() => logoutUser(navigate)} className="btn-secondary">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Lock, title: 'Encrypted', desc: 'End-to-end protection' },
            { icon: Zap, title: 'Real-time', desc: '24/7 monitoring' },
            { icon: Eye, title: 'Private', desc: 'Your data stays yours' }
          ].map((item, i) => (
            <div 
              key={i}
              className="info-card text-center animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-11 h-11 bg-[var(--accent-glow)] rounded-lg flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-[var(--accent-primary)]" />
              </div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</h4>
              <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
