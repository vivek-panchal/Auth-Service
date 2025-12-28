import React , { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { server } from '../main.jsx';
import axios from 'axios';


const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    try {
      const {data} = await axios.post(`${server}/api/v1/register`, {
        name,
        email,
        password,
      });
      toast.success(data.message); 
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error.response.data.message);
    }finally {setBtnLoading
      (false);
    }
  }
  return (
    <section>
      <div className="container max-w-7xl px-6 py-16 md:py-24 mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 md:pr-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-neutral-100 tracking-tight">Create your account</h1>
            <p className="text-neutral-400">Get started with a secure and streamlined experience.</p>
          </div>
          <form onSubmit={submitHandler} className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 flex flex-col w-full ring-1 ring-white/10 shadow-xl shadow-black/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <h2 className="text-xl font-medium text-neutral-100">Sign Up</h2>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm text-neutral-400 mb-1">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none py-2.5 px-3 transition-colors" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-neutral-400 mb-1">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none py-2.5 px-3 transition-colors" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm text-neutral-400 mb-1">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-neutral-900 text-neutral-200 placeholder-neutral-500 rounded-lg border border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none py-2.5 px-3 transition-colors" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="inline-flex justify-center items-center gap-2 text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 border-0 py-2.5 px-4 rounded-lg text-base font-medium transition-colors disabled:opacity-60 shadow-lg shadow-emerald-500/20" disabled={btnLoading}>
              {btnLoading ? 'Submitting...' : 'Register'}
            </button>
            <Link to="/login" className="text-sm text-neutral-400 mt-4 hover:text-neutral-300 transition-colors">Have an account?</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register;