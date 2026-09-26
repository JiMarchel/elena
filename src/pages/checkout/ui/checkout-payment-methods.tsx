import { CheckIcon, ChevronRightIcon, WalletIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Button } from '@/shared/ui'

import type { PaymentMethod } from '../model/checkout'

export function CheckoutPaymentMethods({
  methods,
  selectedMethodId,
  selectedInstallmentId,
  onMethodChange,
  onInstallmentChange,
}: {
  methods: PaymentMethod[]
  selectedMethodId: string
  selectedInstallmentId: string
  onMethodChange: (id: string) => void
  onInstallmentChange: (id: string) => void
}) {
  const installmentMethod = methods.find((method) => method.type === 'installment')

  return (
    <section className="overflow-hidden bg-card ring-1 ring-foreground/10 lg:rounded-xl">
      <div className="flex items-center justify-between border-b px-3 py-3 sm:px-4">
        <h2 className="text-sm font-medium">Metode Pembayaran</h2>
        <button type="button" className="text-xs text-primary">
          Lihat Semua
        </button>
      </div>

      {installmentMethod && (
        <div className="border-b px-3 py-3 sm:px-4">
          <button
            type="button"
            onClick={() => onMethodChange(installmentMethod.id)}
            className="flex w-full items-center gap-3 text-left"
          >
            <WalletIcon className="size-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">
                  {installmentMethod.label}
                </span>
                {installmentMethod.promoLabel && (
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                    {installmentMethod.promoLabel}
                  </Badge>
                )}
              </div>
              {installmentMethod.balance !== undefined && (
                <p className="text-xs text-muted-foreground">
                  ({formatIDR(installmentMethod.balance)})
                </p>
              )}
            </div>
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                selectedMethodId === installmentMethod.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30'
              }`}
            >
              {selectedMethodId === installmentMethod.id && (
                <CheckIcon className="size-3" />
              )}
            </span>
          </button>

          {selectedMethodId === installmentMethod.id &&
            installmentMethod.installments && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {installmentMethod.installments.map((option) => {
                  const selected = selectedInstallmentId === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onInstallmentChange(option.id)}
                      className={`relative rounded-lg border p-2.5 text-left transition-colors ${
                        selected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      {option.recommended && (
                        <Badge className="absolute -top-2 left-2 bg-primary px-1.5 py-0 text-[10px] text-primary-foreground hover:bg-primary">
                          Direkomendasikan
                        </Badge>
                      )}
                      <p className="text-xs font-medium sm:text-sm">
                        {option.label}
                      </p>
                      {option.interestLabel && (
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {option.interestLabel}
                        </p>
                      )}
                      {option.badges && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {option.badges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="outline"
                              className="border-primary/40 px-1 py-0 text-[10px] text-primary"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
        </div>
      )}

      {methods
        .filter((method) => method.type !== 'installment')
        .map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onMethodChange(method.id)}
            className="flex w-full items-center gap-3 border-b px-3 py-3 text-left last:border-b-0 sm:px-4"
          >
            <WalletIcon className="size-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">
                  {method.type === 'bank'
                    ? method.bankName
                    : `${method.label} (${formatIDR(method.balance ?? 0)})`}
                </span>
                {method.promoLabel && (
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    {method.promoLabel}
                  </Badge>
                )}
              </div>
              {method.type === 'wallet' && (
                <Button
                  variant="outline"
                  size="xs"
                  className="mt-1 border-primary text-primary"
                  onClick={(event) => event.stopPropagation()}
                >
                  Isi Saldo Gratis
                </Button>
              )}
            </div>
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                selectedMethodId === method.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/30'
              }`}
            >
              {selectedMethodId === method.id && (
                <CheckIcon className="size-3" />
              )}
            </span>
          </button>
        ))}

      <button
        type="button"
        className="flex w-full items-center justify-center gap-1 px-3 py-2.5 text-xs text-muted-foreground sm:px-4"
      >
        Lihat metode lainnya
        <ChevronRightIcon className="size-3.5" />
      </button>
    </section>
  )
}
