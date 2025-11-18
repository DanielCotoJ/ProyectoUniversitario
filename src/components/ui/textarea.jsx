import React from 'react'

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${className}`}
      {...props}
    />
  )
}

export default Textarea