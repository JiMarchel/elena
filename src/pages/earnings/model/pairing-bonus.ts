import type { MemberLevel } from './member-level'
import { pairDailyCapByLevel } from './member-level'

export type CarryForwardLeg = 'left' | 'right'

export type PairingBonusSnapshot = {
  level: MemberLevel
  leftPv: number
  rightPv: number
  pairQualified: number
  carryForwardLeg: CarryForwardLeg
  carryForwardPv: number
  pairToday: number
  pairTodayCap: number
  pairQueuedTomorrow: number
  bonusPairingToday: number
  bonusPairingThisMonth: number
  milestonePairsCompleted: number
  milestonePairsTotal: number
  milestoneBonusTotal: number
  dailyPairRate: number
  milestonePairRate: number
}

export type PairingBonusEntry = {
  id: string
  date: string
  pairs: number
  rate: number
  grossBonus: number
  type: 'milestone' | 'daily'
  note?: string
}

/** Dummy pairing dashboard — selaras contoh dokumen ENELA. */
export function getPairingBonusSnapshot(): PairingBonusSnapshot {
  const level: MemberLevel = 'distributor'
  const leftPv = 325
  const rightPv = 280
  const pairQualified = Math.min(leftPv, rightPv)

  return {
    level,
    leftPv,
    rightPv,
    pairQualified,
    carryForwardLeg: 'left',
    carryForwardPv: leftPv - pairQualified,
    pairToday: 200,
    pairTodayCap: pairDailyCapByLevel[level],
    pairQueuedTomorrow: 35,
    bonusPairingToday: 2_000_000,
    bonusPairingThisMonth: 875_000,
    milestonePairsCompleted: 10,
    milestonePairsTotal: 10,
    milestoneBonusTotal: 500_000,
    dailyPairRate: 10_000,
    milestonePairRate: 50_000,
  }
}

export function getPairingBonusHistory(): PairingBonusEntry[] {
  return [
    {
      id: 'PR-20261001-001',
      date: '1 Okt 2026',
      pairs: 200,
      rate: 10_000,
      grossBonus: 2_000_000,
      type: 'daily',
      note: 'Cap harian tercapai · 35 pair antre besok',
    },
    {
      id: 'PR-20260930-014',
      date: '30 Sep 2026',
      pairs: 185,
      rate: 10_000,
      grossBonus: 1_850_000,
      type: 'daily',
    },
    {
      id: 'PR-20260915-003',
      date: '15 Sep 2026',
      pairs: 1,
      rate: 50_000,
      grossBonus: 50_000,
      type: 'milestone',
      note: 'Pair milestone #10 · one-time',
    },
    {
      id: 'PR-20260802-001',
      date: '2 Agu 2026',
      pairs: 1,
      rate: 50_000,
      grossBonus: 50_000,
      type: 'milestone',
      note: 'Pair milestone #1 · one-time',
    },
  ]
}

export function formatPvPoint(value: number) {
  return `${value.toLocaleString('id-ID')} Point`
}
