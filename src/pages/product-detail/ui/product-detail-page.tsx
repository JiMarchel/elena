import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from 'lucide-react'

import {
  ProductCard,
  getRelatedProducts,
  productDiscount,
} from '@/entities/product'
import type { Product } from '@/entities/product'
import { formatIDR } from '@/shared/lib'
import { Badge, Button, Separator } from '@/shared/ui'

import { FragrancePyramid } from './fragrance-pyramid'

const MAX_QTY = 10

export function ProductDetailPage({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const discount = productDiscount(product)
  const related = getRelatedProducts(product.id)
  const total = product.price * qty

  const decrease = () => setQty((value) => Math.max(1, value - 1))
  const increase = () => setQty((value) => Math.min(MAX_QTY, value + 1))

  return (
    <div className="flex flex-col gap-8 p-4 pb-28 lg:pb-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          render={<Link to="/" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Kembali
        </Button>
        <span aria-hidden>/</span>
        <Link to="/" className="hover:text-foreground">
          Dashboard
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-2xl bg-muted/40">
          <img
            src={product.img}
            alt={product.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.concentration}</Badge>
              {product.inStock ? (
                <Badge variant="outline">
                  <CheckIcon />
                  Tersedia
                </Badge>
              ) : (
                <Badge variant="destructive">Stok habis</Badge>
              )}
            </div>

            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            <p className="text-muted-foreground">
              {product.volumeMl} ml · {product.notes}
            </p>

            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <StarIcon />
                {product.rating}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {product.reviews} ulasan pelanggan
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <span className="text-3xl font-medium">{formatIDR(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatIDR(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <Badge variant="secondary">Hemat {discount}%</Badge>
                )}
              </>
            )}
          </div>

          <p className="max-w-prose leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <Separator />

          <FragrancePyramid notes={product.fragranceNotes} />

          <Separator />

          <div className="hidden flex-col gap-4 lg:flex">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium">Jumlah</span>
              <div className="flex items-center gap-1 rounded-lg border p-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={decrease}
                  disabled={qty <= 1}
                  aria-label="Kurangi jumlah"
                >
                  <MinusIcon />
                </Button>
                <span className="w-8 text-center text-sm font-medium tabular-nums">
                  {qty}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={increase}
                  disabled={qty >= MAX_QTY || !product.inStock}
                  aria-label="Tambah jumlah"
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" disabled={!product.inStock}>
                <ShoppingCartIcon data-icon="inline-start" />
                {product.inStock
                  ? `Tambah ke keranjang · ${formatIDR(total)}`
                  : 'Stok habis'}
              </Button>
              <p className="text-xs text-muted-foreground">
                Detail produk terbuka untuk semua pengunjung — tanpa login.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="hidden flex-col gap-4 lg:flex">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-medium">Anda mungkin juga suka</h2>
            <p className="text-sm text-muted-foreground">
              Rekomendasi dari koleksi Enela yang serupa
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky buy bar — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border p-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={decrease}
              disabled={qty <= 1}
              aria-label="Kurangi jumlah"
            >
              <MinusIcon />
            </Button>
            <span className="w-7 text-center text-sm font-medium tabular-nums">
              {qty}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={increase}
              disabled={qty >= MAX_QTY || !product.inStock}
              aria-label="Tambah jumlah"
            >
              <PlusIcon />
            </Button>
          </div>
          <Button className="min-w-0 flex-1" disabled={!product.inStock}>
            <ShoppingCartIcon data-icon="inline-start" />
            <span className="truncate">
              {product.inStock ? formatIDR(total) : 'Habis'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
