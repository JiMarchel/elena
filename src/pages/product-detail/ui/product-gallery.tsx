import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { cn } from 'cn'

import { Button } from '@/shared/ui'

import type { ProductVariant } from '../model/product-detail'

export function ProductGallery({
  images,
  variants,
  activeVariantId,
  onVariantChange,
}: {
  images: string[]
  variants: ProductVariant[]
  activeVariantId: string
  onVariantChange: (id: string) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex] ?? images[0]

  const selectVariant = (variant: ProductVariant, index: number) => {
    onVariantChange(variant.id)
    setActiveIndex(index)
  }

  return (
    <section className="min-w-0 lg:sticky lg:top-20 lg:self-start">
      <div className="relative overflow-hidden bg-muted/30 lg:rounded-2xl">
        <div className="absolute top-3 left-3 z-10 lg:hidden">
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-full bg-background/90 shadow-sm"
            render={<Link to="/" />}
            aria-label="Kembali"
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <span className="absolute right-3 bottom-3 z-10 rounded-full bg-foreground/70 px-2 py-0.5 text-xs text-background">
          {activeIndex + 1}/{images.length}
        </span>
        <img
          src={activeImage}
          alt=""
          className="aspect-square w-full object-cover"
        />
      </div>

      {variants.length > 1 && (
        <div className="mt-2 flex min-w-0 flex-col gap-2 px-1 lg:px-0">
          <p className="text-xs text-muted-foreground">
            {variants.length} variasi tersedia
          </p>
          <div className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {variants.map((variant, index) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => selectVariant(variant, index)}
                  className={cn(
                    'flex w-16 shrink-0 flex-col gap-1 rounded-lg p-1 ring-1 ring-border transition-colors',
                    activeVariantId === variant.id &&
                      'ring-2 ring-primary',
                  )}
                >
                  <img
                    src={variant.img}
                    alt=""
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <span className="line-clamp-2 text-[10px] leading-tight">
                    {variant.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
