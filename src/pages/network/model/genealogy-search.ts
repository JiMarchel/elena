/** Akar pohon genealogy disimpan di URL untuk drill-down & share. */
export type GenealogySearch = {
  rootId?: string
}

export function validateGenealogySearch(
  search: Record<string, unknown>,
): GenealogySearch {
  const rootId = search.rootId
  return typeof rootId === 'string' && rootId.length > 0 ? { rootId } : {}
}
