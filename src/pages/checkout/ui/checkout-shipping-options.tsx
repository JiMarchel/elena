import { CheckIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'

import type { ShippingOption } from '../model/checkout'

export function CheckoutShippingOptions({
  options,
  selectedId,
  onSelect,
}: {
  options: ShippingOption[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="px-3 py-3 sm:px-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Opsi Pengiriman</span>
        <button type="button" className="text-xs text-primary">
          Lihat Semua
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.id === selectedId
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={`relative rounded-lg border p-3 text-left transition-colors ${
                selected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {selected && (
                <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon className="size-2.5" />
                </span>
              )}
              <p className="text-xs text-muted-foreground">{option.estimate}</p>
              <p className="mt-0.5 text-sm font-medium">{option.label}</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                {option.originalFee > option.fee && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatIDR(option.originalFee)}
                  </span>
                )}
                <span className="text-sm font-medium text-primary">
                  {option.fee === 0 ? 'Rp0' : formatIDR(option.fee)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
      {options.find((option) => option.id === selectedId)?.note && (
        <p className="mt-2 text-xs text-muted-foreground">
          {options.find((option) => option.id === selectedId)?.note}
        </p>
      )}
    </div>
  )
}
