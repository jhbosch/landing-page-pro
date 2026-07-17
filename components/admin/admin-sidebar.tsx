"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions"
import {
  LayoutDashboard,
  Bike,
  Tag,
  Grid3x3,
  MessageSquareQuote,
  BarChart3,
  Inbox,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Home,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Home },
  { href: "/admin/products", label: "Productos", icon: Bike },
  { href: "/admin/offers", label: "Ofertas", icon: Tag },
  { href: "/admin/categories", label: "Categorías", icon: Grid3x3 },
  { href: "/admin/testimonials", label: "Testimonios", icon: MessageSquareQuote },
  { href: "/admin/statistics", label: "Estadísticas", icon: BarChart3 },
  { href: "/admin/leads", label: "Contactos", icon: Inbox },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b bg-background p-4 md:hidden">
        <span className="font-semibold">Admin</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform md:translate-x-0",
          open ? "translate-x-0 pt-16 md:pt-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="hidden items-center gap-2 border-b p-6 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bike className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none">MotoRex</p>
            <p className="text-xs text-muted-foreground">Administración</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-3">
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            Ver sitio
          </Link>
          <div className="rounded-lg bg-muted p-3">
            <p className="truncate text-xs text-muted-foreground">{email}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full justify-start gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
