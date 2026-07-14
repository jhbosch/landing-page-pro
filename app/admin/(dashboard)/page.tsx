import { getDashboardCounts, getLeads } from "@/lib/queries"
import {
  Bike,
  Tag,
  Grid3x3,
  MessageSquareQuote,
  BarChart3,
  Inbox,
  ArrowRight,
  Mail,
} from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

const cards = [
  { label: "Productos", table: "products" as const, icon: Bike, href: "/admin/products", color: "from-blue-600 to-blue-700" },
  { label: "Ofertas", table: "offers" as const, icon: Tag, href: "/admin/offers", color: "from-red-600 to-red-700" },
  { label: "Categorías", table: "categories" as const, icon: Grid3x3, href: "/admin/categories", color: "from-emerald-600 to-emerald-700" },
  { label: "Testimonios", table: "testimonials" as const, icon: MessageSquareQuote, href: "/admin/testimonials", color: "from-purple-600 to-purple-700" },
  { label: "Estadísticas", table: "statistics" as const, icon: BarChart3, href: "/admin/statistics", color: "from-amber-600 to-amber-700" },
  { label: "Contactos", table: "leads" as const, icon: Inbox, href: "/admin/leads", color: "from-cyan-600 to-cyan-700" },
]

export default async function AdminDashboardPage() {
  const counts = await getDashboardCounts()
  const recentLeads = await getLeads()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumen del contenido del sitio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((card) => {
          const count =
            card.table === "leads"
              ? counts.leads
              : counts[card.table]
          const Icon = card.icon

          return (
            <Link
              key={card.table}
              href={card.href}
              className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${card.color} opacity-10 transition-opacity group-hover:opacity-20`} />
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
              </div>
              <p className="mt-4 text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Recent Leads */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Contactos recientes</h2>
          <Link
            href="/admin/leads"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        <div className="rounded-lg border bg-card">
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Inbox className="mb-3 h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No hay contactos aún
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Los mensajes del formulario de contacto aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {recentLeads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{lead.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
