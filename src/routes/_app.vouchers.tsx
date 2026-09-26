import { createFileRoute } from '@tanstack/react-router'

import { VoucherPage } from '@/pages/voucher'

export const Route = createFileRoute('/_app/vouchers')({
  component: VoucherPage,
})
