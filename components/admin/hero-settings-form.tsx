"use client"

import { useState, useTransition } from "react"
import type { HeroConfig } from "@/lib/types"
import { updateHeroConfig } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Type, MessageSquareText, BadgeInfo, MousePointerClick, BookOpen } from "lucide-react"
import { toast } from "sonner"

interface HeroSettingsFormProps {
  config: HeroConfig | null
}

export function HeroSettingsForm({ config }: HeroSettingsFormProps) {
  const [pending, startTransition] = useTransition()
  const [values, setValues] = useState({
    badge_text: config?.badge_text ?? "Oferta por tiempo limitado",
    headline: config?.headline ?? "Encuentra el vehículo *perfecto* para tu aventura",
    subheadline: config?.subheadline ?? "Potencia, estilo y libertad. Las mejores marcas con financiamiento a tu medida.",
    cta_primary: config?.cta_primary ?? "Comprar ahora",
    cta_secondary: config?.cta_secondary ?? "Ver catálogo",
  })

  const hasChanges = config
    ? Object.entries(values).some(
        ([key, val]) => val !== (config[key as keyof typeof values] ?? ""),
      )
    : true

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await updateHeroConfig(values)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Hero actualizado")
      }
    })
  }

  const set = (field: keyof typeof values) => (val: string) =>
    setValues((prev) => ({ ...prev, [field]: val }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BadgeInfo className="h-5 w-5" />
            Texto del Hero
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badge_text" className="flex items-center gap-2">
              <BadgeInfo className="h-4 w-4 text-muted-foreground" />
              Badge / Etiqueta
            </Label>
            <Input
              id="badge_text"
              value={values.badge_text}
              placeholder="Oferta por tiempo limitado"
              onChange={(e) => set("badge_text")(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Texto que aparece en el badge con el puntito rojo
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline" className="flex items-center gap-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              Título principal
            </Label>
            <Input
              id="headline"
              value={values.headline}
              placeholder="Encuentra el vehículo *perfecto* para tu aventura"
              onChange={(e) => set("headline")(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Usá *asteriscos* alrededor de la palabra que querés resaltar con gradiente
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheadline" className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4 text-muted-foreground" />
              Subtítulo / Descripción
            </Label>
            <Textarea
              id="subheadline"
              value={values.subheadline}
              placeholder="Potencia, estilo y libertad..."
              onChange={(e) => set("subheadline")(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MousePointerClick className="h-5 w-5" />
            Botones CTA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta_primary" className="flex items-center gap-2">
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
              Botón principal
            </Label>
            <Input
              id="cta_primary"
              value={values.cta_primary}
              placeholder="Comprar ahora"
              onChange={(e) => set("cta_primary")(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta_secondary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Botón secundario
            </Label>
            <Input
              id="cta_secondary"
              value={values.cta_secondary}
              placeholder="Ver catálogo"
              onChange={(e) => set("cta_secondary")(e.target.value)}
            />
          </div>
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
