import type { MemberLevel } from './member-level'
import { memberLevelLabels, sponsorRateByLevel } from './member-level'

export type SponsorBonusEntry = {
  id: string
  date: string
  downlineName: string
  orderNo: string
  boxes: number
  rate: number
  grossBonus: number
  recipientLevel: Exclude<MemberLevel, 'member_biasa'>
}

export type SponsorBonusSummary = {
  level: Exclude<MemberLevel, 'member_biasa'>
  ratePerBox: number
  bonusToday: number
  bonusThisMonth: number
  totalBoxesThisMonth: number
}

/** Dummy bonus sponsor — ganti dengan API saat backend siap. */
export function getSponsorBonusSummary(): SponsorBonusSummary {
  const level: Exclude<MemberLevel, 'member_biasa'> = 'distributor'
  return {
    level,
    ratePerBox: sponsorRateByLevel[level],
    bonusToday: 75_000,
    bonusThisMonth: 375_000,
    totalBoxesThisMonth: 15,
  }
}

export function getSponsorBonusHistory(): SponsorBonusEntry[] {
  const level: Exclude<MemberLevel, 'member_biasa'> = 'distributor'
  const rate = sponsorRateByLevel[level]

  return [
    {
      id: 'BSL-20261001-008',
      date: '1 Okt 2026, 09:42',
      downlineName: 'Budi Santoso',
      orderNo: 'ENL-20261001-088',
      boxes: 2,
      rate,
      grossBonus: rate * 2,
      recipientLevel: level,
    },
    {
      id: 'BSL-20260928-003',
      date: '28 Sep 2026, 14:15',
      downlineName: 'Cici Lestari',
      orderNo: 'ENL-20260928-412',
      boxes: 4,
      rate,
      grossBonus: rate * 4,
      recipientLevel: level,
    },
    {
      id: 'BSL-20260922-001',
      date: '22 Sep 2026, 11:03',
      downlineName: 'Dedi Pratama',
      orderNo: 'ENL-20260922-019',
      boxes: 1,
      rate,
      grossBonus: rate,
      recipientLevel: level,
    },
  ]
}

export function getSponsorLevelLabel(level: MemberLevel) {
  return memberLevelLabels[level]
}
