import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import {
  ArrowUpIcon,
  LocateFixedIcon,
  NetworkIcon,
  SearchIcon,
} from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import {
  Button,
  Input,
  PageShell,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui'

import {
  currentGenealogyMemberId,
  findGenealogyMember,
  getGenealogyTree,
  getGenealogyUpline,
  listDirectReferralRows,
} from '../api/genealogy'
import { GenealogyBreadcrumb } from './genealogy-breadcrumb'
import { GenealogyDirectTable } from './genealogy-direct-table'
import { GenealogySummary } from './genealogy-summary'
import { GenealogyTreeView } from './genealogy-tree-view'

const VIEW_DEPTH = 2

export function GenealogyPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat genealogy"
      description="Genealogy sponsor hanya tersedia setelah Anda masuk."
    >
      <GenealogyPageContent />
    </RequireAuth>
  )
}

function GenealogyPageContent() {
  const navigate = useNavigate()
  const { rootId } = useSearch({ from: '/_app/network/genealogy' })
  const [jumpQuery, setJumpQuery] = useState('')
  const [jumpError, setJumpError] = useState<string | null>(null)
  const [tab, setTab] = useState('tree')

  const activeRootId = rootId ?? currentGenealogyMemberId
  const tree = useMemo(
    () => getGenealogyTree(activeRootId, VIEW_DEPTH),
    [activeRootId],
  )
  const upline = useMemo(
    () => getGenealogyUpline(activeRootId),
    [activeRootId],
  )
  const directRows = useMemo(
    () => listDirectReferralRows(activeRootId),
    [activeRootId],
  )

  const setRoot = (memberId: string) => {
    navigate({
      to: '/network/genealogy',
      search: memberId === currentGenealogyMemberId ? {} : { rootId: memberId },
    })
  }

  const handleJump = (event: React.FormEvent) => {
    event.preventDefault()
    const found = findGenealogyMember(jumpQuery)
    if (!found) {
      setJumpError('Member tidak ditemukan di genealogy.')
      return
    }
    setJumpError(null)
    setJumpQuery('')
    setRoot(found.id)
  }

  const sponsorId = tree?.node.sponsorId ?? null
  const isAtSelf = activeRootId === currentGenealogyMemberId

  return (
    <PageShell
      title="Genealogy"
      description="Pohon sponsor menunjukkan siapa mensponsori siapa — terpisah dari posisi binary kiri/kanan."
      backTo="/network"
    >
      <div className="flex flex-col gap-2 rounded-xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Genealogy</strong> = hubungan
          sponsor (unilevel).{' '}
          <strong className="text-foreground">Binary tree</strong> = placement
          kiri/kanan.
        </p>
        <Link
          to="/network"
          search={activeRootId === currentGenealogyMemberId ? {} : { rootId: activeRootId }}
          className="inline-flex w-fit items-center gap-1 text-primary hover:underline"
        >
          <NetworkIcon className="size-3.5" />
          Lihat posisi binary member ini
        </Link>
      </div>

      {!tree ? (
        <p className="text-muted-foreground">Member tidak ditemukan.</p>
      ) : (
        <Tabs value={tab} onValueChange={setTab} className="gap-4">
          <TabsList>
            <TabsTrigger value="tree">Pohon Sponsor</TabsTrigger>
            <TabsTrigger value="direct">
              Referral Langsung ({directRows.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tree" className="flex flex-col gap-4">
            <GenealogySummary node={tree.node} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <GenealogyBreadcrumb path={upline} onNavigate={setRoot} />

              <div className="flex flex-wrap items-center gap-2">
                <form onSubmit={handleJump} className="relative">
                  <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={jumpQuery}
                    onChange={(event) => {
                      setJumpQuery(event.target.value)
                      setJumpError(null)
                    }}
                    placeholder="Cari username / ID"
                    className="w-52 pl-9"
                  />
                </form>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!sponsorId}
                  onClick={() => sponsorId && setRoot(sponsorId)}
                >
                  <ArrowUpIcon className="size-4" />
                  Ke sponsor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isAtSelf}
                  onClick={() => setRoot(currentGenealogyMemberId)}
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
              <GenealogyTreeView
                tree={tree}
                depth={VIEW_DEPTH}
                onDrillDown={setRoot}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Ditampilkan {VIEW_DEPTH} level downline sponsor. Klik kartu untuk
              drill-down. Maks. 4 referral langsung per baris — sisanya
              digabung.
            </p>
          </TabsContent>

          <TabsContent value="direct">
            <GenealogyDirectTable
              rows={directRows}
              onOpenInTree={(memberId) => {
                setRoot(memberId)
                setTab('tree')
              }}
            />
          </TabsContent>
        </Tabs>
      )}
    </PageShell>
  )
}
