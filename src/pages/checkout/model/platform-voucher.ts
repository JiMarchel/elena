import { CrownIcon, PercentIcon, TruckIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { validateCheckoutFlowSearch } from './address'
import type { CheckoutFlowSearch } from './address'

export type PlatformVoucherKind = 'shipping' | 'discount'

export type PlatformVoucher = {
  id: string
  kind: PlatformVoucherKind
  icon: LucideIcon
  categoryLabel: string
  title: string
  minSpend: number
  maxDiscount: number
  discountPercent?: number
  expiresLabel: string
  recommended?: boolean
  isLimited?: boolean
  progress?: number
  verifiedOnly?: boolean
  badges?: string[]
  promoCode?: string
}

export type PlatformVoucherSelection = {
  shippingId: string | null
  discountId: string | null
}

export type PlatformSelectionBenefits = {
  shippingDiscount: number
  discountAmount: number
  hasShippingVoucher: boolean
  selectedCount: number
  summaryLabels: string[]
}

const STORAGE_KEY = 'enela-checkout-platform-vouchers'

export const platformVouchers: PlatformVoucher[] = [
  {
    id: 'pv-ship-1',
    kind: 'shipping',
    icon: TruckIcon,
    categoryLabel: 'SEMUA KATEGORI',
    title: 'Gratis Ongkir',
    minSpend: 0,
    maxDiscount: 20_000,
    expiresLabel: 'sisa: 14 jam',
    recommended: true,
    badges: ['EnelaVIP'],
  },
  {
    id: 'pv-ship-2',
    kind: 'shipping',
    icon: TruckIcon,
    categoryLabel: 'SEMUA KATEGORI',
    title: 'Gratis Ongkir s.d. Rp10RB',
    minSpend: 50_000,
    maxDiscount: 10_000,
    expiresLabel: 'sisa: 2 hari',
    badges: ['EnelaVIP'],
  },
  {
    id: 'pv-ship-3',
    kind: 'shipping',
    icon: TruckIcon,
    categoryLabel: 'PARFUM',
    title: 'Gratis Ongkir s.d. Rp15RB',
    minSpend: 100_000,
    maxDiscount: 15_000,
    expiresLabel: 'Hingga 30.09.2026',
    isLimited: true,
    progress: 42,
    badges: ['EnelaVIP', 'Pengguna Terverifikasi'],
    verifiedOnly: true,
  },
  {
    id: 'pv-disc-1',
    kind: 'discount',
    icon: PercentIcon,
    categoryLabel: 'SEMUA KATEGORI',
    title: 'Diskon 20% s.d. Rp4RB',
    minSpend: 0,
    maxDiscount: 4000,
    discountPercent: 20,
    expiresLabel: 'sisa: 14 jam',
    recommended: true,
    badges: ['EnelaVIP'],
  },
  {
    id: 'pv-disc-2',
    kind: 'discount',
    icon: PercentIcon,
    categoryLabel: 'SEMUA KATEGORI',
    title: 'Diskon 15% s.d. Rp12RB',
    minSpend: 0,
    maxDiscount: 12_213,
    discountPercent: 15,
    expiresLabel: 'sisa: 1 hari',
    badges: ['EnelaVIP', 'Pengguna Terverifikasi'],
    verifiedOnly: true,
    isLimited: true,
    progress: 18,
    promoCode: 'ENELAVIP15',
  },
  {
    id: 'pv-disc-3',
    kind: 'discount',
    icon: PercentIcon,
    categoryLabel: 'MEMBER BARU',
    title: 'Diskon 10% s.d. Rp8RB',
    minSpend: 50_000,
    maxDiscount: 8000,
    discountPercent: 10,
    expiresLabel: 'Berlaku dalam: 3 hari',
    badges: ['Member Baru'],
  },
  {
    id: 'pv-disc-4',
    kind: 'discount',
    icon: CrownIcon,
    categoryLabel: 'VIP MEMBER',
    title: 'Diskon Rp25RB',
    minSpend: 250_000,
    maxDiscount: 25_000,
    expiresLabel: 'sisa: 5 hari',
    badges: ['EnelaVIP'],
  },
]

export function validatePlatformVoucherSearch(
  search: Record<string, unknown>,
): CheckoutFlowSearch {
  return validateCheckoutFlowSearch(search)
}

export function getPlatformVouchersByKind(kind: PlatformVoucherKind) {
  return platformVouchers.filter((voucher) => voucher.kind === kind)
}

export function getPlatformVoucherById(id: string | null) {
  if (!id) return null
  return platformVouchers.find((voucher) => voucher.id === id) ?? null
}

export function formatPlatformMinSpend(value: number) {
  if (value === 0) return 'Min. Blj Rp0'
  if (value >= 1000) {
    const rb = value / 1000
    return `Min. Blj Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB`
  }
  return `Min. Blj Rp${value.toLocaleString('id-ID')}`
}

export function formatPlatformSaving(amount: number) {
  if (amount >= 1000) {
    const rb = amount / 1000
    return `-Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB`
  }
  return `-Rp${amount.toLocaleString('id-ID')}`
}

export function isPlatformVoucherUsable(
  voucher: PlatformVoucher,
  orderSubtotal: number,
  verified = true,
) {
  if (voucher.verifiedOnly && !verified) return false
  return orderSubtotal >= voucher.minSpend
}

export function calcPlatformDiscount(
  voucher: PlatformVoucher,
  orderSubtotal: number,
) {
  if (orderSubtotal < voucher.minSpend) return 0

  if (voucher.discountPercent) {
    return Math.min(
      Math.floor((orderSubtotal * voucher.discountPercent) / 100),
      voucher.maxDiscount,
    )
  }

  return voucher.maxDiscount
}

export function calcPlatformShippingDiscount(
  voucher: PlatformVoucher,
  orderSubtotal: number,
  shippingFee: number,
) {
  if (orderSubtotal < voucher.minSpend) return 0
  if (shippingFee <= 0) return 0
  return Math.min(shippingFee, voucher.maxDiscount)
}

export function readPlatformVoucherSelection(): PlatformVoucherSelection | null {
  if (typeof sessionStorage === 'undefined') return null

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PlatformVoucherSelection
    return {
      shippingId: parsed.shippingId ?? null,
      discountId: parsed.discountId ?? null,
    }
  } catch {
    return null
  }
}

