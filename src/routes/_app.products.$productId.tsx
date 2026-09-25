import { createFileRoute } from '@tanstack/react-router'

import { getProductById } from '@/entities/product'
import { ProductDetailPage, ProductNotFound } from '@/pages/product-detail'

export const Route = createFileRoute('/_app/products/$productId')({
  component: ProductDetailRoute,
})

function ProductDetailRoute() {
  const { productId } = Route.useParams()
  const product = getProductById(Number(productId))

  if (!product) return <ProductNotFound />

  return <ProductDetailPage product={product} />
}
