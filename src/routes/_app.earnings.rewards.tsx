import { createFileRoute } from '@tanstack/react-router'

import { RewardsPage } from '@/pages/earnings'

export const Route = createFileRoute('/_app/earnings/rewards')({
  component: RewardsPage,
})
