import { landingWhyUs } from '../model/landing-content'

export function LandingWhyUs() {
  return (
    <section className="bg-[#f7f7f7] py-14 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:gap-20">
        {landingWhyUs.map((block) => (
          <div
            key={block.id}
            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
              block.reverse ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              <img
                src={block.image}
                alt={block.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                {block.title}
              </h3>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {block.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
