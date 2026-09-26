import { Link } from '@tanstack/react-router'
import {
  MessageCircleIcon,
  ShoppingCartIcon,
  TicketIcon,
} from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Button } from '@/shared/ui'

function BuyActions({
  total,
  inStock,
  layout,
  onBuyClick,
}: {
  total: number
  inStock: boolean
  layout: 'mobile' | 'desktop'
  onBuyClick: () => void
}) {
  if (layout === 'mobile') {
    return (
      <div className="mx-auto flex max-w-lg items-stretch">
        <Button
          variant="outline"
          size="lg"
          className="h-auto shrink-0 rounded-none border-0 border-r px-4 py-3"
          aria-label="Chat penjual"
        >
          <MessageCircleIcon />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-auto shrink-0 rounded-none border-0 border-r px-4 py-3"
          render={<Link to="/cart" />}
          aria-label="Tambah ke keranjang"
        >
          <ShoppingCartIcon />
        </Button>
        <Button
          size="lg"
          disabled={!inStock}
          onClick={onBuyClick}
          className="h-auto min-w-0 flex-1 flex-col gap-0.5 rounded-none py-2.5"
        >
          <span className="flex items-center gap-1 text-xs font-normal">
            <TicketIcon className="size-3.5" />
            Beli Dengan Voucher
          </span>
          <span className="text-base font-semibold">
            {inStock ? formatIDR(total) : 'Stok habis'}
          </span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <MessageCircleIcon data-icon="inline-start" />
          Chat
        </Button>
        <Button variant="outline" className="flex-1" render={<Link to="/cart" />}>
          <ShoppingCartIcon data-icon="inline-start" />
          Keranjang
        </Button>
      </div>
      <Button
        size="lg"
        disabled={!inStock}
        onClick={onBuyClick}
        className="h-auto flex-col gap-1 py-3"
      >
        <span className="flex items-center gap-1 text-xs font-normal">
          <TicketIcon className="size-3.5" />
          Beli Dengan Voucher
        </span>
        <span className="text-lg font-semibold">
          {inStock ? formatIDR(total) : 'Stok habis'}
        </span>
      </Button>
    </div>
  )
}

export function ProductBuyBar({
  total,
  inStock,
  layout,
  onBuyClick,
}: {
  total: number
  inStock: boolean
  layout: 'mobile' | 'desktop'
  onBuyClick: () => void
}) {
  if (layout === 'mobile') {
    return (
      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur lg:hidden">
        <BuyActions
          total={total}
          inStock={inStock}
          layout="mobile"
          onBuyClick={onBuyClick}
        />
      </div>
    )
  }

  return (
    <div className="hidden lg:block">
      <BuyActions
        total={total}
        inStock={inStock}
        layout="desktop"
        onBuyClick={onBuyClick}
      />
    </div>
  )
}
