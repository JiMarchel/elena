import { SearchIcon } from 'lucide-react'

import { products } from '@/entities/product'
import { Input } from '@/shared/ui'

import { demoWallet } from '../model/dashboard-wallet'
import { LiveSection } from './live-section'
import { ProductFeed } from './product-feed'
import { PromoBannerSection } from './promo-banner'
import { ShortcutMenu } from './shortcut-menu'
import { WalletStrip } from './wallet-strip'

export function DashboardPage() {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-3 overflow-x-hidden p-3 sm:gap-4 sm:p-4 md:gap-5">
      <div className="relative min-w-0">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari parfum, brand, atau notes…"
          className="h-10 w-full min-w-0 rounded-full bg-card pl-9"
          aria-label="Cari produk"
        />
      </div>

      <WalletStrip wallet={demoWallet} />
      <ShortcutMenu />
      <PromoBannerSection />
      <LiveSection />
      <ProductFeed products={products} />
    </div>
  )
}