export function writePlatformVoucherSelection(
  selection: PlatformVoucherSelection,
) {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
}

export function getDefaultPlatformSelection(
  orderSubtotal: number,
): PlatformVoucherSelection {
  const shipping =
    getPlatformVouchersByKind('shipping').find(
      (voucher) =>
        voucher.recommended &&
        isPlatformVoucherUsable(voucher, orderSubtotal),
    ) ?? null

  const discount =
    getPlatformVouchersByKind('discount').find(
      (voucher) =>
        voucher.recommended &&
        isPlatformVoucherUsable(voucher, orderSubtotal),
    ) ?? null

  return {
    shippingId: shipping?.id ?? null,
    discountId: discount?.id ?? null,
  }
}

export function resolvePlatformSelection(
  orderSubtotal: number,
): PlatformVoucherSelection {
  const stored = readPlatformVoucherSelection()
  if (stored) return stored
  const defaults = getDefaultPlatformSelection(orderSubtotal)
  writePlatformVoucherSelection(defaults)
  return defaults
}

export function findPlatformVoucherByCode(code: string) {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return null

  return (
    platformVouchers.find(
      (voucher) => voucher.promoCode?.toUpperCase() === normalized,
    ) ?? null
  )
}

export function calcPlatformSelectionBenefits(
  selection: PlatformVoucherSelection,
  orderSubtotal: number,
  shippingFee: number,
  verified = true,
): PlatformSelectionBenefits {
  const summaryLabels: string[] = []
  let shippingDiscount = 0
  let discountAmount = 0

  const shippingVoucher = getPlatformVoucherById(selection.shippingId)
  const shippingSelected =
    shippingVoucher &&
    isPlatformVoucherUsable(shippingVoucher, orderSubtotal, verified)

  if (shippingSelected) {
    shippingDiscount = calcPlatformShippingDiscount(
      shippingVoucher,
      orderSubtotal,
      shippingFee,
    )
    summaryLabels.push('Voucher Gratis Ongkir')
  }

  const discountVoucher = getPlatformVoucherById(selection.discountId)
  const discountSelected =
    discountVoucher &&
    isPlatformVoucherUsable(discountVoucher, orderSubtotal, verified)

  if (discountSelected) {
    discountAmount = calcPlatformDiscount(discountVoucher, orderSubtotal)
    if (discountAmount > 0) {
      summaryLabels.push(`diskon ${formatPlatformSaving(discountAmount)}`)
    }
  }

  return {
    shippingDiscount,
    discountAmount,
    hasShippingVoucher: Boolean(shippingSelected),
    selectedCount:
      (shippingSelected ? 1 : 0) + (discountSelected && discountAmount > 0 ? 1 : 0),
    summaryLabels,
  }
}

export function partitionPlatformVouchers(
  orderSubtotal: number,
  verified = true,
) {
  const usable: PlatformVoucher[] = []
  const inactive: PlatformVoucher[] = []

  for (const voucher of platformVouchers) {
    if (isPlatformVoucherUsable(voucher, orderSubtotal, verified)) {
      usable.push(voucher)
    } else {
      inactive.push(voucher)
    }
  }

  return { usable, inactive }
}
