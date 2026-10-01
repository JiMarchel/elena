import { createFileRoute } from '@tanstack/react-router'

import { PairingBonusPage } from '@/pages/earnings'

export const Route = createFileRoute('/_app/earnings/pairing')({
  component: PairingBonusPage,
})
