import { createFileRoute } from '@tanstack/react-router'

import { AddressFormPage, validateAddressFormSearch } from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/addresses/new')({
  component: AddressFormPage,
  validateSearch: validateAddressFormSearch,
})
