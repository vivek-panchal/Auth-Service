import React from 'react'
import { Shield } from 'lucide-react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="auth-bg"></div>
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center float-animation">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold gradient-text">AuthGuard</h2>
          <div className="spinner-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
