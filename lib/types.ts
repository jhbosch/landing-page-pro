export type Status = "active" | "hidden"
export type LeadStatus = "new" | "contacted" | "closed"

export interface Product {
  id: string
  name: string
  brand: string | null
  year: string | null
  price: number
  original_price: number | null
  image_url: string | null
  description: string | null
  category: string | null
  specs: string[]
  rating: number
  reviews: number
  is_featured: boolean
  is_best_seller: boolean
  is_new_arrival: boolean
  badge: string | null
  status: Status
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  title: string
  description: string | null
  image_url: string | null
  discount: string | null
  price: number | null
  original_price: number | null
  ends_at: string | null
  status: Status
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  image_url: string | null
  icon: string | null
  count: number
  status: Status
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string | null
  avatar_url: string | null
  content: string
  rating: number
  status: Status
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Statistic {
  id: string
  label: string
  value: string
  suffix: string | null
  icon: string | null
  status: Status
  sort_order: number
  created_at: string
  updated_at: string
}

export interface SiteConfig {
  id: string
  site_name: string
  phone: string
  email: string
  address: string
  whatsapp: string
  facebook_url: string | null
  instagram_url: string | null
  twitter_url: string | null
  youtube_url: string | null
  map_url: string | null
  updated_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  interest: string | null
  message: string | null
  status: LeadStatus
  created_at: string
}
