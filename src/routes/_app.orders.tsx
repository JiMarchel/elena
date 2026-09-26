import { createFileRoute } from '@tanstack/react-router'

import { OrdersPage, validateOrderSearch } from '@/pages/orders'

export const Route = createFileRoute('/_app/orders')({
  component: OrdersPage,
  validateSearch: validateOrderSearch,
})
