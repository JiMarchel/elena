import { createFileRoute } from '@tanstack/react-router'

import { NetworkPage, validateNetworkSearch } from '@/pages/network'

export const Route = createFileRoute('/_app/network/')({
  component: NetworkPage,
  validateSearch: validateNetworkSearch,
})
