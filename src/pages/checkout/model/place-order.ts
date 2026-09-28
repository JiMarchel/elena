export type PlaceOrderPayload = {
  total: number
  itemCount: number
}

export type PlaceOrderResult =
  | { success: true; orderNo: string }
  | { success: false; message: string }

export type CheckoutResultSearch = {
  status: 'success' | 'failed'
  orderNo?: string
  total?: number
  productId?: string
  quantity?: number
  message?: string
}

export function validateCheckoutResultSearch(
  search: Record<string, unknown>,
): CheckoutResultSearch {
  const status = search.status === 'failed' ? 'failed' : 'success'
  const orderNo =
    typeof search.orderNo === 'string' ? search.orderNo : undefined
  const message =
    typeof search.message === 'string' ? search.message : undefined
  const productId =
    typeof search.productId === 'string' ? search.productId : undefined

  const rawTotal = search.total
  const parsedTotal =
    typeof rawTotal === 'number'
      ? rawTotal
      : typeof rawTotal === 'string'
        ? Number(rawTotal)
        : undefined

  const rawQty = search.quantity
  const parsedQty =
    typeof rawQty === 'number'
      ? rawQty
      : typeof rawQty === 'string'
        ? Number(rawQty)
        : undefined

  const result: CheckoutResultSearch = { status }
  if (orderNo) result.orderNo = orderNo
  if (message) result.message = message
  if (productId) result.productId = productId
  if (parsedTotal && parsedTotal > 0) result.total = parsedTotal
  if (parsedQty && parsedQty > 0) {
    result.quantity = Math.min(99, parsedQty)
  }

  return result
}

function createOrderNo() {
  const now = new Date()
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')
  const suffix = String(Math.floor(Math.random() * 900) + 100)
  return `ENL-${date}-${suffix}`
}

export async function placeCheckoutOrder(
  payload: PlaceOrderPayload,
): Promise<PlaceOrderResult> {
  await new Promise((resolve) => setTimeout(resolve, 900))

  if (payload.total <= 0) {
    return {
      success: false,
      message: 'Total pesanan tidak valid. Silakan periksa kembali keranjang Anda.',
    }
  }

  if (payload.itemCount <= 0) {
    return {
      success: false,
      message: 'Tidak ada produk dalam pesanan. Tambahkan produk terlebih dahulu.',
    }
  }

  return {
    success: true,
    orderNo: createOrderNo(),
  }
}
