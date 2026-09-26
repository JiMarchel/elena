import { createFileRoute } from '@tanstack/react-router'

import { CheckoutPage, validateCheckoutSearch } from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/')({
  component: CheckoutPage,
  validateSearch: validateCheckoutSearch,
})
