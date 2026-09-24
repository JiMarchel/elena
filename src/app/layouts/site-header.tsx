import { Link } from '@tanstack/react-router'

import { ThemeToggle } from './theme-toggle'
import { Button, SidebarTrigger } from '@/shared/ui'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="outline" render={<Link to="/login" />}>
          Masuk
        </Button>
        <Button render={<Link to="/register" />}>Daftar</Button>
      </div>
    </header>
  )
}
