import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  StarIcon,
  TicketIcon,
  TruckIcon,
} from 'lucide-react'

import {
  ProductCard,
  getRelatedProducts,
  productDiscount,
} from '@/entities/product'
import type { Product } from '@/entities/product'
import { formatIDR } from '@/shared/lib'
import { Badge, Button, Separator } from '@/shared/ui'

import {
  formatSoldCount,
  getGalleryImages,
  getProductReviews,
  getProductVariants,
  getReviewTags,
  getShopPicks,
  getShopStats,
} from '../model/product-detail'
import { FragrancePyramid } from './fragrance-pyramid'
import { ProductBuyBar } from './product-buy-bar'
import { ProductGallery } from './product-gallery'
import { ProductShopSection } from './product-shop-section'
import { ProductVariantSheet } from './product-variant-sheet'

const MAX_QTY = 10

export function ProductDetailPage({ product }: { product: Product }) {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  const discount = productDiscount(product)
  const related = getRelatedProducts(product.id)
  const variants = getProductVariants(product)
  const images = getGalleryImages(product)
  const shopStats = getShopStats(product)
  const shopPicks = getShopPicks(product)
  const reviewTags = getReviewTags(product)
  const reviews = getProductReviews(product)
  const total = product.price * qty

  const decrease = () => setQty((value) => Math.max(1, value - 1))
  const increase = () => setQty((value) => Math.min(MAX_QTY, value + 1))

  const handleVariantChange = (variantId: string) => {
    if (variantId !== String(product.id)) {
      navigate({
        to: '/products/$productId',
        params: { productId: variantId },
      })
    }
  }

  const handleVariantConfirm = (variantId: string, quantity: number) => {
    setQty(quantity)
    navigate({
      to: '/checkout',
      search: { productId: variantId, quantity },
    })
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 overflow-x-hidden pb-24 lg:gap-6 lg:pb-6">
      <nav className="hidden flex-wrap items-center gap-2 px-4 pt-4 text-sm text-muted-foreground lg:flex">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2"
          render={<Link to="/" />}
        >
          Kembali
        </Button>
        <span aria-hidden>/</span>
        <Link to="/" className="hover:text-foreground">
          Dashboard
        </Link>
        <span aria-hidden>/</span>
        <span className="truncate text-foreground">{product.title}</span>
      </nav>

      <div className="grid min-w-0 gap-3 lg:grid-cols-2 lg:gap-8 lg:px-4">
        <ProductGallery
          images={images}
          variants={variants}
          activeVariantId={String(product.id)}
          onVariantChange={handleVariantChange}
        />

        <div className="flex min-w-0 flex-col gap-3 lg:gap-4">
          {/* Promo strip */}
          {discount > 0 && (
            <div className="bg-primary px-3 py-1.5 text-center text-xs font-medium text-primary-foreground lg:rounded-lg">
              Harga spesial member · hemat {discount}%
            </div>
          )}

          {/* Price block */}
          <section className="flex flex-col gap-2 bg-card px-3 py-3 ring-1 ring-foreground/10 lg:rounded-xl lg:px-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-end gap-2">
                <span className="text-2xl font-semibold text-primary sm:text-3xl">
                  {formatIDR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
                <Badge variant="outline" className="gap-1 font-normal">
                  <TicketIcon className="size-3" />
                  Dengan voucher
                </Badge>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatSoldCount(product.reviews)} terjual
                </span>
                <Button variant="ghost" size="icon-sm" aria-label="Simpan">
                  <HeartIcon />
                </Button>
              </div>
            </div>
            {product.originalPrice && discount > 0 && (
              <button
                type="button"
                className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-left text-xs text-secondary-foreground sm:text-sm"
              >
                <span>
                  Belanja {formatIDR(product.originalPrice)}, diskon {discount}%
                </span>
                <ChevronRightIcon className="size-4 shrink-0" />
              </button>
            )}
          </section>

          {/* Title */}
          <section className="bg-card px-3 py-3 ring-1 ring-foreground/10 lg:rounded-xl lg:px-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Official</Badge>
                <Badge variant="outline">{product.concentration}</Badge>
                {!product.inStock && (
                  <Badge variant="destructive">Stok habis</Badge>
                )}
              </div>
              <h1 className="text-base leading-snug font-medium sm:text-lg">
                {product.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {product.volumeMl} ml · {product.notes}
              </p>
            </div>
          </section>

          {/* Shipping & layanan */}
          <section className="divide-y divide-border bg-card ring-1 ring-foreground/10 lg:rounded-xl">
            <button
              type="button"
              className="flex w-full items-center gap-3 px-3 py-3 text-left sm:px-4"
            >
              <TruckIcon className="size-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Estimasi tiba 2–3 hari</p>
                <p className="text-xs text-muted-foreground">
                  Gratis ongkir untuk pesanan di atas Rp300.000
                </p>
              </div>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-3 py-3 text-left sm:px-4"
            >
              <ShieldCheckIcon className="size-4 shrink-0 text-primary" />
              <p className="min-w-0 flex-1 text-sm">
                Bebas pengembalian · COD · Proteksi pembelian
              </p>
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </section>

          {/* Rating preview — mobile visible, desktop duplicate in shop section below */}
          <section className="bg-card px-3 py-3 ring-1 ring-foreground/10 lg:hidden lg:rounded-xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <StarIcon className="size-4 fill-current text-accent" />
                {product.rating} · Penilaian produk ({product.reviews})
              </span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </button>
            <div className="mt-2 flex flex-wrap gap-2">
              {reviewTags.slice(0, 3).map((tag) => (
                <Badge key={tag.label} variant="outline" className="font-normal">
                  {tag.label} ({tag.count})
                </Badge>
              ))}
            </div>
          </section>

          {/* Qty — desktop */}
          <section className="hidden flex-col gap-3 bg-card px-4 py-4 ring-1 ring-foreground/10 lg:flex lg:rounded-xl">
            <div className="flex items-center gap-4">
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
            <ProductBuyBar
              total={total}
              inStock={product.inStock}
              layout="desktop"
              onBuyClick={() => setSheetOpen(true)}
            />
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-0 lg:gap-4 lg:px-4">
        <ProductShopSection
          product={product}
          shopStats={shopStats}
          picks={shopPicks}
          reviews={reviews}
          reviewTags={reviewTags}
        />

        <section className="bg-card ring-1 ring-foreground/10 lg:rounded-xl">
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-3 sm:px-4"
          >
            <span className="text-sm font-medium">Deskripsi</span>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </button>
          <Separator />
          <div className="flex flex-col gap-4 px-3 py-4 sm:px-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <FragrancePyramid notes={product.fragranceNotes} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="flex flex-col gap-3 px-1 lg:px-0">
            <div className="flex flex-col gap-0.5 px-2 lg:px-0">
              <h2 className="text-base font-medium sm:text-lg">
                Kamu mungkin juga suka
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Rekomendasi parfum serupa dari Enela
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ProductBuyBar
        total={total}
        inStock={product.inStock}
        layout="mobile"
        onBuyClick={() => setSheetOpen(true)}
      />

      <ProductVariantSheet
        product={product}
        variants={variants}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onConfirm={handleVariantConfirm}
      />
    </div>
  )
}
