import { createFileRoute } from '@tanstack/react-router'

import { AffiliateDashboardPage } from '@/pages/dashboard'

export const Route = createFileRoute('/_app/dashboard')({
  component: AffiliateDashboardPage,
})
