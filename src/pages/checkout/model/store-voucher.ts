export type StoreVoucher = {
  id: string
  storeId: string
  title: string
  minSpend: number
  discountAmount: number
  discountPercent?: number
  maxDiscount?: number
  expiresLabel: string
  recommended?: boolean
  progress?: number
  shortfall?: number
  requiresClaim?: boolean
  promoCode?: string
}

export type SelectedStoreVoucher = {
  voucherId: string | null
  discount: number
}

const storeVoucherCatalog: StoreVoucher[] = [
  {
    id: 'sv-1',
    storeId: 'enela-signature',
    title: 'Diskon 10% s.d. Rp10RB',
    minSpend: 0,
    discountAmount: 10_000,
    discountPercent: 10,
    maxDiscount: 10_000,
    expiresLabel: 'sisa: 12 jam',
    recommended: true,
    progress: 100,
  },
  {
    id: 'sv-2',
    storeId: 'enela-signature',
    title: 'Diskon Rp10RB',
    minSpend: 199_000,
    discountAmount: 10_000,
    expiresLabel: 'sisa: 12 jam',
    progress: 35,
    shortfall: 88_208,
    requiresClaim: true,
  },
  {
    id: 'sv-3',
    storeId: 'enela-signature',
    title: 'Diskon Rp19RB',
    minSpend: 99_000,
    discountAmount: 19_000,
    expiresLabel: 'sisa: 12 jam',
    requiresClaim: true,
  },
  {
    id: 'sv-4',
    storeId: 'enela-signature',
    title: 'Diskon Rp10RB',
    minSpend: 199_000,
    discountAmount: 10_000,
    expiresLabel: 'sisa: 12 jam',
    requiresClaim: true,
  },
  {
    id: 'sv-5',
    storeId: 'enela-signature',
    title: 'Diskon Rp10RB',
    minSpend: 199_000,
    discountAmount: 10_000,
    expiresLabel: 'Hingga 01.11.2026',
    requiresClaim: true,
  },
  {
    id: 'sv-6',
    storeId: 'enela-signature',
    title: 'Diskon Rp10RB',
    minSpend: 199_000,
    discountAmount: 10_000,
    expiresLabel: 'Hingga 01.11.2026',
    requiresClaim: true,
    promoCode: 'ENELA10',
  },
]

const defaultCatalog: StoreVoucher[] = [
  {
    id: 'sv-default-1',
    storeId: 'default',
    title: 'Diskon 5% s.d. Rp5RB',
    minSpend: 0,
    discountAmount: 5000,
    discountPercent: 5,
    maxDiscount: 5000,
    expiresLabel: 'sisa: 1 hari',
    recommended: true,
    progress: 100,
  },
  {
    id: 'sv-default-2',
    storeId: 'default',
    title: 'Diskon Rp15RB',
    minSpend: 150_000,
    discountAmount: 15_000,
    expiresLabel: 'sisa: 3 hari',
    progress: 60,
    shortfall: 60_000,
    requiresClaim: true,
  },
]

export function formatStoreMinSpend(value: number) {
  if (value === 0) return 'Min. Blj Rp0'
  if (value >= 1000) {
    const rb = value / 1000
    return `Min. Blj Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB`
  }
  return `Min. Blj Rp${value.toLocaleString('id-ID')}`
}

export function getStoreVouchers(storeId: string) {
  const specific = storeVoucherCatalog.filter(
    (voucher) => voucher.storeId === storeId,
  )
  if (specific.length > 0) return specific

  return defaultCatalog.map((voucher) => ({
    ...voucher,
    storeId,
    id: `${voucher.id}-${storeId}`,
  }))
}

export function calcStoreVoucherDiscount(
  voucher: StoreVoucher,
  subtotal: number,
) {
  if (subtotal < voucher.minSpend) return 0

  if (voucher.discountPercent && voucher.maxDiscount) {
    return Math.min(
      Math.floor((subtotal * voucher.discountPercent) / 100),
      voucher.maxDiscount,
    )
  }

  return voucher.discountAmount
}

export function isStoreVoucherUsable(
  voucher: StoreVoucher,
  subtotal: number,
  claimedIds: Set<string>,
) {
  if (voucher.requiresClaim && !claimedIds.has(voucher.id)) return false
  return subtotal >= voucher.minSpend
}

export function getRecommendedStoreVoucher(
  storeId: string,
  subtotal: number,
) {
  const vouchers = getStoreVouchers(storeId)
  const recommended = vouchers.find((voucher) => voucher.recommended)
  if (!recommended) return null

  const discount = calcStoreVoucherDiscount(recommended, subtotal)
  if (discount <= 0) return null

  return {
    voucherId: recommended.id,
    discount,
  }
}

export function findStoreVoucherByCode(storeId: string, code: string) {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return null

  return (
    getStoreVouchers(storeId).find(
      (voucher) => voucher.promoCode?.toUpperCase() === normalized,
    ) ?? null
  )
}

export function formatStoreVoucherSaving(amount: number) {
  if (amount >= 1000) {
    const rb = amount / 1000
    return `-Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB`
  }
  return `-Rp${amount.toLocaleString('id-ID')}`
}
