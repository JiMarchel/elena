import type { NetworkTree } from '../model/network-member'
import { EmptySlotCard, NetworkNodeCard } from './network-node-card'

type NetworkTreeViewProps = {
  tree: NetworkTree
  /** Berapa level di bawah akar yang digambar. Dijaga kecil (2) supaya muat layar. */
  depth?: number
  onDrillDown: (memberId: string) => void
}

/**
 * Menggambar potongan pohon, bukan keseluruhan jaringan: akar + `depth` level.
 * Penelusuran lebih dalam dilakukan lewat drill-down, bukan dengan memperbesar
 * kanvas — jaringan binary tumbuh eksponensial dan tidak akan pernah muat.
 */
export function NetworkTreeView({
  tree,
  depth = 2,
  onDrillDown,
}: NetworkTreeViewProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="mx-auto w-fit min-w-full px-2">
        <Subtree
          tree={tree}
          remaining={depth}
          isRoot
          onDrillDown={onDrillDown}
        />
      </div>
    </div>
  )
}

type SubtreeProps = {
  tree: NetworkTree
  remaining: number
  isRoot?: boolean
  onDrillDown: (memberId: string) => void
}

function Subtree({
  tree,
  remaining,
  isRoot = false,
  onDrillDown,
}: SubtreeProps) {
  const showChildren = remaining > 0

  return (
    <div className="flex flex-col items-center">
      <NetworkNodeCard
        node={tree.node}
        emphasis={isRoot}
        onDrillDown={onDrillDown}
      />

      {showChildren ? (
        <>
          {/* Batang turun dari node ke garis penghubung anak. */}
          <span aria-hidden className="h-5 w-px bg-muted-foreground/25" />
          <div className="flex items-stretch">
            <Branch side="left" remaining={remaining} onDrillDown={onDrillDown}>
              {tree.left}
            </Branch>
            <Branch
              side="right"
              remaining={remaining}
              onDrillDown={onDrillDown}
            >
              {tree.right}
            </Branch>
          </div>
        </>
      ) : null}
    </div>
  )
}

type BranchProps = {
  side: 'left' | 'right'
  remaining: number
  children: NetworkTree | null
  onDrillDown: (memberId: string) => void
}

function Branch({ side, remaining, children, onDrillDown }: BranchProps) {
  return (
    <div className="relative flex flex-1 basis-0 flex-col items-center px-2 pt-5 sm:px-3">
      {/* Separuh garis horizontal: bertemu di tengah karena kedua sisi flex-1. */}
      <span
        aria-hidden
        className={
          side === 'left'
            ? 'absolute top-0 right-0 left-1/2 h-px bg-muted-foreground/25'
            : 'absolute top-0 right-1/2 left-0 h-px bg-muted-foreground/25'
        }
      />
      {/* Batang turun ke kartu anak. */}
      <span
        aria-hidden
        className="absolute top-0 left-1/2 h-5 w-px bg-muted-foreground/25"
      />

      {children ? (
        <Subtree
          tree={children}
          remaining={remaining - 1}
          onDrillDown={onDrillDown}
        />
      ) : (
        <EmptySlotCard side={side} />
      )}
    </div>
  )
}
