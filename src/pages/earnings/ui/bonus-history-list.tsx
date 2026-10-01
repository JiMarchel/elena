import { formatIDR } from '@/shared/lib'
import { Badge, Card, CardContent } from '@/shared/ui'

export type BonusHistoryItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  amount: number
  badge?: string
}

export function BonusHistoryList({
  title,
  items,
  emptyMessage = 'Belum ada riwayat bonus.',
}: {
  title: string
  items: BonusHistoryItem[]
  emptyMessage?: string
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">{title}</h2>
      <Card className="gap-0 py-0">
        <CardContent className="divide-y px-0 py-0">
          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="flex items-start justify-between gap-3 px-4 py-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    {item.badge ? (
                      <Badge variant="outline" className="text-[10px]">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.date}
                  </p>
                  {item.subtitle ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  ) : null}
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {item.id}
                  </p>
                </div>
                <p className="shrink-0 font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                  +{formatIDR(item.amount)}
                </p>
              </article>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  )
}
