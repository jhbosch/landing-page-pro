import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function StatisticsPage() {
  const rows = await getAllRows("statistics")
  return (
    <ResourceManager
      config={RESOURCES.statistics}
      rows={rows as never}
    />
  )
}
