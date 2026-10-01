import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'

import {
  filterWalletTransactions,
  getWalletSnapshot,
  walletHistoryTabs,
} from '../model/wallet'
import type { WalletHistoryTab } from '../model/wallet'
import type { WalletActionMode } from './wallet-action-sheet'
import { WalletActionSheet } from './wallet-action-sheet'
import { WalletBalanceHero } from './wallet-balance-hero'
import { WalletQuickActions } from './wallet-quick-actions'
import { WalletSourceCards } from './wallet-source-cards'
import { WalletTransactionList } from './wallet-transaction-list'

export function WalletPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat dompet"
      description="Saldo Enela Wallet hanya tersedia setelah Anda masuk."
    >
      <WalletPageContent />
    </RequireAuth>
  )
}

function WalletPageContent() {
  const navigate = useNavigate()
  const { tab: tabFromUrl } = useSearch({ from: '/_app/wallet/' })
  const activeTab: WalletHistoryTab = tabFromUrl ?? 'all'

  const snapshot = useMemo(() => getWalletSnapshot(), [])
  const [actionMode, setActionMode] = useState<WalletActionMode | null>(null)
  const [actionOpen, setActionOpen] = useState(false)

  const setTab = (tab: WalletHistoryTab) => {
    navigate({
      to: '/wallet',
      search: tab === 'all' ? {} : { tab },
    })
  }

  const openAction = (mode: WalletActionMode) => {
    if (mode === 'withdraw') {
      navigate({ to: '/wallet/withdraw' })
      return
    }
    setActionMode(mode)
    setActionOpen(true)
  }

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 p-3 pb-8 sm:p-4 lg:gap-5">
      <header className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={<Link to="/" />}
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-lg font-medium sm:text-xl">
          Enela Wallet
        </h1>
      </header>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-5">
        <div className="flex flex-col gap-4">
          <WalletBalanceHero
            ownerName={snapshot.ownerName}
            walletId={snapshot.walletId}
            balance={snapshot.balance}
          />

          <WalletQuickActions onAction={openAction} />

          <div className="lg:hidden">
            <WalletSourceCards balance={snapshot.balance} />
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-medium">Riwayat Transaksi</h2>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setTab(value as WalletHistoryTab)}
              className="gap-3"
            >
              <TabsList
                variant="line"
                className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0"
              >
                {walletHistoryTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="px-3 py-2 text-sm"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {walletHistoryTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0">
                  <WalletTransactionList
                    transactions={filterWalletTransactions(tab.id)}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>

        <aside className="hidden flex-col gap-4 lg:flex">
          <WalletSourceCards balance={snapshot.balance} />

          <section className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
            <h3 className="text-sm font-medium">Tips Dompet</h3>
            <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
              <li>
                Komisi penjualan masuk otomatis setelah pesanan selesai.
              </li>
              <li>
                Komisi referral dihitung dari aktivitas jaringan downline Anda.
              </li>
              <li>
                Penarikan saldo diproses 1×24 jam kerja ke rekening terdaftar.
              </li>
            </ul>
          </section>
        </aside>
      </div>

      <WalletActionSheet
        open={actionOpen}
        mode={actionMode}
        walletId={snapshot.walletId}
        ownerName={snapshot.ownerName}
        availableBalance={snapshot.balance.total}
        onOpenChange={setActionOpen}
      />
    </div>
  )
}
