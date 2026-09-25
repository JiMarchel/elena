import { Card, CardContent } from '@/shared/ui'

import type { NetworkNode } from '../model/network-member'
import { formatCount } from '../model/network-format'

type NetworkSummaryProps = {
  node: NetworkNode
}

/**
 * Untuk sebagian besar user, angka di sini sudah menjawab pertanyaannya tanpa
 * perlu menelusuri pohon sama sekali.
 */
export function NetworkSummary({ node }: NetworkSummaryProps) {
  const { stats } = node
  const total = stats.leftCount + stats.rightCount
  const leftShare = total === 0 ? 50 : (stats.leftCount / total) * 100

  const cards = [
    { label: 'Total jaringan', value: formatCount(stats.totalDownline) },
    { label: 'Kaki kiri', value: formatCount(stats.leftCount) },
    { label: 'Kaki kanan', value: formatCount(stats.rightCount) },
    { label: 'Member aktif', value: formatCount(stats.activeDownline) },
    { label: 'Baru bulan ini', value: formatCount(stats.newThisMonth) },
    { label: 'Kedalaman', value: `${stats.depth} level` },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <Card key={card.label} className="gap-0 py-3">
            <CardContent className="px-3">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-xl font-medium tabular-nums">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="gap-0 py-3">
        <CardContent className="flex flex-col gap-2 px-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Keseimbangan kaki — kiri {formatCount(stats.leftCount)}
            </span>
            <span className="text-muted-foreground">
              kanan {formatCount(stats.rightCount)}
            </span>
          </div>
          <div
            className="flex h-2 overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label={`Kaki kiri ${stats.leftCount} member, kaki kanan ${stats.rightCount} member`}
          >
            <span className="bg-primary" style={{ width: `${leftShare}%` }} />
            <span className="flex-1 bg-primary/35" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
