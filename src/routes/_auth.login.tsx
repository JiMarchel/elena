import { createFileRoute } from '@tanstack/react-router'

import { LoginPage, validateLoginSearch } from '@/pages/login'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
  validateSearch: validateLoginSearch,
})
