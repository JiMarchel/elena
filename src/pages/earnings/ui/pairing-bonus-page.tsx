import { useMemo } from 'react'

import { RequireAuth } from '@/shared/auth'
import { Badge, PageShell } from '@/shared/ui'

import {
  getPairingBonusHistory,
  getPairingBonusSnapshot,
} from '../model/pairing-bonus'
import { memberLevelLabels } from '../model/member-level'
import type { BonusHistoryItem } from './bonus-history-list'
import { BonusHistoryList } from './bonus-history-list'
import { PairingRatesPanel } from './pairing-rates-panel'
import { PairingVolumePanel } from './pairing-volume-panel'

export function PairingBonusPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat bonus pairing"
      description="Bonus pairing hanya tersedia setelah Anda masuk."
    >
      <PairingBonusPageContent />
    </RequireAuth>
  )
}

function PairingBonusPageContent() {
  const snapshot = useMemo(() => getPairingBonusSnapshot(), [])
  const history = useMemo(() => getPairingBonusHistory(), [])

  const historyItems: BonusHistoryItem[] = history.map((entry) => ({
    id: entry.id,
    date: entry.date,
    title: `${entry.pairs} pair · ${entry.type === 'milestone' ? 'Milestone' : 'Harian'}`,
    subtitle: entry.note,
    amount: entry.grossBonus,
    badge:
      entry.type === 'milestone'
        ? `Rp${(entry.rate / 1000).toFixed(0)}k one-time`
        : `Rp${(entry.rate / 1000).toFixed(0)}k/pair`,
  }))

  return (
    <PageShell
      title="Bonus Pairing"
      description="PV kiri, PV kanan, pair qualified, carry forward, dan progres bonus harian."
      backTo="/earnings"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {memberLevelLabels[snapshot.level]}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Cap harian {snapshot.pairTodayCap} pair
        </span>
      </div>

      <PairingVolumePanel snapshot={snapshot} />
      <PairingRatesPanel snapshot={snapshot} />
      <BonusHistoryList title="Riwayat Bonus Pairing" items={historyItems} />
    </PageShell>
  )
}
