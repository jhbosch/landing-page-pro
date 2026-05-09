"use client"

import { motion } from "framer-motion"
import { Search, Shield, Banknote, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trustBadges = [
  { icon: Shield, title: "Garantía", description: "1 año completo" },
  { icon: Banknote, title: "Financiamiento", description: "desde $99/mes" },
  { icon: Truck, title: "Entrega rápida", description: "todo el país" },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/80 via-[#0B0C10]/60 to-[#0B0C10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] text-white leading-tight text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Encuentra el vehículo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#F4A261]">
              perfecto
            </span>{" "}
            para tu próxima aventura
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Potencia, estilo y libertad. Las mejores marcas con financiamiento a
            tu medida.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#E63946] hover:bg-[#E63946]/90 text-white text-lg px-8 py-6 shadow-xl shadow-[#E63946]/30"
            >
              Comprar ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#F4A261] text-[#F4A261] hover:bg-[#F4A261]/10 text-lg px-8 py-6"
            >
              Ver ofertas
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                className="glass rounded-2xl p-6 flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-6 w-6 text-[#2563EB]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold font-[family-name:var(--font-heading)]">
                    {badge.title}
                  </p>
                  <p className="text-white/60 text-sm">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                type="text"
                placeholder="Buscar por marca o modelo..."
                className="w-full bg-[#1F1F1F]/80 border-[#333] text-white py-6 pl-12 pr-4 rounded-xl focus:border-[#2563EB] placeholder:text-white/40"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
