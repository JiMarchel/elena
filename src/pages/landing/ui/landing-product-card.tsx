import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from 'lucide-react'

import type { Product } from '@/entities/product'
import { formatIDR } from '@/shared/lib'

export function LandingProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-[#f3f3f3]">
      <Link
        to="/products/$productId"
        params={{ productId: String(product.id) }}
        className="block overflow-hidden bg-[#ececec]"
      >
        <img
          src={product.img}
          alt={product.title}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-medium text-foreground">{product.title}</h3>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {formatIDR(product.price)}
          </p>
        </div>
        <Link
          to="/products/$productId"
          params={{ productId: String(product.id) }}
          className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          Tambah ke Keranjang
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </article>
  )
}

export function LandingProductTile({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: String(product.id) }}
      className="group flex flex-col gap-3"
    >
      <div className="overflow-hidden rounded-xl bg-[#ececec]">
        <img
          src={product.img}
          alt={product.title}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{product.title}</p>
        <p className="text-sm font-semibold text-foreground">
          {formatIDR(product.price)}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          ★ {product.rating} · {product.reviews}+ ulasan
        </p>
      </div>
    </Link>
  )
}
