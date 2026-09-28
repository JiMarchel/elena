import { getProductById } from '@/entities/product'

export type ShippingAddress = {
  name: string
  phone: string
  line1: string
  line2: string
  note?: string
}

export type CheckoutItem = {
  id: string
  productId: number
  title: string
  img: string
  variant: string
  price: number
  originalPrice?: number
  quantity: number
}

export type CheckoutStoreGroup = {
  storeId: string
  storeName: string
  badge?: string
  voucherDiscount?: number
  items: CheckoutItem[]
}

export type ShippingOption = {
  id: string
  label: string
  estimate: string
  originalFee: number
  fee: number
  note?: string
}

export type InstallmentOption = {
  id: string
  label: string
  monthlyAmount: number
  months: number
  interestLabel?: string
  badges?: string[]
  recommended?: boolean
}

export type PaymentMethod = {
  id: string
  type: 'installment' | 'wallet' | 'bank'
  label: string
  balance?: number
  bankName?: string
  promoLabel?: string
  installments?: InstallmentOption[]
}

export type PaymentBreakdown = {
  orderSubtotal: number
  productProtection: number
  shippingSubtotal: number
  serviceFee: number
  productDiscount: number
  shippingDiscount: number
  voucherDiscount: number
  paymentDiscount: number
  total: number
  saved: number
}

export type CheckoutSnapshot = {
  address: ShippingAddress
  groups: CheckoutStoreGroup[]
  shippingOptions: ShippingOption[]
  paymentMethods: PaymentMethod[]
}

export type CheckoutSearch = {
  productId?: string
  quantity?: number
}

export function validateCheckoutSearch(
  search: Record<string, unknown>,
): CheckoutSearch {
  const productId =
    typeof search.productId === 'string' ? search.productId : undefined
  const rawQty = search.quantity
  const parsedQty =
    typeof rawQty === 'number'
      ? rawQty
      : typeof rawQty === 'string'
        ? Number(rawQty)
        : undefined

  const result: CheckoutSearch = {}
  if (productId) result.productId = productId
  if (parsedQty && parsedQty > 0) {
    result.quantity = Math.min(99, parsedQty)
  }
  return result
}

export function getDefaultAddress(): ShippingAddress {
  return {
    name: 'Saputra Budianto',
    phone: '0812-3456-7890',
    line1: 'Perum Surya Garden and Square A21, Babakan',
    line2: 'Ciparay, Kab. Bandung, Jawa Barat 40381',
    note: '(CV. All Media Indo)',
  }
}

export function getDemoCheckoutGroups(): CheckoutStoreGroup[] {
  const product = getProductById(1)
  if (!product) return []

  return [
    {
      storeId: 'enela-signature',
      storeName: 'Enela Signature Official',
      badge: 'Star+',
      voucherDiscount: 5000,
      items: [
        {
          id: 'checkout-1',
          productId: product.id,
          title: product.title,
          img: product.img,
          variant: `${product.volumeMl} ml · ${product.concentration}`,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
        },
      ],
    },
  ]
}

export function buildCheckoutFromProduct(
  productId: string,
  quantity = 1,
): CheckoutStoreGroup[] {
  const product = getProductById(Number(productId))
  if (!product) return getDemoCheckoutGroups()

  return [
    {
      storeId: product.brand.toLowerCase().replace(/\s+/g, '-'),
      storeName: `${product.brand} Official`,
      badge: 'Official',
      voucherDiscount: 5000,
      items: [
        {
          id: `checkout-${product.id}`,
          productId: product.id,
          title: product.title,
          img: product.img,
          variant: `${product.volumeMl} ml · ${product.concentration}`,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
        },
      ],
    },
  ]
}

export function getShippingOptions(): ShippingOption[] {
  return [
    {
      id: 'reguler',
      label: 'Reguler',
      estimate: '28 – 29 Sep',
      originalFee: 8000,
      fee: 0,
      note: 'Voucher s/d Rp10.000 jika pesanan terlambat',
    },
    {
      id: 'instant',
      label: 'Instant',
      estimate: 'Besok',
      originalFee: 15000,
      fee: 12000,
    },
  ]
}

