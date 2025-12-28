import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { server } from '../main.jsx';
import api from '../apiIntercepter.js';
import { Shield, CheckCircle2, ArrowLeft, Activity, Users, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [adminData, setAdminData] = React.useState(null); 
  
  useEffect(() => {
    async function fetchAdminData(){
      try {
        const {data} = await api.get(`${server}/api/v1/admin` , { withCredentials: true });
        setAdminData(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchAdminData();
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[900px] mx-auto animate-fadeIn">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-[var(--text-muted)]">System management</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="form-card p-8">
          {adminData ? (
            <>
              {/* Success */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-[var(--success-bg)] rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-[var(--success)]" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                  Access Granted
                </h2>
                <p className="text-[var(--text-muted)] text-sm">
                  Administrator privileges verified
                </p>
              </div>
              
              {/* Message */}
              <div className="bg-[var(--bg-secondary)] rounded-xl p-5 border border-[var(--border-color)] mb-8">
                <p className="text-[var(--text-primary)] text-center">
                  {adminData}
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Activity, label: 'System', value: 'Online', color: 'success' },
                  { icon: Users, label: 'Access', value: 'Admin', color: 'accent' },
                  { icon: Lock, label: 'Security', value: 'Protected', color: 'warning' }
                ].map((stat, i) => (
                  <div key={i} className="info-card">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        stat.color === 'success' ? 'bg-[var(--success)]' :
                        stat.color === 'accent' ? 'bg-[var(--accent-primary)]' :
                        'bg-[var(--warning)]'
                      }`}></div>
                      <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
                    </div>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Loading */
            <div className="text-center py-10">
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 bg-[var(--accent-glow)] rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-[var(--accent-primary)] animate-pulse" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                Loading Dashboard
              </h2>
              <p className="text-[var(--text-muted)] text-sm mb-5">
                Fetching admin data...
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
