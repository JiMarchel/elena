import { ArrowLeftRightIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Card, CardContent } from '@/shared/ui'

import type { PairingBonusSnapshot } from '../model/pairing-bonus'
import { formatPvPoint } from '../model/pairing-bonus'

export function PairingVolumePanel({
  snapshot,
}: {
  snapshot: PairingBonusSnapshot
}) {
  const total = snapshot.leftPv + snapshot.rightPv
  const leftShare = total === 0 ? 50 : (snapshot.leftPv / total) * 100
  const carryLabel =
    snapshot.carryForwardLeg === 'left' ? 'Kiri' : 'Kanan'

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
      <Card className="gap-0 py-0">
        <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
          <div>
            <h2 className="text-sm font-medium">Volume Point Binary</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              1 PV kiri + 1 PV kanan = 1 pair · 1 box = 0,5 PV
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted/50 px-4 py-3">
              <p className="text-xs text-muted-foreground">LEFT / Kiri</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {formatPvPoint(snapshot.leftPv)}
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 px-4 py-3">
              <p className="text-xs text-muted-foreground">RIGHT / Kanan</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {formatPvPoint(snapshot.rightPv)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ArrowLeftRightIcon className="size-3.5" />
                Keseimbangan PV
              </span>
              <span>
                Kiri {snapshot.leftPv} · Kanan {snapshot.rightPv}
              </span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-muted">
              <span className="bg-primary" style={{ width: `${leftShare}%` }} />
              <span className="flex-1 bg-primary/35" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl ring-1 ring-foreground/10 px-4 py-3">
              <p className="text-xs text-muted-foreground">Pairing Qualified</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">
                {snapshot.pairQualified.toLocaleString('id-ID')} Pair
              </p>
            </div>
            <div className="rounded-xl ring-1 ring-foreground/10 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Carry Forward (sisa PV)
              </p>
              <p className="mt-1 text-xl font-semibold tabular-nums">
                {carryLabel} {formatPvPoint(snapshot.carryForwardPv)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardContent className="flex h-full flex-col gap-3 p-4 sm:p-5">
          <div>
            <p className="text-xs text-muted-foreground">Bonus Pairing Hari Ini</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {formatIDR(snapshot.bonusPairingToday)}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Pair hari ini</span>
              <span className="font-medium tabular-nums">
                {snapshot.pairToday} / {snapshot.pairTodayCap}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary"
                style={{
                  width: `${Math.min(100, (snapshot.pairToday / snapshot.pairTodayCap) * 100)}%`,
                }}
              />
            </div>
            {snapshot.pairQueuedTomorrow > 0 ? (
              <p className="text-xs text-muted-foreground">
                {snapshot.pairQueuedTomorrow} pair antre dibayar besok (carry
                forward)
              </p>
            ) : null}
          </div>
          {snapshot.milestonePairsCompleted >= snapshot.milestonePairsTotal ? (
            <Badge variant="secondary" className="w-fit">
              Milestone pair 1–10 selesai
            </Badge>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}