export function getPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: 'enela-paylater',
      type: 'installment',
      label: 'EnelaPay Later',
      balance: 12_972_308,
      promoLabel: 'Diskon Terbaik',
      installments: [
        {
          id: '1x',
          label: 'Rp58.850 x 1 bln',
          monthlyAmount: 58_850,
          months: 1,
          badges: ['Diskon Extra 10%', 'Cicilan 0%'],
          recommended: true,
        },
        {
          id: '3x',
          label: 'Rp19.617 x 3 bln',
          monthlyAmount: 19_617,
          months: 3,
          interestLabel: '2.45% biaya cicilan/bulan',
        },
        {
          id: '6x',
          label: 'Rp11.252 x 6 bln',
          monthlyAmount: 11_252,
          months: 6,
          interestLabel: '2.45% biaya cicilan/bulan',
          badges: ['Diskon Extra 10%', 'Cicilan 0%'],
        },
        {
          id: '12x',
          label: 'Rp5.626 x 12 bln',
          monthlyAmount: 5_626,
          months: 12,
          interestLabel: '2.45% biaya cicilan/bulan',
        },
      ],
    },
    {
      id: 'enela-wallet',
      type: 'wallet',
      label: 'Saldo Enela Wallet',
      balance: 1783,
      promoLabel: 'Diskon Extra Rp1.000',
    },
    {
      id: 'bank',
      type: 'bank',
      label: 'Transfer Bank',
      bankName: 'SeaBank',
    },
  ]
}

export function countCheckoutItems(groups: CheckoutStoreGroup[]) {
  return groups.reduce(
    (sum, group) =>
      sum + group.items.reduce((inner, item) => inner + item.quantity, 0),
    0,
  )
}

export function calcOrderSubtotal(groups: CheckoutStoreGroup[]) {
  return groups.reduce(
    (sum, group) =>
      sum +
      group.items.reduce(
        (inner, item) => inner + item.price * item.quantity,
        0,
      ),
    0,
  )
}

export function calcOriginalSubtotal(groups: CheckoutStoreGroup[]) {
  return groups.reduce(
    (sum, group) =>
      sum +
      group.items.reduce(
        (inner, item) =>
          inner + (item.originalPrice ?? item.price) * item.quantity,
        0,
      ),
    0,
  )
}

export function calcPaymentBreakdown({
  groups,
  shippingFee,
  useProtection,
  useCoins,
  storeVoucherDiscount,
  platformShippingDiscount = 0,
  platformDiscountAmount = 0,
}: {
  groups: CheckoutStoreGroup[]
  shippingFee: number
  useProtection: boolean
  useCoins: boolean
  storeVoucherDiscount?: number
  platformShippingDiscount?: number
  platformDiscountAmount?: number
}): PaymentBreakdown {
  const orderSubtotal = calcOriginalSubtotal(groups)
  const productProtection = useProtection ? 10_000 : 0
  const shippingSubtotal = shippingFee
  const serviceFee = 2000
  const currentSubtotal = calcOrderSubtotal(groups)
  const productDiscount = Math.max(0, orderSubtotal - currentSubtotal)
  const shippingDiscount = platformShippingDiscount
  const resolvedStoreVoucherDiscount =
    storeVoucherDiscount ??
    groups.reduce((sum, group) => sum + (group.voucherDiscount ?? 0), 0)
  const coinDiscount = useCoins ? 30 : 0
  const voucherDiscount =
    resolvedStoreVoucherDiscount + platformDiscountAmount + coinDiscount
  const paymentDiscount = 2000

  const total = Math.max(
    0,
    currentSubtotal +
      productProtection +
      shippingSubtotal +
      serviceFee -
      shippingDiscount -
      voucherDiscount -
      paymentDiscount,
  )

  const saved =
    productDiscount +
    shippingDiscount +
    voucherDiscount +
    paymentDiscount +
    Math.max(0, orderSubtotal - currentSubtotal)

  return {
    orderSubtotal,
    productProtection,
    shippingSubtotal,
    serviceFee,
    productDiscount,
    shippingDiscount,
    voucherDiscount,
    paymentDiscount,
    total,
    saved,
  }
}
