import { getAllRows } from "@/lib/queries"
import { getHeroConfig } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"
import { HeroSettingsForm } from "@/components/admin/hero-settings-form"

export const dynamic = "force-dynamic"

export default async function HeroPage() {
  const [config, badges] = await Promise.all([
    getHeroConfig(),
    getAllRows("trust_badges"),
  ])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Hero</h1>
        <p className="text-sm text-muted-foreground">
          Personaliza el texto principal y los badges de confianza
        </p>
      </div>

      <HeroSettingsForm config={config} />

      <ResourceManager
        config={RESOURCES.trust_badges}
        rows={badges as never}
      />
    </div>
  )
}
