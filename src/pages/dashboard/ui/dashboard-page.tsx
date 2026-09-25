import { SearchIcon } from 'lucide-react'

import { products } from '@/entities/product'
import { Input } from '@/shared/ui'

import { demoWallet } from '../model/dashboard-wallet'
import { ProductFeed } from './product-feed'
import { ShortcutMenu } from './shortcut-menu'
import { WalletStrip } from './wallet-strip'

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari parfum, brand, atau notes…"
          className="h-10 rounded-full bg-card pl-9"
          aria-label="Cari produk"
        />
      </div>

      <WalletStrip wallet={demoWallet} />
      <ShortcutMenu />
      <ProductFeed products={products} />
    </div>
  )
}
