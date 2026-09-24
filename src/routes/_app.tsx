import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppLayout } from '@/app/layouts'

export const Route = createFileRoute('/_app')({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
})
