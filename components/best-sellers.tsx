"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Flame, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const bestSellers = [
  {
    id: 1,
    name: "Honda CBR 650R",
    year: 2024,
    description: "Deportiva de alto rendimiento con motor de 4 cilindros",
    originalPrice: 11499,
    currentPrice: 9899,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    specs: {
      motor: "649cc, 4 cilindros",
      potencia: "95 HP",
      peso: "208 kg",
      velocidad: "230 km/h",
    },
  },
  {
    id: 2,
    name: "Yamaha MT-07",
    year: 2024,
    description: "Naked versátil con estilo agresivo y manejo ágil",
    originalPrice: 8999,
    currentPrice: 7599,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop",
    specs: {
      motor: "689cc, 2 cilindros",
      potencia: "73 HP",
      peso: "184 kg",
      velocidad: "200 km/h",
    },
  },
  {
    id: 3,
    name: "Kawasaki Ninja 400",
    year: 2024,
    description: "La entrada perfecta al mundo de las supersport",
    originalPrice: 5999,
    currentPrice: 5299,
    rating: 4.7,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop",
    specs: {
      motor: "399cc, 2 cilindros",
      potencia: "49 HP",
      peso: "168 kg",
      velocidad: "180 km/h",
    },
  },
  {
    id: 4,
    name: "Ducati Monster",
    year: 2024,
    description: "Icónico diseño italiano con tecnología de punta",
    originalPrice: 14999,
    currentPrice: 12999,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070&auto=format&fit=crop",
    specs: {
      motor: "937cc, 2 cilindros",
      potencia: "111 HP",
      peso: "188 kg",
      velocidad: "240 km/h",
    },
  },
  {
    id: 5,
    name: "BMW G 310 R",
    year: 2024,
    description: "Premium alemán accesible con tecnología avanzada",
    originalPrice: 5999,
    currentPrice: 4999,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop",
    specs: {
      motor: "313cc, 1 cilindro",
      potencia: "34 HP",
      peso: "164 kg",
      velocidad: "143 km/h",
    },
  },
  {
    id: 6,
    name: "KTM Duke 390",
    year: 2024,
    description: "Agresiva, ligera y con carácter deportivo único",
    originalPrice: 6499,
    currentPrice: 5799,
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop",
    specs: {
      motor: "373cc, 1 cilindro",
      potencia: "43 HP",
      peso: "163 kg",
      velocidad: "167 km/h",
    },
  },
]

interface VehicleModalProps {
  vehicle: (typeof bestSellers)[0]
  onClose: () => void
}

function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
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
            src={vehicle.image}
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
            {Object.entries(vehicle.specs).map(([key, value]) => (
              <div key={key} className="bg-[#0B0C10] rounded-xl p-4">
                <p className="text-white/50 text-sm capitalize">{key}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-white/50 line-through text-sm">
                ${vehicle.originalPrice.toLocaleString()}
              </p>
              <p className="text-2xl font-bold text-white">
                ${vehicle.currentPrice.toLocaleString()}
              </p>
            </div>
            <Button className="bg-[#E63946] hover:bg-[#E63946]/90 text-white px-8">
              Comprar ahora
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BestSellers() {
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof bestSellers)[0] | null
  >(null)
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
            {bestSellers.map((vehicle, index) => (
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
          {bestSellers.slice(0, 4).map((vehicle, index) => (
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
  vehicle: (typeof bestSellers)[0]
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
          src={vehicle.image}
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
              ${vehicle.originalPrice.toLocaleString()}
            </p>
            <p className="text-xl font-bold text-white">
              ${vehicle.currentPrice.toLocaleString()}
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
