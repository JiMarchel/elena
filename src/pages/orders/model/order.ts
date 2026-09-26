import { getProductById } from '@/entities/product'

export type OrderStatus = 'unpaid' | 'packing' | 'shipping' | 'completed'

export type OrderItem = {
  productId: number
  title: string
  img: string
  variant: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  orderNo: string
  storeName: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  createdAt: string
  /** Untuk tab Belum Dibayar — batas waktu bayar. */
  payBefore?: string
  /** Untuk tab Dikirim — estimasi tiba. */
  eta?: string
  /** Untuk tab Selesai — tanggal selesai. */
  completedAt?: string
}

export const orderTabs: {
  id: OrderStatus
  label: string
}[] = [
  { id: 'unpaid', label: 'Belum Dibayar' },
  { id: 'packing', label: 'Dikemas' },
  { id: 'shipping', label: 'Dikirim' },
  { id: 'completed', label: 'Selesai' },
]

function item(
  productId: number,
  quantity: number,
): OrderItem | null {
  const product = getProductById(productId)
  if (!product) return null
  return {
    productId: product.id,
    title: product.title,
    img: product.img,
    variant: `${product.volumeMl} ml · ${product.concentration}`,
    quantity,
    price: product.price,
  }
}

function orderTotal(items: OrderItem[]) {
  return items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0)
}

function buildOrder(order: Omit<Order, 'total'>): Order {
  return { ...order, total: orderTotal(order.items) }
}

/** Dummy pesanan — ganti dengan API saat backend siap. */
export const demoOrders: Order[] = [
  buildOrder({
    id: 'ord-1',
    orderNo: 'ENL-20260926-001',
    storeName: 'Enela Signature',
    status: 'unpaid',
    items: [item(1, 1), item(4, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '26 Sep 2026, 08:12',
    payBefore: 'Bayar sebelum 26 Sep, 20:12',
  }),
  buildOrder({
    id: 'ord-2',
    orderNo: 'ENL-20260925-014',
    storeName: 'Maison Enela',
    status: 'unpaid',
    items: [item(2, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '25 Sep 2026, 19:40',
    payBefore: 'Bayar sebelum 26 Sep, 19:40',
  }),
  buildOrder({
    id: 'ord-3',
    orderNo: 'ENL-20260924-008',
    storeName: 'Enela Fresh',
    status: 'packing',
    items: [item(3, 2), item(5, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '24 Sep 2026, 14:05',
  }),
  buildOrder({
    id: 'ord-4',
    orderNo: 'ENL-20260922-003',
    storeName: 'Enela Signature',
    status: 'shipping',
    items: [item(7, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '22 Sep 2026, 10:30',
    eta: 'Estimasi tiba 27–28 Sep',
  }),
  buildOrder({
    id: 'ord-5',
    orderNo: 'ENL-20260918-021',
    storeName: 'Enela Atelier',
    status: 'shipping',
    items: [item(8, 1), item(10, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '18 Sep 2026, 16:18',
    eta: 'Estimasi tiba 26 Sep',
  }),
  buildOrder({
    id: 'ord-6',
    orderNo: 'ENL-20260910-005',
    storeName: 'Enela Homme',
    status: 'completed',
    items: [item(9, 1)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '10 Sep 2026, 09:00',
    completedAt: 'Selesai 14 Sep 2026',
  }),
  buildOrder({
    id: 'ord-7',
    orderNo: 'ENL-20260828-012',
    storeName: 'Enela Fresh',
    status: 'completed',
    items: [item(12, 2)].filter((entry): entry is OrderItem => !!entry),
    createdAt: '28 Agu 2026, 11:22',
    completedAt: 'Selesai 2 Sep 2026',
  }),
]

export function filterOrders(status: OrderStatus) {
  return demoOrders.filter((order) => order.status === status)
}

export function countOrdersByStatus(status: OrderStatus) {
  return demoOrders.filter((order) => order.status === status).length
}
