import { createFileRoute } from '@tanstack/react-router'

import { WalletPage, validateWalletSearch } from '@/pages/wallet'

export const Route = createFileRoute('/_app/wallet/')({
  component: WalletPage,
  validateSearch: validateWalletSearch,
})
