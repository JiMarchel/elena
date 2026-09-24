import { createFileRoute } from '@tanstack/react-router'
import { ShoppingCartIcon, StarIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Product } from '@/lib/products'
import { formatIDR, imageUrl, products } from '@/lib/products'

export const Route = createFileRoute('/')({ component: Dashboard })

function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-muted-foreground">
          {products.length} parfum tersedia di Enela
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Card>
      <img
        src={imageUrl(product.img)}
        alt={product.title}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>
          {product.brand} · {product.volumeMl} ml
        </CardDescription>
        {discount > 0 && (
          <CardAction>
            <Badge variant="secondary">-{discount}%</Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="truncate text-sm text-muted-foreground">
          {product.notes}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            <StarIcon />
            {product.rating}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {product.reviews} ulasan
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex flex-col">
          <span className="font-medium">{formatIDR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatIDR(product.originalPrice)}
            </span>
          )}
        </div>
        <Button size="sm">
          <ShoppingCartIcon data-icon="inline-start" />
          Beli
        </Button>
      </CardFooter>
    </Card>
  )
}
