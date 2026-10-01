import { createFileRoute } from '@tanstack/react-router'

import { ShopPage } from '@/pages/shop'

export const Route = createFileRoute('/_app/shop')({
  component: ShopPage,
})
