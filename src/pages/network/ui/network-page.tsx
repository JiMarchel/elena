import { useMemo, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { ArrowUpIcon, LocateFixedIcon, SearchIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui'

import {
  currentMemberId,
  findMemberByUsername,
  getAncestors,
  getNetworkTree,
} from '../api/network'
import { MemberTable } from './member-table'
import { NetworkBreadcrumb } from './network-breadcrumb'
import { NetworkSummary } from './network-summary'
import { NetworkTreeView } from './network-tree-view'

/** Hanya 2 level di bawah akar yang dirender sekaligus. */
const VIEW_DEPTH = 2

export function NetworkPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat jaringan"
      description="Data downline dan referral hanya tersedia setelah Anda masuk."
    >
      <NetworkPageContent />
    </RequireAuth>
  )
}

function NetworkPageContent() {
  const navigate = useNavigate()
  const { rootId } = useSearch({ from: '/_app/network/' })
  const [jumpQuery, setJumpQuery] = useState('')
  const [jumpError, setJumpError] = useState<string | null>(null)
  const [tab, setTab] = useState('tree')

  const activeRootId = rootId ?? currentMemberId

  // ponytail: dummy sinkron. Saat backend siap, ganti dengan loader route atau
  // query async — bentuk datanya sudah sama persis.
  const tree = useMemo(
    () => getNetworkTree(activeRootId, VIEW_DEPTH),
    [activeRootId],
  )
  const ancestors = useMemo(() => getAncestors(activeRootId), [activeRootId])

  const setRoot = (memberId: string) => {
    // Disimpan di URL: drill-down jadi shareable dan back-button ikut jalan.
    navigate({
      to: '/network',
      search: memberId === currentMemberId ? {} : { rootId: memberId },
    })
  }

  const handleJump = (event: React.FormEvent) => {
    event.preventDefault()
    const found = findMemberByUsername(jumpQuery)
    if (!found) {
      setJumpError('Member tidak ditemukan di jaringan ini.')
      return
    }
    setJumpError(null)
    setJumpQuery('')
    setRoot(found.id)
  }

  const parentId = tree?.node.parentId ?? null
  const isAtSelf = activeRootId === currentMemberId

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">Jaringan</h1>
        <p className="text-muted-foreground">
          Struktur binary downline Anda. Klik kartu mana pun untuk menjadikannya
          puncak tampilan.
        </p>
      </div>

      {!tree ? (
        <p className="text-muted-foreground">Member tidak ditemukan.</p>
      ) : (
        <Tabs value={tab} onValueChange={setTab} className="gap-4">
          <TabsList>
            <TabsTrigger value="tree">Pohon Jaringan</TabsTrigger>
            <TabsTrigger value="members">Daftar Member</TabsTrigger>
          </TabsList>

          <TabsContent value="tree" className="flex flex-col gap-4">
            <NetworkSummary node={tree.node} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <NetworkBreadcrumb path={ancestors} onNavigate={setRoot} />

              <div className="flex flex-wrap items-center gap-2">
                <form onSubmit={handleJump} className="relative">
                  <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={jumpQuery}
                    onChange={(event) => {
                      setJumpQuery(event.target.value)
                      setJumpError(null)
                    }}
                    placeholder="Lompat ke username"
                    className="w-52 pl-9"
                  />
                </form>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!parentId}
                  onClick={() => parentId && setRoot(parentId)}
                >
                  <ArrowUpIcon className="size-4" />
                  Naik
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isAtSelf}
                  onClick={() => setRoot(currentMemberId)}
                >
                  <LocateFixedIcon className="size-4" />
                  Posisi saya
                </Button>
              </div>
            </div>

            {jumpError ? (
              <p className="text-sm text-destructive">{jumpError}</p>
            ) : null}

            <div className="rounded-lg border bg-muted/20 p-4 sm:p-6">
              <NetworkTreeView
                tree={tree}
                depth={VIEW_DEPTH}
                onDrillDown={setRoot}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Ditampilkan {VIEW_DEPTH} level di bawah puncak. Badge K/N adalah
              jumlah total member di kaki kiri dan kanan node tersebut, termasuk
              level yang belum terlihat.
            </p>
          </TabsContent>

          <TabsContent value="members">
            <MemberTable
              onOpenInTree={(memberId) => {
                setRoot(memberId)
                // Tanpa ini root berubah diam-diam sementara user masih di tabel.
                setTab('tree')
              }}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
