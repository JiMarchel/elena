import type { ReactNode } from 'react'

import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'
import { SidebarInset, SidebarProvider } from '@/shared/ui'

export function AppLayout({ children }: { children: ReactNode }) {
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
