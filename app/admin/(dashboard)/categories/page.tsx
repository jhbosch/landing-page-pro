import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  const rows = await getAllRows("categories")
  return (
    <ResourceManager
      config={RESOURCES.categories}
      rows={rows as never}
    />
  )
}
