import type { MemberLevel } from './member-level'
import { getPairingBonusSnapshot } from './pairing-bonus'
import { getSponsorBonusSummary } from './sponsor-bonus'

export type BonusCenterSummary = {
  level: MemberLevel
  bonusToday: number
  bonusThisMonth: number
  totalBonusAllTime: number
  sponsorBonusThisMonth: number
  pairingBonusThisMonth: number
  rewardBonusThisMonth: number
}

/** Ringkasan Bonus Center — ganti dengan API saat backend siap. */
export function getBonusCenterSummary(): BonusCenterSummary {
  const pairing = getPairingBonusSnapshot()
  const sponsor = getSponsorBonusSummary()

  return {
    level: pairing.level,
    bonusToday: pairing.bonusPairingToday + sponsor.bonusToday,
    bonusThisMonth: 1_250_000,
    totalBonusAllTime: 5_750_000,
    sponsorBonusThisMonth: sponsor.bonusThisMonth,
    pairingBonusThisMonth: pairing.bonusPairingThisMonth,
    rewardBonusThisMonth: 0,
  }
}
