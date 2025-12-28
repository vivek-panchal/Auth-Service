import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../context/AppContext.jsx';
import { KeyRound, Shield, ArrowLeft, Mail, ArrowRight } from 'lucide-react';

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
        { withCredentials: true },
      );
      console.log("Verify OTP response:", data);
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
    <section className="min-h-screen flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          
          {/* Left - Instructions */}
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
              Verify your<br />
              <span className="text-[var(--accent-primary)]">identity</span>
            </h1>
            
            <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto lg:mx-0">
              Enter the 6-digit code we sent to your email address.
            </p>
            
            {/* Steps */}
            <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
              {[
                { num: '1', title: 'Check your inbox', desc: 'Look for the verification email' },
                { num: '2', title: 'Enter the code', desc: 'Type the 6-digit OTP below' },
                { num: '3', title: 'Get verified', desc: 'Access your secure dashboard' }
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 animate-slideIn" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[var(--accent-primary)] font-bold text-sm">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-[var(--text-primary)] font-medium">{step.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-[400px] animate-scaleIn">
            <form onSubmit={submitHandler} className="form-card p-8">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Enter OTP</h2>
                <p className="text-[var(--text-muted)]">We've sent a verification code</p>
              </div>
              
              {/* Email Display */}
              {email && (
                <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[var(--accent-primary)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--text-muted)]">Sent to</p>
                    <p className="text-[var(--text-primary)] text-sm font-medium truncate">{email}</p>
                  </div>
                </div>
              )}

              {/* OTP Input */}
              <div className="mb-7">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <input 
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="input-field text-center text-xl tracking-[0.3em] font-mono font-bold"
                    placeholder="••••••"
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    required 
                    autoComplete="one-time-code"
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--text-muted)] text-center">
                  Enter the 6-digit code
                </p>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary mb-5" disabled={btnLoading || otp.length !== 6}>
                {btnLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Back Link */}
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp
