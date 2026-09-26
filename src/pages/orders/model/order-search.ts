import type { OrderStatus } from './order'

export type OrderSearch = {
  status?: OrderStatus
}

const statuses: OrderStatus[] = ['unpaid', 'packing', 'shipping', 'completed']

export function validateOrderSearch(
  search: Record<string, unknown>,
): OrderSearch {
  const status = search.status
  if (typeof status === 'string' && statuses.includes(status as OrderStatus)) {
    return { status: status as OrderStatus }
  }
  return {}
}
