import { Link } from '@tanstack/react-router'
import { StarIcon } from 'lucide-react'
import { cn } from 'cn'

import { formatIDR } from '@/shared/lib'
import { Badge } from '@/shared/ui'

import { productDiscount } from '../model/product'
import type { Product } from '../model/product'

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const discount = productDiscount(product)
  const detailTo = '/products/$productId' as const
  const params = { productId: String(product.id) }

  return (
    <Link
      to={detailTo}
      params={params}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        <img
          src={product.img}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {discount > 0 && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 shadow-sm"
          >
            -{discount}%
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-2.5">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">
          {product.title}
        </h3>
        <p className="truncate text-xs text-muted-foreground">
          {product.brand} · {product.volumeMl} ml
        </p>
        <div className="mt-auto flex flex-col gap-1 pt-1">
          <span className="text-base font-medium text-primary">
            {formatIDR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatIDR(product.originalPrice)}
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <StarIcon className="size-3 fill-current text-accent" />
            <span>{product.rating}</span>
            <span aria-hidden>·</span>
            <span>{formatSold(product.reviews)} terjual</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/** Dummy social proof dari jumlah ulasan — ganti dengan sold asli saat backend siap. */
function formatSold(reviews: number) {
  if (reviews >= 1000) {
    const rb = reviews / 1000
    return `${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB+`
  }
  return `${reviews}+`
}
