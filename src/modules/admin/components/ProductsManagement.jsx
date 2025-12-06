import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import productService from "@/modules/store/services/productService";

// mapeo de productos admin -> formato cliente
function mapAdminToClientProducts(adminProducts) {
  return adminProducts.map((p) => ({
    id: p.id, // P001, P002, etc.
    name: p.nombre,
    description: p.descripcion,
    price: p.precio,
    stock: p.stock,
    category: p.categoria,
    provider: p.proveedor,
    image: p.imagen || "/images/placeholder.png",
  }));
}
function ProductForm({ product, onSave, onCancel, isNew = false }) {
  const [formData, setFormData] = useState(product);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">
            Nombre del Producto *
          </legend>
          <Input
            id="nombre"
            className="border-none focus:ring-0 px-0"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            required
          />
        </fieldset>
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Categoría *</legend>
          <Input
            id="categoria"
            className="border-none focus:ring-0 px-0"
            value={formData.categoria}
            onChange={(e) =>
              setFormData({ ...formData, categoria: e.target.value })
            }
            required
          />
        </fieldset>
      </div>

      <fieldset className="border border-slate-300 rounded-lg p-3">
        <legend className="text-xs text-slate-600 px-2">Descripcion *</legend>
        <Textarea
          id="descripcion"
          className="border-none focus:ring-0 px-0"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          required
          rows={3}
        />
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">Precio *</legend>
          <Input
            id="precio"
            type="number"
            className="border-none focus:ring-0 px-0"
            value={formData.precio}
            onChange={(e) =>
              setFormData({ ...formData, precio: Number(e.target.value) })
            }
            required
            min="0"
          />
        </fieldset>
        <fieldset className="border border-slate-300 rounded-lg p-3">
          <legend className="text-xs text-slate-600 px-2">
            Stock disponible *
          </legend>
          <Input
            id="stock"
            type="number"
            className="border-none focus:ring-0 px-0"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
            required
            min="0"
          />
        </fieldset>
      </div>

      <fieldset className="border border-slate-300 rounded-lg p-3">
        <legend className="text-xs text-slate-600 px-2">Proveedor *</legend>
        <Input
          id="proveedor"
          className="border-none focus:ring-0 px-0"
          value={formData.proveedor}
          onChange={(e) =>
            setFormData({ ...formData, proveedor: e.target.value })
          }
          required
        />
      </fieldset>

      <fieldset className="border border-slate-300 rounded-lg p-3">
        <legend className="text-xs text-slate-600 px-2">
          URL de la imagen
        </legend>
        <Input
          id="imagen"
          type="url"
          className="border-none focus:ring-0 px-0"
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </fieldset>

      <div className="flex justify-center gap-4 pt-6">
        <Button
          type="button"
          variant="outline"
          className="rounded-full px-6 border-brand-dark text-brand-dark"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-brand-dark hover:bg-brand rounded-full px-6 shadow-sm"
        >
          {isNew ? "Registrar Producto" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

export default function ProductsManagement({ products, setProducts }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const syncWithStore = (updatedAdminProducts) => {
    // Actualiza el estado local del admin
    setProducts(updatedAdminProducts);
    // Mapea y guarda en localStorage lo que verá el cliente
    const clientProducts = mapAdminToClientProducts(updatedAdminProducts);
    productService.saveAll(clientProducts);
  };

  const handleSaveProduct = (product) => {
    let updated;

    if (isAddingNew) {
      const newId = `P${String(products.length + 1).padStart(3, "0")}`;
      updated = [...products, { ...product, id: newId }];
      setIsAddingNew(false);
    } else {
      updated = products.map((p) => (p.id === product.id ? product : p));
    }

    setEditingProduct(null);
    syncWithStore(updated);
  };

  const handleDeleteProduct = (productId) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, estado: "Inactivo" } : p
    );
    syncWithStore(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="px-4 md:px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div>
          <h2 className="text-lg font-semibold text-brand-dark">
            Gestión de Productos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button className="bg-brand-dark hover:bg-brand">
              Registrar Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl md:p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-semibold text-slate-900">
                Registrar Nuevo Producto
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base text-slate-600">
                Completa la información del nuevo producto para el catálogo
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              product={{
                id: "",
                nombre: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                categoria: "",
                proveedor: "",
                imagen: "",
                estado: "Activo",
              }}
              onSave={handleSaveProduct}
              onCancel={() => setIsAddingNew(false)}
              isNew
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-4 md:p-6 overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.categoria}</TableCell>
                <TableCell>₡{product.precio.toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={
                      product.stock < 10 ? "text-red-600 font-medium" : ""
                    }
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>{product.proveedor}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      product.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.estado}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog
                      open={Boolean(editingProduct)}
                      onOpenChange={(open) => {
                        if (!open) setEditingProduct(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="text-xs"
                        >
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl md:p-8">
                        <DialogHeader>
                          <DialogTitle>Editar Producto</DialogTitle>
                          <DialogDescription>
                            Modifica la información del producto
                          </DialogDescription>
                        </DialogHeader>
                        {editingProduct && (
                          <ProductForm
                            product={editingProduct}
                            onSave={handleSaveProduct}
                            onCancel={() => setEditingProduct(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    {product.estado === "Activo" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Dar de baja
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}