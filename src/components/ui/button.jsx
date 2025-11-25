import React from 'react'

export function Button({ variant = 'default', size = 'md', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-brand-dark text-white hover:bg-brand',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
  }
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-6 text-lg',
  }
  const classes = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`
  return <button className={classes} {...props} />
}

export default Button