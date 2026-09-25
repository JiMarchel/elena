export type FragranceNotes = {
  top: string[]
  heart: string[]
  base: string[]
}

export type ProductConcentration = 'EDP' | 'EDT' | 'Parfum'

export type Product = {
  id: number
  title: string
  brand: string
  volumeMl: number
  concentration: ProductConcentration
  /** Ringkasan notes untuk kartu katalog. */
  notes: string
  fragranceNotes: FragranceNotes
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  img: string
  inStock: boolean
}

export function productDiscount(product: Product) {
  if (!product.originalPrice) return 0
  return Math.round((1 - product.price / product.originalPrice) * 100)
}
