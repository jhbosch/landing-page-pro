"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPublicSiteConfig } from "@/lib/actions"

const quickLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Motos", href: "#motos" },
  { name: "Vehículos", href: "#vehiculos" },
  { name: "Ofertas", href: "#ofertas" },
  { name: "Nuevos", href: "#nuevos" },
  { name: "Contacto", href: "#contacto" },
]

interface SocialEntry {
  name: string
  icon: typeof Facebook
  href: string
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [year, setYear] = useState("2026")
  const [socialLinks, setSocialLinks] = useState<SocialEntry[]>([])

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
    getPublicSiteConfig().then((res) => {
      if (!res.config) return
      const c = res.config
      const links: SocialEntry[] = []
      if (c.facebook_url) links.push({ name: "Facebook", icon: Facebook, href: c.facebook_url })
      if (c.instagram_url) links.push({ name: "Instagram", icon: Instagram, href: c.instagram_url })
      if (c.twitter_url) links.push({ name: "X", icon: Twitter, href: c.twitter_url })
      if (c.youtube_url) links.push({ name: "YouTube", icon: Youtube, href: c.youtube_url })
      setSocialLinks(links)
    })
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#1F1F1F] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#inicio")
              }}
              className="text-2xl font-bold font-[family-name:var(--font-heading)] inline-block mb-4"
            >
              <span className="text-[#E63946]">Moto</span>
              <span className="text-white">Rex</span>
            </a>
            <p className="text-white/60 leading-relaxed">
              Tu concesionario de confianza para motos y vehículos premium. Más
              de 15 años ofreciendo las mejores marcas con financiamiento
              flexible.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-[family-name:var(--font-heading)] mb-4">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold font-[family-name:var(--font-heading)] mb-4">
              Síguenos
            </h4>
            <div className="flex gap-3">
              {socialLinks.length === 0 ? (
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-lg bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : (
                socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2563EB]/20 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))
              )}
            </div>
            <div className="mt-6">
              <h4 className="text-white font-bold font-[family-name:var(--font-heading)] mb-3">
                Métodos de pago
              </h4>
              <div className="flex gap-2">
                {["Visa", "MC", "Amex", "PP"].map((method) => (
                  <div
                    key={method}
                    className="w-12 h-8 rounded bg-white/10 flex items-center justify-center"
                  >
                    <CreditCard className="h-4 w-4 text-white/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold font-[family-name:var(--font-heading)] mb-4">
              Newsletter
            </h4>
            <p className="text-white/60 mb-4 text-sm">
              Suscríbete para recibir ofertas exclusivas y novedades.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0B0C10] border-[#333] text-white focus:border-[#2563EB] placeholder:text-white/40"
              />
              <Button
                type="submit"
                disabled={isSubscribed}
                className="bg-[#E63946] hover:bg-[#E63946]/90 text-white px-4 shrink-0"
              >
                {isSubscribed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  "Suscribirse"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/40 text-sm">
            © {year} MotoRex. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
