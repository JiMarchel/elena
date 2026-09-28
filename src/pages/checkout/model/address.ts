import { formatRegionSummary } from './regions'
import {
  readSavedAddresses,
  readSelectedAddressId,
  writeSavedAddresses,
  writeSelectedAddressId,
} from './address-storage'
import type { ShippingAddress } from './checkout'

export type AddressTag = 'home' | 'office'

export type SavedAddress = {
  id: string
  name: string
  phone: string
  street: string
  detail?: string
  district: string
  city: string
  province: string
  postalCode: string
  regionSummary: string
  isPrimary: boolean
  isShop?: boolean
  isReturn?: boolean
  tag?: AddressTag
  note?: string
}

export type AddressFormDraft = {
  regionLabel?: string
  province?: string
  city?: string
  district?: string
  postalCode?: string
  street?: string
  detail?: string
  name?: string
  phone?: string
  isPrimary?: boolean
  isShop?: boolean
  isReturn?: boolean
  tag?: AddressTag
  note?: string
}

export type CheckoutFlowSearch = {
  productId?: string
  quantity?: number
}

export type AddressFlowOrigin = 'checkout' | 'settings'

export type AddressFlowSearch = CheckoutFlowSearch & {
  from?: AddressFlowOrigin
}

export type AddressListSearch = AddressFlowSearch

export type AddressFormSearch = AddressFlowSearch & {
  addressId?: string
}

export type LocationStep = 'province' | 'city' | 'district'

export type LocationSearch = AddressFlowSearch & {
  step?: LocationStep
  province?: string
  city?: string
  addressId?: string
}

function parseAddressFlowOrigin(
  search: Record<string, unknown>,
): AddressFlowOrigin | undefined {
  return search.from === 'settings' ? 'settings' : undefined
}

function withAddressFlowOrigin(
  search: Record<string, unknown>,
  flow: CheckoutFlowSearch,
): AddressFlowSearch {
  const from = parseAddressFlowOrigin(search)
  return {
    ...flow,
    ...(from ? { from } : {}),
  }
}

export function validateCheckoutFlowSearch(
  search: Record<string, unknown>,
): CheckoutFlowSearch {
  const productId =
    typeof search.productId === 'string' ? search.productId : undefined
  const rawQty = search.quantity
  const parsedQty =
    typeof rawQty === 'number'
      ? rawQty
      : typeof rawQty === 'string'
        ? Number(rawQty)
        : undefined

  const result: CheckoutFlowSearch = {}
  if (productId) result.productId = productId
  if (parsedQty && parsedQty > 0) {
    result.quantity = Math.min(99, parsedQty)
  }
  return result
}

export function validateAddressListSearch(
  search: Record<string, unknown>,
): AddressListSearch {
  return withAddressFlowOrigin(search, validateCheckoutFlowSearch(search))
}

export function validateAddressFormSearch(
  search: Record<string, unknown>,
): AddressFormSearch {
  const flow = withAddressFlowOrigin(search, validateCheckoutFlowSearch(search))
  const addressId =
    typeof search.addressId === 'string' ? search.addressId : undefined

  return {
    ...flow,
    ...(addressId ? { addressId } : {}),
  }
}

const locationSteps: LocationStep[] = ['province', 'city', 'district']

export function validateLocationSearch(
  search: Record<string, unknown>,
): LocationSearch {
  const flow = withAddressFlowOrigin(search, validateCheckoutFlowSearch(search))
  const step = search.step
  const province =
    typeof search.province === 'string' ? search.province : undefined
  const city = typeof search.city === 'string' ? search.city : undefined
  const addressId =
    typeof search.addressId === 'string' ? search.addressId : undefined

  return {
    ...flow,
    ...(typeof step === 'string' && locationSteps.includes(step as LocationStep)
      ? { step: step as LocationStep }
      : {}),
    ...(province ? { province } : {}),
    ...(city ? { city } : {}),
    ...(addressId ? { addressId } : {}),
  }
}

function getDemoAddresses(): SavedAddress[] {
  return [
    {
      id: 'addr-1',
      name: 'TONI',
      phone: '(+62) 881-0364-80285',
      street:
        'Perum Grand SidoAgung Blok D.17 NO 10 (Patokan: depan masjid AT. TAUBAH)',
      district: 'Candi',
      city: 'Kab. Sidoarjo',
      province: 'Jawa Timur',
      postalCode: '61271',
      regionSummary: 'CANDI, KAB. SIDOARJO, JAWA TIMUR, ID 61271',
      isPrimary: true,
    },
    {
      id: 'addr-2',
      name: 'TONI',
      phone: '(+62) 882-1715-7072',
      street:
        'Perum Grand SidoAgung Blok D.9 NO 7 (Patokan: depan masjid AT. TAUBAH)',
      district: 'Candi',
      city: 'Kab. Sidoarjo',
      province: 'Jawa Timur',
      postalCode: '61271',
      regionSummary: 'CANDI, KAB. SIDOARJO, JAWA TIMUR, ID 61271',
      isPrimary: false,
    },
    {
      id: 'addr-3',
      name: 'Saputra Budianto',
      phone: '0812-3456-7890',
      street: 'Perum Surya Garden and Square A21, Babakan',
      district: 'Ciparay',
      city: 'Kab. Bandung',
      province: 'Jawa Barat',
      postalCode: '40381',
      regionSummary: 'CIPARAY, KAB. BANDUNG, JAWA BARAT, ID 40381',
      isPrimary: false,
      note: '(CV. All Media Indo)',
      tag: 'office',
    },
  ]
}

