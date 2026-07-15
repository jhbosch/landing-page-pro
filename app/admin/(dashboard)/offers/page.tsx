import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function OffersPage() {
  const rows = await getAllRows("offers")
  return (
    <ResourceManager
      config={RESOURCES.offers}
      rows={rows as never}
    />
  )
}
