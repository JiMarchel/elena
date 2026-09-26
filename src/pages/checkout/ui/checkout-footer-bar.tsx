import { formatIDR } from '@/shared/lib'
import { Button, Switch } from '@/shared/ui'

export function CheckoutFooterBar({
  total,
  saved,
  dropshipper,
  onDropshipperChange,
  onPlaceOrder,
}: {
  total: number
  saved: number
  dropshipper: boolean
  onDropshipperChange: (checked: boolean) => void
  onPlaceOrder: () => void
}) {
  return (
    <>
      <div className="flex items-center justify-between bg-card px-3 py-3 ring-1 ring-foreground/10 sm:px-4 lg:rounded-xl">
        <span className="text-sm">Kirim sebagai Dropshipper</span>
        <Switch
          checked={dropshipper}
          onCheckedChange={onDropshipperChange}
          aria-label="Kirim sebagai dropshipper"
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur lg:sticky lg:inset-auto lg:mt-auto lg:rounded-xl lg:border lg:bg-card lg:ring-1 lg:ring-foreground/10 lg:backdrop-blur-none">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm">
              Total{' '}
              <span className="text-lg font-semibold text-primary tabular-nums">
                {formatIDR(total)}
              </span>
            </p>
            {saved > 0 && (
              <p className="text-xs text-destructive">
                Hemat {formatIDR(saved)}
              </p>
            )}
          </div>
          <Button size="lg" className="shrink-0 px-6" onClick={onPlaceOrder}>
            Buat Pesanan
          </Button>
        </div>
      </div>
    </>
  )
}
