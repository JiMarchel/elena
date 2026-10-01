import { Button } from '@/shared/ui'

import { promoBanners } from '../model/shop-promo'

export function PromoBannerSection() {
  return (
    <section className="min-w-0 flex flex-col gap-2">
      <div className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-2 pr-1 sm:gap-3">
          {promoBanners.map((banner) => (
            <article
              key={banner.id}
              className="relative flex h-36 w-[min(85vw,22rem)] shrink-0 snap-start overflow-hidden rounded-xl bg-primary text-primary-foreground sm:h-40 sm:w-80"
            >
              <img
                src={banner.img}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-30"
                loading="lazy"
              />
              <div className="relative flex flex-1 flex-col justify-between p-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-semibold sm:text-lg">
                    {banner.title}
                  </h2>
                  <p className="line-clamp-2 text-xs text-primary-foreground/90 sm:text-sm">
                    {banner.subtitle}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-fit bg-background text-foreground hover:bg-background/90"
                >
                  {banner.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 md:hidden">
        {promoBanners.map((banner, index) => (
          <span
            key={banner.id}
            className={`size-1.5 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/30'}`}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}
