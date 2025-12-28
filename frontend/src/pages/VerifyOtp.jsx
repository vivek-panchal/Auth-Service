import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../context/AppContext.jsx';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const {setIsAuth , setUser} = AppData();
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/api/v1/verify`, 
        {email, otp},
        {
          withCredentials: true,
        },
      );
      console.log("Verify OTP response:", data);
      // Handle success
      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      navigate('/');
      localStorage.clear('email');
    } catch (error) {
      toast.error(error.response.data.message);
    }finally {
      setBtnLoading(false);
    }
  };

  return (
    <section>
      <div className="container max-w-5xl px-6 py-16 md:py-24 mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-400/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-300">Auth Service</span>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 md:pr-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 tracking-tight">Verify your OTP</h1>
            <p className="text-neutral-400">We sent an OTP to <span className="text-neutral-200 font-medium">{email}</span>. Enter it below to continue.</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Check your inbox and spam folder</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> OTP expires quickly for your security</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
                <p className="text-xs text-neutral-400">Step 1</p>
                <p className="text-sm text-neutral-200 mt-1">Open email client</p>
              </div>
              <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
                <p className="text-xs text-neutral-400">Step 2</p>
                <p className="text-sm text-neutral-200 mt-1">Copy the OTP code</p>
              </div>
            </div>
          </div>
          <form onSubmit={submitHandler} className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 flex flex-col w-full ring-1 ring-white/10 shadow-xl shadow-black/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15V8a2 2 0 0 0-2-2h-1"/><path d="M3 8v7a2 2 0 0 0 2 2h1"/><rect x="7" y="5" width="10" height="14" rx="2"/><path d="M10 11h4"/><path d="M10 15h4"/></svg>
              </span>
              <h2 className="text-xl font-medium text-neutral-100">Enter OTP</h2>
            </div>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm text-neutral-400 mb-1">OTP</label>
              <input type="number" id="otp" name="otp" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none py-2.5 px-3 transition-colors" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <button className="inline-flex justify-center items-center gap-2 text-white bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 border-0 py-2.5 px-4 rounded-lg text-base font-medium transition-colors disabled:opacity-60 shadow-lg shadow-indigo-500/20" disabled={btnLoading}>
              {btnLoading ? 'Submitting...' : 'Verify'}
            </button>
            <div className="flex items-center justify-between mt-4 text-xs text-neutral-400">
              <span>Having trouble?</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Recheck email address</span>
            </div>
            <Link to="/login" className="text-sm text-neutral-400 mt-3 hover:text-neutral-300 transition-colors">Go to Login</Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp
