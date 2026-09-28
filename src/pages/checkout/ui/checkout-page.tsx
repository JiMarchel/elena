import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'

import {
  buildCheckoutFromProduct,
  calcOrderSubtotal,
  calcPaymentBreakdown,
  countCheckoutItems,
  getDemoCheckoutGroups,
  getPaymentMethods,
  getShippingOptions,
} from '../model/checkout'
import {
  calcPlatformSelectionBenefits,
  resolvePlatformSelection,
} from '../model/platform-voucher'
import { getSelectedAddress, toShippingAddress } from '../model/address'
import {
  getRecommendedStoreVoucher,
} from '../model/store-voucher'
import type { SelectedStoreVoucher } from '../model/store-voucher'
import { placeCheckoutOrder } from '../model/place-order'
import { CheckoutAddress } from './checkout-address'
import { CheckoutConfirmSheet } from './checkout-confirm-sheet'
import { CheckoutFooterBar } from './checkout-footer-bar'
import { CheckoutPaymentDetails, CheckoutTerms } from './checkout-payment-details'
import { CheckoutPaymentMethods } from './checkout-payment-methods'
import {
  CheckoutRewardsRow,
  CheckoutStoreSection,
} from './checkout-store-section'

export function CheckoutPage() {
  return (
    <RequireAuth
      title="Masuk untuk checkout"
      description="Konfirmasi pesanan hanya tersedia setelah Anda masuk ke akun Enela."
    >
      <CheckoutPageContent />
    </RequireAuth>
  )
}

