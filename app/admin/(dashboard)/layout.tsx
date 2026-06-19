import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Defense-in-depth: middleware already protects /admin, but we re-check here.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-svh bg-muted/30">
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8 md:pl-72">
        {children}
      </main>
    </div>
  )
}
