import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, CrownIcon } from 'lucide-react'

import { Badge, Button } from '@/shared/ui'

import type { AffiliateDashboardSnapshot } from '../model/affiliate-dashboard'
import { memberLevelLabels } from '../model/affiliate-dashboard'

export function AffiliateWelcomeHero({
  snapshot,
}: {
  snapshot: AffiliateDashboardSnapshot
}) {
  const levelLabel = memberLevelLabels[snapshot.level]

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary/90 to-emerald-800 p-5 text-primary-foreground shadow-lg sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-white/10"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <p className="text-sm text-primary-foreground/80">
            Selamat datang kembali
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {snapshot.displayName}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-white/20 bg-white/15 text-primary-foreground hover:bg-white/15">
              <CrownIcon data-icon="inline-start" />
              {levelLabel}
            </Badge>
            <span className="text-xs text-primary-foreground/75">
              ID {snapshot.memberId} · @{snapshot.username}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 self-start text-primary-foreground hover:bg-white/10"
          render={<Link to="/settings/profile" />}
        >
          Profil Saya
          <ChevronRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}
