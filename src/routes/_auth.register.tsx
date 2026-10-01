import { createFileRoute } from '@tanstack/react-router'

import { RegisterPage, validateRegisterSearch } from '@/pages/register'

export const Route = createFileRoute('/_auth/register')({
  component: RegisterPage,
  validateSearch: validateRegisterSearch,
})
