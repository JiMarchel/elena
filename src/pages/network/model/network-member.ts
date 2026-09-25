export type MemberStatus = 'active' | 'inactive'

export type LegPosition = 'left' | 'right'

export type NetworkMember = {
  id: string
  username: string
  name: string
  /** null hanya untuk root jaringan (user paling atas). */
  parentId: string | null
  /** Kaki tempat member ini menggantung di upline-nya. */
  position: LegPosition | null
  joinedAt: string
  status: MemberStatus
}

/** Agregat satu node — dikirim bersama node supaya cabang gemuk terlihat tanpa dibuka. */
export type NetworkStats = {
  leftCount: number
  rightCount: number
  totalDownline: number
  activeDownline: number
  newThisMonth: number
  depth: number
}

/** Bentuk node yang dipakai UI pohon: member + agregat + penanda ada anak. */
export type NetworkNode = NetworkMember & {
  stats: NetworkStats
  hasChildren: boolean
}

/** Satu level pohon: node beserta slot kiri/kanan yang bisa kosong. */
export type NetworkTree = {
  node: NetworkNode
  left: NetworkTree | null
  right: NetworkTree | null
}
