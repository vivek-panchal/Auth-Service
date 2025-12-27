import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../main';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../context/AppContext.jsx';
import { KeyRound, Shield, ArrowLeft } from 'lucide-react';

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
            Verify Your Identity
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            We've sent a one-time password (OTP) to your email address. 
            Please enter the code below to complete your authentication and 
            secure your account access.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[var(--accent-primary)] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[var(--accent-primary)] font-bold">1</span>
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">Check Your Email</h3>
                <p className="text-[var(--text-secondary)] text-sm">Look for the OTP code in your inbox</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[var(--accent-primary)] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[var(--accent-primary)] font-bold">2</span>
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">Enter the Code</h3>
                <p className="text-[var(--text-secondary)] text-sm">Type the OTP in the verification form</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[var(--accent-primary)] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[var(--accent-primary)] font-bold">3</span>
              </div>
              <div>
                <h3 className="text-[var(--text-primary)] font-semibold mb-1">Access Granted</h3>
                <p className="text-[var(--text-secondary)] text-sm">You'll be redirected to your dashboard</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Verify OTP Form */}
        <div className="lg:w-[45%] md:w-full max-w-md w-full animate-fadeIn">
          <form onSubmit={submitHandler} className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-2xl border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-6">
              <KeyRound className="w-6 h-6 text-[var(--accent-primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Verify OTP</h2>
            </div>
            
            {/* Email Display */}
            {email && (
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                <p className="text-sm text-[var(--text-muted)] mb-1">Verification code sent to:</p>
                <p className="text-[var(--text-primary)] font-medium break-all">{email}</p>
              </div>
            )}

            {/* OTP Field */}
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                One-Time Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input 
                  type="number" 
                  id="otp" 
                  name="otp" 
                  className="w-full bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-20 text-base outline-none text-[var(--text-primary)] py-3 pl-11 pr-4 transition-all duration-200 placeholder:text-[var(--text-muted)] text-center text-2xl tracking-widest font-semibold" 
                  placeholder="000000"
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
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
                  Verifying...
                </span>
              ) : (
                'Verify & Continue'
              )}
            </button>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp
