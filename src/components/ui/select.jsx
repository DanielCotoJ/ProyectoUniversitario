import React from 'react'

const SelectContext = React.createContext(null)

export function Select({ value, onValueChange, children, className = '' }) {
  const items = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectContent) {
      React.Children.forEach(child.props.children, (item) => {
        if (React.isValidElement(item) && item.type === SelectItem) {
          items.push({ value: item.props.value, label: item.props.children })
        }
      })
    }
  })

  return (
    <div className={className}>
      <SelectContext.Provider value={{ value, onValueChange, items }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}

export function SelectTrigger({ className = '', children }) {
  const ctx = React.useContext(SelectContext)
  if (!ctx) return null
  const { value, onValueChange, items } = ctx
  return (
    <select
      className={`border border-gray-300 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${className}`}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {items.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export function SelectValue() {
  return null
}

export function SelectContent({ children }) {
  return null
}

export function SelectItem({ value, children }) {
  return null
}

export default Select