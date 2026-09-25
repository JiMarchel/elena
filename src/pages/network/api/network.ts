import type {
  LegPosition,
  NetworkMember,
  NetworkNode,
  NetworkStats,
  NetworkTree,
} from '../model/network-member'

// ponytail: seluruh isi file ini dummy. Saat backend siap, ganti badan tiap
// fungsi di bagian "Query" dengan fetch ke endpoint yang bentuknya sudah sama:
//   GET /network/tree?rootId=&depth=      -> NetworkTree
//   GET /network/ancestors?memberId=      -> Array<NetworkMember>
//   GET /network/members?page=&search=    -> { items, total }

const FIRST = [
  'Andi',
  'Siti',
  'Budi',
  'Rina',
  'Dimas',
  'Putri',
  'Agus',
  'Maya',
  'Rizki',
  'Dewi',
  'Fajar',
  'Lestari',
  'Hendra',
  'Nadia',
  'Yoga',
  'Intan',
  'Bayu',
  'Sari',
  'Galih',
  'Wulan',
]

const LAST = [
  'Pratama',
  'Wijaya',
  'Kusuma',
  'Santoso',
  'Hidayat',
  'Permana',
  'Nugroho',
  'Saputra',
  'Anggraini',
  'Ramadhan',
]

/** LCG sederhana supaya data dummy selalu sama di tiap reload. */
function makeRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const MAX_DEPTH = 9
const TOTAL_MEMBERS = 260

function generateMembers(): Array<NetworkMember> {
  const random = makeRandom(20260925)
  const now = new Date('2026-09-25T00:00:00+07:00')

  const id = (n: number) => `ENL${String(n).padStart(4, '0')}`

  const root: NetworkMember = {
    id: id(1),
    username: 'jimarchel',
    name: 'Moch Jimmy Marchel',
    parentId: null,
    position: null,
    joinedAt: '2024-02-14',
    status: 'active',
  }

  const members: Array<NetworkMember> = [root]
  const depthOf = new Map<string, number>([[root.id, 0]])
  // Slot kosong yang masih bisa diisi, diproses FIFO supaya pohon melebar dulu.
  const openSlots: Array<{ parentId: string; position: LegPosition }> = [
    { parentId: root.id, position: 'left' },
    { parentId: root.id, position: 'right' },
  ]

  while (members.length < TOTAL_MEMBERS && openSlots.length > 0) {
    // Ambil slot acak dari antrean depan supaya pohonnya tidak rata sempurna.
    const pick = Math.floor(random() * Math.min(6, openSlots.length))
    const slot = openSlots.splice(pick, 1)[0]
    const parentDepth = depthOf.get(slot.parentId) ?? 0
    const depth = parentDepth + 1
    if (depth > MAX_DEPTH) continue

    // Sebagian slot sengaja dibiarkan kosong agar ada cabang yang buntu.
    if (depth > 3 && random() < 0.18) continue

    const n = members.length + 1
    const first = FIRST[Math.floor(random() * FIRST.length)]
    const last = LAST[Math.floor(random() * LAST.length)]
    const daysAgo = Math.floor(random() * 540)
    const joined = new Date(now.getTime() - daysAgo * 86400000)

    const member: NetworkMember = {
      id: id(n),
      username: `${first.toLowerCase()}${String(n).padStart(3, '0')}`,
      name: `${first} ${last}`,
      parentId: slot.parentId,
      position: slot.position,
      joinedAt: joined.toISOString().slice(0, 10),
      status: random() < 0.74 ? 'active' : 'inactive',
    }

    members.push(member)
    depthOf.set(member.id, depth)

    if (depth < MAX_DEPTH) {
      openSlots.push({ parentId: member.id, position: 'left' })
      openSlots.push({ parentId: member.id, position: 'right' })
    }
  }

  return members
}

const members = generateMembers()

const byId = new Map(members.map((m) => [m.id, m]))

const childrenOf = new Map<
  string,
  { left?: NetworkMember; right?: NetworkMember }
>()
for (const member of members) {
  if (!member.parentId || !member.position) continue
  const slot = childrenOf.get(member.parentId) ?? {}
  slot[member.position] = member
  childrenOf.set(member.parentId, slot)
}

