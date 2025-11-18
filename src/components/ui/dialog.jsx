import React from 'react'

const DialogContext = React.createContext(null)

export function Dialog({ open, onOpenChange, children }) {
  return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ asChild, children }) {
  const ctx = React.useContext(DialogContext)
  if (!ctx) return null
  const handleClick = () => ctx.onOpenChange?.(true)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (...args) => {
        children.props.onClick?.(...args)
        handleClick()
      },
    })
  }
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50"
    >
      {children}
    </button>
  )
}

export function DialogContent({ className = '', children }) {
  const ctx = React.useContext(DialogContext)
  if (!ctx) return null
  if (!ctx.open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={() => ctx.onOpenChange?.(false)} />
      <div className={`relative bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>{children}</div>
    </div>
  )
}

export function DialogHeader({ className = '', children }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function DialogTitle({ className = '', children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}

export function DialogDescription({ className = '', children }) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
}

export default Dialog