import { Link, useSearch } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  HomeIcon,
  ShoppingBagIcon,
  XCircleIcon,
} from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { formatIDR } from '@/shared/lib'
import { Button } from '@/shared/ui'

import { checkoutFlowSearch } from '../model/address'

export function CheckoutResultPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat hasil pesanan"
      description="Hasil pesanan hanya tersedia setelah Anda masuk."
    >
      <CheckoutResultPageContent />
    </RequireAuth>
  )
}

function CheckoutResultPageContent() {
  const search = useSearch({ from: '/_app/checkout/result' })
  const isSuccess = search.status === 'success'
  const retrySearch = checkoutFlowSearch(search)

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-lg flex-col items-center justify-center px-4 py-8 lg:min-h-[calc(100dvh-8rem)]">
      <div className="w-full rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/10 sm:p-8">
        {isSuccess ? (
          <CheckCircle2Icon className="mx-auto size-16 text-emerald-500" />
        ) : (
          <XCircleIcon className="mx-auto size-16 text-destructive" />
        )}

        <h1 className="mt-4 text-xl font-semibold">
          {isSuccess ? 'Pesanan Berhasil Dibuat' : 'Pesanan Gagal Dibuat'}
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {isSuccess
            ? 'Terima kasih! Pesananmu sedang diproses. Segera selesaikan pembayaran agar pesanan tidak dibatalkan otomatis.'
            : search.message ??
              'Terjadi kendala saat memproses pesanan. Silakan coba lagi dalam beberapa saat.'}
        </p>

        {isSuccess && search.orderNo && (
          <div className="mt-5 rounded-xl bg-muted/50 px-4 py-3 text-left">
            <p className="text-xs text-muted-foreground">Nomor Pesanan</p>
            <p className="mt-0.5 font-medium">{search.orderNo}</p>
            {search.total && (
              <>
                <p className="mt-3 text-xs text-muted-foreground">
                  Total Pembayaran
                </p>
                <p className="mt-0.5 font-medium text-primary tabular-nums">
                  {formatIDR(search.total)}
                </p>
              </>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <Button
            size="lg"
            className="w-full"
            render={<Link to="/" />}
          >
            <HomeIcon data-icon="inline-start" />
            Kembali ke Beranda
          </Button>

          {isSuccess ? (
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              render={
                <Link to="/orders" search={{ status: 'unpaid' }} />
              }
            >
              <ShoppingBagIcon data-icon="inline-start" />
              Lihat Pesanan Saya
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              render={<Link to="/checkout" search={retrySearch} />}
            >
              <ArrowRightIcon data-icon="inline-start" />
              Coba Lagi
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
