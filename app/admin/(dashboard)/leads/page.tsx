import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function LeadsPage() {
  const rows = await getAllRows("leads")
  return (
    <ResourceManager
      config={RESOURCES.leads}
      rows={rows as never}
    />
  )
}
