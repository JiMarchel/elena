import { GiftIcon } from 'lucide-react'

import { PageShell } from '@/shared/ui'
import { RequireAuth } from '@/shared/auth'

import { EarningsPlaceholder } from './earnings-placeholder'

export function RewardsPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat hadiah"
      description="Bonus reward hanya tersedia setelah Anda masuk."
    >
      <PageShell
        title="Bonus Reward"
        description="Milestone pencapaian PV kiri dan kanan khusus untuk level Distributor."
        backTo="/earnings"
      >
        <EarningsPlaceholder
          icon={GiftIcon}
          title="Pencapaian Reward"
          description="Progress milestone HP, laptop, motor, umrah, deposito, dan mobil listrik akan ditampilkan di sini."
        />
      </PageShell>
    </RequireAuth>
  )
}
