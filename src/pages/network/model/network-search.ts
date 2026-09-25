/** Akar pohon disimpan di URL supaya drill-down bisa di-share & back-button jalan. */
export type NetworkSearch = {
  rootId?: string
}

export function validateNetworkSearch(
  search: Record<string, unknown>,
): NetworkSearch {
  const rootId = search.rootId
  return typeof rootId === 'string' && rootId.length > 0 ? { rootId } : {}
}
