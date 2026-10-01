import {
  ArrowDownToLineIcon,
  ArrowUpFromLineIcon,
  PlusIcon,
  QrCodeIcon,
} from 'lucide-react'
import { cn } from 'cn'

import type { WalletActionMode } from './wallet-action-sheet'

const actions: {
  id: WalletActionMode
  label: string
  icon: typeof PlusIcon
  accent?: boolean
}[] = [
  { id: 'deposit', label: 'Top Up', icon: PlusIcon, accent: true },
  { id: 'withdraw', label: 'Tarik', icon: ArrowDownToLineIcon },
  { id: 'send', label: 'Kirim', icon: ArrowUpFromLineIcon },
  { id: 'receive', label: 'Terima', icon: QrCodeIcon },
]

export function WalletQuickActions({
  onAction,
}: {
  onAction: (mode: WalletActionMode) => void
}) {
  return (
    <section className="grid grid-cols-4 gap-2 sm:gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onAction(action.id)}
          className="flex flex-col items-center gap-2 rounded-xl bg-card px-2 py-3 ring-1 ring-foreground/10 transition-colors hover:bg-muted/40 sm:py-4"
        >
          <span
            className={cn(
              'flex size-11 items-center justify-center rounded-full',
              action.accent
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/10 text-primary',
            )}
          >
            <action.icon className="size-5" />
          </span>
          <span className="text-xs font-medium sm:text-sm">{action.label}</span>
        </button>
      ))}
    </section>
  )
}
