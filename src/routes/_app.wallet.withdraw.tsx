import { createFileRoute } from '@tanstack/react-router'

import { WithdrawPage } from '@/pages/wallet'

export const Route = createFileRoute('/_app/wallet/withdraw')({
  component: WithdrawPage,
})
