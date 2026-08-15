import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { BestSellers } from "@/components/best-sellers"
import { NewArrivals } from "@/components/new-arrivals"
import { SpecialOffers } from "@/components/special-offers"
import { Categories } from "@/components/categories"
import { getCategories, getFeaturedProduct, getBestSellers, getNewArrivals, getOffers, getTestimonials, getStatistics, getSiteConfig } from "@/lib/queries"
import { Benefits } from "@/components/benefits"
import { Statistics } from "@/components/statistics"
import { Testimonials } from "@/components/testimonials"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default async function Home() {
  const [categories, featuredProduct, bestSellers, newArrivals, offers, testimonials, statistics, siteConfig] = await Promise.all([
    getCategories(),
    getFeaturedProduct(),
    getBestSellers(),
    getNewArrivals(),
    getOffers(),
    getTestimonials(),
    getStatistics(),
    getSiteConfig(),
  ])

  return (
    <main>
      <Navigation />
      <Hero product={featuredProduct} />
      <BestSellers products={bestSellers} whatsapp={siteConfig?.whatsapp ?? ""} />
      <NewArrivals products={newArrivals} whatsapp={siteConfig?.whatsapp ?? ""} />
      <SpecialOffers offers={offers} whatsapp={siteConfig?.whatsapp ?? ""} />
      <Categories categories={categories} />
      <Benefits />
      <Statistics statistics={statistics} />
      <Testimonials testimonials={testimonials} />
      <ContactForm />
      <Footer />
    </main>
  )
}
