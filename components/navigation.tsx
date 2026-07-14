"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getPublicSiteConfig } from "@/lib/actions"

const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Motos", href: "#motos" },
  { name: "Vehículos", href: "#vehiculos" },
  { name: "Ofertas", href: "#ofertas" },
  { name: "Nuevos", href: "#nuevos" },
  { name: "Contacto", href: "#contacto" },
]

const searchSuggestions = [
  "Honda CBR 650R",
  "Yamaha MT-07",
  "Kawasaki Ninja",
  "Ducati Monster",
  "Polaris Sportsman",
  "BMW R 1250 GS",
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [contact, setContact] = useState<{ phone: string; whatsapp: string } | null>(null)

  useEffect(() => {
    getPublicSiteConfig().then((res) => {
      if (res.config) {
        setContact({
          phone: res.config.phone,
          whatsapp: res.config.whatsapp,
        })
      }
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredSuggestions = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#inicio")
              }}
              className="text-2xl font-bold font-[family-name:var(--font-heading)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-[#E63946]">Moto</span>
              <span className="text-white">Rex</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white"
              >
                Ver catálogo
              </Button>
              <Button className="bg-[#E63946] hover:bg-[#E63946]/90 text-white pulse-glow">
                Cotizar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] glass"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                  <span className="text-[#E63946]">Moto</span>
                  <span className="text-white">Rex</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl text-white font-semibold font-[family-name:var(--font-heading)]"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-12 flex flex-col gap-4">
                <Button className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white text-lg py-6">
                  Cotizar
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 text-lg py-6"
                >
                  Ver catálogo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50" />
                <Input
                  type="text"
                  placeholder="Buscar motos, vehículos, marcas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1F1F1F] border-[#333] text-white text-xl py-6 pl-14 pr-4 rounded-xl focus:border-[#2563EB]"
                  autoFocus
                />
              </div>
              {searchQuery && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-[#1F1F1F] rounded-xl overflow-hidden border border-[#333]"
                >
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="w-full text-left px-6 py-4 text-white hover:bg-[#2563EB]/20 transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion)
                        setIsSearchOpen(false)
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Buttons (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden">
        <motion.a
          href={contact ? `tel:${contact.phone.replace(/\s/g, "")}` : "#"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg shadow-[#2563EB]/30"
        >
          <Phone className="h-6 w-6 text-white" />
        </motion.a>
        <motion.a
          href={contact ? `https://wa.me/${contact.whatsapp.replace(/\s/g, "")}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </motion.a>
      </div>
    </>
  )
}
