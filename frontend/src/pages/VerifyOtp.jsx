import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppData } from '../context/AppContext.jsx'
import { ShieldCheck, KeyRound, ArrowRight, Mail, ArrowLeft, Info } from 'lucide-react'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const email = localStorage.getItem('email')
  const navigate = useNavigate()
  const { setIsAuth, setUser } = AppData()

  const submitHandler = async (e) => {
    setBtnLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${server}/api/v1/verify`,
        { email, otp },
        { withCredentials: true }
      )
      toast.success(data.message)
      setIsAuth(true)
      setUser(data.user)
      navigate('/')
      localStorage.removeItem('email')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed')
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-bg"></div>
      
      <div className="auth-card form-container">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent-glow)] border border-[var(--border-accent)] flex items-center justify-center mb-5 float-animation">
            <ShieldCheck className="w-8 h-8 text-[var(--accent-light)]" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">Verify Your Identity</h2>
          <p className="text-[var(--text-secondary)] text-sm">We've sent a code to your email</p>
          
          {email && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
              <Mail className="w-4 h-4 text-[var(--accent-light)]" />
              <span className="text-[var(--text-secondary)] text-sm">{email}</span>
            </div>
          )}
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Verification Code</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon w-4 h-4" />
              <input
                type="text"
                className="form-input text-center tracking-widest font-semibold"
                placeholder="000000"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <p className="text-[var(--text-muted)] text-xs mt-2 text-center">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={btnLoading}>
            {btnLoading ? (
              <>
                <div className="spinner"></div>
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          <Link to="/login" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-light)] text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        <div className="alert alert-info mt-5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Security Notice</p>
            <p className="text-xs mt-1 opacity-80">Never share your OTP with anyone.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
