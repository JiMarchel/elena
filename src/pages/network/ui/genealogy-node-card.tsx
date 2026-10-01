import { UsersIcon } from 'lucide-react'
import { cn } from 'cn'

import { Badge } from '@/shared/ui'

import type { GenealogyNode } from '../model/genealogy-member'
import { genealogyRankLabels } from '../model/genealogy-member'
import { formatCount } from '../model/network-format'

export function GenealogyNodeCard({
  node,
  emphasis = false,
  onDrillDown,
}: {
  node: GenealogyNode
  emphasis?: boolean
  onDrillDown: (memberId: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onDrillDown(node.id)}
      title={`Lihat downline sponsor ${node.username}`}
      className={cn(
        'flex w-40 flex-col gap-2 rounded-lg border bg-card p-3 text-left transition-colors sm:w-44',
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

      <span className="truncate text-xs text-muted-foreground">{node.name}</span>

      <Badge variant="secondary" className="w-fit text-[10px]">
        {genealogyRankLabels[node.rank]}
      </Badge>

      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <UsersIcon className="size-3" />
        {formatCount(node.stats.directReferrals)} direct ·{' '}
        {formatCount(node.stats.totalDownline)} total
      </div>
    </button>
  )
}
