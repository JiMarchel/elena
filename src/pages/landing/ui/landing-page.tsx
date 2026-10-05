import { products } from '@/entities/product'

import { LandingBrands } from './landing-brands'
import { LandingCatalog } from './landing-catalog'
import { LandingFeaturedProducts } from './landing-featured-products'
import { LandingFeatures } from './landing-features'
import { LandingFooter } from './landing-footer'
import { LandingHeader } from './landing-header'
import { LandingHero } from './landing-hero'
import { LandingNewsletter } from './landing-newsletter'
import { LandingWhyUs } from './landing-why-us'

const heroShowcase = [
  products.find((product) => product.id === 4),
  products.find((product) => product.id === 1),
  products.find((product) => product.id === 2),
].filter((product): product is NonNullable<typeof product> => Boolean(product))

export function LandingPage() {
  return (
    <div className="landing-page min-h-svh bg-white text-foreground">
      <LandingHeader />
      <main>
        <LandingHero showcase={heroShowcase} />
        <LandingBrands />
        <LandingFeatures />
        <LandingWhyUs />
        <LandingFeaturedProducts products={products} />
        <LandingCatalog products={products} />
        <LandingNewsletter />
      </main>
      <LandingFooter />
    </div>
  )
}
