export type MemberLevel = 'member_biasa' | 'reseller' | 'agen' | 'distributor'

export type AffiliateDashboardSnapshot = {
  memberId: string
  username: string
  displayName: string
  level: MemberLevel
  /** Omzet pembelian pribadi (box). */
  personalSalesBoxes: number
  /** Bonus penjualan langsung / omzet pribadi (IDR). */
  personalSalesAmount: number
  /** Total omzet jaringan (IDR). */
  networkSalesAmount: number
  walletBalance: number
  bonusToday: number
  bonusThisMonth: number
  totalBonusAllTime: number
  leftPv: number
  rightPv: number
  pairAvailable: number
  pairToday: number
  pairTodayCap: number
  bonusPairingToday: number
  activeMembers: number
  milestoneStatus: 'in_progress' | 'completed'
}

export const memberLevelLabels: Record<MemberLevel, string> = {
  member_biasa: 'Member Biasa',
  reseller: 'Reseller',
  agen: 'Agen',
  distributor: 'Distributor',
}

const pairCapByLevel: Record<MemberLevel, number> = {
  member_biasa: 0,
  reseller: 25,
  agen: 50,
  distributor: 200,
}

/** Dummy dashboard affiliate — ganti dengan API saat backend siap. */
export function getAffiliateDashboard(
  displayName = 'SAPUTRA',
): AffiliateDashboardSnapshot {
  const level: MemberLevel = 'distributor'
  return {
    memberId: 'ENL0001',
    username: 'saputrabudi',
    displayName: displayName.toUpperCase(),
    level,
    personalSalesBoxes: 75,
    personalSalesAmount: 3_750_000,
    networkSalesAmount: 28_450_000,
    walletBalance: 2_450_000,
    bonusToday: 2_000_000,
    bonusThisMonth: 1_250_000,
    totalBonusAllTime: 5_750_000,
    leftPv: 325,
    rightPv: 280,
    pairAvailable: 280,
    pairToday: 200,
    pairTodayCap: pairCapByLevel[level],
    bonusPairingToday: 2_000_000,
    activeMembers: 186,
    milestoneStatus: 'completed',
  }
}

export function formatPv(value: number) {
  return `${value.toLocaleString('id-ID')} Point`
}
