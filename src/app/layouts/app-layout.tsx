import type { ReactNode } from 'react'

import { AppSidebar } from './app-sidebar'
import { SiteHeader } from './site-header'
import { SidebarInset } from '@/shared/ui'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </>
  )
}
