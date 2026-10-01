import { createFileRoute } from '@tanstack/react-router'

import { EarningsPage } from '@/pages/earnings'

export const Route = createFileRoute('/_app/earnings/')({
  component: EarningsPage,
})
