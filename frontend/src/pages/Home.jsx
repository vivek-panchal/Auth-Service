import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  return (
    <div className="container max-w-3xl mx-auto px-6 py-20">
      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Welcome{user && user.name ? `, ${user.name}` : ' Home'}!</h2>
        </div>
        <p className="text-neutral-400 text-center">Manage your account with a clean, modern interface.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="bg-rose-500 hover:bg-rose-400 active:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" onClick={() => logoutUser(navigate)}>Logout</button>
          {user && user.role === 'admin' && (
            <Link className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors" to="/dashboard">Go to Admin Panel</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
