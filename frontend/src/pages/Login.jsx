import React , { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { server } from '../main.jsx';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const {data} = await axios.post(`${server}/api/v1/login`, {
        email,
        password,
      });
      console.log("Login response jsx:", data);
      toast.success(data.message); 
      localStorage.setItem('email', email);
      navigate('/verifyotp');
    } catch (error) {
      toast.error(error.response.data.message);
    }finally {setBtnLoading
      (false);
    }
  }
  return (
    <section className="">
      <div className="container max-w-7xl px-6 py-16 md:py-24 mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-300">Auth Service</span>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 md:pr-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight">Welcome back</h1>
            <p className="text-neutral-400">Sign in to continue. Privacy-first authentication with fast, secure access.</p>
          </div>
          <form onSubmit={submitHandler} className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 flex flex-col w-full ring-1 ring-white/10 shadow-xl shadow-black/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M19 11V7a7 7 0 1 0-14 0v4"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>
              </span>
              <h2 className="text-xl font-medium text-neutral-100">Log In</h2>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-neutral-400 mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none py-2.5 px-3 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-neutral-400 mb-1">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none py-2.5 px-3 transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="inline-flex justify-center items-center gap-2 text-white bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 border-0 py-2.5 px-4 rounded-lg text-base font-medium transition-colors disabled:opacity-60 shadow-lg shadow-indigo-500/20" disabled={btnLoading}>
              {btnLoading ? 'Submitting...' : 'Login'}
            </button>
            <Link to="/register" className="text-sm text-neutral-400 mt-4 hover:text-neutral-300 transition-colors">Don’t have an account?</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login