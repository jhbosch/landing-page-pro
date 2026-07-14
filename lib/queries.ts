import { createClient } from "@/lib/supabase/server"
import type {
  Product,
  Offer,
  Category,
  Testimonial,
  Statistic,
  SiteConfig,
} from "@/lib/types"

// ---- PUBLIC (frontend) QUERIES ----
// RLS ensures only `status = 'active'` rows are returned to anonymous visitors.

export async function getFeaturedProduct(): Promise<Product | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle()
  return data
}

export async function getBestSellers(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_best_seller", true)
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getNewArrivals(): Promise<Product[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("is_new_arrival", true)
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getOffers(): Promise<Offer[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("offers")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getStatistics(): Promise<Statistic[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("statistics")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("site_config")
    .select("*")
    .limit(1)
    .maybeSingle()
  return data
}

// ---- ADMIN QUERIES ----
// Authenticated admins can read every row (including hidden) via the
// `admin_all_*` RLS policies. These power the management tables.

export async function getAllRows(
  table:
    | "products"
    | "offers"
    | "categories"
    | "testimonials"
    | "statistics",
): Promise<Record<string, unknown>[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
  return data ?? []
}

export async function getLeads(): Promise<import("@/lib/types").Lead[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
  return data ?? []
}

export async function getDashboardCounts() {
  const supabase = await createClient()
  const tables = [
    "products",
    "offers",
    "categories",
    "testimonials",
    "statistics",
    "leads",
  ] as const
  const counts: Record<string, number> = {}
  await Promise.all(
    tables.map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true })
      counts[t] = count ?? 0
    }),
  )
  // New (unread) leads
  const { count: newLeads } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")
  counts.newLeads = newLeads ?? 0
  return counts
}
