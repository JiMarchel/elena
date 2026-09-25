import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, PackageSearchIcon } from 'lucide-react'

import { Button } from '@/shared/ui'

export function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <PackageSearchIcon className="size-6 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">Produk tidak ditemukan</h1>
        <p className="max-w-sm text-muted-foreground">
          Parfum yang Anda cari tidak ada di katalog Enela, atau tautannya sudah
          tidak berlaku.
        </p>
      </div>
      <Button render={<Link to="/" />}>
        <ArrowLeftIcon data-icon="inline-start" />
        Kembali ke Dashboard
      </Button>
    </div>
  )
}
