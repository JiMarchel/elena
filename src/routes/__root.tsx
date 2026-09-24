import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Devtools } from '@/app/devtools'
import { AppProviders } from '@/app/providers'

import '@/app/styles/globals.css'

export const Route = createRootRoute({ component: RootRoute })

function RootRoute() {
  return (
    <AppProviders>
      <Outlet />
      <Devtools />
    </AppProviders>
  )
}
