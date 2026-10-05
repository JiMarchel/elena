import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'

import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'
import { SidebarInset, SidebarProvider } from '@/shared/ui'

export function AppLayout({ children }: { children: ReactNode }) {
  const isLanding = useRouterState({
    select: (state) => state.location.pathname === '/',
  })

  if (isLanding) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
