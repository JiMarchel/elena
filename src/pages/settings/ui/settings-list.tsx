import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from 'cn'

import { Button, Switch } from '@/shared/ui'

export function SettingsPageShell({
  title,
  backTo,
  children,
  className,
}: {
  title: string
  backTo: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-[calc(100dvh-4rem)] w-full min-w-0 max-w-2xl flex-col bg-muted/30 px-3 sm:px-4 lg:min-h-0 lg:max-w-6xl lg:gap-4 lg:bg-transparent lg:px-4 lg:py-4',
        className,
      )}
    >
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background px-0 py-3 lg:-mx-4 lg:rounded-xl lg:border lg:border-b lg:px-4 lg:ring-1 lg:ring-foreground/10">
        <Button
          variant="ghost"
          size="icon-sm"
          className="-ml-1 shrink-0 text-primary"
          render={<Link to={backTo} />}
          aria-label="Kembali"
        >
          <ArrowLeftIcon />
        </Button>
        <h1 className="min-w-0 flex-1 text-base font-medium sm:text-lg">
          {title}
        </h1>
      </header>
      {children}
    </div>
  )
}

export function SettingsSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="mt-2 lg:mt-0 lg:overflow-hidden lg:rounded-xl lg:ring-1 lg:ring-foreground/10">
      <h2 className="bg-muted/80 px-3 py-2 text-xs font-medium text-muted-foreground sm:px-4 lg:bg-muted/60 lg:px-4 lg:py-2.5">
        {title}
      </h2>
      <div className="divide-y bg-card">
        {children}
      </div>
    </section>
  )
}

function SettingsRowBase({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex min-h-12 items-center gap-3 px-3 py-3 sm:px-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SettingsLinkRow({
  label,
  value,
  description,
  to,
  search,
  badge,
}: {
  label: string
  value?: string
  description?: string
  to: string
  search?: Record<string, unknown>
  badge?: ReactNode
}) {
  return (
    <Link
      to={to}
      search={search}
      className="flex min-h-12 items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/40 sm:px-4"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {badge}
        {value && (
          <span className="max-w-[10rem] truncate text-sm text-muted-foreground">
            {value}
          </span>
        )}
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </div>
    </Link>
  )
}

export function SettingsButtonRow({
  label,
  value,
  description,
  onClick,
  badge,
}: {
  label: string
  value?: string
  description?: string
  onClick?: () => void
  badge?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full min-h-12 items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/40 sm:px-4"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {badge}
        {value && (
          <span className="max-w-[10rem] truncate text-sm text-muted-foreground">
            {value}
          </span>
        )}
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </div>
    </button>
  )
}

export function SettingsDisabledRow({
  label,
  value,
  description,
  badge,
}: {
  label: string
  value?: string
  description?: string
  badge?: ReactNode
}) {
  return (
    <SettingsRowBase className="opacity-70">
      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {badge}
        {value && (
          <span className="max-w-[10rem] truncate text-sm text-muted-foreground">
            {value}
          </span>
        )}
        <ChevronRightIcon className="size-4 text-muted-foreground" />
      </div>
    </SettingsRowBase>
  )
}

export function SettingsToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <SettingsRowBase>
      <div className="min-w-0 flex-1">
        <p className="text-sm">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
    </SettingsRowBase>
  )
}
