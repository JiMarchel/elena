import { createFileRoute } from '@tanstack/react-router'

import { ProfileEditPage } from '@/pages/settings'

export const Route = createFileRoute('/_app/settings/profile/')({
  component: ProfileEditPage,
})
