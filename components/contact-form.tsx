"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const vehicleCategories = [
  "Motos deportivas",
  "Scooters",
  "ATV",
  "Bicicletas eléctricas",
  "Autos compactos",
  "Vehículos recreativos",
]

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+52 55 1234 5678",
    href: "tel:+525512345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ventas@motodrivepro.mx",
    href: "mailto:ventas@motodrivepro.mx",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Av. Insurgentes Sur 1234, CDMX",
    href: "#",
  },
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contacto" className="py-20 bg-[#0B0C10]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            Solicita tu cotización
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#2563EB] to-[#E63946] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
              Estamos aquí para ayudarte
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              ¿Tienes preguntas sobre nuestros vehículos o necesitas ayuda para
              encontrar el modelo perfecto? Contáctanos y nuestro equipo de
              expertos te asesorará.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/20 flex items-center justify-center group-hover:bg-[#2563EB]/30 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden h-48 bg-[#1F1F1F] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-[#2563EB] mx-auto mb-2" />
                <p className="text-white/60 text-sm">
                  Visítanos en nuestra sucursal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-white/80">
                    Nombre
                  </Label>
                  <Input
                    id="contact-name"
                    required
                    placeholder="Tu nombre completo"
                    className="bg-[#1F1F1F] border-[#333] text-white focus:border-[#2563EB] placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-white/80">
                    Teléfono
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="+52 55 1234 5678"
                    className="bg-[#1F1F1F] border-[#333] text-white focus:border-[#2563EB] placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="bg-[#1F1F1F] border-[#333] text-white focus:border-[#2563EB] placeholder:text-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-vehicle" className="text-white/80">
                  Vehículo de interés
                </Label>
                <Select>
                  <SelectTrigger className="bg-[#1F1F1F] border-[#333] text-white focus:border-[#2563EB]">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] border-[#333]">
                    {vehicleCategories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="text-white hover:bg-[#2563EB]/20 focus:bg-[#2563EB]/20"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-white/80">
                  Mensaje
                </Label>
                <Textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Cuéntanos más sobre lo que buscas..."
                  className="bg-[#1F1F1F] border-[#333] text-white focus:border-[#2563EB] placeholder:text-white/40 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || isSubmitted}
                className="w-full bg-[#2563EB] hover:bg-[#2563EB]/90 text-white py-6 text-lg group"
              >
                {isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    ¡Mensaje enviado!
                  </span>
                ) : isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
