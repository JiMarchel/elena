import type { ReactNode } from 'react'

import { AuthProvider } from '@/shared/auth'
import { TooltipProvider } from '@/shared/ui'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  )
}
