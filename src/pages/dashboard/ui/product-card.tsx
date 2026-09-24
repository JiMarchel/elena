import { ShoppingCartIcon, StarIcon } from 'lucide-react'

import type { Product } from '../model/product'
import { formatIDR } from '@/shared/lib'
import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Card>
      <img
        src={product.img}
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
