import type { AddressFormDraft, SavedAddress } from './address'

const ADDRESSES_KEY = 'enela.addresses'
const SELECTED_ADDRESS_KEY = 'enela.selectedAddressId'
const FORM_DRAFT_KEY = 'enela.address.formDraft'

function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function readFormDraft(): AddressFormDraft | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(FORM_DRAFT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AddressFormDraft
  } catch {
    return null
  }
}

export function writeFormDraft(draft: AddressFormDraft | null) {
  if (typeof window === 'undefined') return
  if (!draft) {
    sessionStorage.removeItem(FORM_DRAFT_KEY)
    return
  }
  sessionStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft))
}

export function readSavedAddresses(): SavedAddress[] | null {
  return readJson<SavedAddress[]>(ADDRESSES_KEY)
}

export function writeSavedAddresses(addresses: SavedAddress[]) {
  writeJson(ADDRESSES_KEY, addresses)
}

export function readSelectedAddressId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SELECTED_ADDRESS_KEY)
}

export function writeSelectedAddressId(addressId: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(SELECTED_ADDRESS_KEY, addressId)
}
