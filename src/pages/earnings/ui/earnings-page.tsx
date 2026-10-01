import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'
import { useMemo } from 'react'

import { RequireAuth } from '@/shared/auth'
import { Card, CardContent, PageShell } from '@/shared/ui'

import { getBonusCenterSummary } from '../model/bonus-center'
import { earningsMenuItems } from '../model/earnings-menu'
import { BonusCenterSummaryPanel } from './bonus-center-summary'

export function EarningsPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat bonus"
      description="Bonus Center hanya tersedia setelah Anda masuk."
    >
      <EarningsPageContent />
    </RequireAuth>
  )
}

function EarningsPageContent() {
  const summary = useMemo(() => getBonusCenterSummary(), [])

  return (
    <PageShell
      title="Bonus Center"
      description="Ringkasan bonus sponsor, pairing, dan reward dari aktivitas jaringan Anda."
      backTo="/"
    >
      <BonusCenterSummaryPanel summary={summary} />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Menu Bonus
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {earningsMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={item.to}
                className="group rounded-xl bg-card ring-1 ring-foreground/10 transition-colors hover:bg-muted/40"
              >
                <Card className="border-0 bg-transparent shadow-none">
                  <CardContent className="flex items-start gap-3 px-4 py-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}
