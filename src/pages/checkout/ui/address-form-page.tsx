import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button, Input, Switch } from '@/shared/ui'

import {
  addressFlowSearch,
  buildRegionLabel,
  draftToSavedAddress,
  getAddressById,
  getAddressListTarget,
  isAddressFormValid,
  isSettingsAddressFlow,
  savedAddressToDraft,
  setSelectedAddress,
  upsertAddress,
} from '../model/address'
import type { AddressFormDraft, AddressTag } from '../model/address'
import { readFormDraft, writeFormDraft } from '../model/address-storage'

const emptyDraft: AddressFormDraft = {
  isPrimary: false,
  isShop: false,
  isReturn: false,
  tag: 'home',
}

export function AddressFormPage() {
  return (
    <RequireAuth
      title="Masuk untuk menambah alamat"
      description="Kelola alamat pengiriman setelah Anda masuk ke akun Enela."
    >
      <AddressFormPageContent />
    </RequireAuth>
  )
}

function AddressFormPageContent() {
  const navigate = useNavigate()
  const { addressId, ...flowSearch } = useSearch({
    from: '/_app/checkout/addresses/new',
  })
  const addressSearch = addressFlowSearch(flowSearch)
  const fromSettings = isSettingsAddressFlow(flowSearch)
  const addressListTarget = getAddressListTarget(flowSearch)
  const isEditing = Boolean(addressId)

  const initialDraft = useMemo(() => {
    if (addressId) {
      const existing = getAddressById(addressId)
      const storedDraft = readFormDraft()
      if (existing) {
        return storedDraft
          ? { ...savedAddressToDraft(existing), ...storedDraft }
          : savedAddressToDraft(existing)
      }
    }

    const storedDraft = readFormDraft()
    if (storedDraft) return { ...emptyDraft, ...storedDraft }

    return emptyDraft
  }, [addressId])

  const [draft, setDraft] = useState<AddressFormDraft>(initialDraft)

  const regionLabel = buildRegionLabel(draft)
  const canSave = isAddressFormValid(draft)

  const updateDraft = (patch: Partial<AddressFormDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
  }

  const openLocationPicker = () => {
    writeFormDraft(draft)
    navigate({
      to: '/checkout/addresses/location',
      search: {
        ...addressSearch,
        ...(addressId ? { addressId } : {}),
      },
    })
  }

  const handleSave = () => {
    const saved = draftToSavedAddress(draft, addressId)
    if (!saved) return

    upsertAddress(saved)
    setSelectedAddress(saved.id)
    writeFormDraft(null)

    if (fromSettings) {
      navigate(addressListTarget)
      return
    }

    navigate({ to: '/checkout', search: addressSearch })
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-2xl flex-col bg-muted/30 pb-24 lg:min-h-0 lg:gap-4 lg:bg-transparent lg:py-4 lg:pb-4">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-3 py-3 sm:px-4 lg:rounded-xl lg:border lg:ring-1 lg:ring-foreground/10">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={
            <Link
              to={addressListTarget.to}
              search={addressListTarget.search}
            />
          }
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-base font-medium sm:text-lg">
          {isEditing ? 'Ubah Alamat' : 'Alamat Baru'}
        </h1>
      </header>

      <div className="px-3 pt-3 sm:px-4 lg:px-0">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari alamatmu di sini"
            className="h-10 bg-card pl-9"
          />
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 px-0 lg:px-0">
        <section className="bg-card ring-1 ring-foreground/10 lg:rounded-xl">
          <div className="border-b px-3 py-2 text-xs text-muted-foreground sm:px-4">
            Alamat
          </div>

          <button
            type="button"
            onClick={openLocationPicker}
            className="flex w-full items-center justify-between gap-3 border-b px-3 py-3 text-left sm:px-4"
          >
            <span
              className={`text-sm ${
                regionLabel ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {regionLabel || 'Provinsi, Kota, Kecamatan, Kode Pos'}
            </span>
            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
          </button>

          <div className="border-b px-3 py-2 sm:px-4">
            <Input
              value={draft.street ?? ''}
              onChange={(event) => updateDraft({ street: event.target.value })}
              placeholder="Nama Jalan, Gedung, No. Rumah"
              className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="px-3 py-2 sm:px-4">
            <Input
              value={draft.detail ?? ''}
              onChange={(event) => updateDraft({ detail: event.target.value })}
              placeholder="Detail Lainnya (Cth: Blok / Unit No., Patokan)"
              className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </section>

        <section className="bg-card ring-1 ring-foreground/10 lg:rounded-xl">
          <div className="border-b px-3 py-2 text-xs text-muted-foreground sm:px-4">
            Informasi Penerima
          </div>

          <div className="border-b px-3 py-2 sm:px-4">
            <Input
              value={draft.name ?? ''}
              onChange={(event) => updateDraft({ name: event.target.value })}
              placeholder="Nama Lengkap"
              className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="px-3 py-2 sm:px-4">
            <Input
              value={draft.phone ?? ''}
              onChange={(event) => updateDraft({ phone: event.target.value })}
              placeholder="Nomor Telepon"
              type="tel"
              className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
        </section>

        <section className="divide-y bg-card ring-1 ring-foreground/10 lg:rounded-xl">
          <ToggleRow
            label="Atur sebagai Alamat Utama"
            checked={draft.isPrimary ?? false}
            onCheckedChange={(checked) => updateDraft({ isPrimary: checked })}
          />
          <ToggleRow
            label="Atur sebagai Alamat Toko"
            checked={draft.isShop ?? false}
            onCheckedChange={(checked) => updateDraft({ isShop: checked })}
          />
          <ToggleRow
            label="Atur sebagai Alamat Pengembalian"
            checked={draft.isReturn ?? false}
            onCheckedChange={(checked) => updateDraft({ isReturn: checked })}
          />
        </section>

        <section className="flex items-center justify-between bg-card px-3 py-3 ring-1 ring-foreground/10 sm:px-4 lg:rounded-xl">
          <span className="text-sm text-muted-foreground">Tandai Sebagai:</span>
          <div className="flex rounded-full bg-muted p-0.5">
            {(['office', 'home'] as AddressTag[]).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => updateDraft({ tag })}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  draft.tag === tag
                    ? 'bg-background font-medium shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {tag === 'office' ? 'Kantor' : 'Rumah'}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background p-3 sm:p-4 lg:static lg:mt-auto lg:border-0 lg:bg-transparent lg:p-0">
        <Button
          size="lg"
          className="w-full"
          disabled={!canSave}
          onClick={handleSave}
        >
          Simpan
        </Button>
      </div>
    </div>
  )
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
