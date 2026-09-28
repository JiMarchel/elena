import { createFileRoute } from '@tanstack/react-router'

import { AccountSecurityPage } from '@/pages/settings'

export const Route = createFileRoute('/_app/settings/account-security')({
  component: AccountSecurityPage,
})
