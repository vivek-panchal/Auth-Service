import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="flex items-center gap-3">
        <span className="inline-flex w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
        <h2 className="text-neutral-300">Loading...</h2>
      </div>
    </div>
  )
}

export default Loading
