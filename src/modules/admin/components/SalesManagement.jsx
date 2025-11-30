import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function SalesManagement({ sales }) {
  const today = new Date().toISOString().split("T")[0]
  const todaySales = sales.filter((s) => s.fecha === today)
  const totalToday = todaySales.reduce((sum, sale) => sum + sale.total, 0)
  const productsToday = todaySales.reduce((sum, sale) => sum + sale.productos, 0)
  const totalMonth = sales.reduce((sum, sale) => sum + sale.total, 0)
  const productsMonth = sales.reduce((sum, sale) => sum + sale.productos, 0)
  const [invoiceSale, setInvoiceSale] = useState(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporte Diario</CardTitle>
            <CardDescription>Ventas de hoy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Productos vendidos:</span>
              <span className="text-lg font-semibold text-brand-dark">{productsToday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Ingresos generados:</span>
              <span className="text-lg font-semibold text-brand-dark">₡{totalToday.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Número de ventas:</span>
              <span className="text-lg font-semibold text-brand-dark">{todaySales.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reporte Mensual</CardTitle>
            <CardDescription>Ventas del mes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Productos vendidos:</span>
              <span className="text-lg font-semibold text-brand-dark">{productsMonth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Ingresos generados:</span>
              <span className="text-lg font-semibold text-brand-dark">₡{totalMonth.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Número de ventas:</span>
              <span className="text-lg font-semibold text-brand-dark">{sales.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-4 md:px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-brand-dark">Historial de Ventas</h2>
          <p className="text-sm text-slate-500 mt-1">Visualiza todas las ventas y facturas generadas</p>
        </div>

        <div className="p-4 md:p-6 overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID Venta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Método de Pago</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{new Date(sale.fecha).toLocaleDateString("es-CR")}</TableCell>
                  <TableCell>{sale.cliente}</TableCell>
                  <TableCell>{sale.productos}</TableCell>
                  <TableCell className="font-medium">₡{sale.total.toLocaleString()}</TableCell>
                  <TableCell>{sale.metodoPago}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      sale.estadoPago === "Exitoso" ? "bg-green-100 text-green-800" : sale.estadoPago === "Pendiente" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                    }`}>{sale.estadoPago}</span>
                  </TableCell>
                  <TableCell>
                    <Dialog open={Boolean(invoiceSale)} onOpenChange={(open) => { if (!open) setInvoiceSale(null) }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-xs bg-transparent" onClick={() => setInvoiceSale(sale)}>Ver factura</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl md:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-3xl md:text-4xl font-semibold text-slate-900">Factura #{invoiceSale?.id}</DialogTitle>
                          <DialogDescription className="text-sm md:text-base text-slate-600">Detalle de la venta y facturación</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">ID Venta</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale?.id || ''} disabled />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">Fecha</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale ? new Date(invoiceSale.fecha).toLocaleDateString('es-CR') : ''} disabled />
                            </fieldset>
                          </div>
                          <fieldset className="border border-slate-300 rounded-lg p-3">
                            <legend className="text-xs text-slate-600 px-2">Cliente</legend>
                            <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale?.cliente || ''} disabled />
                          </fieldset>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">Productos</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale?.productos ?? ''} disabled />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">Total</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale ? `₡${invoiceSale.total.toLocaleString()}` : ''} disabled />
                            </fieldset>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">Método de Pago</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale?.metodoPago || ''} disabled />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">Estado del Pago</legend>
                              <Input className="border-none focus:ring-0 px-0 bg-gray-50" value={invoiceSale?.estadoPago || ''} disabled />
                            </fieldset>
                          </div>
                          <div className="flex justify-center gap-4 pt-6">
                            <Button type="button" variant="outline" className="rounded-full px-6 border-brand-dark text-brand-dark" onClick={() => setInvoiceSale(null)}>Cerrar</Button>
                            <Button type="button" className="bg-brand-dark hover:bg-brand rounded-full px-6 shadow-sm">Descargar</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}