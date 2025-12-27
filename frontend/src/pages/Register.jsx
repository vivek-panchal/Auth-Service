import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { server } from '../main.jsx'
import axios from 'axios'
import { Mail, Lock, User, Shield, ArrowRight, Check } from 'lucide-react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)

  const submitHandler = async (e) => {
    setBtnLoading(true)
    e.preventDefault()
    try {
      const { data } = await axios.post(`${server}/api/v1/register`, { name, email, password })
      toast.success(data.message)
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setBtnLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="auth-bg"></div>
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
        <div className="max-w-md">
          <div className="feature-badge mb-6">
            <Shield className="w-4 h-4" />
            <span>Join AuthGuard</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent)] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">AuthGuard</h1>
          </div>

          <h2 className="text-3xl xl:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
            Create your account
          </h2>

          <p className="text-[var(--text-secondary)] mb-8">
            Join thousands of users who trust AuthGuard for secure authentication.
          </p>

          <div className="space-y-3">
            {['Free forever', 'Two-factor authentication', 'Email verification'].map((feature) => (
              <div key={feature} className="feature-item">
                <div className="feature-icon">
                  <Check />
                </div>
                <span className="text-[var(--text-secondary)] text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
        <div className="auth-card form-container">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">AuthGuard</span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">Create Account</h2>
            <p className="text-[var(--text-secondary)] text-sm">Fill in your details to get started</p>
          </div>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon w-4 h-4" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon w-4 h-4" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon w-4 h-4" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-2" disabled={btnLoading}>
              {btnLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span className="divider-text">Already a member?</span>
          </div>

          <p className="text-center text-[var(--text-secondary)] text-sm">
            Have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
