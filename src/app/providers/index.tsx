import type { ReactNode } from 'react'

import { TooltipProvider } from '@/shared/ui'

export function AppProviders({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
