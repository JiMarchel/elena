import { Link } from '@tanstack/react-router'
import { NetworkIcon } from 'lucide-react'

import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui'

import type { DirectReferralRow } from '../api/genealogy'
import { genealogyRankLabels } from '../model/genealogy-member'
import { formatCount, formatJoinDate } from '../model/network-format'

export function GenealogyDirectTable({
  rows,
  onOpenInTree,
}: {
  rows: DirectReferralRow[]
  onOpenInTree: (memberId: string) => void
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
        Belum ada referral langsung di posisi ini.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">Downline</TableHead>
            <TableHead>Bergabung</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="min-w-0">
                  <p className="font-medium">{row.username}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {row.name} · {row.id}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px]">
                  {genealogyRankLabels[row.rank]}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCount(row.totalDownline)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatJoinDate(row.joinedAt)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={row.status === 'active' ? 'secondary' : 'outline'}
                  className="text-[10px]"
                >
                  {row.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => onOpenInTree(row.id)}
                  >
                    Pohon
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    type="button"
                    render={
                      <Link to="/network" search={{ rootId: row.id }} />
                    }
                    aria-label="Lihat binary tree"
                    title="Binary tree"
                  >
                    <NetworkIcon className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
