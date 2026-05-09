import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { BestSellers } from "@/components/best-sellers"
import { NewArrivals } from "@/components/new-arrivals"
import { SpecialOffers } from "@/components/special-offers"
import { Categories } from "@/components/categories"
import { Benefits } from "@/components/benefits"
import { Statistics } from "@/components/statistics"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <BestSellers />
      <NewArrivals />
      <SpecialOffers />
      <Categories />
      <Benefits />
      <Statistics />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  )
}
