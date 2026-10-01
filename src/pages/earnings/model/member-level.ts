export type MemberLevel = 'member_biasa' | 'reseller' | 'agen' | 'distributor'

export const memberLevelLabels: Record<MemberLevel, string> = {
  member_biasa: 'Member Biasa',
  reseller: 'Reseller',
  agen: 'Agen',
  distributor: 'Distributor',
}

export const pairDailyCapByLevel: Record<MemberLevel, number> = {
  member_biasa: 0,
  reseller: 25,
  agen: 50,
  distributor: 200,
}

export const sponsorRateByLevel: Record<
  Exclude<MemberLevel, 'member_biasa'>,
  number
> = {
  reseller: 15_000,
  agen: 20_000,
  distributor: 25_000,
}
