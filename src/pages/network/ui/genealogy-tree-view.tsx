import type { GenealogyTree } from '../model/genealogy-member'
import { GenealogyNodeCard } from './genealogy-node-card'

const MAX_CHILDREN = 4

export function GenealogyTreeView({
  tree,
  depth = 2,
  onDrillDown,
}: {
  tree: GenealogyTree
  depth?: number
  onDrillDown: (memberId: string) => void
}) {
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

function Subtree({
  tree,
  remaining,
  isRoot = false,
  onDrillDown,
}: {
  tree: GenealogyTree
  remaining: number
  isRoot?: boolean
  onDrillDown: (memberId: string) => void
}) {
  const visibleChildren =
    remaining > 0 ? tree.children.slice(0, MAX_CHILDREN) : []
  const hiddenCount = Math.max(0, tree.children.length - visibleChildren.length)

  return (
    <div className="flex flex-col items-center">
      <GenealogyNodeCard
        node={tree.node}
        emphasis={isRoot}
        onDrillDown={onDrillDown}
      />

      {remaining > 0 && tree.children.length > 0 ? (
        <>
          <span aria-hidden className="h-5 w-px bg-muted-foreground/25" />
          <div className="relative flex items-start gap-3 pt-0">
            {visibleChildren.length > 1 ? (
              <span
                aria-hidden
                className="absolute top-0 left-4 right-4 h-px bg-muted-foreground/25"
              />
            ) : null}
            {visibleChildren.map((child) => (
              <div key={child.node.id} className="flex flex-col items-center">
                <span aria-hidden className="h-3 w-px bg-muted-foreground/25" />
                <Subtree
                  tree={child}
                  remaining={remaining - 1}
                  onDrillDown={onDrillDown}
                />
              </div>
            ))}
            {hiddenCount > 0 ? (
              <div className="flex h-full min-w-24 items-center justify-center rounded-lg border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
                +{hiddenCount} referral
                <br />
                lainnya
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
