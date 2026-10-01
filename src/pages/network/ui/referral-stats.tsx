import { Link } from '@tanstack/react-router'
import { UserPlusIcon, UsersIcon } from 'lucide-react'

import { Card, CardContent } from '@/shared/ui'

import type { ReferralProfile } from '../model/referral'

export function ReferralStats({ profile }: { profile: ReferralProfile }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <Card className="gap-0 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UsersIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Referral Langsung</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {profile.directReferrals}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Member yang mendaftar dengan kode Anda
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <UserPlusIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Total Undangan</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {profile.totalInvites}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Klik link referral (termasuk belum jadi member)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 py-4 sm:col-span-2">
        <CardContent className="flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Landing Page Referral</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {profile.landingUrl}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Halaman personal dengan kode referral Anda (coming soon).
            </p>
          </div>
          <Link
            to="/register"
            search={{ ref: profile.code }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Pratinjau halaman daftar →
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
