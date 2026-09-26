import { getProductById, products } from '@/entities/product'

export type CartItem = {
  id: string
  productId: number
  title: string
  brand: string
  img: string
  price: number
  originalPrice?: number
  variant: string
  quantity: number
  promo?: string
  stockLeft?: number
}

export type CartStoreGroup = {
  storeId: string
  storeName: string
  badge?: string
  voucherLabel: string
  items: CartItem[]
}

function toCartItem(
  productId: number,
  quantity: number,
  extras?: Partial<Pick<CartItem, 'promo' | 'stockLeft'>>,
): CartItem | null {
  const product = getProductById(productId)
  if (!product) return null
  return {
    id: `cart-${product.id}`,
    productId: product.id,
    title: product.title,
    brand: product.brand,
    img: product.img,
    price: product.price,
    originalPrice: product.originalPrice,
    variant: `${product.volumeMl} ml · ${product.concentration}`,
    quantity,
    promo: extras?.promo,
    stockLeft: extras?.stockLeft,
  }
}

/** Dummy keranjang — ganti dengan state/API saat backend siap. */
export function getDemoCartGroups(): CartStoreGroup[] {
  const items = [
    toCartItem(1, 1, { promo: 'Gratis Ongkir Xtra' }),
    toCartItem(4, 2, { promo: 'Promo Xtra', stockLeft: 7 }),
    toCartItem(2, 1, { promo: 'Cashback 3%' }),
    toCartItem(6, 1),
    toCartItem(3, 3, { promo: 'Gratis Ongkir Xtra' }),
    toCartItem(5, 1, { stockLeft: 4 }),
  ].filter((item): item is CartItem => item !== null)

  const byBrand = new Map<string, CartItem[]>()
  for (const item of items) {
    const list = byBrand.get(item.brand) ?? []
    list.push(item)
    byBrand.set(item.brand, list)
  }

  const badges: Record<string, string | undefined> = {
    'Enela Signature': 'Official',
    'Maison Enela': 'Mall',
    'Enela Fresh': undefined,
    'Enela Sport': undefined,
  }

  return [...byBrand.entries()].map(([brand, brandItems]) => ({
    storeId: brand.toLowerCase().replace(/\s+/g, '-'),
    storeName: brand,
    badge: badges[brand],
    voucherLabel:
      brandItems.length > 1
        ? 'Tersedia Voucher Toko s/d 5%'
        : 'Tambahkan kode Voucher Toko',
    items: brandItems,
  }))
}

export function countCartItems(groups: CartStoreGroup[]) {
  return groups.reduce(
    (sum, group) =>
      sum + group.items.reduce((inner, item) => inner + item.quantity, 0),
    0,
  )
}

export function flatCartItems(groups: CartStoreGroup[]) {
  return groups.flatMap((group) => group.items)
}

/** Fallback kalau demo kosong — pastikan masih ada produk di katalog. */
export function ensureDemoCart(groups: CartStoreGroup[]) {
  if (groups.length > 0) return groups
  const first = products[0]
  return [
    {
      storeId: 'enela',
      storeName: first.brand,
      voucherLabel: 'Tambahkan kode Voucher Toko',
      items: [
        {
          id: `cart-${first.id}`,
          productId: first.id,
          title: first.title,
          brand: first.brand,
          img: first.img,
          price: first.price,
          originalPrice: first.originalPrice,
          variant: `${first.volumeMl} ml · ${first.concentration}`,
          quantity: 1,
        },
      ],
    },
  ]
}
