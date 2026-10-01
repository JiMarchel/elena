import { Link } from '@tanstack/react-router'
import {
  CalendarDaysIcon,
  CoinsIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Card, CardContent } from '@/shared/ui'

import type { AffiliateDashboardSnapshot } from '../model/affiliate-dashboard'

type StatItem = {
  label: string
  value: string
  icon: LucideIcon
  href?: '/wallet' | '/earnings'
}

export function AffiliateStatsGrid({
  snapshot,
}: {
  snapshot: AffiliateDashboardSnapshot
}) {
  const items: StatItem[] = [
    {
      label: 'Saldo Wallet',
      value: formatIDR(snapshot.walletBalance),
      icon: WalletIcon,
      href: '/wallet',
    },
    {
      label: 'Bonus Hari Ini',
      value: formatIDR(snapshot.bonusToday),
      icon: CoinsIcon,
      href: '/earnings',
    },
    {
      label: 'Bonus Bulan Ini',
      value: formatIDR(snapshot.bonusThisMonth),
      icon: CalendarDaysIcon,
      href: '/earnings',
    },
    {
      label: 'Total Bonus',
      value: formatIDR(snapshot.totalBonusAllTime),
      icon: TrendingUpIcon,
      href: '/earnings',
    },
  ]

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => {
        const content = (
          <Card className="h-full gap-0 py-3 transition-colors hover:bg-muted/30">
            <CardContent className="flex flex-col gap-2 px-3 sm:px-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="size-4 shrink-0" />
                <span className="text-xs">{item.label}</span>
              </div>
              <p className="text-lg font-semibold tabular-nums sm:text-xl">
                {item.value}
              </p>
            </CardContent>
          </Card>
        )

        if (item.href) {
          return (
            <Link key={item.label} to={item.href} className="min-w-0">
              {content}
            </Link>
          )
        }

        return <div key={item.label}>{content}</div>
      })}
    </section>
  )
}
