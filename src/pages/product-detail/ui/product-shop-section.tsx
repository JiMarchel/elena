import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, StarIcon, StoreIcon } from 'lucide-react'

import type { Product } from '@/entities/product'
import { Badge, Button, Separator } from '@/shared/ui'

import type { ProductReview } from '../model/product-detail'

export function ProductShopSection({
  product,
  shopStats,
  picks,
  reviews,
  reviewTags,
}: {
  product: Product
  shopStats: {
    name: string
    rating: string
    productCount: number
    responseRate: string
    activeLabel: string
  }
  picks: Product[]
  reviews: ProductReview[]
  reviewTags: { label: string; count: number }[]
}) {
  return (
    <div className="flex flex-col divide-y divide-border rounded-xl bg-card ring-1 ring-foreground/10">
      <section className="flex flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <StoreIcon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-medium">{shopStats.name}</h2>
              <Badge variant="secondary">Official</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {shopStats.activeLabel}
            </p>
          </div>
          <Button variant="outline" size="sm">
            Kunjungi
          </Button>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border text-center text-xs sm:text-sm">
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-medium">{shopStats.rating}</span>
            <span className="text-muted-foreground">Penilaian</span>
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-medium">{shopStats.productCount}</span>
            <span className="text-muted-foreground">Produk</span>
          </div>
          <div className="flex flex-col gap-0.5 px-1">
            <span className="font-medium">{shopStats.responseRate}</span>
            <span className="text-muted-foreground">Chat dibalas</span>
          </div>
        </div>
      </section>

      {picks.length > 0 && (
        <section className="flex flex-col gap-2 p-3 sm:p-4">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium"
          >
            Pilihan toko
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </button>
          <div className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {picks.map((item) => (
                <Link
                  key={item.id}
                  to="/products/$productId"
                  params={{ productId: String(item.id) }}
                  className="flex w-28 shrink-0 flex-col gap-1 rounded-lg bg-muted/30 p-1.5"
                >
                  <img
                    src={item.img}
                    alt=""
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <span className="line-clamp-2 text-[11px] leading-tight">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3 p-3 sm:p-4">
        <button
          type="button"
          className="flex items-center justify-between gap-2 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <StarIcon className="size-4 fill-current text-accent" />
            {product.rating} · Penilaian produk ({product.reviews})
          </span>
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
        <div className="flex flex-wrap gap-2">
          {reviewTags.slice(0, 4).map((tag) => (
            <Badge key={tag.label} variant="outline" className="font-normal">
              {tag.label} ({tag.count})
            </Badge>
          ))}
        </div>
        <Separator />
        {reviews.map((review) => (
          <article key={review.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{review.author}</span>
              <span className="text-xs text-muted-foreground">
                Membantu ({review.helpful})
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Variasi: {review.variant}
            </p>
            <p className="text-sm leading-relaxed">{review.comment}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
