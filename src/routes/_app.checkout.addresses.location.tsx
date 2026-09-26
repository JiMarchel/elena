import { createFileRoute } from '@tanstack/react-router'

import { AddressLocationPage, validateLocationSearch } from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/addresses/location')({
  component: AddressLocationPage,
  validateSearch: validateLocationSearch,
})
