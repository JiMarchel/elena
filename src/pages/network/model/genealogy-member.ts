export type GenealogyMemberStatus = 'active' | 'inactive'

export type GenealogyRank =
  | 'member_biasa'
  | 'reseller'
  | 'agen'
  | 'distributor'

export type GenealogyMember = {
  id: string
  username: string
  name: string
  /** Sponsor langsung (genealogy) — bukan binary parent. */
  sponsorId: string | null
  rank: GenealogyRank
  status: GenealogyMemberStatus
  joinedAt: string
}

export type GenealogyStats = {
  directReferrals: number
  totalDownline: number
  activeDownline: number
  newThisMonth: number
}

export type GenealogyNode = GenealogyMember & {
  stats: GenealogyStats
  hasChildren: boolean
}

export type GenealogyTree = {
  node: GenealogyNode
  children: GenealogyTree[]
}

export const genealogyRankLabels: Record<GenealogyRank, string> = {
  member_biasa: 'Member Biasa',
  reseller: 'Reseller',
  agen: 'Agen',
  distributor: 'Distributor',
}
