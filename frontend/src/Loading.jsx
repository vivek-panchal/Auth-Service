import React from 'react'
import { Shield } from 'lucide-react'

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-5">
      <div className="text-center animate-fadeIn">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-14 h-14 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center mx-auto animate-glow">
            <Shield className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* Spinner */}
        <div className="flex justify-center mb-5">
          <div className="w-8 h-8 border-2 border-[var(--border-color)] border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
        </div>
        
        {/* Text */}
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Loading</h2>
        <p className="text-sm text-[var(--text-muted)]">Please wait...</p>
      </div>
    </div>
  )
}

export default Loading
