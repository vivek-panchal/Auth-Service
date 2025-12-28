import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppData } from '../context/AppContext.jsx'

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuth, logoutUser } = AppData();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="container max-w-5xl mx-auto px-6 py-3 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 text-white ring-1 ring-white/10 shadow-md shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-5Z"/></svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-200">SecureAuth</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
          {!isAuth && (
            <>
              <Link to="/login" className="text-neutral-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="text-neutral-300 hover:text-white transition-colors">Register</Link>
            </>
          )}
          {isAuth && user && user.role === 'admin' && (
            <Link to="/dashboard" className="text-neutral-300 hover:text-white transition-colors">Dashboard</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuth && user ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 ring-1 ring-white/10 text-xs font-semibold text-neutral-100">
                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="text-xs text-neutral-200 font-medium">{user.name || 'User'}</span>
                <span className="text-[11px] text-neutral-500 capitalize">{user.role || 'user'}</span>
              </span>
              <button className="hidden sm:inline-flex bg-rose-500 hover:bg-rose-400 active:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" onClick={() => logoutUser(navigate)}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="inline-flex bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Get Started</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
