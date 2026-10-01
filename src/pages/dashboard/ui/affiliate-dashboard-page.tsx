import { useMemo } from 'react'

import { RequireAuth, useAuth } from '@/shared/auth'

import { getAffiliateDashboard } from '../model/affiliate-dashboard'
import { AffiliateBinaryPanel } from './affiliate-binary-panel'
import { AffiliateSalesCards } from './affiliate-sales-cards'
import { AffiliateStatsGrid } from './affiliate-stats-grid'
import { AffiliateWelcomeHero } from './affiliate-welcome-hero'
import { ShortcutMenu } from './shortcut-menu'

export function AffiliateDashboardPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat dashboard"
      description="Dashboard affiliate menampilkan ringkasan bonus, jaringan, dan omzet Anda."
    >
      <AffiliateDashboardContent />
    </RequireAuth>
  )
}

function AffiliateDashboardContent() {
  const { user } = useAuth()
  const snapshot = useMemo(
    () => getAffiliateDashboard(user?.name ?? 'Member Enela'),
    [user?.name],
  )

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 overflow-x-hidden p-3 sm:gap-5 sm:p-4 md:gap-6">
      <AffiliateWelcomeHero snapshot={snapshot} />
      <AffiliateStatsGrid snapshot={snapshot} />
      <AffiliateSalesCards snapshot={snapshot} />
      <AffiliateBinaryPanel snapshot={snapshot} />

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          Akses Cepat
        </h2>
        <ShortcutMenu />
      </section>
    </div>
  )
}
