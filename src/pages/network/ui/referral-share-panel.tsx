import { useMemo, useState } from 'react'
import { Share2Icon } from 'lucide-react'

import { Button, Card, CardContent } from '@/shared/ui'

import type { ReferralProfile } from '../model/referral'
import {
  buildReferralShareLinks,
  buildReferralShareMessage,
} from '../model/referral'

export function ReferralSharePanel({ profile }: { profile: ReferralProfile }) {
  const [shareError, setShareError] = useState<string | null>(null)
  const shareLinks = useMemo(() => buildReferralShareLinks(profile), [profile])
  const shareMessage = buildReferralShareMessage(profile)
  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const handleNativeShare = async () => {
    setShareError(null)
    try {
      await navigator.share({
        title: 'Gabung ENELA Affiliate',
        text: shareMessage,
        url: profile.registerUrl,
      })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareError('Bagikan tidak tersedia di perangkat ini.')
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 px-4 py-5">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <Share2Icon className="size-4 text-primary" />
            Bagikan Referral
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sebarkan link pendaftaran ke calon member lewat media sosial.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {shareLinks.map((channel) => (
            <Button
              key={channel.id}
              variant="outline"
              size="sm"
              type="button"
              className="w-full"
              render={
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {channel.label}
            </Button>
          ))}
        </div>

        {canNativeShare ? (
          <Button type="button" variant="secondary" onClick={handleNativeShare}>
            <Share2Icon data-icon="inline-start" />
            Bagikan via perangkat
          </Button>
        ) : null}

        {shareError ? (
          <p className="text-xs text-destructive">{shareError}</p>
        ) : null}

        <p className="rounded-lg bg-muted/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          {shareMessage}
        </p>
      </CardContent>
    </Card>
  )
}
