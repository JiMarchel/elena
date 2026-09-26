import { Link } from '@tanstack/react-router'
import { LogOutIcon, UserCircleIcon } from 'lucide-react'

import { useAuth } from '@/shared/auth'
import { Button, SidebarTrigger } from '@/shared/ui'

import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {isAuthenticated && user ? (
          <>
            <span className="hidden max-w-32 truncate text-sm text-muted-foreground sm:inline">
              {user.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOutIcon data-icon="inline-start" />
              Keluar
            </Button>
            <Button size="icon-sm" aria-label="Profil">
              <UserCircleIcon />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" render={<Link to="/login" />}>
              Masuk
            </Button>
            <Button render={<Link to="/register" />}>Daftar</Button>
          </>
        )}
      </div>
    </header>
  )
}