/** Bulan berjalan dipakai untuk metrik "member baru bulan ini". */
const CURRENT_MONTH = '2026-09'

const statsCache = new Map<string, NetworkStats>()

function computeStats(memberId: string): NetworkStats {
  const cached = statsCache.get(memberId)
  if (cached) return cached

  const slot = childrenOf.get(memberId) ?? {}
  const sides = (['left', 'right'] as const).map((side) => {
    const child = slot[side]
    if (!child) return { count: 0, active: 0, fresh: 0, depth: 0 }
    const sub = computeStats(child.id)
    return {
      count: sub.totalDownline + 1,
      active: sub.activeDownline + (child.status === 'active' ? 1 : 0),
      fresh:
        sub.newThisMonth + (child.joinedAt.startsWith(CURRENT_MONTH) ? 1 : 0),
      depth: sub.depth + 1,
    }
  })

  const [left, right] = sides
  const stats: NetworkStats = {
    leftCount: left.count,
    rightCount: right.count,
    totalDownline: left.count + right.count,
    activeDownline: left.active + right.active,
    newThisMonth: left.fresh + right.fresh,
    depth: Math.max(left.depth, right.depth),
  }

  statsCache.set(memberId, stats)
  return stats
}

function toNode(member: NetworkMember): NetworkNode {
  const slot = childrenOf.get(member.id) ?? {}
  return {
    ...member,
    stats: computeStats(member.id),
    hasChildren: Boolean(slot.left || slot.right),
  }
}

// ---------------------------------------------------------------- Query

/** Id user yang sedang login — nanti diganti dari sesi auth. */
export const currentMemberId = members[0].id

/**
 * Ambil sub-pohon `depth` level di bawah `rootId`. Default 2 level (7 node
 * untuk binary penuh) supaya muat di layar tanpa scroll horizontal.
 */
export function getNetworkTree(rootId: string, depth = 2): NetworkTree | null {
  const member = byId.get(rootId)
  if (!member) return null

  const build = (current: NetworkMember, left: number): NetworkTree => {
    const slot = childrenOf.get(current.id) ?? {}
    return {
      node: toNode(current),
      left: left > 0 && slot.left ? build(slot.left, left - 1) : null,
      right: left > 0 && slot.right ? build(slot.right, left - 1) : null,
    }
  }

  return build(member, depth)
}

/** Jalur dari root jaringan sampai `memberId` (inklusif) untuk breadcrumb. */
export function getAncestors(memberId: string): Array<NetworkMember> {
  const path: Array<NetworkMember> = []
  let cursor = byId.get(memberId)
  while (cursor) {
    path.unshift(cursor)
    cursor = cursor.parentId ? byId.get(cursor.parentId) : undefined
  }
  return path
}

export type MemberListParams = {
  search?: string
  page?: number
  pageSize?: number
}

export type MemberListItem = NetworkMember & {
  level: number
  uplineUsername: string | null
  totalDownline: number
}

const levelOf = new Map<string, number>()
for (const member of members) {
  levelOf.set(
    member.id,
    member.parentId ? (levelOf.get(member.parentId) ?? 0) + 1 : 0,
  )
}

/** Tabel member — pohon untuk memahami struktur, tabel untuk mencari orang. */
export function listMembers({
  search = '',
  page = 1,
  pageSize = 10,
}: MemberListParams = {}): { items: Array<MemberListItem>; total: number } {
  const keyword = search.trim().toLowerCase()
  const filtered = members.filter(
    (m) =>
      !keyword ||
      m.username.toLowerCase().includes(keyword) ||
      m.name.toLowerCase().includes(keyword) ||
      m.id.toLowerCase().includes(keyword),
  )

  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize).map((m) => ({
    ...m,
    level: levelOf.get(m.id) ?? 0,
    uplineUsername: m.parentId
      ? (byId.get(m.parentId)?.username ?? null)
      : null,
    totalDownline: computeStats(m.id).totalDownline,
  }))

  return { items, total: filtered.length }
}

export function findMemberByUsername(username: string): NetworkMember | null {
  const keyword = username.trim().toLowerCase()
  if (!keyword) return null
  return (
    members.find(
      (m) =>
        m.username.toLowerCase() === keyword || m.id.toLowerCase() === keyword,
    ) ?? null
  )
}
