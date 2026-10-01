import { createFileRoute } from '@tanstack/react-router'

import { GenealogyPage, validateGenealogySearch } from '@/pages/network'

export const Route = createFileRoute('/_app/network/genealogy')({
  component: GenealogyPage,
  validateSearch: validateGenealogySearch,
})
