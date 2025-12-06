
const SALES_KEY = "bb_sales";

// Leer ventas desde localStorage
function loadSales() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SALES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error leyendo ventas:", e);
    return [];
  }
}

// Guardar ventas en localStorage
function saveSales(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SALES_KEY, JSON.stringify(list));
    // Emitir evento global para que el AdminDashboard se actualice
    try {
      window.dispatchEvent(
        new CustomEvent("sales:changed", { detail: { sales: list } })
      );
    } catch (_) {
      // ignorar
    }
  } catch (e) {
    console.error("Error guardando ventas:", e);
  }
}

// Helpers para mapear método y estado de pago a texto bonito
function mapPaymentMethod(method) {
  switch (method) {
    case "card":
      return "Tarjeta";
    case "sinpe":
      return "SINPE";
    case "transfer":
      return "Transferencia";
    default:
      return method || "Desconocido";
  }
}

function mapPaymentStatus(status) {
  switch (status) {
    case "SUCCESS":
      return "Exitoso";
    case "PENDING":
      return "Pendiente";
    case "FAILED":
      return "Fallido";
    default:
      return status || "Pendiente";
  }
}

const salesService = {
  // Listar todas las ventas (normalizadas para el admin)
  async list() {
    return loadSales();
  },

  /**
   * Recibe la factura generada en Checkout (invoice)
   * y la guarda como una venta "plana" para el panel admin.
   */
  async addFromInvoice(invoice) {
    const sales = loadSales();

    const createdAt = invoice.createdAt || new Date().toISOString();
    const productosVendidos = Array.isArray(invoice.products)
      ? invoice.products.reduce((acc, p) => acc + Number(p.quantity || 0), 0)
      : 0;

    const venta = {
      id: invoice.invoiceNumber, // ejemplo: BB-173342342...
      fecha: createdAt,
      cliente: invoice?.shippingInfo?.name || "Cliente sin nombre",
      email: invoice?.shippingInfo?.email || "",
      productos: productosVendidos,
      total: invoice.total || invoice.payment?.amount || 0,
      metodoPago: mapPaymentMethod(invoice?.payment?.method),
      estadoPago: mapPaymentStatus(invoice?.payment?.status),
      // Guardamos la factura completa por si quieres más detalle en el futuro
      rawInvoice: invoice,
    };

    sales.push(venta);
    saveSales(sales);
    return venta;
  },
};

export default salesService;
