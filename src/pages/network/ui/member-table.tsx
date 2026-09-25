import { useMemo, useState } from 'react'
import { NetworkIcon, SearchIcon } from 'lucide-react'

import {
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'

import { listMembers } from '../api/network'
import { formatCount, formatJoinDate } from '../model/network-format'

const PAGE_SIZE = 10

type MemberTableProps = {
  onOpenInTree: (memberId: string) => void
}

/**
 * Pohon untuk memahami struktur, tabel untuk mencari orang tertentu.
 * Dua kebutuhan berbeda — jangan dipaksa jadi satu UI.
 */
export function MemberTable({ onOpenInTree }: MemberTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // ponytail: saat backend siap, ganti jadi query server-side (search + page
  // dikirim sebagai query param) supaya tidak pernah menarik seluruh jaringan.
  const { items, total } = useMemo(
    () => listMembers({ search, page, pageSize: PAGE_SIZE }),
    [search, page],
  )

  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="flex flex-col gap-3">
      <div className="relative max-w-sm">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            setPage(1)
          }}
          placeholder="Cari username, nama, atau ID member"
          className="pl-9"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Upline</TableHead>
              <TableHead>Kaki</TableHead>
              <TableHead className="text-right">Level</TableHead>
              <TableHead className="text-right">Downline</TableHead>
              <TableHead>Bergabung</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada member yang cocok.
                </TableCell>
              </TableRow>
            ) : (
              items.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{member.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {member.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.uplineUsername ?? '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.position === 'left'
                      ? 'Kiri'
                      : member.position === 'right'
                        ? 'Kanan'
                        : '—'}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {member.level}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCount(member.totalDownline)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatJoinDate(member.joinedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === 'active' ? 'secondary' : 'outline'
                      }
                    >
                      {member.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onOpenInTree(member.id)}
                      title="Lihat di pohon jaringan"
                    >
                      <NetworkIcon className="size-4" />
                      <span className="sr-only sm:not-sr-only">Lihat</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {formatCount(total)} member · halaman {page} dari {lastPage}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= lastPage}
            onClick={() => setPage((current) => current + 1)}
          >
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  )
}
