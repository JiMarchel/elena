import type {
  GenealogyMember,
  GenealogyNode,
  GenealogyRank,
  GenealogyStats,
  GenealogyTree,
} from '../model/genealogy-member'

// ponytail: ganti dengan API saat backend siap:
//   GET /network/genealogy?rootId=&depth=  -> GenealogyTree
//   GET /network/genealogy/upline?memberId= -> GenealogyMember[]
//   GET /network/genealogy/direct?memberId= -> GenealogyMember[]

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
]

const RANKS: GenealogyRank[] = [
  'member_biasa',
  'reseller',
  'agen',
  'distributor',
]

function makeRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const TOTAL = 120
const CURRENT_MONTH = '2026-09'

function generateGenealogyMembers(): GenealogyMember[] {
  const random = makeRandom(20261001)
  const now = new Date('2026-09-25T00:00:00+07:00')

  const companyRoot: GenealogyMember = {
    id: 'ENELA01',
    username: 'enelaofficial',
    name: 'Enela Official',
    sponsorId: null,
    rank: 'distributor',
    status: 'active',
    joinedAt: '2023-01-01',
  }

  const root: GenealogyMember = {
    id: 'ENL0001',
    username: 'saputrabudi',
    name: 'Saputra Budi',
    sponsorId: companyRoot.id,
    rank: 'distributor',
    status: 'active',
    joinedAt: '2024-02-14',
  }

  const members: GenealogyMember[] = [companyRoot, root]

  for (let n = 2; n < TOTAL; n++) {
    const sponsorPool = Math.min(members.length, 12)
    const sponsorIndex = Math.floor(random() * sponsorPool)
    const sponsor = members[sponsorIndex]!
    const first = FIRST[Math.floor(random() * FIRST.length)]
    const last = LAST[Math.floor(random() * LAST.length)]
    const daysAgo = Math.floor(random() * 540)
    const joined = new Date(now.getTime() - daysAgo * 86400000)

    members.push({
      id: `ENL${String(n + 1).padStart(4, '0')}`,
      username: `${first.toLowerCase()}${String(n).padStart(3, '0')}`,
      name: `${first} ${last}`,
      sponsorId: sponsor.id,
      rank: RANKS[Math.floor(random() * RANKS.length)],
      status: random() < 0.78 ? 'active' : 'inactive',
      joinedAt: joined.toISOString().slice(0, 10),
    })
  }

  return members
}

const members = generateGenealogyMembers()
const byId = new Map(members.map((member) => [member.id, member]))

const childrenOf = new Map<string, GenealogyMember[]>()
for (const member of members) {
  if (!member.sponsorId) continue
  const list = childrenOf.get(member.sponsorId) ?? []
  list.push(member)
  childrenOf.set(member.sponsorId, list)
}

for (const list of childrenOf.values()) {
  list.sort((a, b) => a.joinedAt.localeCompare(b.joinedAt))
}

const statsCache = new Map<string, GenealogyStats>()

function computeStats(memberId: string): GenealogyStats {
  const cached = statsCache.get(memberId)
  if (cached) return cached

  const children = childrenOf.get(memberId) ?? []
  let totalDownline = 0
  let activeDownline = 0
  let newThisMonth = 0

  for (const child of children) {
    const sub = computeStats(child.id)
    totalDownline += sub.totalDownline + 1
    activeDownline +=
      sub.activeDownline + (child.status === 'active' ? 1 : 0)
    newThisMonth +=
      sub.newThisMonth + (child.joinedAt.startsWith(CURRENT_MONTH) ? 1 : 0)
  }

  const stats: GenealogyStats = {
    directReferrals: children.length,
    totalDownline,
    activeDownline,
    newThisMonth,
  }
  statsCache.set(memberId, stats)
  return stats
}

function toNode(member: GenealogyMember): GenealogyNode {
  const children = childrenOf.get(member.id) ?? []
  return {
    ...member,
    stats: computeStats(member.id),
    hasChildren: children.length > 0,
  }
}

/** Id member login — nanti dari sesi auth. */
export const currentGenealogyMemberId = 'ENL0001'

export function getGenealogyTree(
  rootId: string,
  depth = 2,
): GenealogyTree | null {
  const member = byId.get(rootId)
  if (!member) return null

  const build = (current: GenealogyMember, levelsLeft: number): GenealogyTree => {
    const children =
      levelsLeft > 0 ? (childrenOf.get(current.id) ?? []) : []
    return {
      node: toNode(current),
      children: children.map((child) => build(child, levelsLeft - 1)),
    }
  }

  return build(member, depth)
}

/** Jalur sponsor dari akar company sampai member (inklusif). */
export function getGenealogyUpline(
  memberId: string,
): GenealogyMember[] {
  const path: GenealogyMember[] = []
  let cursor = byId.get(memberId)
  while (cursor) {
    path.unshift(cursor)
    cursor = cursor.sponsorId ? byId.get(cursor.sponsorId) : undefined
  }
  return path
}

export function listDirectReferrals(memberId: string): GenealogyMember[] {
  return [...(childrenOf.get(memberId) ?? [])]
}

export function findGenealogyMember(query: string): GenealogyMember | null {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return null
  return (
    members.find(
      (member) =>
        member.username.toLowerCase() === keyword ||
        member.id.toLowerCase() === keyword ||
        member.name.toLowerCase().includes(keyword),
    ) ?? null
  )
}

export type DirectReferralRow = GenealogyMember & {
  sponsorUsername: string | null
  totalDownline: number
}

export function listDirectReferralRows(memberId: string): DirectReferralRow[] {
  const sponsor = byId.get(memberId)
  return listDirectReferrals(memberId).map((member) => ({
    ...member,
    sponsorUsername: sponsor?.username ?? null,
    totalDownline: computeStats(member.id).totalDownline,
  }))
}
