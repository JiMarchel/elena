import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from 'cn'

import type { Product } from '@/entities/product'

const heroSlides = [
  {
    eyebrow: 'Tingkatkan Aroma Anda Dengan',
    title: ['KEMEWAHAN', '& AROMA'],
    cta: 'JELAJAHI KOLEKSI',
  },
  {
    eyebrow: 'Parfum Original Terkurasi',
    title: ['WANGI', 'SIGNATURE'],
    cta: 'BELANJA SEKARANG',
  },
  {
    eyebrow: 'Affiliate Program Enela',
    title: ['TUMBUH', 'BERSAMA'],
    cta: 'LIHAT PENGHASILAN',
  },
] as const

export function LandingHero({ showcase }: { showcase: Product[] }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = heroSlides[activeSlide]

  return (
    <section className="relative overflow-hidden bg-[#f7f7f7]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:py-20">
        <div className="flex flex-col gap-5 lg:gap-6">
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            {slide.eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>
          <Link
            to={activeSlide === 2 ? '/earnings' : '/shop'}
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-[0.15em] text-foreground uppercase"
          >
            {slide.cta}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-xl items-end justify-center gap-3 sm:gap-4 lg:max-w-none lg:justify-end">
          {showcase.map((product, index) => (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: String(product.id) }}
              className={cn(
                'overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1',
                index === 1 && 'z-10 -mb-2 scale-105 sm:-mb-4',
                index === 0 && 'hidden sm:block sm:w-[34%]',
                index === 1 && 'w-[52%] sm:w-[38%]',
                index === 2 && 'hidden md:block md:w-[30%]',
              )}
            >
              <img
                src={product.img}
                alt={product.title}
                className="aspect-[3/4] w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center gap-2 pb-8">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Slide ${index + 1}`}
            className={cn(
              'size-2 rounded-full transition-colors',
              index === activeSlide ? 'bg-foreground' : 'bg-foreground/20',
            )}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
