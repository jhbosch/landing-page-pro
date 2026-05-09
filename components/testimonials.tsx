"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    location: "Ciudad de México",
    rating: 5,
    quote:
      "Mejor compra del año, la entrega fue rapidísima y el proceso de financiamiento muy sencillo. ¡Mi Yamaha MT-07 es increíble!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "María González",
    location: "Guadalajara",
    rating: 5,
    quote:
      "El servicio al cliente es excepcional. Me ayudaron a elegir la moto perfecta para mis necesidades y el precio fue muy competitivo.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Andrés López",
    location: "Monterrey",
    rating: 5,
    quote:
      "Compré mi Honda CBR hace 6 meses y no podría estar más feliz. La garantía extendida me da mucha tranquilidad.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Laura Martínez",
    location: "Puebla",
    rating: 5,
    quote:
      "Increíble experiencia de compra. El equipo es muy profesional y me dieron seguimiento hasta que recibí mi scooter.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

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
            Lo que dicen nuestros clientes
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-[#F4A261] to-[#2563EB] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-container hide-scrollbar pb-4"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-80 md:w-96 snap-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="glass rounded-2xl p-6 h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#F4A261] text-[#F4A261]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-white/50 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
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
      </div>
    </section>
  )
}