export function ensureSavedAddresses(): SavedAddress[] {
  const stored = readSavedAddresses()
  if (stored && stored.length > 0) return stored

  const demo = getDemoAddresses()
  writeSavedAddresses(demo)
  return demo
}

export function getSavedAddresses(): SavedAddress[] {
  return ensureSavedAddresses()
}

export function getAddressById(addressId: string) {
  return getSavedAddresses().find((address) => address.id === addressId)
}

export function getSelectedAddress(): SavedAddress {
  const addresses = getSavedAddresses()
  const selectedId = readSelectedAddressId()
  const selected = addresses.find((address) => address.id === selectedId)
  if (selected) return selected

  const primary = addresses.find((address) => address.isPrimary)
  return primary ?? addresses[0]
}

export function setSelectedAddress(addressId: string) {
  writeSelectedAddressId(addressId)
}

export function toShippingAddress(address: SavedAddress): ShippingAddress {
  const lines = [
    address.street,
    address.detail,
    `${address.district}, ${address.city}, ${address.province} ${address.postalCode}`,
  ].filter(Boolean)

  return {
    name: address.name,
    phone: address.phone,
    line1: lines[0] ?? address.street,
    line2: lines.slice(1).join(', '),
    note: address.note,
  }
}

export function buildRegionLabel(draft: AddressFormDraft) {
  if (draft.regionLabel) return draft.regionLabel
  if (draft.province && draft.city && draft.district && draft.postalCode) {
    return `${draft.district}, ${draft.city}, ${draft.province}, ${draft.postalCode}`
  }
  return ''
}

export function isAddressFormValid(draft: AddressFormDraft) {
  return Boolean(
    draft.province &&
      draft.city &&
      draft.district &&
      draft.postalCode &&
      draft.street?.trim() &&
      draft.name?.trim() &&
      draft.phone?.trim(),
  )
}

export function draftToSavedAddress(
  draft: AddressFormDraft,
  addressId?: string,
): SavedAddress | null {
  if (
    !draft.province ||
    !draft.city ||
    !draft.district ||
    !draft.postalCode ||
    !draft.street?.trim() ||
    !draft.name?.trim() ||
    !draft.phone?.trim()
  ) {
    return null
  }

  return {
    id: addressId ?? `addr-${Date.now()}`,
    name: draft.name.trim(),
    phone: draft.phone.trim(),
    street: draft.street.trim(),
    detail: draft.detail?.trim(),
    district: draft.district,
    city: draft.city,
    province: draft.province,
    postalCode: draft.postalCode,
    regionSummary: formatRegionSummary(
      draft.district,
      draft.city,
      draft.province,
      draft.postalCode,
    ),
    isPrimary: draft.isPrimary ?? false,
    isShop: draft.isShop,
    isReturn: draft.isReturn,
    tag: draft.tag,
    note: draft.note?.trim(),
  }
}

export function savedAddressToDraft(address: SavedAddress): AddressFormDraft {
  return {
    regionLabel: `${address.district}, ${address.city}, ${address.province}, ${address.postalCode}`,
    province: address.province,
    city: address.city,
    district: address.district,
    postalCode: address.postalCode,
    street: address.street,
    detail: address.detail,
    name: address.name,
    phone: address.phone,
    isPrimary: address.isPrimary,
    isShop: address.isShop,
    isReturn: address.isReturn,
    tag: address.tag,
    note: address.note,
  }
}

export function upsertAddress(address: SavedAddress) {
  const addresses = getSavedAddresses()
  const index = addresses.findIndex((entry) => entry.id === address.id)
  let next = [...addresses]

  if (address.isPrimary) {
    next = next.map((entry) => ({ ...entry, isPrimary: false }))
  }

  if (index >= 0) next[index] = address
  else next.push(address)

  if (!next.some((entry) => entry.isPrimary) && next.length > 0) {
    next[0] = { ...next[0], isPrimary: true }
  }

  writeSavedAddresses(next)
  return next
}

export function checkoutFlowSearch(search: CheckoutFlowSearch) {
  return {
    ...(search.productId ? { productId: search.productId } : {}),
    ...(search.quantity ? { quantity: search.quantity } : {}),
  }
}

export function addressFlowSearch(search: AddressFlowSearch): AddressFlowSearch {
  return {
    ...checkoutFlowSearch(search),
    ...(search.from === 'settings' ? { from: 'settings' as const } : {}),
  }
}

export function isSettingsAddressFlow(search: AddressFlowSearch) {
  return search.from === 'settings'
}

export function getAddressBackTarget(search: AddressFlowSearch) {
  return isSettingsAddressFlow(search) ? '/settings' : '/checkout'
}

export function getAddressListTarget(search: AddressFlowSearch) {
  return {
    to: '/checkout/addresses' as const,
    search: addressFlowSearch(search),
  }
}
