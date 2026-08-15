"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Tables that the admin can manage with the generic CRUD helpers.
type ManagedTable =
  | "products"
  | "offers"
  | "categories"
  | "testimonials"
  | "statistics"
  | "leads"
  | "trust_badges"

type ActionResult = { error: string | null }

// Ensure there is an authenticated session before any write.
async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("No autorizado")
  }
  return supabase
}

function revalidateAll() {
  revalidatePath("/")
  revalidatePath("/admin", "layout")
}

// Coerce empty strings to null and parse numeric/array/boolean fields.
function normalize(table: ManagedTable, raw: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw)) {
    if (value === "" || value === undefined) {
      out[key] = null
    } else {
      out[key] = value
    }
  }
  return out
}

export async function createRecord(
  table: ManagedTable,
  values: Record<string, unknown>,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { error } = await supabase.from(table).insert(normalize(table, values))
    if (error) throw error
    revalidateAll()
    return { error: null }
  } catch (e) {
    console.error("createRecord error:", e)
    return { error: e instanceof Error ? e.message : String(e) }
  }
}

export async function updateRecord(
  table: ManagedTable,
  id: string,
  values: Record<string, unknown>,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { error } = await supabase
      .from(table)
      .update(normalize(table, values))
      .eq("id", id)
    if (error) throw error
    revalidateAll()
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

export async function deleteRecord(
  table: ManagedTable | "leads",
  id: string,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { error } = await supabase.from(table).delete().eq("id", id)
    if (error) throw error
    revalidateAll()
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

// Toggle a boolean column (status active/hidden, or product flags) inline.
export async function toggleStatus(
  table: ManagedTable,
  id: string,
  current: string,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const next = current === "active" ? "hidden" : "active"
    const { error } = await supabase
      .from(table)
      .update({ status: next })
      .eq("id", id)
    if (error) throw error
    revalidateAll()
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

export async function toggleProductFlag(
  id: string,
  field: "is_featured" | "is_best_seller" | "is_new_arrival",
  current: boolean,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { error } = await supabase
      .from("products")
      .update({ [field]: !current })
      .eq("id", id)
    if (error) throw error
    revalidateAll()
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed",
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
    if (error) throw error
    revalidatePath("/admin/leads")
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

// Public action: submit a contact lead (no auth required).
export async function submitLead(values: {
  name: string
  email?: string
  phone?: string
  interest?: string
  message?: string
}): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("leads").insert({
      name: values.name,
      email: values.email || null,
      phone: values.phone || null,
      interest: values.interest || null,
      message: values.message || null,
    })
    if (error) throw error
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

export async function updateHeroConfig(
  values: Partial<Record<string, unknown>>,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    const { data: existing } = await supabase
      .from("hero_config")
      .select("id")
      .limit(1)
      .maybeSingle()

    if (!existing) {
      const { error } = await supabase.from("hero_config").insert(values)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from("hero_config")
        .update(values)
        .eq("id", existing.id)
      if (error) throw error
    }
    revalidatePath("/admin/hero")
    revalidatePath("/")
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

export async function updateSiteConfig(
  values: Partial<Record<string, unknown>>,
): Promise<ActionResult> {
  try {
    const supabase = await requireAuth()
    // Get the existing config row (should be only one)
    const { data: existing } = await supabase
      .from("site_config")
      .select("id")
      .limit(1)
      .maybeSingle()

    if (!existing) {
      // Insert if no row exists yet
      const { error } = await supabase
        .from("site_config")
        .insert(values)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from("site_config")
        .update(values)
        .eq("id", existing.id)
      if (error) throw error
    }
    revalidatePath("/admin/settings")
    revalidatePath("/")
    return { error: null }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido" }
  }
}

// Public action: fetch site config (no auth required, RLS allows public read).
export async function getPublicSiteConfig() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("site_config")
      .select("*")
      .limit(1)
      .maybeSingle()
    return { config: data, error: null }
  } catch (e) {
    return { config: null, error: e instanceof Error ? e.message : "Error" }
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
