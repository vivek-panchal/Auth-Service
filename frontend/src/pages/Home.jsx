import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  return (
    <div className="container max-w-3xl mx-auto px-6 py-20">
      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30 flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-100">Welcome Home!</h2>
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
