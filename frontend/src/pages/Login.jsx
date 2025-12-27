import React , { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { server } from '../main.jsx';
import axios from 'axios';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';


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
    }finally {
      setBtnLoading(false);
    }
  }
  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-center lg:justify-between max-w-6xl gap-8">
        {/* Left Side - Info Section */}
        <div className="lg:w-[45%] md:w-full animate-fadeIn">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-[var(--accent-primary)]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
              Auth Service
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-4">
            Secure Authentication Platform
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Experience enterprise-grade security with our modern authentication system. 
            Protected by advanced encryption, multi-factor authentication, and real-time 
            threat detection to keep your data safe.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full"></div>
              <span>End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full"></div>
              <span>Two-Factor Authentication</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <div className="w-2 h-2 bg-[var(--success)] rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-[45%] md:w-full max-w-md w-full animate-fadeIn">
          <form onSubmit={submitHandler} className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-2xl border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-6">
              <LogIn className="w-6 h-6 text-[var(--accent-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Sign In</h2>
            </div>
            
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-20 text-base outline-none text-[var(--text-primary)] py-3 pl-11 pr-4 transition-all duration-200 placeholder:text-[var(--text-muted)]" 
                  placeholder="Enter your email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="w-full bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-20 text-base outline-none text-[var(--text-primary)] py-3 pl-11 pr-4 transition-all duration-200 placeholder:text-[var(--text-muted)]" 
                  placeholder="Enter your password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-hover)] hover:to-[var(--accent-primary)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg" 
              disabled={btnLoading}
            >
              {btnLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                Don't have an account?{' '}
                <Link to="/register" className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-medium transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login