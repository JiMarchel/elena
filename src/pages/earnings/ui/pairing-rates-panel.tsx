import { formatIDR } from '@/shared/lib'
import { Card, CardContent } from '@/shared/ui'

import type { PairingBonusSnapshot } from '../model/pairing-bonus'

export function PairingRatesPanel({
  snapshot,
}: {
  snapshot: PairingBonusSnapshot
}) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
        <div>
          <p className="text-xs text-muted-foreground">Pair 1–10 (one-time)</p>
          <p className="mt-1 font-semibold tabular-nums">
            {formatIDR(snapshot.milestonePairRate)} / pair
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {snapshot.milestonePairsCompleted}/{snapshot.milestonePairsTotal}{' '}
            tercapai · total {formatIDR(snapshot.milestoneBonusTotal)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Pair 11+ (harian)</p>
          <p className="mt-1 font-semibold tabular-nums">
            {formatIDR(snapshot.dailyPairRate)} / pair
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cap {snapshot.pairTodayCap} pair/hari sesuai level
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Bonus Pairing Bulan Ini</p>
          <p className="mt-1 font-semibold tabular-nums">
            {formatIDR(snapshot.bonusPairingThisMonth)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Maks. depth pairing 20 level
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
