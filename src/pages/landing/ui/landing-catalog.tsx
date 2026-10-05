import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { cn } from 'cn'

import type { Product } from '@/entities/product'

import {
  landingCategories,
  type LandingCategory,
} from '../model/landing-content'
import { LandingProductTile } from './landing-product-card'

function filterByCategory(products: Product[], category: LandingCategory) {
  switch (category) {
    case 'populer':
      return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8)
    case 'edp':
      return products.filter((product) => product.concentration === 'EDP')
    case 'edt':
      return products.filter((product) => product.concentration === 'EDT')
    case 'parfum':
      return products.filter((product) => product.concentration === 'Parfum')
    case 'fresh':
      return products.filter((product) => product.brand.includes('Fresh'))
    case 'signature':
      return products.filter((product) => product.brand.includes('Signature'))
    case 'all':
      return products
    default:
      return products
  }
}

export function LandingCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<LandingCategory>('populer')
  const [page, setPage] = useState(0)

  const filtered = useMemo(
    () => filterByCategory(products, category),
    [products, category],
  )

  const pageSize = 8
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <section className="bg-[#f7f7f7] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-medium text-foreground sm:text-4xl">
          Belanja Produk Kami
        </h2>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-b border-black/5 pb-4">
          {landingCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                'text-sm font-medium transition-colors',
                category === item.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={() => {
                if (item.id === 'all') return
                setCategory(item.id)
                setPage(0)
              }}
            >
              {item.id === 'all' ? (
                <Link to="/shop" className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {visible.map((product) => (
            <LandingProductTile key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Halaman ${index + 1}`}
              className={cn(
                'size-2 rounded-full transition-colors',
                index === page ? 'bg-foreground' : 'bg-foreground/20',
              )}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
