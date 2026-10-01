import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { cn } from 'cn'

import type { AppRoutePath } from '@/shared/config/app-routes'
import { Button } from '@/shared/ui/button'

export function PageShell({
  title,
  description,
  backTo = '/',
  children,
  className,
}: {
  title: string
  description?: string
  backTo?: AppRoutePath
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-4 p-3 pb-8 sm:p-4 lg:gap-5',
        className,
      )}
    >
      <header className="flex items-start gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0"
          render={<Link to={backTo} />}
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium sm:text-xl">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </header>
      {children}
    </div>
  )
}
