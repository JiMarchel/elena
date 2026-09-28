import { createFileRoute } from '@tanstack/react-router'

import {
  PlatformVoucherPage,
  validatePlatformVoucherSearch,
} from '@/pages/checkout'

export const Route = createFileRoute('/_app/checkout/vouchers')({
  component: PlatformVoucherPage,
  validateSearch: validatePlatformVoucherSearch,
})
