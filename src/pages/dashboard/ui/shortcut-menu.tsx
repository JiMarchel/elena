import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Badge } from '@/shared/ui'

import { dashboardShortcuts } from '../model/dashboard-shortcuts'

const networkUrl = '/network' as const

export function ShortcutMenu() {
  return (
    <section className="flex flex-col gap-3">
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
        <div className="flex w-max gap-3 pb-1 md:grid md:w-full md:grid-cols-5 md:gap-2 lg:grid-cols-9">
          {dashboardShortcuts.map((item) => {
            const Icon = item.icon
            const className = cn(
              'relative flex w-[4.75rem] shrink-0 flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-muted/60 md:w-auto',
            )

            const content = (
              <>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground ring-1 ring-border">
                  <Icon className="size-5" />
                </span>
                <span className="line-clamp-2 text-[11px] leading-tight font-medium">
                  {item.title}
                </span>
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute top-1 right-1 h-4 px-1 text-[9px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )

            if (item.url === networkUrl) {
              return (
                <Link
                  key={item.id}
                  to={networkUrl}
                  className={className}
                  title={item.description}
                >
                  {content}
                </Link>
              )
            }

            return (
              <a
                key={item.id}
                href={item.url}
                className={className}
                title={item.description}
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
      <div className="mx-auto h-1 w-8 rounded-full bg-primary/40 md:hidden" />
    </section>
  )
}
