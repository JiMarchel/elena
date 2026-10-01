import { Link } from '@tanstack/react-router'
import { CalendarDaysIcon, CoinsIcon, TrendingUpIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Card, CardContent } from '@/shared/ui'

import type { BonusCenterSummary } from '../model/bonus-center'
import { memberLevelLabels } from '../model/member-level'

export function BonusCenterSummaryPanel({
  summary,
}: {
  summary: BonusCenterSummary
}) {
  const cards = [
    {
      label: 'Bonus Hari Ini',
      value: formatIDR(summary.bonusToday),
      icon: CoinsIcon,
    },
    {
      label: 'Bonus Bulan Ini',
      value: formatIDR(summary.bonusThisMonth),
      icon: CalendarDaysIcon,
    },
    {
      label: 'Total Bonus',
      value: formatIDR(summary.totalBonusAllTime),
      icon: TrendingUpIcon,
    },
  ]

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{memberLevelLabels[summary.level]}</Badge>
        <span className="text-sm text-muted-foreground">
          Rate bonus mengikuti level keanggotaan Anda
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="gap-0 py-3">
            <CardContent className="flex flex-col gap-2 px-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <card.icon className="size-4" />
                <span className="text-xs">{card.label}</span>
              </div>
              <p className="text-xl font-semibold tabular-nums">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gap-0 py-0">
        <CardContent className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            {
              label: 'Bonus Sponsor',
              value: summary.sponsorBonusThisMonth,
              to: '/earnings/sponsor' as const,
            },
            {
              label: 'Bonus Pairing',
              value: summary.pairingBonusThisMonth,
              to: '/earnings/pairing' as const,
            },
            {
              label: 'Bonus Reward',
              value: summary.rewardBonusThisMonth,
              to: '/earnings/rewards' as const,
            },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-muted/40"
            >
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="font-semibold tabular-nums">
                {formatIDR(item.value)}
              </span>
              <span className="text-xs text-primary">Lihat detail →</span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
