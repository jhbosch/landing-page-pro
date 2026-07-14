import { getSiteConfig } from "@/lib/queries"
import { SettingsForm } from "@/components/admin/settings-form"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const config = await getSiteConfig()

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Datos de contacto y redes sociales del sitio
        </p>
      </div>

      <SettingsForm config={config} />
    </div>
  )
}
