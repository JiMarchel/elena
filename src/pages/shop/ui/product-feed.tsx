import { ProductCard } from '@/entities/product'
import type { Product } from '@/entities/product'

export function ProductFeed({ products }: { products: Product[] }) {
  return (
    <section className="min-w-0 flex flex-col gap-3">
      <div className="flex min-w-0 items-end justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-base font-medium sm:text-lg">
            Rekomendasi untuk Anda
          </h2>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            {products.length} parfum siap dikirim dari Enela
          </p>
        </div>
      </div>

      {/* Mobile: grid 2 · Desktop: scroll horizontal dalam container */}
      <div className="min-w-0 md:overflow-x-auto md:overscroll-x-contain md:pb-1 md:[scrollbar-width:thin]">
        <div className="grid grid-cols-2 gap-2 md:flex md:w-max md:gap-3 md:snap-x md:snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 md:w-36 md:shrink-0 md:snap-start lg:w-40"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
