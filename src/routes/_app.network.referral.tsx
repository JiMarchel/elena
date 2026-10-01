import { createFileRoute } from '@tanstack/react-router'

import { ReferralPage } from '@/pages/network'

export const Route = createFileRoute('/_app/network/referral')({
  component: ReferralPage,
})
