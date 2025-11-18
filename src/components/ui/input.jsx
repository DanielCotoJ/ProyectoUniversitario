import React from 'react'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`border border-gray-300 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${className}`}
      {...props}
    />
  )
}

export default Input