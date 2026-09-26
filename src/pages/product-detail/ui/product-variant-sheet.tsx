import { useState } from 'react'
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react'

import type { Product } from '@/entities/product'
import { formatIDR } from '@/shared/lib'
import { Badge, Button, Sheet, SheetContent } from '@/shared/ui'

import type { ProductVariant } from '../model/product-detail'

const MAX_QTY = 10

type ProductVariantSheetProps = {
  product: Product
  variants: ProductVariant[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (variantId: string, quantity: number) => void
}

export function ProductVariantSheet({
  product,
  variants,
  open,
  onOpenChange,
  onConfirm,
}: ProductVariantSheetProps) {
  const [selectedVariant, setSelectedVariant] = useState(String(product.id))
  const [quantity, setQuantity] = useState(1)

  const currentVariant = variants.find((v) => v.id === selectedVariant)
  const total = product.price * quantity

  const decrease = () => setQuantity((value) => Math.max(1, value - 1))
  const increase = () => setQuantity((value) => Math.min(MAX_QTY, value + 1))

  const handleConfirm = () => {
    onConfirm(selectedVariant, quantity)
    onOpenChange(false)
  }

  // Hitung stok yang tersisa (mock data — sesuaikan dengan data real)
  const stockRemaining = product.inStock ? 847 : 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[85vh] flex-col gap-0 p-0"
      >
        {/* Header dengan close button */}
        <div className="flex items-start justify-between border-b p-4">
          <div className="flex gap-3">
            <img
              src={currentVariant ? currentVariant.img : product.img}
              alt={product.title}
              className="size-20 rounded-lg object-cover ring-1 ring-border"
            />
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold text-primary">
                {formatIDR(product.price)}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatIDR(product.originalPrice)}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Stok: {stockRemaining}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onOpenChange(false)}
            aria-label="Tutup"
          >
            <XIcon />
          </Button>
        </div>

        {/* Content area — scrollable */}
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          {/* Variant selection */}
          {variants.length > 1 && (
            <div>
              <h3 className="mb-3 text-sm font-medium">Pilihan</h3>
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`flex items-center gap-2 rounded-lg border p-3 text-left transition-colors ${
                      selectedVariant === variant.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={variant.img}
                      alt={variant.label}
                      className="size-12 shrink-0 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {variant.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Jumlah</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  aria-label="Kurangi jumlah"
                  className="size-9"
                >
                  <MinusIcon className="size-4" />
                </Button>
                <span className="w-12 text-center text-base font-medium tabular-nums">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increase}
                  disabled={quantity >= MAX_QTY || !product.inStock}
                  aria-label="Tambah jumlah"
                  className="size-9"
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Maks. {MAX_QTY} per pembelian
              </p>
            </div>
          </div>

          {/* Product info badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Official Store</Badge>
            <Badge variant="outline">{product.concentration}</Badge>
            {!product.inStock && (
              <Badge variant="destructive">Stok habis</Badge>
            )}
          </div>
        </div>

        {/* Footer — sticky bottom button */}
        <div className="border-t bg-background p-4">
          <Button
            size="lg"
            disabled={!product.inStock}
            onClick={handleConfirm}
            className="w-full text-base font-semibold"
          >
            {product.inStock ? `Beli Sekarang · ${formatIDR(total)}` : 'Stok habis'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
