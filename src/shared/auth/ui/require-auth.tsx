import type { ReactNode } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { LogInIcon, ShieldCheckIcon } from 'lucide-react'

import { Button } from '@/shared/ui'

import { useAuth } from './auth-provider'

export function RequireAuth({
  children,
  title = 'Masuk diperlukan',
  description = 'Fitur ini hanya tersedia setelah Anda masuk ke akun Enela.',
}: {
  children: ReactNode
  title?: string
  description?: string
}) {
  const { isAuthenticated } = useAuth()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (isAuthenticated) return children

  const loginSearch = { redirect: pathname }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-16 text-center md:py-24">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <ShieldCheckIcon className="size-6 text-muted-foreground" />
      </div>
      <div className="flex max-w-md flex-col gap-1">
        <h1 className="text-xl font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button render={<Link to="/login" search={loginSearch} />}>
          <LogInIcon data-icon="inline-start" />
          Masuk
        </Button>
        <Button variant="outline" render={<Link to="/register" />}>
          Daftar
        </Button>
      </div>
    </div>
  )
}
