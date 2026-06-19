import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const rows = await getAllRows("products")
  return (
    <ResourceManager
      config={RESOURCES.products}
      rows={rows as never}
    />
  )
}
