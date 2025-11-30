import React from "react"
import { Button } from "@/components/ui/button"

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <a href="/admin" className="inline-flex items-center">
          <img src="/images/bellas-boutique-logo-complete.png" alt="Bellas Boutique" className="h-7 md:h-8 w-auto" />
        </a>
        <div className="flex items-center gap-6">
          <span className="text-sm text-slate-500">Administrador</span>
          <Button variant="outline" size="sm" className="text-sm bg-transparent">Cerrar sesión</Button>
        </div>
      </div>
    </header>
  )
}