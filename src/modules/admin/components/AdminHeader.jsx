import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import cartService from "@/modules/store/services/cartService";

export default function AdminHeader() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const items = cartService.getCart();
      return items.reduce((s, it) => s + (it.quantity || 0), 0);
    } catch (_e) {
      return 0;
    }
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Cargar usuario y escuchar cambios de autenticación
  useEffect(() => {
    function loadUser() {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        setCurrentUser(user);
      } catch (_) {
        setCurrentUser(null);
      }
    }

    function handleAuthChange(e) {
      if (e && e.detail && e.detail.user !== undefined) {
        setCurrentUser(e.detail.user);
      } else {
        loadUser();
      }
    }

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("auth:changed", handleAuthChange);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("auth:changed", handleAuthChange);
    };
  }, []);

  // Escuchar cambios del carrito
  useEffect(() => {
    function updateFromEvent(e) {
      try {
        if (e && e.detail && typeof e.detail.total === "number") {
          setCartCount(e.detail.total);
          return;
        }
      } catch (_) {
        // recalcular desde el servicio
      }
      const items = cartService.getCart();
      setCartCount(items.reduce((s, it) => s + (it.quantity || 0), 0));
    }

    window.addEventListener("cart:changed", updateFromEvent);

    function onStorage() {
      const items = cartService.getCart();
      setCartCount(items.reduce((s, it) => s + (it.quantity || 0), 0));
    }
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cart:changed", updateFromEvent);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleLogout = () => {
    // Eliminar usuario
    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    // Limpiar carrito
    try {
      cartService.setUser("guest");
      cartService.clearCart();
    } catch (_) {
      // ignorar
    }

    // Notificar a toda la app que cambió el auth
    try {
      window.dispatchEvent(
        new CustomEvent("auth:changed", { detail: { user: null } })
      );
    } catch (_) {
      // ignorar
    }

    // Cerrar menú mobile si está abierto
    setIsMobileOpen(false);

    // Redirigir al inicio
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo: en admin te lleva al panel */}
        <Link to="/admin" className="inline-flex items-center">
          <img
            src="/images/bellas-boutique-logo.png"
            alt="Bellas Boutique"
            className="h-20 w-auto"
          />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-10 text-base md:text-lg">
          <Link
            to="/"
            className="font-medium tracking-wide text-brand-dark hover:text-brand transition-colors"
          >
            Inicio
          </Link>

          <Link
            to="/products"
            className="font-medium tracking-wide text-brand-dark hover:text-brand transition-colors"
          >
            Colecciones
          </Link>

          <Link
            to="/about"
            className="font-medium tracking-wide text-brand-dark hover:text-brand transition-colors"
          >
            Sobre Nosotros
          </Link>
        </nav>

        {/* LADO DERECHO DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm text-slate-500">
            {currentUser
              ? `${currentUser.nombre} (${currentUser.rol || "Administrador"})`
              : "Administrador"}
          </span>

          {/* Ícono de carrito */}
          <Link
            to="/cart"
            className="relative text-brand-dark hover:text-brand transition-colors"
            aria-label="Carrito de compras"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-brand-dark text-[10px] text-white font-medium">
              {cartCount}
            </span>
          </Link>

          {/* Botón logout */}
          <Button
            variant="outline"
            size="sm"
            className="text-sm bg-transparent"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>

        {/* LADO DERECHO MOBILE */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart small */}
          <Link
            to="/cart"
            className="relative text-brand-dark hover:text-brand transition-colors"
            aria-label="Carrito de compras"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-brand-dark text-[10px] text-white font-medium">
              {cartCount}
            </span>
          </Link>

          {/* Botón menú mobile */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="text-brand-dark hover:text-brand transition-colors"
          >
            {isMobileOpen ? (
              // icono X
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // icono hamburguesa
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 py-3 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                {currentUser
                  ? `Hola, ${currentUser.nombre}`
                  : "No has iniciado sesión"}
              </span>

              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="text-xs text-brand-dark hover:text-brand underline"
                >
                  Cerrar sesión
                </button>
              )}
            </div>

            <nav className="flex flex-col gap-2 text-sm">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="py-1 text-brand-dark hover:text-brand transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMobileOpen(false)}
                className="py-1 text-brand-dark hover:text-brand transition-colors"
              >
                Colecciones
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileOpen(false)}
                className="py-1 text-brand-dark hover:text-brand transition-colors"
              >
                Sobre Nosotros
              </Link>
              <button
                type="button"
                onClick={() => {
                  navigate("/admin");
                  setIsMobileOpen(false);
                }}
                className="py-1 text-left text-brand-dark hover:text-brand transition-colors font-medium"
              >
                Panel administrativo
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
