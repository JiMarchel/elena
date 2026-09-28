import { Link } from '@tanstack/react-router'
import { CameraIcon, ChevronRightIcon, UserCircleIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'

import {
  getGenderLabel,
  maskBirthDate,
  maskEmail,
  maskPhone,
  truncateBio,
} from '../model/profile'
import { readUserProfile } from '../model/profile-storage'
import { SettingsPageShell, SettingsSection } from './settings-list'

export function ProfileEditPage() {
  return (
    <RequireAuth
      title="Masuk untuk mengubah profil"
      description="Profil hanya dapat diubah setelah Anda masuk."
    >
      <ProfileEditPageContent />
    </RequireAuth>
  )
}

function ProfileEditPageContent() {
  const profile = readUserProfile()

  return (
    <SettingsPageShell title="Ubah Profil" backTo="/settings/account-security">
      <div className="flex-1 pb-6 lg:max-w-2xl lg:pb-4">
        <section className="bg-card px-4 py-6 lg:rounded-xl lg:ring-1 lg:ring-foreground/10">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt=""
                  className="size-24 rounded-full object-cover ring-2 ring-border"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full bg-muted ring-2 ring-border">
                  <UserCircleIcon className="size-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
              <CameraIcon className="size-4" />
              Ubah
            </Button>
          </div>
        </section>

        <SettingsSection title="Identitas">
          <ProfileFieldRow label="Nama" value={profile.name} disabled />
          <ProfileFieldRow
            label="Bio"
            value={truncateBio(profile.bio)}
            to="/settings/profile/bio"
          />
        </SettingsSection>

        <SettingsSection title="Data Pribadi">
          <ProfileFieldRow
            label="Jenis Kelamin"
            value={getGenderLabel(profile.gender)}
            to="/settings/profile/gender"
          />
          <ProfileFieldRow
            label="Tanggal Lahir"
            value={maskBirthDate(profile.birthDate)}
            disabled
          />
        </SettingsSection>

        <SettingsSection title="Kontak">
          <ProfileFieldRow
            label="No. Handphone"
            value={maskPhone(profile.phone)}
            disabled
          />
          <ProfileFieldRow
            label="Email"
            value={maskEmail(profile.email)}
            disabled
          />
        </SettingsSection>
      </div>
    </SettingsPageShell>
  )
}

function ProfileFieldRow({
  label,
  value,
  to,
  disabled,
}: {
  label: string
  value: string
  to?: string
  disabled?: boolean
}) {
  const content = (
    <>
      <span className="shrink-0 text-sm">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="max-w-[12rem] truncate text-sm text-muted-foreground sm:max-w-md">
          {value}
        </span>
        {!disabled && (
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        )}
      </span>
    </>
  )

  if (disabled || !to) {
    return (
      <div className="flex min-h-12 items-center justify-between gap-3 px-3 py-3 sm:px-4">
        {content}
      </div>
    )
  }

  return (
    <Link
      to={to}
      className="flex min-h-12 items-center justify-between gap-3 px-3 py-3 transition-colors hover:bg-muted/40 sm:px-4"
    >
      {content}
    </Link>
  )
}
