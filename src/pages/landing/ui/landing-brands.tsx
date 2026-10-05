import { landingBrandLogos } from '../model/landing-content'

export function LandingBrands() {
  return (
    <section className="border-y border-black/5 bg-white py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 sm:gap-x-14 sm:px-6">
        {landingBrandLogos.map((brand) => (
          <span
            key={brand}
            className="text-sm font-semibold tracking-wide text-foreground/35 uppercase sm:text-base"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
