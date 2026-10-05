import { Link } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'

import { cn } from 'cn'

import type { Product } from '@/entities/product'
import { productDiscount } from '@/entities/product'

import { LandingProductCard } from './landing-product-card'

type FeaturedTab = 'deals' | 'popular'

export function LandingFeaturedProducts({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<FeaturedTab>('deals')
  const [page, setPage] = useState(0)

  const featured = useMemo(() => {
    if (tab === 'deals') {
      return [...products]
        .filter((product) => product.originalPrice)
        .sort(
          (a, b) => productDiscount(b) - productDiscount(a),
        )
    }
    return [...products].sort((a, b) => b.reviews - a.reviews)
  }, [products, tab])

  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(featured.length / pageSize))
  const visible = featured.slice(page * pageSize, page * pageSize + pageSize)

  const goPrev = () => setPage((current) => Math.max(0, current - 1))
  const goNext = () =>
    setPage((current) => Math.min(totalPages - 1, current + 1))

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
            Produk Unggulan Kami
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Produk sebelumnya"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors hover:bg-black/5 disabled:opacity-40"
              disabled={page === 0}
              onClick={goPrev}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Produk berikutnya"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 text-foreground transition-colors hover:bg-black/5 disabled:opacity-40"
              disabled={page >= totalPages - 1}
              onClick={goNext}
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton
            active={tab === 'deals'}
            onClick={() => {
              setTab('deals')
              setPage(0)
            }}
          >
            Penawaran Terbaik
          </TabButton>
          <TabButton
            active={tab === 'popular'}
            onClick={() => {
              setTab('popular')
              setPage(0)
            }}
          >
            Paling Populer
          </TabButton>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <LandingProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/shop"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Lihat semua produk di toko
          </Link>
        </div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'bg-[#f3f3f3] text-foreground/70 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
