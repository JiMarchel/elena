import { createFileRoute } from '@tanstack/react-router'

import { AddressListPage, validateAddressListSearch } from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/addresses/')({
  component: AddressListPage,
  validateSearch: validateAddressListSearch,
})
