import React from 'react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[var(--bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-[var(--accent-primary)] animate-spin" />
        <h2 className="text-xl font-semibold text-[var(--text-secondary)]">Loading...</h2>
      </div>
    </div>
  )
}

export default Loading
