import { createFileRoute } from '@tanstack/react-router'

import { ProfileGenderPage } from '@/pages/settings'

export const Route = createFileRoute('/_app/settings/profile/gender')({
  component: ProfileGenderPage,
})
