"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CreditCard, Shield, Wrench, Truck, Lock } from "lucide-react"

const benefits = [
  {
    icon: CreditCard,
    title: "Financiamiento fácil",
    description: "Opciones flexibles de pago con tasas competitivas",
  },
  {
    icon: Shield,
    title: "Garantía extendida",
    description: "Hasta 3 años de protección para tu vehículo",
  },
  {
    icon: Wrench,
    title: "Soporte técnico 24/7",
    description: "Asistencia profesional cuando la necesites",
  },
  {
    icon: Truck,
    title: "Entrega nacional",
    description: "Llevamos tu vehículo hasta tu puerta",
  },
  {
    icon: Lock,
    title: "Compra 100% segura",
    description: "Transacciones protegidas y verificadas",
  },
]

export function Benefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-[#1F1F1F]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            ¿Por qué elegirnos?
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#2563EB] to-[#E63946] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="glass rounded-2xl p-6 h-full text-center group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2563EB]/30 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-sm">{benefit.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
