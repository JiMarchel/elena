import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { BadgeCheckIcon } from 'lucide-react'

import { RequireAuth, useAuth } from '@/shared/auth'
import { Badge, Button, Card, CardContent, PageShell } from '@/shared/ui'

import { getReferralProfile } from '../model/referral'
import { ReferralCopyField } from './referral-copy-field'
import { ReferralQrCard } from './referral-qr-card'
import { ReferralSharePanel } from './referral-share-panel'
import { ReferralStats } from './referral-stats'

export function ReferralPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat referral"
      description="Referral Center hanya tersedia setelah Anda masuk."
    >
      <ReferralPageContent />
    </RequireAuth>
  )
}

function ReferralPageContent() {
  const { user } = useAuth()
  const profile = useMemo(() => getReferralProfile(user), [user])

  return (
    <PageShell
      title="Referral Center"
      description="Bagikan kode, link, dan QR referral untuk mendaftarkan member baru ke jaringan Anda."
      backTo="/network"
    >
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{profile.displayName}</p>
              <Badge variant="secondary">@{profile.username}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              ID {profile.memberId} · Kode referral unik Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="font-mono text-base tracking-wider">
              {profile.code}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              render={
                <Link
                  to="/register"
                  search={{ ref: profile.code }}
                />
              }
            >
              <BadgeCheckIcon data-icon="inline-start" />
              Tes Form Daftar
            </Button>
          </div>
        </CardContent>
      </Card>

      <ReferralStats profile={profile} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-5 px-4 py-5">
            <div>
              <h2 className="text-sm font-medium">Link & Kode Referral</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Format:{' '}
                <span className="font-mono text-xs">
                  domain.com/register?ref={profile.code}
                </span>
              </p>
            </div>

            <ReferralCopyField
              label="Kode Referral"
              value={profile.code}
              copyLabel="Salin kode"
            />
            <ReferralCopyField
              label="Referral URL"
              value={profile.registerUrl}
              copyLabel="Salin link"
            />
            <ReferralCopyField
              label="Landing Page (preview)"
              value={profile.landingUrl}
              copyLabel="Salin landing page"
            />
          </CardContent>
        </Card>

        <ReferralQrCard registerUrl={profile.registerUrl} code={profile.code} />
      </div>

      <ReferralSharePanel profile={profile} />
    </PageShell>
  )
}
