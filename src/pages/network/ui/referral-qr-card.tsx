import { DownloadIcon } from 'lucide-react'

import { Button, Card, CardContent } from '@/shared/ui'

import { buildReferralQrImageUrl } from '../model/referral'

export function ReferralQrCard({
  registerUrl,
  code,
}: {
  registerUrl: string
  code: string
}) {
  const qrUrl = buildReferralQrImageUrl(registerUrl)

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 px-4 py-6 text-center">
        <div className="rounded-xl bg-white p-3 ring-1 ring-foreground/10">
          <img
            src={qrUrl}
            width={240}
            height={240}
            alt={`QR Code referral ${code}`}
            className="size-48 sm:size-60"
          />
        </div>
        <div className="space-y-1">
          <p className="font-medium">QR Code Referral</p>
          <p className="text-sm text-muted-foreground">
            Scan untuk membuka halaman pendaftaran dengan kode{' '}
            <span className="font-mono font-medium text-foreground">{code}</span>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          render={
            <a href={qrUrl} download={`enela-referral-${code}.png`} />
          }
        >
          <DownloadIcon data-icon="inline-start" />
          Unduh QR
        </Button>
      </CardContent>
    </Card>
  )
}
