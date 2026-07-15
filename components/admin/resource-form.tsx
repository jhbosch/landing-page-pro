"use client"

import { useState, useRef } from "react"
import type { FieldConfig } from "@/lib/admin-config"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { uploadImage } from "@/lib/supabase/storage"

interface ResourceFormProps {
  fields: FieldConfig[]
  values: Record<string, unknown>
  onChange: (name: string, value: unknown) => void
}

function toDatetimeLocal(value: unknown): string {
  if (!value || typeof value !== "string") return ""
  const d = new Date(value)
  if (isNaN(d.getTime())) return ""
  // Format to yyyy-MM-ddTHH:mm in local time
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function ResourceForm({ fields, values, onChange }: ResourceFormProps) {
  return (
    <div className="grid gap-5">
      {fields.map((field) => {
        const value = values[field.name]
        const id = `field-${field.name}`

        return (
          <div key={field.name} className="grid gap-2">
            {field.type !== "boolean" && (
              <Label htmlFor={id}>
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </Label>
            )}

            {field.type === "text" && (
              <Input
                id={id}
                value={(value as string) ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            )}

            {field.type === "number" && (
              <Input
                id={id}
                type="number"
                step="any"
                value={value === null || value === undefined ? "" : String(value)}
                placeholder={field.placeholder}
                onChange={(e) =>
                  onChange(
                    field.name,
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              />
            )}

            {field.type === "textarea" && (
              <Textarea
                id={id}
                rows={3}
                value={(value as string) ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            )}

            {field.type === "image" && (
              <ImageField
                id={id}
                value={(value as string) ?? ""}
                onChange={(v) => onChange(field.name, v)}
              />
            )}

            {field.type === "tags" && (
              <Input
                id={id}
                value={Array.isArray(value) ? (value as string[]).join(", ") : ""}
                placeholder={field.placeholder ?? "Separadas por comas"}
                onChange={(e) =>
                  onChange(
                    field.name,
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
              />
            )}

            {field.type === "datetime" && (
              <Input
                id={id}
                type="datetime-local"
                value={toDatetimeLocal(value)}
                onChange={(e) =>
                  onChange(
                    field.name,
                    e.target.value ? new Date(e.target.value).toISOString() : null,
                  )
                }
              />
            )}

            {field.type === "select" && (
              <Select
                value={(value as string) ?? ""}
                onValueChange={(v) => onChange(field.name, v)}
              >
                <SelectTrigger id={id}>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === "boolean" && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor={id} className="cursor-pointer">
                  {field.label}
                </Label>
                <Switch
                  id={id}
                  checked={Boolean(value)}
                  onCheckedChange={(c) => onChange(field.name, c)}
                />
              </div>
            )}

            {field.hint && (
              <p className="text-xs text-muted-foreground">{field.hint}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ImageField({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (v: string) => void
}) {
  const [preview, setPreview] = useState(value)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const url = await uploadImage(file)
    setUploading(false)

    if (url) {
      onChange(url)
      setPreview(url)
    }
  }

  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          placeholder="/imagen.jpg o https://..."
          className="flex-1"
          onChange={(e) => {
            onChange(e.target.value)
            setPreview(e.target.value)
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileSelect}
      />
      {uploading && (
        <p className="text-xs text-muted-foreground">Subiendo imagen...</p>
      )}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview || "/placeholder.svg"}
          alt="Vista previa"
          className="h-24 w-auto rounded-md border object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      )}
    </div>
  )
}
