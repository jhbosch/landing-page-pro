"use client"

import { useState, useTransition } from "react"
import type { ResourceConfig, FieldConfig } from "@/lib/admin-config"
import {
  createRecord,
  updateRecord,
  deleteRecord,
  toggleStatus,
  toggleProductFlag,
} from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ResourceForm } from "@/components/admin/resource-form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

type Row = Record<string, unknown> & { id: string; status?: string }

interface ResourceManagerProps {
  config: ResourceConfig
  rows: Row[]
}

function emptyValues(fields: FieldConfig[]): Record<string, unknown> {
  const v: Record<string, unknown> = {}
  for (const f of fields) {
    if (f.type === "boolean") v[f.name] = false
    else if (f.type === "number") v[f.name] = 0
    else if (f.type === "tags") v[f.name] = []
    else if (f.name === "status") v[f.name] = "active"
    else if (f.name === "sort_order") v[f.name] = 0
    else v[f.name] = ""
  }
  return v
}

export function ResourceManager({ config, rows }: ResourceManagerProps) {
  const [pending, startTransition] = useTransition()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, unknown>>(
    emptyValues(config.fields),
  )
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const tableFields = config.fields.filter((f) => f.inTable)
  const isProducts = config.table === "products"

  const openCreate = () => {
    setEditingId(null)
    setValues(emptyValues(config.fields))
    setDialogOpen(true)
  }

  const openEdit = (row: Row) => {
    setEditingId(row.id)
    const v: Record<string, unknown> = {}
    for (const f of config.fields) {
      v[f.name] = row[f.name] ?? (f.type === "tags" ? [] : f.type === "boolean" ? false : "")
    }
    setValues(v)
    setDialogOpen(true)
  }

  const handleChange = (name: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [name]: value }))

  const handleSubmit = () => {
    startTransition(async () => {
      const result = editingId
        ? await updateRecord(config.table, editingId, values)
        : await createRecord(config.table, values)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(editingId ? "Cambios guardados" : `${config.singular} creado`)
        setDialogOpen(false)
      }
    })
  }

  const handleToggleStatus = (row: Row) => {
    startTransition(async () => {
      const result = await toggleStatus(config.table, row.id, row.status ?? "active")
      if (result.error) toast.error(result.error)
      else toast.success("Estado actualizado")
    })
  }

  const handleToggleFlag = (
    row: Row,
    field: "is_featured" | "is_best_seller" | "is_new_arrival",
  ) => {
    startTransition(async () => {
      const result = await toggleProductFlag(row.id, field, Boolean(row[field]))
      if (result.error) toast.error(result.error)
      else toast.success("Actualizado")
    })
  }

  const handleDelete = () => {
    if (!deleteId) return
    startTransition(async () => {
      const result = await deleteRecord(config.table, deleteId)
      if (result.error) toast.error(result.error)
      else toast.success(`${config.singular} eliminado`)
      setDeleteId(null)
    })
  }

  function renderCell(row: Row, field: FieldConfig) {
    const value = row[field.name]
    if (field.name === "status") {
      const active = value === "active"
      return (
        <button
          onClick={() => handleToggleStatus(row)}
          disabled={pending}
          className="inline-flex items-center gap-2"
          title="Cambiar visibilidad"
        >
          <Switch checked={active} className="pointer-events-none" />
          <Badge variant={active ? "default" : "secondary"}>
            {active ? (
              <Eye className="mr-1 h-3 w-3" />
            ) : (
              <EyeOff className="mr-1 h-3 w-3" />
            )}
            {active ? "Visible" : "Oculto"}
          </Badge>
        </button>
      )
    }
    if (field.type === "boolean") {
      return (
        <Switch
          checked={Boolean(value)}
          disabled={pending}
          onCheckedChange={() =>
            handleToggleFlag(
              row,
              field.name as "is_featured" | "is_best_seller" | "is_new_arrival",
            )
          }
        />
      )
    }
    if (field.name === "price" || field.name === "original_price") {
      return value ? `$${Number(value).toLocaleString("en-US")}` : "—"
    }
    if (value === null || value === undefined || value === "") return "—"
    return String(value)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{config.plural}</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "registro" : "registros"}
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo
        </Button>
      </div>

      <div className="rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              {tableFields.map((f) => (
                <TableHead key={f.name}>{f.label}</TableHead>
              ))}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableFields.length + 1}
                  className="py-10 text-center text-muted-foreground"
                >
                  No hay registros. Crea el primero con el botón &quot;Nuevo&quot;.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {tableFields.map((f) => (
                    <TableCell key={f.name}>{renderCell(row, f)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(row)}
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(row.id)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? `Editar ${config.singular}` : `Nuevo ${config.singular}`}
            </DialogTitle>
            <DialogDescription>
              Completa los campos. Los marcados con * son obligatorios.
            </DialogDescription>
          </DialogHeader>
          <ResourceForm
            fields={config.fields}
            values={values}
            onChange={handleChange}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={pending}>
              {pending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={pending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
