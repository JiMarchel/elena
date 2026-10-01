import type { ReactNode } from 'react'

import { Separator } from '@/shared/ui'

export function RegisterSection({
  title,
  description,
  children,
  showSeparator = true,
}: {
  title: string
  description?: string
  children: ReactNode
  showSeparator?: boolean
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {showSeparator ? <Separator /> : null}
    </section>
  )
}
