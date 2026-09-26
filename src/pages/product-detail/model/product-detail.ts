import { getProductById, getRelatedProducts, products } from '@/entities/product'
import type { Product } from '@/entities/product'

export type ProductVariant = {
  id: string
  label: string
  img: string
}

export type ReviewTag = {
  label: string
  count: number
}

export type ProductReview = {
  id: string
  author: string
  rating: number
  variant: string
  comment: string
  helpful: number
}

export function getProductVariants(product: Product): ProductVariant[] {
  const sameBrand = products
    .filter((entry) => entry.brand === product.brand)
    .slice(0, 4)
    .map((entry) => ({
      id: String(entry.id),
      label: `${entry.volumeMl} ml · ${entry.concentration}`,
      img: entry.img,
    }))

  if (sameBrand.length >= 2) return sameBrand

  return [
    {
      id: String(product.id),
      label: `${product.volumeMl} ml · ${product.concentration}`,
      img: product.img,
    },
  ]
}

export function getGalleryImages(product: Product) {
  const variants = getProductVariants(product)
  const images = variants.map((variant) => variant.img)
  return images.length > 0 ? images : [product.img]
}

export function getReviewTags(product: Product): ReviewTag[] {
  const base = Math.max(8, Math.floor(product.reviews / 20))
  return [
    { label: 'Wanginya tahan lama', count: base + 13 },
    { label: 'Kualitas premium', count: base + 9 },
    { label: 'Packaging cantik', count: base + 6 },
    { label: 'Harga sesuai', count: base + 4 },
    { label: product.notes.split(',')[0]?.trim() ?? 'Aroma enak', count: base },
  ]
}

export function getProductReviews(product: Product): ProductReview[] {
  return [
    {
      id: 'r1',
      author: 's***a',
      rating: 5,
      variant: `${product.volumeMl} ml · ${product.concentration}`,
      comment:
        'Wanginya elegan dan tidak menyengat. Projection bagus untuk pemakaian seharian di kantor.',
      helpful: 24,
    },
    {
      id: 'r2',
      author: 'm***n',
      rating: 5,
      variant: `${product.volumeMl} ml · ${product.concentration}`,
      comment:
        'Botolnya premium, notes sesuai deskripsi. Paling suka dry down-nya, lembut di kulit.',
      helpful: 11,
    },
  ]
}

export function getShopPicks(product: Product) {
  return getRelatedProducts(product.id, 6).filter(
    (entry) => entry.brand === product.brand,
  )
}

export function getShopStats(product: Product) {
  const brandProducts = products.filter((entry) => entry.brand === product.brand)
  const avgRating =
    brandProducts.reduce((sum, entry) => sum + entry.rating, 0) /
    Math.max(brandProducts.length, 1)

  return {
    name: product.brand,
    rating: avgRating.toFixed(1),
    productCount: brandProducts.length,
    responseRate: '100%',
    activeLabel: 'Aktif 5 menit lalu',
  }
}

export function formatSoldCount(reviews: number) {
  if (reviews >= 1000) {
    const rb = reviews / 1000
    return `${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB+`
  }
  return String(reviews)
}

export function getProductByVariantId(productId: number, variantId: string) {
  const variantProduct = getProductById(Number(variantId))
  return variantProduct ?? getProductById(productId)
}
