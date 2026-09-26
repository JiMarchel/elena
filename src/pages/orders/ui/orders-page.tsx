import { useMemo } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, PackageSearchIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'

import {
  countOrdersByStatus,
  filterOrders,
  orderTabs,
} from '../model/order'
import type { OrderStatus } from '../model/order'
import { OrderCard } from './order-card'

export function OrdersPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat pesanan"
      description="Riwayat dan status pesanan hanya tersedia setelah Anda masuk."
    >
      <OrdersPageContent />
    </RequireAuth>
  )
}

function OrdersPageContent() {
  const navigate = useNavigate()
  const { status: statusFromUrl } = useSearch({ from: '/_app/orders' })
  const activeStatus: OrderStatus = statusFromUrl ?? 'unpaid'

  const setStatus = (status: OrderStatus) => {
    navigate({
      to: '/orders',
      search: status === 'unpaid' ? {} : { status },
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 pb-8 lg:max-w-5xl">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-2"
          render={<Link to="/" />}
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-lg font-medium sm:text-xl">
          Pesanan Saya
        </h1>
      </div>

      <Tabs
        value={activeStatus}
        onValueChange={(value) => setStatus(value as OrderStatus)}
        className="gap-4"
      >
        <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <TabsList
            variant="line"
            className="h-auto w-max min-w-full justify-start rounded-none border-b bg-transparent p-0 lg:w-full"
          >
            {orderTabs.map((tab) => {
              const count = countOrdersByStatus(tab.id)
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-3 py-2.5 text-sm whitespace-nowrap"
                >
                  {tab.label}
                  {count > 0 && (
                    <span className="text-muted-foreground">({count})</span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {orderTabs.map((tab) => (
          <OrderTabPanel key={tab.id} status={tab.id} />
        ))}
      </Tabs>
    </div>
  )
}

function OrderTabPanel({ status }: { status: OrderStatus }) {
  const orders = useMemo(() => filterOrders(status), [status])

  return (
    <TabsContent value={status} className="mt-0 flex flex-col gap-3">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-12 text-center ring-1 ring-foreground/10">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <PackageSearchIcon className="size-6 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Belum ada pesanan di sini</p>
            <p className="text-sm text-muted-foreground">
              Pesanan dengan status ini akan muncul setelah Anda berbelanja.
            </p>
          </div>
          <Button size="sm" render={<Link to="/" />}>
            Belanja sekarang
          </Button>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </TabsContent>
  )
}
