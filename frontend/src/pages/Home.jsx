import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  const avatarInitial = (user && (user.name || user.email)) ? (user.name || user.email).charAt(0).toUpperCase() : 'U';
  return (
    <div className="container max-w-5xl mx-auto px-6 py-20">
      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-neutral-100 ring-1 ring-white/20 font-semibold">
            {avatarInitial}
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Welcome{user && user.name ? `, ${user.name}` : ' Home'}!</h2>
        </div>
        <p className="text-neutral-400 text-center">Manage your account with a clean, modern interface.</p>
        <div className="flex flex-wrap justify-center gap-2 w-full">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-500/30">Secure sessions</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/30">OTP ready</span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-pink-500/15 text-pink-200 ring-1 ring-pink-500/30">Responsive</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="bg-rose-500 hover:bg-rose-400 active:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" onClick={() => logoutUser(navigate)}>Logout</button>
          {user && user.role === 'admin' && (
            <Link className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" to="/dashboard">Go to Admin Panel</Link>
          )}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M19 21v-2a4 4 0 0 0-3-3.87M9 15.13A4 4 0 0 0 5 19v2"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Profile</span>
            </div>
            <div className="space-y-1 text-sm text-neutral-400">
              <p>Name: <span className="text-neutral-200">{user && user.name ? user.name : '—'}</span></p>
              <p>Email: <span className="text-neutral-200">{user && user.email ? user.email : '—'}</span></p>
              <p>Role: <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white/5 ring-1 ring-white/10 text-neutral-300">{user && user.role ? user.role : 'user'}</span></p>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v4H3z"/><path d="M3 7h18v14H3z"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Status</span>
            </div>
            <div className="space-y-1 text-sm text-neutral-400">
              <p>Authentication: <span className="text-emerald-400">Active</span></p>
              <p>Last active: <span className="text-neutral-300">Recently</span></p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Security</span>
            </div>
            <p className="text-xs text-neutral-400">Account protection</p>
            <div className="mt-2 h-2 rounded bg-white/5">
              <div className="h-2 rounded bg-emerald-500 w-4/5"></div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Strong</p>
          </div>

          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v4H3z"/><path d="M3 7h18v14H3z"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Recent Activity</span>
            </div>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center justify-between">
                <span>Logged in</span>
                <span className="text-xs text-neutral-500">Just now</span>
              </li>
              <li className="flex items-center justify-between">
                <span>OTP verified</span>
                <span className="text-xs text-neutral-500">Today</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Profile viewed</span>
                <span className="text-xs text-neutral-500">This week</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 text-neutral-300 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </span>
              <span className="text-sm font-medium text-neutral-200">Quick Actions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 ring-1 ring-white/10 text-neutral-300">View profile</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 ring-1 ring-white/10 text-neutral-300">Update password</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 ring-1 ring-white/10 text-neutral-300">Manage sessions</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5 10 14l4 3 6-6"/><path d="m14 7 1-1 1 1-1 1-1-1Z"/></svg>
                </span>
                <div>
                  <p className="text-xs text-neutral-400">Session health</p>
                  <p className="text-sm text-neutral-200">Stable</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400">+2.4%</span>
            </div>
            <div className="flex items-end gap-1 h-20">
              {[40, 65, 55, 70, 60, 80].map((v, i) => (
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
                </span>
                <div>
                  <p className="text-xs text-neutral-400">Engagement</p>
                  <p className="text-sm text-neutral-200">Recent activity</p>
                </div>
              </div>
              <span className="text-xs text-neutral-400">Live</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[50, 70, 40, 80, 65, 75, 55].map((v, i) => (
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

export default Home
