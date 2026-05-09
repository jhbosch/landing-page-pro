"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Sparkles, ChevronLeft, ChevronRight, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const newArrivals = [
  {
    id: 1,
    name: "Suzuki GSX-S1000",
    year: 2025,
    type: "Sport",
    price: 12499,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop",
    specs: { motor: "999cc", potencia: "152 HP", peso: "214 kg" },
  },
  {
    id: 2,
    name: "Vespa Primavera 150",
    year: 2025,
    type: "Scooter",
    price: 5299,
    image: "https://images.unsplash.com/photo-1558980394-34764db076b4?q=80&w=2070&auto=format&fit=crop",
    specs: { motor: "155cc", potencia: "12 HP", peso: "134 kg" },
  },
  {
    id: 3,
    name: "Can-Am Ryker 900",
    year: 2025,
    type: "ATV",
    price: 9999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop",
    specs: { motor: "900cc", potencia: "82 HP", peso: "270 kg" },
  },
  {
    id: 4,
    name: "Zero SR/F",
    year: 2025,
    type: "Eléctrica",
    price: 19995,
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop",
    specs: { motor: "Eléctrico", potencia: "110 HP", alcance: "259 km" },
  },
  {
    id: 5,
    name: "Triumph Speed Triple",
    year: 2025,
    type: "Sport",
    price: 16750,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop",
    specs: { motor: "1160cc", potencia: "180 HP", peso: "198 kg" },
  },
  {
    id: 6,
    name: "Honda PCX 160",
    year: 2025,
    type: "Scooter",
    price: 4299,
    image: "https://images.unsplash.com/photo-1558980394-34764db076b4?q=80&w=2070&auto=format&fit=crop",
    specs: { motor: "156cc", potencia: "15 HP", peso: "132 kg" },
  },
]

export function NewArrivals() {
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const toggleCompare = (id: number) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id)
      }
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  const compareItems = newArrivals.filter((item) =>
    selectedForCompare.includes(item.id)
  )

  return (
    <section id="nuevos" className="py-20 bg-[#1F1F1F]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#E63946] text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            Recién llegados
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            Productos Nuevos
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#2563EB] to-[#E63946] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-container hide-scrollbar pb-4"
          >
            {newArrivals.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-80 snap-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-[#0B0C10] rounded-2xl overflow-hidden group relative">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-[#2563EB] to-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles className="h-3 w-3" /> Nuevo
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#2563EB] text-sm font-medium">
                        {item.type}
                      </span>
                      <span className="text-white/60 text-sm">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-white mt-3">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <Button className="flex-1 bg-[#E63946] hover:bg-[#E63946]/90 text-white">
                        Reservar ahora
                      </Button>
                      <div className="hidden lg:flex items-center gap-2">
                        <Checkbox
                          id={`compare-${item.id}`}
                          checked={selectedForCompare.includes(item.id)}
                          onCheckedChange={() => toggleCompare(item.id)}
                          disabled={
                            selectedForCompare.length >= 3 &&
                            !selectedForCompare.includes(item.id)
                          }
                          className="border-white/30 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
                        />
                        <label
                          htmlFor={`compare-${item.id}`}
                          className="text-white/60 text-sm cursor-pointer"
                        >
                          Comparar
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 border-white/20 text-white hover:bg-white/10 hidden lg:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 border-white/20 text-white hover:bg-white/10 hidden lg:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Compare Button */}
        {selectedForCompare.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center hidden lg:block"
          >
            <Button
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white px-8"
              onClick={() => setShowCompare(true)}
            >
              <Check className="h-4 w-4 mr-2" />
              Comparar {selectedForCompare.length} modelos
            </Button>
          </motion.div>
        )}
      </div>

      {/* Comparison Panel */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-end justify-center"
            onClick={() => setShowCompare(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#1F1F1F] rounded-t-3xl w-full max-w-5xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#1F1F1F] p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                  Comparación de modelos
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowCompare(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {compareItems.map((item) => (
                    <div key={item.id} className="text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                      />
                      <h4 className="text-lg font-bold text-white">
                        {item.name}
                      </h4>
                      <p className="text-[#2563EB] text-sm">{item.type}</p>
                      <p className="text-2xl font-bold text-white mt-2">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="mt-4 space-y-2 text-left">
                        {Object.entries(item.specs).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-white/60 capitalize">
                              {key}
                            </span>
                            <span className="text-white">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
