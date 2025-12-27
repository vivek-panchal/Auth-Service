import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { server } from '../main.jsx'
import axios from 'axios'
import Loading from '../Loading'
import { CheckCircle, XCircle, Shield, ArrowRight, Mail } from 'lucide-react'

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const params = useParams()
  const [loading, setLoading] = useState(true)

  async function verifyUser() {
    try {
      const { data } = await axios.post(`${server}/api/v1/verify/${params.token}`)
      setSuccessMessage(data.message)
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-bg"></div>
      
      <div className="result-card">
        {successMessage ? (
          <>
            <div className="result-icon result-icon-success">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Email Verified!</h2>
            <p className="text-[var(--success)] text-sm font-medium mb-4">{successMessage}</p>

            <div className="alert alert-success mb-5 text-left">
              <p className="text-sm">Your email has been verified. You can now sign in to your account.</p>
            </div>

            <Link to="/login" className="btn btn-success btn-full">
              Continue to Login
              <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="result-icon result-icon-error">
              <XCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Verification Failed</h2>
            <p className="text-[var(--danger)] text-sm font-medium mb-4">{errorMessage}</p>

            <div className="alert alert-danger mb-5 text-left">
              <p className="text-sm">The verification link may have expired or is invalid. Please try again.</p>
            </div>

            <div className="space-y-3">
              <Link to="/register" className="btn btn-primary btn-full">
                <Mail className="w-4 h-4" />
                Register Again
              </Link>
              <Link to="/login" className="btn btn-ghost btn-full">
                Back to Login
              </Link>
            </div>
          </>
        )}

        <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-[var(--border)]">
          <Shield className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-[var(--text-muted)] text-xs">Protected by AuthGuard</span>
        </div>
      </div>
    </div>
  )
}

export default Verify
