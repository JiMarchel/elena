import { createFileRoute } from '@tanstack/react-router'

import { SponsorBonusPage } from '@/pages/earnings'

export const Route = createFileRoute('/_app/earnings/sponsor')({
  component: SponsorBonusPage,
})
