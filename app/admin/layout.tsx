import type { ReactNode } from "react"

// Pass-through layout. The dashboard chrome (sidebar) lives in the
// (dashboard) route group so the /admin/login page stays unstyled.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
