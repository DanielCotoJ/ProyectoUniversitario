import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSidebar({ activeTab, setActiveTab, users, products, sales }) {
  return (
    <aside className="hidden md:block md:w-64 md:flex-shrink-0">
      <nav className="space-y-3">
        <button
          onClick={() => setActiveTab("users")}
          className={`w-full text-center px-6 py-3 text-sm rounded-none border transition-colors shadow-sm ${
            activeTab === "users" ? "bg-brand-dark text-white border-transparent" : "bg-white text-brand-dark border-slate-200 hover:bg-gray-50"
          }`}
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`w-full text-center px-6 py-3 text-sm rounded-none border transition-colors shadow-sm ${
            activeTab === "products" ? "bg-brand-dark text-white border-transparent" : "bg-white text-brand-dark border-slate-200 hover:bg-gray-50"
          }`}
        >
          Gestión de Productos
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`w-full text-center px-6 py-3 text-sm rounded-none border transition-colors shadow-sm ${
            activeTab === "sales" ? "bg-brand-dark text-white border-transparent" : "bg-white text-brand-dark border-slate-200 hover:bg-gray-50"
          }`}
        >
          Ventas y Facturación
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`w-full text-center px-6 py-3 text-sm rounded-none border transition-colors shadow-sm ${
            activeTab === "payments" ? "bg-brand-dark text-white border-transparent" : "bg-white text-brand-dark border-slate-200 hover:bg-gray-50"
          }`}
        >
          Monitoreo de Pagos
        </button>
      </nav>

      <div className="mt-6 bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-sm font-medium text-brand-dark mb-4">Resumen</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Usuarios</span>
            <span className="font-medium text-brand-dark">{users.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Productos</span>
            <span className="font-medium text-brand-dark">{products.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Ventas hoy</span>
            <span className="font-medium text-brand-dark">{sales.length}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}