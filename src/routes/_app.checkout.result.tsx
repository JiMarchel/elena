import { createFileRoute } from '@tanstack/react-router'

import {
  CheckoutResultPage,
  validateCheckoutResultSearch,
} from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/result')({
  component: CheckoutResultPage,
  validateSearch: validateCheckoutResultSearch,
})
