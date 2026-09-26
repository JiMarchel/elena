import { Link, useRouterState } from '@tanstack/react-router'
import { cn } from 'cn'

import { useAuth } from '@/shared/auth'
import { Badge } from '@/shared/ui'

import { dashboardShortcuts } from '../model/dashboard-shortcuts'

export function ShortcutMenu() {
  const { isAuthenticated } = useAuth()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const loginSearch = { redirect: pathname }

  return (
    <section className="min-w-0 flex flex-col gap-2">
      <div className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 pb-0.5 sm:gap-3 md:w-full md:max-w-none md:grid md:grid-cols-5 md:gap-2 lg:grid-cols-9">
          {dashboardShortcuts.map((item) => {
            const Icon = item.icon
            const needsAuth = item.url.startsWith('/')
            const className = cn(
              'relative flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5 rounded-xl p-1.5 text-center transition-colors hover:bg-muted/60 sm:w-[4.75rem] md:w-auto md:gap-2 md:p-2',
            )

            const content = (
              <>
                <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground ring-1 ring-border sm:size-11">
                  <Icon className="size-5" />
                </span>
                <span className="line-clamp-2 w-full text-[10px] leading-tight font-medium sm:text-[11px]">
                  {item.title}
                </span>
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute top-0.5 right-0.5 h-4 px-1 text-[9px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )

            if (item.url.startsWith('/')) {
              if (needsAuth && !isAuthenticated) {
                return (
                  <Link
                    key={item.id}
                    to="/login"
                    search={loginSearch}
                    className={className}
                    title={item.description}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <Link
                  key={item.id}
                  to={item.url}
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
