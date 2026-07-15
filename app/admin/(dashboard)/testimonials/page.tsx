import { getAllRows } from "@/lib/queries"
import { RESOURCES } from "@/lib/admin-config"
import { ResourceManager } from "@/components/admin/resource-manager"

export const dynamic = "force-dynamic"

export default async function TestimonialsPage() {
  const rows = await getAllRows("testimonials")
  return (
    <ResourceManager
      config={RESOURCES.testimonials}
      rows={rows as never}
    />
  )
}
