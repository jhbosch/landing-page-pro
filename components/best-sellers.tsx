"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Flame, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { buildWhatsAppLink } from "@/lib/whatsapp"

function specsToObject(specs: string[]): Record<string, string> {
  const obj: Record<string, string> = {}
  specs.forEach((spec, i) => {
    const keys = ["motor", "potencia", "peso", "velocidad", "alcance"]
    obj[keys[i] ?? `spec_${i}`] = spec
  })
  return obj
}

interface VehicleModalProps {
  vehicle: Product
  whatsapp: string
  onClose: () => void
}

function VehicleModal({ vehicle, whatsapp, onClose }: VehicleModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1F1F1F] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={vehicle.image_url ?? ""}
            alt={vehicle.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-[#E63946] to-[#F4A261] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Flame className="h-3 w-3" /> Top ventas
            </span>
            <span className="text-white/60 text-sm">{vehicle.year}</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
            {vehicle.name}
          </h3>
          <p className="text-white/70 mt-2">{vehicle.description}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#F4A261] text-[#F4A261]" />
              <span className="text-white font-semibold">{vehicle.rating}</span>
            </div>
            <span className="text-white/50">({vehicle.reviews} reseñas)</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {Object.entries(specsToObject(vehicle.specs ?? [])).map(([key, value]) => (
              <div key={key} className="bg-[#0B0C10] rounded-xl p-4">
                <p className="text-white/50 text-sm capitalize">{key}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-white/50 line-through text-sm">
                ${Number(vehicle.original_price ?? 0).toLocaleString("en-US")}
              </p>
              <p className="text-2xl font-bold text-white">
                ${Number(vehicle.price).toLocaleString("en-US")}
              </p>
            </div>
            <Button
              className="bg-[#E63946] hover:bg-[#E63946]/90 text-white px-8"
              onClick={() =>
                window.open(
                  buildWhatsAppLink(
                    whatsapp,
                    `Hola, me interesa la ${vehicle.name} por $${Number(vehicle.price).toLocaleString("en-US")}.`
                  ),
                  "_blank"
                )
              }
            >
              Contactar para compra
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BestSellers({ products, whatsapp }: { products: Product[]; whatsapp: string }) {
  const [selectedVehicle, setSelectedVehicle] = useState<Product | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="motos" className="py-20 bg-[#0B0C10]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            Más Vendidos
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#E63946] to-[#F4A261] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Mobile Scroll Container */}
        <div className="relative lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-container hide-scrollbar pb-4"
          >
            {products.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                className="flex-shrink-0 w-72 snap-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  onSelect={() => setSelectedVehicle(vehicle)}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VehicleCard
                vehicle={vehicle}
                onSelect={() => setSelectedVehicle(vehicle)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          whatsapp={whatsapp}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  )
}

function VehicleCard({
  vehicle,
  onSelect,
}: {
  vehicle: Product
  onSelect: () => void
}) {
  return (
    <motion.div
      className="bg-[#1F1F1F] rounded-2xl overflow-hidden group cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image_url ?? ""}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-[#E63946] to-[#F4A261] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Flame className="h-3 w-3" /> Top ventas
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">{vehicle.year}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#F4A261] text-[#F4A261]" />
            <span className="text-white text-sm font-medium">
              {vehicle.rating}
            </span>
            <span className="text-white/50 text-xs">({vehicle.reviews})</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">
          {vehicle.name}
        </h3>
        <p className="text-white/60 text-sm mt-1 line-clamp-2">
          {vehicle.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-sm line-through">
              ${Number(vehicle.original_price ?? 0).toLocaleString("en-US")}
            </p>
            <p className="text-xl font-bold text-white">
              ${Number(vehicle.price).toLocaleString("en-US")}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB]/10"
          >
            Ver detalles
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
