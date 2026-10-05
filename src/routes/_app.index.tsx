import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from '@/pages/landing'

export const Route = createFileRoute('/_app/')({
  component: LandingPage,
})
