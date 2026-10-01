export type WalletSnapshot = {
  balance: number
  claimableCoins: number
  points: number
}

/** Dummy wallet — ganti dengan data session/API saat auth siap. */
export const demoWallet: WalletSnapshot = {
  balance: 1783000,
  claimableCoins: 1000,
  points: 2450,
}
