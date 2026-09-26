import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  PercentIcon,
  SparklesIcon,
  TicketIcon,
} from 'lucide-react'
import { RequireAuth } from '@/shared/auth'
import { Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'

import {
  filterVouchers,
  voucherTabs,
} from '../model/voucher'
import type { VoucherTab } from '../model/voucher'
import { VoucherCard } from './voucher-card'

export function VoucherPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat voucher"
      description="Voucher, saldo, poin, dan keranjang hanya tersedia setelah Anda masuk."
    >
      <VoucherPageContent />
    </RequireAuth>
  )
}

function VoucherPageContent() {
  const [tab, setTab] = useState<VoucherTab>('all')
  const [code, setCode] = useState('')
  const [claimedMessage, setClaimedMessage] = useState<string | null>(null)

  const list = useMemo(() => filterVouchers(tab), [tab])

  const claimCode = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = code.trim()
    if (!trimmed) return
    setClaimedMessage(`Kode "${trimmed}" berhasil ditambahkan ke voucher Anda.`)
    setCode('')
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
        <h1 className="min-w-0 flex-1 truncate text-lg font-medium sm:text-xl">
          Voucher Saya
        </h1>
        <Button variant="ghost" size="sm">
          Riwayat
        </Button>
      </div>

      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as VoucherTab)}
        className="gap-4"
      >
        <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <TabsList
            variant="line"
            className="h-auto w-max min-w-full justify-start rounded-none border-b bg-transparent p-0 lg:w-full"
          >
            {voucherTabs.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="relative px-3 py-2.5 text-sm"
              >
                {item.label} ({item.count})
                {item.hasDot && (
                  <span className="absolute top-1.5 right-1 size-1.5 rounded-full bg-destructive" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <form
            onSubmit={claimCode}
            className="flex items-center gap-2 rounded-xl bg-card px-3 py-3 ring-1 ring-foreground/10"
          >
            <TicketIcon className="size-4 shrink-0 text-primary" />
            <Input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Masukkan Kode Voucher"
              className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
            <Button type="submit" size="sm" variant="ghost" disabled={!code.trim()}>
              Klaim
            </Button>
          </form>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-card px-3 py-3 text-sm font-medium ring-1 ring-foreground/10 transition-colors hover:bg-muted/40"
          >
            <PercentIcon className="size-4 text-primary" />
            Dapatkan Voucher Lainnya
          </button>
        </div>

        {claimedMessage && (
          <p className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
            {claimedMessage}
          </p>
        )}

        {voucherTabs.map((item) => (
          <TabsContent
            key={item.id}
            value={item.id}
            className="mt-0 flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4"
          >
            {list.length === 0 ? (
              <div className="col-span-full flex flex-col items-center gap-2 rounded-xl bg-card px-6 py-12 text-center ring-1 ring-foreground/10">
                <SparklesIcon className="size-8 text-muted-foreground" />
                <p className="font-medium">Belum ada voucher di kategori ini</p>
                <p className="text-sm text-muted-foreground">
                  Cek tab lain atau klaim kode promo terbaru.
                </p>
              </div>
            ) : (
              list.map((voucher) => (
                <VoucherCard
                  key={voucher.id}
                  voucher={voucher}
                  onUse={() => {
                    setClaimedMessage(
                      voucher.status === 'active'
                        ? `Voucher "${voucher.title}" siap dipakai saat checkout.`
                        : `Voucher "${voucher.title}" disimpan — belum aktif.`,
                    )
                  }}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
