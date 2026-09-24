import { Outlet, createRootRoute } from '@tanstack/react-router'

import { Devtools } from '@/app/devtools'
import { AppLayout } from '@/app/layouts'
import { AppProviders } from '@/app/providers'

import '@/app/styles/globals.css'

export const Route = createRootRoute({ component: RootRoute })

function RootRoute() {
  return (
    <AppProviders>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <Devtools />
    </AppProviders>
  )
}
