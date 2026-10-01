import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { cn } from 'cn'

import type { BinaryPlacement } from '../model/register-form'

const options: {
  value: BinaryPlacement
  label: string
  description: string
  icon: typeof ArrowLeftIcon
}[] = [
  {
    value: 'left',
    label: 'Left / Kiri',
    description: 'Posisi kaki kiri upline',
    icon: ArrowLeftIcon,
  },
  {
    value: 'right',
    label: 'Right / Kanan',
    description: 'Posisi kaki kanan upline',
    icon: ArrowRightIcon,
  },
]

export function PlacementPicker({
  value,
  onChange,
  invalid,
  name = 'placement',
}: {
  value: BinaryPlacement | ''
  onChange: (placement: BinaryPlacement) => void
  invalid?: boolean
  name?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = value === option.value
        const Icon = option.icon
        return (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer flex-col gap-2 rounded-xl border p-3 transition-colors sm:p-4',
              selected
                ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
                : 'border-input bg-card hover:bg-muted/40',
              invalid && !selected && 'border-destructive/50',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="flex items-center gap-2 font-medium">
              <Icon className="size-4 text-primary" />
              {option.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {option.description}
            </span>
          </label>
        )
      })}
    </div>
  )
}
