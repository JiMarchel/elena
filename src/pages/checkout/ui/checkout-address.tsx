import { useNavigate } from '@tanstack/react-router'
import { ChevronRightIcon, MapPinIcon } from 'lucide-react'

import type { ShippingAddress } from '../model/checkout'
import { checkoutFlowSearch } from '../model/address'
import type { CheckoutFlowSearch } from '../model/address'

export function CheckoutAddress({
  address,
  flowSearch,
}: {
  address: ShippingAddress
  flowSearch: CheckoutFlowSearch
}) {
  const navigate = useNavigate()

  const openAddressList = () => {
    navigate({
      to: '/checkout/addresses',
      search: checkoutFlowSearch(flowSearch),
    })
  }

  return (
    <button
      type="button"
      onClick={openAddressList}
      className="flex w-full cursor-pointer items-start gap-3 bg-card px-3 py-3 text-left ring-1 ring-foreground/10 transition-colors hover:bg-muted/30 active:bg-muted/40 sm:px-4 lg:rounded-xl"
    >
      <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {address.name}{' '}
          <span className="font-normal text-muted-foreground">
            {address.phone}
          </span>
        </p>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
          {address.line1}, {address.line2}
        </p>
        {address.note && (
          <p className="mt-0.5 text-xs text-muted-foreground">{address.note}</p>
        )}
      </div>
      <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}
