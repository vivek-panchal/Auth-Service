import React from 'react'
import { toast } from 'react-toastify';
import { server } from '../main.jsx';
import api from '../apiIntercepter.js';
import { useEffect } from 'react';
import { Shield, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full animate-fadeIn">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-[var(--accent-primary)]" />
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-2xl border border-[var(--border-color)]">
          {adminData ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[var(--success)] bg-opacity-20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-[var(--success)]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-3">
                Access Granted
              </h2>
              <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-color)]">
                <p className="text-[var(--text-primary)] text-center text-lg">
                  {adminData}
                </p>
              </div>
              
              {/* Admin Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-[var(--success)] rounded-full"></div>
                    <h3 className="text-sm font-medium text-[var(--text-muted)]">System Status</h3>
                  </div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">Online</p>
                </div>
                
                <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full"></div>
                    <h3 className="text-sm font-medium text-[var(--text-muted)]">Access Level</h3>
                  </div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">Admin</p>
                </div>
                
                <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-[var(--warning)] rounded-full"></div>
                    <h3 className="text-sm font-medium text-[var(--text-muted)]">Security</h3>
                  </div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">Protected</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[var(--accent-primary)] bg-opacity-20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-[var(--accent-primary)] animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-3">
                Loading Dashboard
              </h2>
              <p className="text-[var(--text-secondary)] text-center">
                Please wait while we fetch your admin data...
              </p>
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
