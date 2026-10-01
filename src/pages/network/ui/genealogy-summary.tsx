import { Card, CardContent } from '@/shared/ui'

import type { GenealogyNode } from '../model/genealogy-member'
import { formatCount } from '../model/network-format'

export function GenealogySummary({ node }: { node: GenealogyNode }) {
  const cards = [
    { label: 'Referral Langsung', value: formatCount(node.stats.directReferrals) },
    { label: 'Total Downline Sponsor', value: formatCount(node.stats.totalDownline) },
    { label: 'Downline Aktif', value: formatCount(node.stats.activeDownline) },
    { label: 'Baru Bulan Ini', value: formatCount(node.stats.newThisMonth) },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="gap-0 py-3">
          <CardContent className="px-3">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-xl font-medium tabular-nums">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
