import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify';
import { server } from '../main.jsx';
import axios from 'axios';
import { Mail, Lock, User, Shield, Check, ArrowRight } from 'lucide-react';


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
    }finally {
      setBtnLoading(false);
    }
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Left - Branding */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fadeIn">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center animate-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">AuthService</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-5 leading-[1.1]">
              Start your<br />
              <span className="text-[var(--accent-primary)]">secure journey</span>
            </h1>
            
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto lg:mx-0">
              Create an account and experience enterprise-grade security.
            </p>
            
            {/* Features */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
              {['Instant Account Setup', 'Email Verification', 'Secure by Default'].map((text, i) => (
                <div key={i} className="feature-badge animate-slideIn" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="w-5 h-5 rounded-full bg-[var(--success-bg)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[var(--success)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-[400px] animate-scaleIn">
            <form onSubmit={submitHandler} className="form-card p-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Create Account</h2>
                <p className="text-[var(--text-muted)]">Fill in your details to get started</p>
              </div>
              
              {/* Name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input 
                    type="text" 
                    className="input-field"
                    placeholder="John Doe"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input 
                    type="email" 
                    className="input-field"
                    placeholder="you@example.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-7">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input 
                    type="password" 
                    className="input-field"
                    placeholder="Min. 8 characters"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary mb-5" disabled={btnLoading}>
                {btnLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-[var(--border-color)]"></div>
                <span className="text-[var(--text-muted)] text-sm">or</span>
                <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              </div>

              {/* Login Link */}
              <Link to="/login" className="btn-secondary">
                Sign In Instead
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;