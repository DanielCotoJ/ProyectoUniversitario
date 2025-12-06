import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PaymentsMonitoring({ sales }) {
  // Agrupar por método de pago (con fallback)
  const paymentsByMethod = sales.reduce((acc, sale) => {
    const method = sale.metodoPago || "Sin método";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  // Agrupar por estado de pago (con fallback)
  const paymentsByStatus = sales.reduce((acc, sale) => {
    const status = sale.estadoPago || "Sin estado";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const [detailSale, setDetailSale] = useState(null);

  const totalSales = sales.length || 1; // para evitar división por 0

  return (
    <div className="space-y-6">
      {/* Resumen superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pagos por método */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pagos por Método</CardTitle>
            <CardDescription>Distribución de métodos de pago</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(paymentsByMethod).map(([method, count]) => (
              <div key={method} className="flex justify-between items-center">
                <span className="text-sm text-slate-500">
                  {method === "card"
                    ? "Tarjeta"
                    : method === "sinpe"
                    ? "SINPE"
                    : method === "transfer"
                    ? "Transferencia"
                    : method}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-dark"
                      style={{ width: `${(count / totalSales) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-dark w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Estado de pagos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estado de Pagos</CardTitle>
            <CardDescription>Resumen de estados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(paymentsByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-sm text-slate-500">{status}</span>
                <span className="text-lg font-semibold text-brand-dark">
                  {count}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabla detallada */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-4 md:px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-brand-dark">
            Monitoreo de Pagos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Estado detallado de todos los pagos registrados
          </p>
        </div>

        <div className="p-4 md:p-6 overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID Venta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método de Pago</TableHead>
                <TableHead>Estado del Pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>
                    {sale.fecha
                      ? new Date(sale.fecha).toLocaleDateString("es-CR")
                      : "-"}
                  </TableCell>
                  <TableCell>{sale.cliente}</TableCell>
                  <TableCell className="font-medium">
                    ₡{(sale.total || 0).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                      {sale.metodoPago || "Sin método"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        sale.estadoPago === "Exitoso"
                          ? "bg-green-100 text-green-800"
                          : sale.estadoPago === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : sale.estadoPago === "Fallido"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {sale.estadoPago || "Sin estado"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={Boolean(detailSale)}
                      onOpenChange={(open) => {
                        if (!open) setDetailSale(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                          onClick={() => setDetailSale(sale)}
                        >
                          Ver detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl md:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-3xl md:text-4xl font-semibold text-slate-900">
                            Detalles de Pago
                          </DialogTitle>
                          <DialogDescription className="text-sm md:text-base text-slate-600">
                            Información detallada de la venta y el pago
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                ID Venta
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={detailSale?.id || ""}
                                disabled
                              />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                Fecha
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={
                                  detailSale?.fecha
                                    ? new Date(
                                        detailSale.fecha
                                      ).toLocaleDateString("es-CR")
                                    : ""
                                }
                                disabled
                              />
                            </fieldset>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                Cliente
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={detailSale?.cliente || ""}
                                disabled
                              />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                Monto
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={
                                  detailSale
                                    ? `₡${(
                                        detailSale.total || 0
                                      ).toLocaleString()}`
                                    : ""
                                }
                                disabled
                              />
                            </fieldset>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                Método de Pago
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={detailSale?.metodoPago || ""}
                                disabled
                              />
                            </fieldset>
                            <fieldset className="border border-slate-300 rounded-lg p-3">
                              <legend className="text-xs text-slate-600 px-2">
                                Estado del Pago
                              </legend>
                              <Input
                                className="border-none focus:ring-0 px-0 bg-gray-50"
                                value={detailSale?.estadoPago || ""}
                                disabled
                              />
                            </fieldset>
                          </div>
                          <div className="flex justify-center gap-4 pt-6">
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-full px-6 border-brand-dark text-brand-dark"
                              onClick={() => setDetailSale(null)}
                            >
                              Cerrar
                            </Button>
                            <Button
                              type="button"
                              className="bg-brand-dark hover:bg-brand rounded-full px-6 shadow-sm"
                            >
                              Aceptar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {sales.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-sm text-slate-500 py-6"
                  >
                    No hay pagos registrados todavía.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
