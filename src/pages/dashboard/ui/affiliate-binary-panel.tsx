import { Link } from '@tanstack/react-router'
import { ArrowLeftRightIcon, ChevronRightIcon, SparklesIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Button, Card, CardContent } from '@/shared/ui'

import type { AffiliateDashboardSnapshot } from '../model/affiliate-dashboard'
import { formatPv } from '../model/affiliate-dashboard'

export function AffiliateBinaryPanel({
  snapshot,
}: {
  snapshot: AffiliateDashboardSnapshot
}) {
  const pairProgress =
    snapshot.pairTodayCap === 0
      ? 0
      : Math.min(100, (snapshot.pairToday / snapshot.pairTodayCap) * 100)

  const leftShare =
    snapshot.leftPv + snapshot.rightPv === 0
      ? 50
      : (snapshot.leftPv / (snapshot.leftPv + snapshot.rightPv)) * 100

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-medium">
              <SparklesIcon className="size-4 text-primary" />
              Posisi Binary
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Volume point kiri dan kanan untuk perhitungan pairing
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            render={<Link to="/network" />}
          >
            Lihat pohon
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/50 px-3 py-3">
            <p className="text-xs text-muted-foreground">Left / Kiri</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatPv(snapshot.leftPv)}
            </p>
          </div>
          <div className="rounded-xl bg-muted/50 px-3 py-3">
            <p className="text-xs text-muted-foreground">Right / Kanan</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatPv(snapshot.rightPv)}
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
          <div
            className="flex h-2 overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label={`PV kiri ${snapshot.leftPv}, PV kanan ${snapshot.rightPv}`}
          >
            <span className="bg-primary" style={{ width: `${leftShare}%` }} />
            <span className="flex-1 bg-primary/35" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl ring-1 ring-foreground/10 px-3 py-3">
            <p className="text-xs text-muted-foreground">Pair Tersedia</p>
            <p className="mt-1 font-semibold tabular-nums">
              {snapshot.pairAvailable.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-xl ring-1 ring-foreground/10 px-3 py-3">
            <p className="text-xs text-muted-foreground">Pair Hari Ini</p>
            <p className="mt-1 font-semibold tabular-nums">
              {snapshot.pairToday} / {snapshot.pairTodayCap}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary transition-all"
                style={{ width: `${pairProgress}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-foreground/10 px-3 py-3">
            <p className="text-xs text-muted-foreground">Bonus Pairing</p>
            <p className="mt-1 font-semibold tabular-nums">
              {formatIDR(snapshot.bonusPairingToday)}
            </p>
          </div>
        </div>

        {snapshot.milestoneStatus === 'completed' ? (
          <Badge variant="secondary" className="w-fit">
            Milestone pair 1–10 selesai
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  )
}
