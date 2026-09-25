import { ProductCard } from '@/entities/product'
import type { Product } from '@/entities/product'

export function ProductFeed({ products }: { products: Product[] }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-medium">Rekomendasi untuk Anda</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} parfum siap dikirim dari Enela
          </p>
        </div>
      </div>

      {/* Mobile: grid 2 · Desktop: horizontal scroll, kartu kecil */}
      <div className="grid grid-cols-2 gap-2 md:flex md:snap-x md:snap-mandatory md:gap-3 md:overflow-x-auto md:pb-2 md:[scrollbar-width:thin]">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-0 md:w-40 md:shrink-0 md:snap-start lg:w-44"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
