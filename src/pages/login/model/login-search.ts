export type LoginSearch = {
  redirect?: string
}

export function validateLoginSearch(
  search: Record<string, unknown>,
): LoginSearch {
  const redirect = search.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/')) {
    return { redirect }
  }
  return {}
}
