import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CircleHelpIcon,
} from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button, Input } from '@/shared/ui'

import { checkoutFlowSearch } from '../model/address'
import {
  buildCheckoutFromProduct,
  calcOrderSubtotal,
  getDemoCheckoutGroups,
} from '../model/checkout'
import {
  calcPlatformSelectionBenefits,
  findPlatformVoucherByCode,
  isPlatformVoucherUsable,
  partitionPlatformVouchers,
  resolvePlatformSelection,
  writePlatformVoucherSelection,
} from '../model/platform-voucher'
import type {
  PlatformVoucher,
  PlatformVoucherSelection,
} from '../model/platform-voucher'
import { PlatformVoucherCard } from './platform-voucher-card'

export function PlatformVoucherPage() {
  return (
    <RequireAuth
      title="Masuk untuk memilih voucher"
      description="Voucher checkout hanya tersedia setelah Anda masuk ke akun Enela."
    >
      <PlatformVoucherPageContent />
    </RequireAuth>
  )
}

function PlatformVoucherPageContent() {
  const navigate = useNavigate()
  const flowSearch = useSearch({ from: '/_app/checkout/vouchers' })
  const checkoutSearch = checkoutFlowSearch(flowSearch)

  const { productId, quantity } = flowSearch
  const groups = useMemo(
    () =>
      productId
        ? buildCheckoutFromProduct(productId, quantity ?? 1)
        : getDemoCheckoutGroups(),
    [productId, quantity],
  )
  const orderSubtotal = useMemo(() => calcOrderSubtotal(groups), [groups])

  const [selection, setSelection] = useState<PlatformVoucherSelection>(() =>
    resolvePlatformSelection(orderSubtotal),
  )

  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState<string | null>(null)
  const [showAllShipping, setShowAllShipping] = useState(false)
  const [showAllDiscount, setShowAllDiscount] = useState(false)

  const verified = true
  const { usable, inactive } = useMemo(
    () => partitionPlatformVouchers(orderSubtotal, verified),
    [orderSubtotal],
  )

  const shippingVouchers = useMemo(
    () => usable.filter((voucher) => voucher.kind === 'shipping'),
    [usable],
  )
  const discountVouchers = useMemo(
    () => usable.filter((voucher) => voucher.kind === 'discount'),
    [usable],
  )

  const visibleShipping = showAllShipping
    ? shippingVouchers
    : shippingVouchers.slice(0, 2)
  const visibleDiscount = showAllDiscount
    ? discountVouchers
    : discountVouchers.slice(0, 2)

  const benefits = useMemo(
    () => calcPlatformSelectionBenefits(selection, orderSubtotal, 8000, verified),
    [selection, orderSubtotal],
  )

  const handleApplyCode = () => {
    const voucher = findPlatformVoucherByCode(code)
    if (!voucher) {
      setCodeError('Kode voucher tidak ditemukan.')
      return
    }

    if (!isPlatformVoucherUsable(voucher, orderSubtotal, verified)) {
      setCodeError('Voucher belum memenuhi syarat penggunaan.')
      return
    }

    setSelection((prev) => ({
      ...prev,
      ...(voucher.kind === 'shipping'
        ? { shippingId: voucher.id }
        : { discountId: voucher.id }),
    }))
    setCode('')
    setCodeError(null)
  }

  const handleConfirm = () => {
    writePlatformVoucherSelection(selection)
    navigate({ to: '/checkout', search: checkoutSearch })
  }

  const toggleShipping = (id: string) => {
    setSelection((prev) => ({
      ...prev,
      shippingId: prev.shippingId === id ? null : id,
    }))
  }

  const toggleDiscount = (id: string) => {
    setSelection((prev) => ({
      ...prev,
      discountId: prev.discountId === id ? null : id,
    }))
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-2xl flex-col bg-muted/30 lg:min-h-0 lg:max-w-4xl lg:gap-4 lg:bg-transparent lg:py-4">
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
          Pilih Voucher Enela
        </h1>
        <Button variant="ghost" size="icon-sm" aria-label="Bantuan">
          <CircleHelpIcon />
        </Button>
      </header>

      <div className="border-b bg-background px-3 py-3 sm:px-4 lg:rounded-xl lg:border lg:ring-1 lg:ring-foreground/10">
        <div className="flex gap-2">
          <Input
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setCodeError(null)
            }}
            placeholder="Masukkan Kode Voucher"
            className="h-10 flex-1"
          />
          <Button
            variant="outline"
            className="shrink-0 px-5"
            disabled={!code.trim()}
            onClick={handleApplyCode}
          >
            Pakai
          </Button>
        </div>
        {codeError && (
          <p className="mt-1.5 text-xs text-destructive">{codeError}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pb-32 lg:pb-4">
        <VoucherSection
          title="Voucher Gratis Ongkir"
          vouchers={visibleShipping}
          selectedId={selection.shippingId}
          orderSubtotal={orderSubtotal}
          verified={verified}
          onSelect={toggleShipping}
          onDeselect={() =>
            setSelection((prev) => ({ ...prev, shippingId: null }))
          }
          showAll={showAllShipping}
          canShowAll={shippingVouchers.length > 2}
          onToggleShowAll={() => setShowAllShipping((prev) => !prev)}
        />

        <VoucherSection
          title="Diskon/Cashback"
          vouchers={visibleDiscount}
          selectedId={selection.discountId}
          orderSubtotal={orderSubtotal}
          verified={verified}
          onSelect={toggleDiscount}
          onDeselect={() =>
            setSelection((prev) => ({ ...prev, discountId: null }))
          }
          showAll={showAllDiscount}
          canShowAll={discountVouchers.length > 2}
          onToggleShowAll={() => setShowAllDiscount((prev) => !prev)}
        />

        {inactive.length > 0 && (
          <section className="mt-2 px-3 sm:px-4 lg:px-0">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">
              Voucher Tidak Berlaku
            </h2>
            <ul className="flex flex-col gap-3 opacity-70">
              {inactive.map((voucher) => (
                <PlatformVoucherCard
                  key={voucher.id}
                  voucher={voucher}
                  selected={false}
                  orderSubtotal={orderSubtotal}
                  verified={verified}
                  onSelect={() => {}}
                  onDeselect={() => {}}
                />
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur lg:static lg:rounded-xl lg:border lg:bg-card lg:ring-1 lg:ring-foreground/10 lg:backdrop-blur-none">
        <div className="mx-auto max-w-2xl px-4 py-3 lg:max-w-4xl">
          {benefits.selectedCount > 0 ? (
            <div className="mb-3 text-sm">
              <p className="font-medium">
                {benefits.selectedCount} Voucher Dipilih
              </p>
              <p className="text-xs text-muted-foreground">
                {benefits.summaryLabels.join(', ')}
              </p>
            </div>
          ) : (
            <p className="mb-3 text-sm text-muted-foreground">
              Belum ada voucher dipilih
            </p>
          )}
          <Button size="lg" className="w-full" onClick={handleConfirm}>
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}

function VoucherSection({
  title,
  vouchers,
  selectedId,
  orderSubtotal,
  verified,
  onSelect,
  onDeselect,
  showAll,
  canShowAll,
  onToggleShowAll,
}: {
  title: string
  vouchers: PlatformVoucher[]
  selectedId: string | null
  orderSubtotal: number
  verified: boolean
  onSelect: (id: string) => void
  onDeselect: () => void
  showAll: boolean
  canShowAll: boolean
  onToggleShowAll: () => void
}) {
  if (vouchers.length === 0) return null

  return (
    <section className="mt-2 px-3 sm:px-4 lg:px-0">
      <h2 className="mb-2 text-sm font-medium">{title}</h2>
      <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
        {vouchers.map((voucher) => (
          <PlatformVoucherCard
            key={voucher.id}
            voucher={voucher}
            selected={selectedId === voucher.id}
            orderSubtotal={orderSubtotal}
            verified={verified}
            onSelect={() => onSelect(voucher.id)}
            onDeselect={onDeselect}
          />
        ))}
      </ul>
      {canShowAll && (
        <button
          type="button"
          onClick={onToggleShowAll}
          className="mt-2 flex w-full items-center justify-center gap-1 py-2 text-sm text-primary"
        >
          {showAll ? 'Sembunyikan' : 'Tampilkan Semua'}
          <ChevronDownIcon
            className={`size-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </section>
  )
}
