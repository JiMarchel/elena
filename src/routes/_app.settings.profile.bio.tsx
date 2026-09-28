import { createFileRoute } from '@tanstack/react-router'

import { ProfileBioPage } from '@/pages/settings'

export const Route = createFileRoute('/_app/settings/profile/bio')({
  component: ProfileBioPage,
})
