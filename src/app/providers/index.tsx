import type { ReactNode } from 'react'

import { SidebarProvider, TooltipProvider } from '@/shared/ui'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </TooltipProvider>
  )
}
