import { PackageIcon, UsersIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Card, CardContent } from '@/shared/ui'

import type { AffiliateDashboardSnapshot } from '../model/affiliate-dashboard'

export function AffiliateSalesCards({
  snapshot,
}: {
  snapshot: AffiliateDashboardSnapshot
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <Card className="gap-0 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PackageIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Omzet Pribadi</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatIDR(snapshot.personalSalesAmount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {snapshot.personalSalesBoxes.toLocaleString('id-ID')} box terjual
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <UsersIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Omzet Jaringan</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
              {formatIDR(snapshot.networkSalesAmount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {snapshot.activeMembers.toLocaleString('id-ID')} member aktif
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
