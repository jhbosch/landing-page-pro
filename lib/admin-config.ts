// Field definitions that drive the generic admin CRUD forms & tables.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "tags"
  | "boolean"
  | "select"
  | "datetime"

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  // Show this field as a column in the table
  inTable?: boolean
  // For select fields
  options?: { label: string; value: string }[]
  // Help text under the field
  hint?: string
}

export type ManagedTable =
  | "products"
  | "offers"
  | "categories"
  | "testimonials"
  | "statistics"
  | "leads"
  | "trust_badges"

export interface ResourceConfig {
  table: ManagedTable
  singular: string
  plural: string
  fields: FieldConfig[]
}

const STATUS_FIELD: FieldConfig = {
  name: "status",
  label: "Estado",
  type: "select",
  inTable: true,
  options: [
    { label: "Activo (visible)", value: "active" },
    { label: "Oculto", value: "hidden" },
  ],
}

const SORT_FIELD: FieldConfig = {
  name: "sort_order",
  label: "Orden",
  type: "number",
  hint: "Número menor aparece primero",
}

const TRUST_BADGE_ICONS = [
  { label: "Shield (Garantía)", value: "Shield" },
  { label: "Truck (Envío)", value: "Truck" },
  { label: "Star (Calidad)", value: "Star" },
  { label: "Banknote (Pago)", value: "Banknote" },
  { label: "Award (Premio)", value: "Award" },
  { label: "Check (Verificado)", value: "Check" },
  { label: "Clock (24h)", value: "Clock" },
  { label: "Headphones (Soporte)", value: "Headphones" },
  { label: "ThumbsUp (Confianza)", value: "ThumbsUp" },
  { label: "Zap (Velocidad)", value: "Zap" },
  { label: "Heart (Favorito)", value: "Heart" },
  { label: "ShieldCheck", value: "ShieldCheck" },
]

export const RESOURCES: Record<ManagedTable, ResourceConfig> = {
  trust_badges: {
    table: "trust_badges",
    singular: "Trust Badge",
    plural: "Trust Badges",
    fields: [
      { name: "icon", label: "Icono", type: "select", inTable: true, options: TRUST_BADGE_ICONS },
      { name: "title", label: "Título", type: "text", required: true, inTable: true },
      { name: "description", label: "Descripción", type: "text", inTable: true },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  products: {
    table: "products",
    singular: "Producto",
    plural: "Productos",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true, inTable: true },
      { name: "brand", label: "Marca", type: "text", inTable: true },
      { name: "year", label: "Año", type: "text" },
      { name: "price", label: "Precio", type: "number", required: true, inTable: true },
      { name: "original_price", label: "Precio original", type: "number", hint: "Para mostrar descuento (tachado)" },
      { name: "image_url", label: "Imagen", type: "image" },
      { name: "category", label: "Categoría", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "specs", label: "Especificaciones", type: "tags", hint: "Ej: 998cc, 203 HP, 0-100 en 2.9s" },
      { name: "rating", label: "Calificación (0-5)", type: "number" },
      { name: "reviews", label: "Nº de reseñas", type: "number" },
      { name: "badge", label: "Etiqueta", type: "text", hint: "Ej: MÁS VENDIDA, NUEVO" },
      { name: "is_featured", label: "Destacado en Hero", type: "boolean", inTable: true },
      { name: "is_best_seller", label: "Más vendidos", type: "boolean", inTable: true },
      { name: "is_new_arrival", label: "Nuevos ingresos", type: "boolean", inTable: true },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  offers: {
    table: "offers",
    singular: "Oferta",
    plural: "Ofertas",
    fields: [
      { name: "title", label: "Título", type: "text", required: true, inTable: true },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "image_url", label: "Imagen", type: "image" },
      { name: "discount", label: "Descuento", type: "text", inTable: true, hint: "Ej: -20%, 2x1" },
      { name: "price", label: "Precio oferta", type: "number" },
      { name: "original_price", label: "Precio original", type: "number" },
      { name: "ends_at", label: "Termina el", type: "datetime", hint: "Para el contador regresivo" },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  categories: {
    table: "categories",
    singular: "Categoría",
    plural: "Categorías",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true, inTable: true },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "image_url", label: "Imagen", type: "image" },
      { name: "icon", label: "Icono", type: "select", options: [
        { label: "Motos", value: "bike" },
        { label: "Scooters", value: "scooter" },
        { label: "ATV / Cuatriciclos", value: "atv" },
        { label: "Bicicletas Eléctricas", value: "ebike" },
        { label: "Autos", value: "car" },
        { label: "Vehículos Recreativos", value: "rv" },
        { label: "Camionetas", value: "truck" },
        { label: "Acuáticos", value: "boat" },
        { label: "Premium / Alta Gama", value: "luxury" },
        { label: "Clásicos / Vintage", value: "classic" },
        { label: "Nuevos Ingresos", value: "new" },
      ] },
      { name: "count", label: "Cantidad de modelos", type: "number", inTable: true },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  testimonials: {
    table: "testimonials",
    singular: "Testimonio",
    plural: "Testimonios",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true, inTable: true },
      { name: "role", label: "Rol / Ciudad", type: "text", inTable: true },
      { name: "avatar_url", label: "Foto", type: "image" },
      { name: "content", label: "Testimonio", type: "textarea", required: true },
      { name: "rating", label: "Calificación (1-5)", type: "number" },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  statistics: {
    table: "statistics",
    singular: "Estadística",
    plural: "Estadísticas",
    fields: [
      { name: "label", label: "Etiqueta", type: "text", required: true, inTable: true, hint: "Ej: Motos vendidas" },
      { name: "value", label: "Valor", type: "text", required: true, inTable: true, hint: "Ej: 5000" },
      { name: "suffix", label: "Sufijo", type: "text", hint: "Ej: +, %, K" },
      { name: "icon", label: "Icono", type: "select", options: [
        { label: "Motos", value: "bike" },
        { label: "Estrella", value: "star" },
        { label: "Años", value: "calendar" },
        { label: "Marcas", value: "award" },
      ] },
      STATUS_FIELD,
      SORT_FIELD,
    ],
  },
  leads: {
    table: "leads",
    singular: "Lead",
    plural: "Leads",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true, inTable: true },
      { name: "email", label: "Email", type: "text", inTable: true },
      { name: "phone", label: "Teléfono", type: "text", inTable: true },
      { name: "interest", label: "Interés", type: "text", inTable: true },
      { name: "message", label: "Mensaje", type: "textarea" },
      { name: "status", label: "Estado", type: "select", inTable: true, options: [
        { label: "Nuevo", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "Cerrado", value: "closed" },
      ] },
      { name: "created_at", label: "Recibido", type: "text", inTable: true },
    ],
  },
}
