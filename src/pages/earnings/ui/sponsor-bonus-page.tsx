import { useMemo } from 'react'

import { formatIDR } from '@/shared/lib'
import { RequireAuth } from '@/shared/auth'
import { Badge, Card, CardContent, PageShell } from '@/shared/ui'

import { memberLevelLabels } from '../model/member-level'
import {
  getSponsorBonusHistory,
  getSponsorBonusSummary,
  getSponsorLevelLabel,
} from '../model/sponsor-bonus'
import type { BonusHistoryItem } from './bonus-history-list'
import { BonusHistoryList } from './bonus-history-list'

export function SponsorBonusPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat bonus sponsor"
      description="Bonus sponsor hanya tersedia setelah Anda masuk."
    >
      <SponsorBonusPageContent />
    </RequireAuth>
  )
}

function SponsorBonusPageContent() {
  const summary = useMemo(() => getSponsorBonusSummary(), [])
  const history = useMemo(() => getSponsorBonusHistory(), [])

  const historyItems: BonusHistoryItem[] = history.map((entry) => ({
    id: entry.id,
    date: entry.date,
    title: `Bonus dari ${entry.downlineName}`,
    subtitle: `Order ${entry.orderNo} · ${entry.boxes} box × ${formatIDR(entry.rate)}`,
    amount: entry.grossBonus,
    badge: getSponsorLevelLabel(entry.recipientLevel),
  }))

  return (
    <PageShell
      title="Bonus Sponsor Langsung"
      description="Komisi penjualan langsung dari downline sponsor sesuai level Reseller, Agen, atau Distributor."
      backTo="/earnings"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {memberLevelLabels[summary.level]}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Rate {formatIDR(summary.ratePerBox)} / box
        </span>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        <Card className="gap-0 py-3">
          <CardContent className="px-4">
            <p className="text-xs text-muted-foreground">Bonus Hari Ini</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatIDR(summary.bonusToday)}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0 py-3">
          <CardContent className="px-4">
            <p className="text-xs text-muted-foreground">Bonus Bulan Ini</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatIDR(summary.bonusThisMonth)}
            </p>
          </CardContent>
        </Card>
        <Card className="gap-0 py-3">
          <CardContent className="px-4">
            <p className="text-xs text-muted-foreground">Total Box Bulan Ini</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {summary.totalBoxesThisMonth.toLocaleString('id-ID')}
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="border-dashed">
        <CardContent className="px-4 py-4 text-sm text-muted-foreground">
          Bonus Sponsor Langsung dihitung per box parfum dari downline sponsor
          langsung. Member Biasa tidak menerima bonus affiliate. Pass Up tidak
          berlaku sesuai marketing plan revisi ENELA.
        </CardContent>
      </Card>

      <BonusHistoryList title="Riwayat Bonus Sponsor" items={historyItems} />
    </PageShell>
  )
}
