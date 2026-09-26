import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, StoreIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Button } from '@/shared/ui'

import type { Order } from '../model/order'

const actions: Record<
  Order['status'],
  { primary: string; secondary?: string }
> = {
  unpaid: { primary: 'Bayar Sekarang', secondary: 'Batalkan' },
  packing: { primary: 'Hubungi Penjual' },
  shipping: { primary: 'Lacak Pengiriman', secondary: 'Pesanan Diterima' },
  completed: { primary: 'Beli Lagi', secondary: 'Beri Ulasan' },
}

export function OrderCard({ order }: { order: Order }) {
  const action = actions[order.status]
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <article className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <StoreIcon className="size-4 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {order.storeName}
        </span>
        <Badge variant="outline" className="shrink-0 font-normal">
          {order.orderNo}
        </Badge>
        <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
      </div>

      <ul className="flex flex-col divide-y">
        {order.items.map((item) => (
          <li key={`${order.id}-${item.productId}`} className="flex gap-3 px-3 py-3">
            <Link
              to="/products/$productId"
              params={{ productId: String(item.productId) }}
              className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted/40 sm:size-20"
            >
              <img
                src={item.img}
                alt=""
                className="size-full object-cover"
                loading="lazy"
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Link
                to="/products/$productId"
                params={{ productId: String(item.productId) }}
                className="line-clamp-2 text-sm font-medium hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-xs text-muted-foreground">{item.variant}</p>
              <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                <span className="text-sm font-medium text-primary">
                  {formatIDR(item.price)}
                </span>
                <span className="text-xs text-muted-foreground">
                  x{item.quantity}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 border-t bg-muted/20 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5 text-sm">
          <span className="text-muted-foreground">
            {itemCount} produk · {order.createdAt}
          </span>
          {order.payBefore && (
            <span className="text-xs text-destructive">{order.payBefore}</span>
          )}
          {order.eta && (
            <span className="text-xs text-muted-foreground">{order.eta}</span>
          )}
          {order.completedAt && (
            <span className="text-xs text-muted-foreground">
              {order.completedAt}
            </span>
          )}
          <span className="font-medium">
            Total:{' '}
            <span className="text-primary">{formatIDR(order.total)}</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {action.secondary && (
            <Button variant="outline" size="sm">
              {action.secondary}
            </Button>
          )}
          <Button size="sm">{action.primary}</Button>
        </div>
      </div>
    </article>
  )
}
