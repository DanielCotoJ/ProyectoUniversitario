import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function UserEditForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState(user)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">ID *</legend>
          <Input id="id" value={formData.id} disabled className="border-none focus:ring-0 px-0 bg-gray-50" />
        </fieldset>
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Email *</legend>
          <Input id="email" type="email" value={formData.email} disabled className="border-none focus:ring-0 px-0 bg-gray-50" />
        </fieldset>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Nombre *</legend>
          <Input id="nombre" className="border-none focus:ring-0 px-0" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
        </fieldset>
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Apellidos *</legend>
          <Input id="apellidos" className="border-none focus:ring-0 px-0" value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} required />
        </fieldset>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Teléfono *</legend>
          <Input id="telefono" className="border-none focus:ring-0 px-0" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
        </fieldset>
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Rol *</legend>
          <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
            <SelectTrigger className="border-none focus:ring-0 px-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Vendedor">Vendedor</SelectItem>
              <SelectItem value="Cliente">Cliente</SelectItem>
            </SelectContent>
          </Select>
        </fieldset>
      </div>

      <fieldset className="border border-slate-300 rounded-lg p-3">
        <legend className="text-xs text-slate-600 px-2">Dirección *</legend>
        <Input id="direccion" className="border-none focus:ring-0 px-0" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} required />
      </fieldset>

      <fieldset className="border border-slate-300 rounded-lg p-3">
        <legend className="text-xs text-slate-600 px-2">Estado de la cuenta *</legend>
        <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
          <SelectTrigger className="border-none focus:ring-0 px-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Activo">Activo</SelectItem>
            <SelectItem value="Inactivo">Inactivo</SelectItem>
            <SelectItem value="Suspendido">Suspendido</SelectItem>
          </SelectContent>
        </Select>
      </fieldset>

      <div className="flex justify-center gap-4 pt-6">
        <Button type="button" variant="outline" className="rounded-full px-6 border-brand-dark text-brand-dark" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-brand-dark hover:bg-brand rounded-full px-6 shadow-sm">Guardar cambios</Button>
      </div>
    </form>
  )
}

export default function UsersManagement({ users, setUsers }) {
  const [editingUser, setEditingUser] = useState(null)

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    setEditingUser(null)
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 md:px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-brand-dark">Gestión de Usuarios</h2>
        <p className="text-sm text-slate-500 mt-1">Visualiza y gestiona la información de los usuarios registrados</p>
      </div>

      <div className="p-4 md:p-6 overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{`${user.nombre} ${user.apellidos}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telefono}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                    user.rol === "Administrador" ? "bg-purple-100 text-purple-800" : user.rol === "Vendedor" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}>{user.rol}</span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                    user.estado === "Activo" ? "bg-green-100 text-green-800" : user.estado === "Suspendido" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                  }`}>{user.estado}</span>
                </TableCell>
                <TableCell>
                  <Dialog open={Boolean(editingUser)} onOpenChange={(open) => { if (!open) setEditingUser(null) }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingUser(user)} className="text-xs">Editar</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl md:p-8">
                      <DialogHeader>
                        <DialogTitle className="text-3xl md:text-4xl font-semibold text-slate-900">Editar Usuario</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-slate-600">Modifica la información del usuario. El ID y email no pueden ser modificados.</DialogDescription>
                      </DialogHeader>
                      {editingUser && (
                        <UserEditForm user={editingUser} onSave={handleUpdateUser} onCancel={() => setEditingUser(null)} />
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}