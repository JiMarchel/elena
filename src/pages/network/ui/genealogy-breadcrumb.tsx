import { ChevronRightIcon, HomeIcon } from 'lucide-react'

import { Button } from '@/shared/ui'

import type { GenealogyMember } from '../model/genealogy-member'

export function GenealogyBreadcrumb({
  path,
  onNavigate,
}: {
  path: GenealogyMember[]
  onNavigate: (memberId: string) => void
}) {
  const shortened =
    path.length > 4
      ? [path[0], null, ...path.slice(-2)]
      : (path as Array<GenealogyMember | null>)

  return (
    <nav
      aria-label="Jalur sponsor"
      className="flex flex-wrap items-center gap-0.5 text-sm"
    >
      {shortened.map((member, index) => {
        const isLast = index === shortened.length - 1

        if (!member) {
          return (
            <span key="ellipsis" className="flex items-center gap-0.5">
              <ChevronRightIcon className="size-3.5 text-muted-foreground" />
              <span className="px-1 text-muted-foreground">…</span>
            </span>
          )
        }

        return (
          <span key={member.id} className="flex items-center gap-0.5">
            {index > 0 ? (
              <ChevronRightIcon className="size-3.5 text-muted-foreground" />
            ) : null}
            {isLast ? (
              <span className="px-2 py-1 font-medium">{member.username}</span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 font-normal text-muted-foreground"
                onClick={() => onNavigate(member.id)}
              >
                {index === 0 ? <HomeIcon className="size-3.5" /> : null}
                {member.username}
              </Button>
            )}
          </span>
        )
      })}
    </nav>
  )
}
