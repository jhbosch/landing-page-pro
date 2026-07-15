"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Zap, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Offer } from "@/lib/types"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-3 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <motion.div
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0B0C10] rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
          >
            <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
              {value.toString().padStart(2, "0")}
            </span>
          </motion.div>
          <p className="text-white/60 text-xs mt-2 capitalize">{unit}</p>
        </div>
      ))}
    </div>
  )
}

interface CheckoutModalProps {
  offer: Offer
  onClose: () => void
}

function CheckoutModal({ offer, onClose }: CheckoutModalProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

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
        className="bg-[#1F1F1F] rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
              Compra rápida
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                ¡Solicitud enviada!
              </h4>
              <p className="text-white/60">
                Nos pondremos en contacto contigo pronto.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#0B0C10] rounded-xl">
                <img
                  src={offer.image_url || "/placeholder.svg"}
                  alt={offer.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-white font-semibold">{offer.title}</h4>
                  <p className="text-[#F4A261] text-xl font-bold">
                      ${Number(offer.price).toLocaleString("en-US")}
                    </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white/80">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    required
                    className="bg-[#0B0C10] border-[#333] text-white mt-1"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/80">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-[#0B0C10] border-[#333] text-white mt-1"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white/80">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="bg-[#0B0C10] border-[#333] text-white mt-1"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white py-6"
                >
                  Confirmar compra
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const isFlashOffer = (offer: Offer) => offer.discount !== null && offer.discount !== ""

interface SpecialOffersProps {
  offers: Offer[]
}

export function SpecialOffers({ offers }: SpecialOffersProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (offers.length === 0) return null

  return (
    <section
      id="ofertas"
      className="py-20 bg-gradient-to-b from-[#E63946]/20 via-[#0B0C10] to-[#0B0C10]"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
            ¡Ofertas limitadas!
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#E63946] to-[#F4A261] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-white/60 text-center mb-4">
            La oferta termina en:
          </p>
          <CountdownTimer />
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {isFlashOffer(offer) && (
                <motion.div
                  className="absolute -top-3 -right-3 z-10 bg-[#F4A261] text-[#0B0C10] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="h-3 w-3" /> Oferta relámpago
                </motion.div>
              )}
              <motion.div
                className="bg-[#1F1F1F] rounded-2xl overflow-hidden group"
                whileHover={{ y: -8 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={offer.image_url || "/placeholder.svg"}
                    alt={offer.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {offer.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <p className="text-[#E63946] line-through text-lg">
                      ${Number(offer.original_price).toLocaleString("en-US")}
                    </p>
                    <p className="text-[#F4A261] text-3xl font-bold">
                    ${Number(offer.price).toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[#E63946]">
                    <AlertTriangle className="h-4 w-4" />
                    {offer.discount && (
                      <span className="text-sm font-medium">{offer.discount}</span>
                    )}
                  </div>
                  <Button
                    className="w-full mt-4 bg-[#E63946] hover:bg-[#E63946]/90 text-white"
                    onClick={() => setSelectedOffer(offer)}
                  >
                    Comprar ahora
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <CheckoutModal
            offer={selectedOffer}
            onClose={() => setSelectedOffer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