function CheckoutPageContent() {
  const navigate = useNavigate()
  const { productId, quantity } = useSearch({ from: '/_app/checkout/' })

  const [selectedShippingId, setSelectedShippingId] = useState('reguler')
  const [selectedMethodId, setSelectedMethodId] = useState('enela-paylater')
  const [selectedInstallmentId, setSelectedInstallmentId] = useState('1x')
  const [useProtection, setUseProtection] = useState(true)
  const [useCoins, setUseCoins] = useState(false)
  const [dropshipper, setDropshipper] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = toShippingAddress(getSelectedAddress())
  const flowSearch = { productId, quantity }
  const groups = useMemo(
    () =>
      productId
        ? buildCheckoutFromProduct(productId, quantity ?? 1)
        : getDemoCheckoutGroups(),
    [productId, quantity],
  )

  const [storeVouchers, setStoreVouchers] = useState<
    Record<string, SelectedStoreVoucher>
  >(() => {
    const initial: Record<string, SelectedStoreVoucher> = {}
    for (const group of groups) {
      const subtotal = group.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      )
      const recommended = getRecommendedStoreVoucher(group.storeId, subtotal)
      initial[group.storeId] = recommended ?? { voucherId: null, discount: 0 }
    }
    return initial
  })

  const [claimedVouchers, setClaimedVouchers] = useState<
    Record<string, Set<string>>
  >({})

  const [storeMessages, setStoreMessages] = useState<Record<string, string>>({})

  const getClaimedIds = useCallback(
    (storeId: string) => claimedVouchers[storeId] ?? new Set<string>(),
    [claimedVouchers],
  )

  const handleVoucherClaim = useCallback((storeId: string, voucherId: string) => {
    setClaimedVouchers((prev) => {
      const current = prev[storeId] ?? new Set<string>()
      const next = new Set(current)
      next.add(voucherId)
      return { ...prev, [storeId]: next }
    })
  }, [])

  const totalStoreVoucherDiscount = useMemo(
    () =>
      Object.values(storeVouchers).reduce(
        (sum, entry) => sum + entry.discount,
        0,
      ),
    [storeVouchers],
  )
  const shippingOptions = getShippingOptions()
  const paymentMethods = getPaymentMethods()

  const selectedShipping =
    shippingOptions.find((option) => option.id === selectedShippingId) ??
    shippingOptions[0]

  const itemCount = countCheckoutItems(groups)
  const orderSubtotal = useMemo(() => calcOrderSubtotal(groups), [groups])

  const platformSelection = useMemo(
    () => resolvePlatformSelection(orderSubtotal),
    [orderSubtotal],
  )

  const platformBenefits = useMemo(
    () =>
      calcPlatformSelectionBenefits(
        platformSelection,
        orderSubtotal,
        selectedShipping.fee,
      ),
    [platformSelection, orderSubtotal, selectedShipping.fee],
  )

  const breakdown = calcPaymentBreakdown({
    groups,
    shippingFee: selectedShipping.fee,
    useProtection,
    useCoins,
    storeVoucherDiscount: totalStoreVoucherDiscount,
    platformShippingDiscount: platformBenefits.shippingDiscount,
    platformDiscountAmount: platformBenefits.discountAmount,
  })

  const selectedMethod =
    paymentMethods.find((method) => method.id === selectedMethodId) ??
    paymentMethods[0]

  const handlePlaceOrder = () => {
    setConfirmOpen(true)
  }

  const handleConfirmOrder = async () => {
    setIsPlacingOrder(true)

    try {
      const result = await placeCheckoutOrder({
        total: breakdown.total,
        itemCount,
      })

      setConfirmOpen(false)
      navigate({
        to: '/checkout/result',
        search: {
          status: result.success ? 'success' : 'failed',
          ...(result.success
            ? { orderNo: result.orderNo, total: breakdown.total }
            : { message: result.message }),
          ...(productId ? { productId } : {}),
          ...(quantity ? { quantity } : {}),
        },
      })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 overflow-x-hidden bg-muted/30 p-0 pb-28 lg:gap-4 lg:bg-transparent lg:p-4 lg:pb-4">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/95 px-3 py-3 backdrop-blur sm:px-4 lg:static lg:rounded-xl lg:border lg:bg-card lg:ring-1 lg:ring-foreground/10 lg:backdrop-blur-none">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={
            productId ? (
              <Link
                to="/products/$productId"
                params={{ productId }}
              />
            ) : (
              <Link to="/cart" />
            )
          }
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-base font-medium sm:text-lg">
          Checkout
        </h1>
      </header>

      <div className="flex flex-col gap-3 px-0 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-4 lg:px-0">
        <div className="flex flex-col gap-3">
          <CheckoutAddress address={address} flowSearch={flowSearch} />

          {groups.map((group) => {
            const groupSubtotal = group.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            )

            return (
              <CheckoutStoreSection
                key={group.storeId}
                group={group}
                shippingOptions={shippingOptions}
                selectedShippingId={selectedShippingId}
                onShippingChange={setSelectedShippingId}
                useProtection={useProtection}
                onProtectionChange={setUseProtection}
                storeTotal={groupSubtotal + (useProtection ? 10_000 : 0)}
                selectedVoucher={
                  storeVouchers[group.storeId] ?? {
                    voucherId: null,
                    discount: 0,
                  }
                }
                claimedVoucherIds={getClaimedIds(group.storeId)}
                onVoucherChange={(selection) =>
                  setStoreVouchers((prev) => ({
                    ...prev,
                    [group.storeId]: selection,
                  }))
                }
                onVoucherClaim={(voucherId) =>
                  handleVoucherClaim(group.storeId, voucherId)
                }
                storeMessage={storeMessages[group.storeId] ?? ''}
                onStoreMessageChange={(message) =>
                  setStoreMessages((prev) => ({
                    ...prev,
                    [group.storeId]: message,
                  }))
                }
              />
            )
          })}

          <CheckoutRewardsRow
            flowSearch={flowSearch}
            platformDiscount={platformBenefits.discountAmount}
            hasFreeShipping={platformBenefits.hasShippingVoucher}
            useCoins={useCoins}
            onUseCoinsChange={setUseCoins}
          />

          <div className="lg:hidden">
            <CheckoutPaymentMethods
              methods={paymentMethods}
              selectedMethodId={selectedMethodId}
              selectedInstallmentId={selectedInstallmentId}
              onMethodChange={setSelectedMethodId}
              onInstallmentChange={setSelectedInstallmentId}
            />
          </div>

          <div className="hidden lg:block">
            <CheckoutTerms />
          </div>
        </div>

        <aside className="flex flex-col gap-3 px-0 lg:sticky lg:top-4">
          <div className="hidden lg:block">
            <CheckoutPaymentMethods
              methods={paymentMethods}
              selectedMethodId={selectedMethodId}
              selectedInstallmentId={selectedInstallmentId}
              onMethodChange={setSelectedMethodId}
              onInstallmentChange={setSelectedInstallmentId}
            />
          </div>

          <CheckoutPaymentDetails breakdown={breakdown} />

          <div className="hidden lg:block">
            <CheckoutFooterBar
              total={breakdown.total}
              saved={breakdown.saved}
              dropshipper={dropshipper}
              onDropshipperChange={setDropshipper}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </aside>
      </div>

      <div className="px-3 lg:hidden">
        <CheckoutTerms />
      </div>

      <div className="px-3 lg:hidden">
        <CheckoutFooterBar
          total={breakdown.total}
          saved={breakdown.saved}
          dropshipper={dropshipper}
          onDropshipperChange={setDropshipper}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>

      <p className="hidden px-3 text-center text-xs text-muted-foreground lg:block">
        {itemCount} produk · estimasi tiba{' '}
        {selectedShipping.estimate.toLowerCase()}
      </p>

      <CheckoutConfirmSheet
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        address={address}
        breakdown={breakdown}
        itemCount={itemCount}
        shippingLabel={selectedShipping.label}
        shippingEstimate={selectedShipping.estimate}
        paymentLabel={selectedMethod.label}
        isSubmitting={isPlacingOrder}
        onConfirm={handleConfirmOrder}
      />
    </div>
  )
}
