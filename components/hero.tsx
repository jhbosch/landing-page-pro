"use client"

import { motion } from "framer-motion"
import { Search, Shield, Truck, Star, Banknote, Award, Check, Clock, Headphones, ThumbsUp, Zap, Heart, ShieldCheck, ArrowRight } from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import type { Product, HeroConfig, TrustBadge } from "@/lib/types"

// ── Icon map for trust badges ──────────────────────────────
const TRUST_ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Shield,
  Truck,
  Star,
  Banknote,
  Award,
  Check,
  Clock,
  Headphones,
  ThumbsUp,
  Zap,
  Heart,
  ShieldCheck,
}

// ── Parse headline: wrap *highlighted* words in gradient span
function renderHeadline(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const word = part.slice(1, -1)
      return (
        <span
          key={i}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#F4A261]"
        >
          {word}
        </span>
      )
    }
    // Preserve leading/trailing spaces so words don't merge
    return <span key={i}>{part}</span>
  })
}

interface HeroProps {
  product: Product | null
  heroConfig: HeroConfig | null
  trustBadges: TrustBadge[]
}

export function Hero({ product, heroConfig, trustBadges }: HeroProps) {
  const badgeText = heroConfig?.badge_text ?? "Oferta por tiempo limitado"
  const headline = heroConfig?.headline ?? "Encuentra el vehículo *perfecto* para tu aventura"
  const subheadline = heroConfig?.subheadline ?? "Potencia, estilo y libertad. Las mejores marcas con financiamiento a tu medida."
  const ctaPrimary = heroConfig?.cta_primary ?? "Comprar ahora"
  const ctaSecondary = heroConfig?.cta_secondary ?? "Ver catálogo"

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0B0C10]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C10] via-[#0B0C10] to-[#1a1a2e]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Glow effect behind motorcycle */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#E63946]/10 border border-[#E63946]/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
              <span className="text-[#E63946] text-sm font-medium">{badgeText}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold font-[family-name:var(--font-heading)] text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {renderHeadline(headline)}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-[#E63946] hover:bg-[#E63946]/90 text-white text-lg px-8 py-6 shadow-xl shadow-[#E63946]/30"
              >
                {ctaPrimary}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F4A261] text-[#F4A261] hover:bg-[#F4A261]/10 text-lg px-8 py-6"
              >
                {ctaSecondary}
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="mt-12 flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {trustBadges.map((badge, index) => {
                const Icon = TRUST_ICON_MAP[badge.icon] ?? Shield
                return (
                  <motion.div
                    key={badge.id}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{badge.title}</p>
                      <p className="text-white/50 text-xs">{badge.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Column - Featured Product */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Product Card */}
            <div className="relative">
              {/* Badge */}
              {product?.badge ? (
                <motion.div
                  className="absolute -top-3 left-4 z-20 bg-gradient-to-r from-[#E63946] to-[#F4A261] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {product.badge}
                </motion.div>
              ) : null}

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-[#1F1F1F] to-[#151515] rounded-3xl p-6 border border-white/5 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2563EB]/10 rounded-full blur-2xl" />
                
                {/* Motorcycle Image */}
                <motion.div
                  className="relative aspect-[4/3] w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product?.image_url || "/featured-motorcycle.jpg"}
                    alt={product?.name ?? ""}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Product Info Overlay */}
                <div className="mt-4 space-y-4">
                  {/* Title and Rating */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/50 text-sm">{product?.year}</p>
                      <h3 className="text-white text-xl font-bold font-[family-name:var(--font-heading)]">
                        {product?.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-[#F4A261] fill-[#F4A261]" />
                      <span className="text-white text-sm font-semibold">{product?.rating}</span>
                      <span className="text-white/50 text-xs">({product?.reviews})</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex gap-3">
                    {(product?.specs || []).map((spec) => (
                      <span
                        key={spec}
                        className="bg-white/5 text-white/70 text-xs px-3 py-1.5 rounded-full border border-white/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-white/50 text-sm line-through">{product?.original_price ? `$${Number(product.original_price).toLocaleString("en-US")}` : ""}</span>
                      <p className="text-2xl font-bold text-white">{product ? `$${Number(product.price).toLocaleString("en-US")}` : ""}</p>
                    </div>
                    <Button
                      className="bg-[#E63946] hover:bg-[#E63946]/90 text-white gap-2 shadow-lg shadow-[#E63946]/20"
                    >
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar - Full Width Below */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
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
