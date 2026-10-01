import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CheckIcon, CopyIcon, QrCodeIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'

export type WalletActionMode = 'deposit' | 'withdraw' | 'send' | 'receive'

type WalletActionSheetProps = {
  open: boolean
  mode: WalletActionMode | null
  walletId: string
  ownerName: string
  availableBalance: number
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

const titles: Record<WalletActionMode, string> = {
  deposit: 'Top Up Saldo',
  withdraw: 'Tarik Saldo',
  send: 'Kirim ke Teman',
  receive: 'Terima Saldo',
}

const descriptions: Record<WalletActionMode, string> = {
  deposit: 'Isi saldo dompet Enela melalui transfer bank atau e-wallet.',
  withdraw: 'Tarik saldo ke rekening bank terdaftar.',
  send: 'Kirim saldo ke teman menggunakan ID dompet atau username Enela.',
  receive: 'Bagikan ID dompet atau QR code untuk menerima saldo.',
}

export function WalletActionSheet({
  open,
  mode,
  walletId,
  ownerName,
  availableBalance,
  onOpenChange,
  onSuccess,
}: WalletActionSheetProps) {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [note, setNote] = useState('')
  const [bankAccount, setBankAccount] = useState('bca-4521')
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const parsedAmount = useMemo(() => {
    const value = Number(amount.replace(/\D/g, ''))
    return Number.isFinite(value) ? value : 0
  }, [amount])

  const resetForm = () => {
    setAmount('')
    setRecipient('')
    setNote('')
    setSubmitted(false)
    setCopied(false)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm()
    onOpenChange(next)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    onSuccess?.()
  }

  if (!mode) return null

  const canSubmit =
    mode === 'receive' ||
    (mode === 'deposit' && parsedAmount >= 10_000) ||
    (mode === 'withdraw' &&
      parsedAmount >= 50_000 &&
      parsedAmount <= availableBalance) ||
    (mode === 'send' &&
      parsedAmount >= 1_000 &&
      parsedAmount <= availableBalance &&
      recipient.trim().length >= 3)

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[92vh] flex-col gap-0 p-0 lg:mx-auto lg:max-h-[88vh] lg:max-w-lg lg:rounded-t-xl"
      >
        <SheetHeader className="border-b px-4 py-4 text-left">
          <SheetTitle>{titles[mode]}</SheetTitle>
          <SheetDescription>{descriptions[mode]}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckIcon className="size-7" />
              </span>
              <p className="text-lg font-medium">
                {mode === 'deposit' && 'Permintaan top up diterima'}
                {mode === 'withdraw' && 'Permintaan penarikan diproses'}
                {mode === 'send' && 'Saldo berhasil dikirim'}
                {mode === 'receive' && 'ID dompet siap dibagikan'}
              </p>
              <p className="text-sm text-muted-foreground">
                {mode === 'receive'
                  ? 'Teman Anda dapat mengirim saldo ke ID dompet di atas.'
                  : 'Transaksi akan muncul di riwayat dompet setelah diproses.'}
              </p>
            </div>
          ) : mode === 'receive' ? (
            <ReceivePanel
              walletId={walletId}
              ownerName={ownerName}
              copied={copied}
              onCopy={() => {
                void navigator.clipboard.writeText(walletId)
                setCopied(true)
              }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {(mode === 'withdraw' || mode === 'send') && (
                <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  Saldo tersedia:{' '}
                  <span className="font-medium text-foreground">
                    {formatIDR(availableBalance)}
                  </span>
                </p>
              )}

              {mode === 'send' && (
                <Field label="Penerima (Username / ID Dompet)">
                  <Input
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    placeholder="Contoh: @ratna_enela atau ENELA-123456"
                  />
                </Field>
              )}

              {mode === 'withdraw' && (
                <Field label="Rekening Tujuan">
                  <select
                    value={bankAccount}
                    onChange={(event) => setBankAccount(event.target.value)}
                    className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                  >
                    <option value="bca-4521">BCA · ****4521 · SAPUTRA</option>
                    <option value="mandiri-8832">
                      Mandiri · ****8832 · SAPUTRA
                    </option>
                  </select>
                </Field>
              )}

              {mode === 'deposit' && (
                <Field label="Metode Top Up">
                  <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                    <option>Transfer Bank</option>
                    <option>QRIS</option>
                    <option>E-Wallet</option>
                  </select>
                </Field>
              )}

              <Field
                label="Nominal"
                hint={
                  mode === 'deposit'
                    ? 'Minimum top up Rp10.000'
                    : mode === 'withdraw'
                      ? 'Minimum tarik Rp50.000'
                      : 'Minimum kirim Rp1.000'
                }
              >
                <Input
                  inputMode="numeric"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value.replace(/\D/g, ''))
                  }
                  placeholder="0"
                />
                {parsedAmount > 0 && (
                  <p className="mt-1 text-sm font-medium text-primary">
                    {formatIDR(parsedAmount)}
                  </p>
                )}
              </Field>

              {mode === 'send' && (
                <Field label="Catatan (opsional)">
                  <Input
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Tulis pesan untuk penerima"
                  />
                </Field>
              )}

              {mode === 'deposit' && (
                <div className="flex flex-wrap gap-2">
                  {[50_000, 100_000, 250_000, 500_000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className="rounded-full border px-3 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      {formatIDR(preset)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <SheetFooter className="border-t px-4 py-4">
          {submitted ? (
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Selesai
            </Button>
          ) : mode === 'receive' ? (
            <Button className="w-full" onClick={() => handleOpenChange(false)}>
              Tutup
            </Button>
          ) : (
            <Button
              className="w-full"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              {mode === 'deposit' && 'Lanjut Top Up'}
              {mode === 'withdraw' && 'Tarik Saldo'}
              {mode === 'send' && 'Kirim Sekarang'}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function ReceivePanel({
  walletId,
  ownerName,
  copied,
  onCopy,
}: {
  walletId: string
  ownerName: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex size-40 items-center justify-center rounded-2xl bg-muted ring-1 ring-foreground/10">
        <QrCodeIcon className="size-24 text-muted-foreground" />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Scan QR atau bagikan ID dompet untuk menerima saldo dari teman.
      </p>
      <div className="w-full rounded-xl bg-muted/50 px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">ID Dompet · {ownerName}</p>
        <p className="mt-1 font-mono text-lg font-semibold">{walletId}</p>
      </div>
      <Button variant="outline" className="w-full" onClick={onCopy}>
        {copied ? (
          <>
            <CheckIcon data-icon="inline-start" />
            Tersalin
          </>
        ) : (
          <>
            <CopyIcon data-icon="inline-start" />
            Salin ID Dompet
          </>
        )}
      </Button>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}
