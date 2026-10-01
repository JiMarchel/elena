import type { LucideIcon } from 'lucide-react'
import { ConstructionIcon } from 'lucide-react'

import { Card, CardContent } from '@/shared/ui'

export function EarningsPlaceholder({
  icon: Icon = ConstructionIcon,
  title,
  description,
}: {
  icon?: LucideIcon
  title: string
  description: string
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon className="size-6" />
        </span>
        <div className="max-w-md space-y-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Data akan ditampilkan setelah backend terhubung.
        </p>
      </CardContent>
    </Card>
  )
}
