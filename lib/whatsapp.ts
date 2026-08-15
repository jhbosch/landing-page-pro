export function buildWhatsAppLink(whatsapp: string, message: string): string {
  const number = whatsapp.replace(/\s/g, "")
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}