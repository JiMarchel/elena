import { products } from '../api/catalog'
import { ProductCard } from './product-card'

export function DashboardPage() {
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
