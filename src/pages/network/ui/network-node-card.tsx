import { ChevronsDownIcon, UserPlusIcon } from 'lucide-react'
import { cn } from 'cn'

import { Badge } from '@/shared/ui'

import type { NetworkNode } from '../model/network-member'
import { formatCount } from '../model/network-format'

type NetworkNodeCardProps = {
  node: NetworkNode
  /** Node akar viewport dirender lebih besar sebagai penanda posisi. */
  emphasis?: boolean
  onDrillDown: (memberId: string) => void
}

export function NetworkNodeCard({
  node,
  emphasis = false,
  onDrillDown,
}: NetworkNodeCardProps) {
  const { stats } = node

  return (
    <button
      type="button"
      onClick={() => onDrillDown(node.id)}
      title={`Jadikan ${node.username} sebagai puncak tampilan`}
      className={cn(
        'flex w-36 flex-col gap-2 rounded-lg border bg-card p-3 text-left transition-colors sm:w-44',
        'hover:border-primary/60 hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        emphasis && 'border-primary/50 shadow-sm',
      )}
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={cn(
            'size-2 shrink-0 rounded-full',
            node.status === 'active'
              ? 'bg-emerald-500'
              : 'bg-muted-foreground/40',
          )}
        />
        <span className="truncate text-sm font-medium">{node.username}</span>
      </div>

      <span className="truncate text-xs text-muted-foreground">
        {node.name}
      </span>

      <div className="flex items-center gap-1">
        <Badge variant="secondary" className="px-1.5 font-mono text-[11px]">
          K {formatCount(stats.leftCount)}
        </Badge>
        <Badge variant="secondary" className="px-1.5 font-mono text-[11px]">
          N {formatCount(stats.rightCount)}
        </Badge>
      </div>

      {node.hasChildren ? (
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <ChevronsDownIcon className="size-3" />
          {formatCount(stats.totalDownline)} downline
        </span>
      ) : (
        <span className="text-[11px] text-muted-foreground">
          Belum punya downline
        </span>
      )}
    </button>
  )
}

type EmptySlotCardProps = {
  side: 'left' | 'right'
}

export function EmptySlotCard({ side }: EmptySlotCardProps) {
  return (
    <div className="flex w-36 flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-muted/20 p-3 text-center sm:w-44">
      <UserPlusIcon className="size-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">
        Slot {side === 'left' ? 'kiri' : 'kanan'} kosong
      </span>
    </div>
  )
}
