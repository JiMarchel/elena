import type { BinaryPlacement } from './register-form'

export type RegisterSearch = {
  ref?: string
  placement?: BinaryPlacement
}

export function validateRegisterSearch(
  search: Record<string, unknown>,
): RegisterSearch {
  const result: RegisterSearch = {}

  if (typeof search.ref === 'string' && search.ref.trim()) {
    result.ref = search.ref.trim().toUpperCase()
  }

  if (search.placement === 'left' || search.placement === 'right') {
    result.placement = search.placement
  }

  return result
}
