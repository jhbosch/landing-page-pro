"use client"

import { useState, useTransition } from "react"
import type { SiteConfig } from "@/lib/types"
import { updateSiteConfig } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Phone, Mail, MapPin, MessageCircle, Hash, Camera, Map, type LucideIcon } from "lucide-react"
import { toast } from "sonner"

interface SettingsFormProps {
  config: SiteConfig | null
}

interface FieldProps {
  id: string
  label: string
  value: string
  icon: LucideIcon
  placeholder?: string
  onChange: (value: string) => void
}

function ConfigField({ id, label, value, icon: Icon, placeholder, onChange }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export function SettingsForm({ config }: SettingsFormProps) {
  const [pending, startTransition] = useTransition()
  const [values, setValues] = useState({
    site_name: config?.site_name ?? "MotoRex",
    phone: config?.phone ?? "",
    email: config?.email ?? "",
    address: config?.address ?? "",
    whatsapp: config?.whatsapp ?? "",
    facebook_url: config?.facebook_url ?? "",
    instagram_url: config?.instagram_url ?? "",
    twitter_url: config?.twitter_url ?? "",
    youtube_url: config?.youtube_url ?? "",
    map_url: config?.map_url ?? "",
  })

  const hasChanges = config
    ? Object.entries(values).some(
        ([key, val]) => val !== (config[key as keyof typeof values] ?? ""),
      )
    : true

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateSiteConfig(values)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Configuración guardada")
      }
    })
  }

  const set = (field: keyof typeof values) => (val: string) =>
    setValues((prev) => ({ ...prev, [field]: val }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-5 w-5" />
            Información del sitio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfigField
            id="site_name"
            label="Nombre del sitio"
            value={values.site_name}
            icon={Hash}
            placeholder="MotoRex"
            onChange={set("site_name")}
          />
        </CardContent>
      </Card>

      {/* Contacto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Phone className="h-5 w-5" />
            Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfigField
            id="phone"
            label="Teléfono"
            value={values.phone}
            icon={Phone}
            placeholder="+52 55 1234 5678"
            onChange={set("phone")}
          />
          <ConfigField
            id="whatsapp"
            label="WhatsApp (solo número)"
            value={values.whatsapp}
            icon={MessageCircle}
            placeholder="1234567890"
            onChange={set("whatsapp")}
          />
          <ConfigField
            id="email"
            label="Email"
            value={values.email}
            icon={Mail}
            placeholder="ventas@motorex.mx"
            onChange={set("email")}
          />
          <ConfigField
            id="address"
            label="Dirección"
            value={values.address}
            icon={MapPin}
            placeholder="Av. Insurgentes Sur 1234, CDMX"
            onChange={set("address")}
          />
          <ConfigField
            id="map_url"
            label="Google Maps Embed URL"
            value={values.map_url}
            icon={Map}
            placeholder="https://www.google.com/maps/embed?pb=..."
            onChange={set("map_url")}
          />
          <p className="text-xs text-muted-foreground">
            Pegá solo la URL del src o el iframe embed completo — lo detecta automático
          </p>
        </CardContent>
      </Card>

      {/* Redes Sociales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="h-5 w-5" />
            Redes sociales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConfigField
            id="facebook_url"
            label="Facebook URL"
            value={values.facebook_url}
            icon={Hash}
            placeholder="https://facebook.com/tu Pagina"
            onChange={set("facebook_url")}
          />
          <ConfigField
            id="instagram_url"
            label="Instagram URL"
            value={values.instagram_url}
            icon={Hash}
            placeholder="https://instagram.com/tu-cuenta"
            onChange={set("instagram_url")}
          />
          <ConfigField
            id="twitter_url"
            label="X (Twitter) URL"
            value={values.twitter_url}
            icon={Hash}
            placeholder="https://x.com/tu-cuenta"
            onChange={set("twitter_url")}
          />
          <ConfigField
            id="youtube_url"
            label="YouTube URL"
            value={values.youtube_url}
            icon={Hash}
            placeholder="https://youtube.com/@tu-canal"
            onChange={set("youtube_url")}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={pending || !hasChanges}>
          {pending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  )
}
