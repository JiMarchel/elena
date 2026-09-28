import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, MapPinIcon, SearchIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button, Input } from '@/shared/ui'

import {
  addressFlowSearch,
  validateLocationSearch,
} from '../model/address'
import type { LocationStep } from '../model/address'
import { readFormDraft, writeFormDraft } from '../model/address-storage'
import {
  formatRegionSummary,
  getCities,
  getDistricts,
  getProvinceNames,
  groupByFirstLetter,
} from '../model/regions'

export function AddressLocationPage() {
  return (
    <RequireAuth
      title="Masuk untuk memilih lokasi"
      description="Pilih lokasi pengiriman setelah Anda masuk ke akun Enela."
    >
      <AddressLocationPageContent />
    </RequireAuth>
  )
}

function AddressLocationPageContent() {
  const navigate = useNavigate()
  const rawSearch = useSearch({ from: '/_app/checkout/addresses/location' })
  const search = validateLocationSearch(rawSearch)
  const addressSearch = addressFlowSearch(search)
  const step: LocationStep = search.step ?? 'province'
  const [query, setQuery] = useState('')

  const title =
    step === 'province'
      ? 'Provinsi'
      : step === 'city'
        ? search.province ?? 'Kota'
        : search.city ?? 'Kecamatan'

  const items = useMemo(() => {
    if (step === 'province') {
      return getProvinceNames().filter((name) =>
        name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (step === 'city' && search.province) {
      return getCities(search.province)
        .map((city) => city.name)
        .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    }

    if (step === 'district' && search.province && search.city) {
      return getDistricts(search.province, search.city).filter((district) =>
        district.name.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return []
  }, [query, search.city, search.province, step])

  const groupedItems = useMemo(() => {
    if (step === 'district') {
      return groupByFirstLetter(
        items.map((item) => (typeof item === 'string' ? item : item.name)),
      )
    }

    return groupByFirstLetter(items as string[])
  }, [items, step])

  const backSearch = () => {
    if (step === 'district') {
      return {
        ...addressSearch,
        ...(search.addressId ? { addressId: search.addressId } : {}),
        step: 'city' as const,
        province: search.province,
      }
    }

    if (step === 'city') {
      return {
        ...addressSearch,
        ...(search.addressId ? { addressId: search.addressId } : {}),
        step: 'province' as const,
      }
    }

    return {
      ...addressSearch,
      ...(search.addressId ? { addressId: search.addressId } : {}),
    }
  }

  const backTo =
    step === 'province'
      ? '/checkout/addresses/new'
      : '/checkout/addresses/location'

  const handleProvinceSelect = (province: string) => {
    navigate({
      to: '/checkout/addresses/location',
      search: {
        ...addressSearch,
        ...(search.addressId ? { addressId: search.addressId } : {}),
        step: 'city',
        province,
      },
    })
  }

  const handleCitySelect = (city: string) => {
    if (!search.province) return
    navigate({
      to: '/checkout/addresses/location',
      search: {
        ...addressSearch,
        ...(search.addressId ? { addressId: search.addressId } : {}),
        step: 'district',
        province: search.province,
        city,
      },
    })
  }

  const handleDistrictSelect = (districtName: string, postalCode: string) => {
    if (!search.province || !search.city) return

    const draft = readFormDraft() ?? {}
    const regionLabel = formatRegionSummary(
      districtName,
      search.city,
      search.province,
      postalCode,
    )

    writeFormDraft({
      ...draft,
      province: search.province,
      city: search.city,
      district: districtName,
      postalCode,
      regionLabel,
    })

    navigate({
      to: '/checkout/addresses/new',
      search: {
        ...addressSearch,
        ...(search.addressId ? { addressId: search.addressId } : {}),
      },
    })
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-2xl flex-col bg-background lg:min-h-0 lg:gap-4 lg:py-4">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-3 py-3 sm:px-4 lg:rounded-xl lg:border lg:ring-1 lg:ring-foreground/10">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={
            <Link
              to={backTo}
              search={backSearch()}
            />
          }
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 truncate text-base font-medium sm:text-lg">
          {title}
        </h1>
      </header>

      <div className="px-3 pt-3 sm:px-4 lg:px-0">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari Kota, Kecamatan, atau Kode Pos"
            className="h-10 bg-muted/50 pl-9"
          />
        </div>
      </div>

      {step === 'province' && (
        <button
          type="button"
          className="mx-3 mt-3 flex items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium sm:mx-4 lg:mx-0"
        >
          <MapPinIcon className="size-4 text-primary" />
          Gunakan Lokasi Saat Ini
        </button>
      )}

      <div className="mt-3 flex-1 overflow-y-auto bg-card lg:rounded-xl lg:ring-1 lg:ring-foreground/10">
        <div className="bg-muted px-3 py-2 text-xs text-muted-foreground sm:px-4">
          {step === 'province'
            ? 'Provinsi'
            : step === 'city'
              ? 'Kota / Kabupaten'
              : 'Kecamatan / Kode Pos'}
        </div>

        {groupedItems.map(({ letter, values }) => (
          <div key={letter}>
            <div className="bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground sm:px-4">
              {letter}
            </div>
            <ul>
              {values.map((value) => {
                if (step === 'district' && search.province && search.city) {
                  const district = getDistricts(search.province, search.city).find(
                    (entry) => entry.name === value,
                  )
                  if (!district) return null

                  return (
                    <li key={district.name}>
                      <button
                        type="button"
                        onClick={() =>
                          handleDistrictSelect(district.name, district.postalCode)
                        }
                        className="flex w-full items-center justify-between border-b px-3 py-3 text-left text-sm uppercase sm:px-4"
                      >
                        <span>{district.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {district.postalCode}
                        </span>
                      </button>
                    </li>
                  )
                }

                return (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 'province') handleProvinceSelect(value)
                        else if (step === 'city') handleCitySelect(value)
                      }}
                      className="w-full border-b px-3 py-3 text-left text-sm uppercase sm:px-4"
                    >
                      {value}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
