"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Bike, Zap, Mountain, BatteryCharging, Car, Tent } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Motos deportivas",
    icon: Bike,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#E63946] to-[#F4A261]",
  },
  {
    name: "Scooters",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1558980394-34764db076b4?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#2563EB] to-[#06B6D4]",
  },
  {
    name: "ATV",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop",
    gradient: "from-[#10B981] to-[#F4A261]",
  },
  {
    name: "Bicicletas eléctricas",
    icon: BatteryCharging,
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#8B5CF6] to-[#EC4899]",
  },
  {
    name: "Autos compactos",
    icon: Car,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#F4A261] to-[#E63946]",
  },
  {
    name: "Vehículos recreativos",
    icon: Tent,
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#06B6D4] to-[#2563EB]",
  },
]

export function Categories() {
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
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
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
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
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
          ))}
        </div>
      </div>
    </section>
  )
}
