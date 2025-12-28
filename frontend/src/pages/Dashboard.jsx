import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { server } from '../main.jsx';
import api from '../apiIntercepter.js';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [adminData, setAdminData] = React.useState(null); 
  async function fetchAdminData(){
    try {
      const {data} = await api.get(`${server}/api/v1/admin` , { withCredentials: true });
      setAdminData(data.message);
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchAdminData();
  }, []);
  return (
    <div className="container max-w-5xl mx-auto px-6 py-20">
      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v4H3z"/><path d="M3 7h18v14H3z"/></svg>
          </span>
          <h2 className="text-xl font-medium text-neutral-100">Admin Panel</h2>
          <span className="text-xs text-neutral-400">Overview</span>
        </div>
        {adminData ? (
          <p className="text-center text-emerald-400 text-lg mb-8">{adminData}</p>
        ) : (
          <p className="text-center text-neutral-400 text-lg mb-8">Loading admin data...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl p-3 bg-indigo-500/15 ring-1 ring-indigo-500/30">
            <p className="text-xs text-indigo-100">Auth uptime</p>
            <p className="text-sm font-medium text-white">99.9%</p>
          </div>
          <div className="rounded-xl p-3 bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <p className="text-xs text-emerald-100">Success rate</p>
            <p className="text-sm font-medium text-white">High</p>
          </div>
          <div className="rounded-xl p-3 bg-pink-500/15 ring-1 ring-pink-500/30">
            <p className="text-xs text-pink-100">Latency</p>
            <p className="text-sm font-medium text-white">Low</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">System Status</span>
            </div>
            <p className="text-sm text-neutral-400">Authentication services are <span className="text-emerald-400">operational</span>.</p>
            <div className="mt-3 h-2 rounded bg-white/5">
              <div className="h-2 rounded bg-emerald-500 w-3/4"></div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M19 21v-2a4 4 0 0 0-3-3.87M9 15.13A4 4 0 0 0 5 19v2"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Users</span>
            </div>
            <p className="text-sm text-neutral-400">Admin tools are <span className="text-indigo-400">available</span>.</p>
            <div className="mt-3 h-2 rounded bg-white/5">
              <div className="h-2 rounded bg-indigo-500 w-2/3"></div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v4H3z"/><path d="M3 7h18v14H3z"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Activity</span>
            </div>
            <p className="text-sm text-neutral-400">Recent operations are <span className="text-neutral-300">stable</span>.</p>
            <div className="mt-3 h-2 rounded bg-white/5">
              <div className="h-2 rounded bg-neutral-500 w-1/2"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5 10 14l4 3 6-6"/><path d="m14 7 1-1 1 1-1 1-1-1Z"/></svg>
                </span>
                <div>
                  <p className="text-xs text-neutral-400">Auth throughput</p>
                  <p className="text-sm text-neutral-200">Live metric</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400">+3.1%</span>
            </div>
            <div className="flex items-end gap-1 h-24">
              {[30, 50, 45, 70, 65, 80, 60, 75].map((v, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-sm overflow-hidden">
                  <div className="bg-gradient-to-t from-indigo-500 to-emerald-400 h-full" style={{height: `${v}%`}}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m9 17 3-3 2 2 4-4"/></svg>
                </span>
                <div>
                  <p className="text-xs text-neutral-400">Stability</p>
                  <p className="text-sm text-neutral-200">Last 7 events</p>
                </div>
              </div>
              <span className="text-xs text-neutral-400">Stable</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[70, 60, 80, 75, 65, 85, 70].map((v, i) => (
                <div key={i} className="h-16 bg-white/5 rounded-sm relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-indigo-500" style={{height: `${v}%`}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
