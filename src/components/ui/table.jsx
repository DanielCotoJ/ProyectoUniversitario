import React from 'react'

export function Table({ className = '', ...props }) {
  return <table className={`min-w-full text-sm ${className}`} {...props} />
}

export function TableHeader({ className = '', ...props }) {
  return <thead className={className} {...props} />
}

export function TableBody({ className = '', ...props }) {
  return <tbody className={className} {...props} />
}

export function TableRow({ className = '', ...props }) {
  return <tr className={`border-b border-gray-200 ${className}`} {...props} />
}

export function TableHead({ className = '', ...props }) {
  return <th className={`text-left px-4 py-2 font-medium text-gray-700 ${className}`} {...props} />
}

export function TableCell({ className = '', ...props }) {
  return <td className={`px-4 py-2 ${className}`} {...props} />
}

export default Table