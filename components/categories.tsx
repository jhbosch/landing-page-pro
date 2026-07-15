"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bike, Zap, Mountain, BatteryCharging, Car, Tent, Truck, Sailboat, Gem, Timer, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  bike: Bike,
  scooter: Zap,
  atv: Mountain,
  ebike: BatteryCharging,
  car: Car,
  rv: Tent,
  truck: Truck,
  boat: Sailboat,
  luxury: Gem,
  classic: Timer,
  new: Sparkles,
}

const GRADIENT_MAP: Record<string, string> = {
  bike: "from-[#E63946] to-[#F4A261]",
  scooter: "from-[#2563EB] to-[#06B6D4]",
  atv: "from-[#10B981] to-[#F4A261]",
  ebike: "from-[#8B5CF6] to-[#EC4899]",
  car: "from-[#F4A261] to-[#E63946]",
  rv: "from-[#06B6D4] to-[#2563EB]",
  truck: "from-[#059669] to-[#047857]",
  boat: "from-[#0EA5E9] to-[#2563EB]",
  luxury: "from-[#D97706] to-[#F59E0B]",
  classic: "from-[#78716C] to-[#A8A29E]",
  new: "from-[#DC2626] to-[#FB923C]",
}

interface CategoriesProps {
  categories: Category[]
}

export function Categories({ categories }: CategoriesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="vehiculos" className="py-20 bg-[#0B0C10]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            Categorías
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#2563EB] to-[#E63946] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Explora nuestra amplia selección de vehículos por categoría
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = ICON_MAP[category.icon ?? ""] ?? Bike
            const gradient = GRADIENT_MAP[category.icon ?? ""] ?? "from-[#2563EB] to-[#E63946]"
            return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                className="relative h-40 md:h-56 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Image */}
                {category.image_url && (
                <img
                  src={category.image_url}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                )}
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white text-center font-[family-name:var(--font-heading)]">
                    {category.name}
                  </h3>
                  
                  {/* Hover Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                    >
                      Explorar
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}
