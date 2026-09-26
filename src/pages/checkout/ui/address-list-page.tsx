import { useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Badge, Button } from '@/shared/ui'

import {
  checkoutFlowSearch,
  ensureSavedAddresses,
  getSelectedAddress,
  setSelectedAddress,
} from '../model/address'
import { writeFormDraft } from '../model/address-storage'
import type { SavedAddress } from '../model/address'

export function AddressListPage() {
  return (
    <RequireAuth
      title="Masuk untuk mengelola alamat"
      description="Alamat pengiriman hanya tersedia setelah Anda masuk ke akun Enela."
    >
      <AddressListPageContent />
    </RequireAuth>
  )
}

function AddressListPageContent() {
  const navigate = useNavigate()
  const flowSearch = useSearch({ from: '/_app/checkout/addresses/' })
  const checkoutSearch = checkoutFlowSearch(flowSearch)

  const [addresses] = useState<SavedAddress[]>(() => ensureSavedAddresses())
  const [selectedId, setSelectedId] = useState(() => getSelectedAddress().id)

  const handleSelect = (addressId: string) => {
    setSelectedId(addressId)
    setSelectedAddress(addressId)
    navigate({ to: '/checkout', search: checkoutSearch })
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-2xl flex-col bg-muted/30 lg:min-h-0 lg:gap-4 lg:bg-transparent lg:py-4">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-3 py-3 sm:px-4 lg:rounded-xl lg:border lg:ring-1 lg:ring-foreground/10">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={<Link to="/checkout" search={checkoutSearch} />}
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-base font-medium sm:text-lg">
          Pilih Alamat
        </h1>
      </header>

      <div className="bg-muted px-3 py-2 text-xs text-muted-foreground sm:px-4 lg:rounded-t-xl lg:bg-card lg:ring-1 lg:ring-foreground/10">
        Alamat
      </div>

      <div className="flex-1 bg-card lg:rounded-b-xl lg:ring-1 lg:ring-foreground/10">
        <ul className="divide-y">
          {addresses.map((address) => (
            <li key={address.id}>
              <AddressListItem
                address={address}
                selected={selectedId === address.id}
                onSelect={() => handleSelect(address.id)}
                editSearch={{
                  ...checkoutSearch,
                  addressId: address.id,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-3 sm:p-4 lg:static lg:border-0 lg:bg-transparent lg:p-0">
        <Button
          variant="outline"
          size="lg"
          className="w-full border-primary text-primary hover:bg-primary/5"
          onClick={() => writeFormDraft(null)}
          render={
            <Link to="/checkout/addresses/new" search={checkoutSearch} />
          }
        >
          <PlusIcon data-icon="inline-start" />
          Tambah Alamat Baru
        </Button>
      </div>
    </div>
  )
}

function AddressListItem({
  address,
  selected,
  onSelect,
  editSearch,
}: {
  address: SavedAddress
  selected: boolean
  onSelect: () => void
  editSearch: { productId?: string; quantity?: number; addressId: string }
}) {
  return (
    <div className="flex gap-3 px-3 py-4 sm:px-4">
      <button
        type="button"
        onClick={onSelect}
        className="mt-1 shrink-0"
        aria-label={`Pilih alamat ${address.name}`}
      >
        <span
          className={`flex size-5 items-center justify-center rounded-full border-2 ${
            selected
              ? 'border-primary'
              : 'border-muted-foreground/30'
          }`}
        >
          {selected && (
            <span className="size-2.5 rounded-full bg-primary" />
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 flex-1 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium">
            {address.name}{' '}
            <span className="font-normal text-muted-foreground">
              {address.phone}
            </span>
          </p>
          <Link
            to="/checkout/addresses/new"
            search={editSearch}
            className="shrink-0 text-sm text-muted-foreground hover:text-foreground"
            onClick={(event) => event.stopPropagation()}
          >
            Ubah
          </Link>
        </div>

        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {address.street}
          {address.detail ? `, ${address.detail}` : ''}
        </p>
        <p className="mt-1 text-xs text-muted-foreground uppercase">
          {address.regionSummary}
        </p>

        {address.isPrimary && (
          <Badge
            variant="outline"
            className="mt-2 border-primary text-primary"
          >
            Utama
          </Badge>
        )}
      </button>
    </div>
  )
}
