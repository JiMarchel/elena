import { ArrowDownToLineIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { RequireAuth } from '@/shared/auth'
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  PageShell,
} from '@/shared/ui'

const MIN_WITHDRAW = 100_000
const ADMIN_FEE_RATE = 0.1

export function WithdrawPage() {
  return (
    <RequireAuth
      title="Masuk untuk mencairkan bonus"
      description="Pencairan bonus hanya tersedia setelah Anda masuk."
    >
      <WithdrawPageContent />
    </RequireAuth>
  )
}

function WithdrawPageContent() {
  return (
    <PageShell
      title="Pencairan Bonus"
      description={`Ajukan penarikan saldo ke rekening bank atau e-wallet. Minimum ${formatIDR(MIN_WITHDRAW)}.`}
      backTo="/wallet"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardContent className="flex flex-col gap-4 px-4 py-5">
            <div className="grid gap-2">
              <Label htmlFor="withdraw-amount">Nominal Penarikan</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder={String(MIN_WITHDRAW)}
                min={MIN_WITHDRAW}
              />
              <p className="text-xs text-muted-foreground">
                Minimum penarikan {formatIDR(MIN_WITHDRAW)}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="withdraw-account">Rekening / E-Wallet</Label>
              <Input
                id="withdraw-account"
                placeholder="Pilih rekening tujuan"
                readOnly
              />
            </div>
            <Button type="button" className="w-full sm:w-auto">
              <ArrowDownToLineIcon data-icon="inline-start" />
              Ajukan Pencairan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3 px-4 py-5 text-sm">
            <p className="font-medium">Ringkasan</p>
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya admin ({ADMIN_FEE_RATE * 100}%)</span>
              <span>Dipotong saat pencairan</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Saldo di wallet menampilkan nilai net setelah potongan admin
              sesuai marketing plan ENELA.
            </p>
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              Status: Pending → Approved → Processing → Paid
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed">
        <CardContent className="px-4 py-5 text-center text-sm text-muted-foreground">
          Riwayat pengajuan pencairan akan ditampilkan setelah backend terhubung.
        </CardContent>
      </Card>
    </PageShell>
  )
}
