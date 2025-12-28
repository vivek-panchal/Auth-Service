import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <span className="inline-flex w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
          <h2 className="text-neutral-300">Loading...</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="h-4 rounded bg-white/5 animate-pulse"></div>
          <div className="h-4 rounded bg-white/5 animate-pulse"></div>
          <div className="h-4 rounded bg-white/5 animate-pulse w-3/4"></div>
        </div>
        <div className="mt-6 h-1.5 rounded bg-white/5 overflow-hidden">
          <div className="h-1.5 bg-indigo-500 animate-[progress_1.8s_ease_infinite]" style={{width:'40%'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
