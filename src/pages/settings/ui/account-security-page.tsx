import { useState } from 'react'

import { RequireAuth } from '@/shared/auth'

import { readUserProfile } from '../model/profile-storage'
import { maskEmail, maskPhone } from '../model/profile'
import { accountSecuritySections } from '../model/settings-menu'
import {
  SettingsDisabledRow,
  SettingsLinkRow,
  SettingsPageShell,
  SettingsSection,
  SettingsToggleRow,
} from './settings-list'

export function AccountSecurityPage() {
  return (
    <RequireAuth
      title="Masuk untuk pengaturan keamanan"
      description="Pengaturan keamanan hanya tersedia setelah Anda masuk."
    >
      <AccountSecurityPageContent />
    </RequireAuth>
  )
}

function AccountSecurityPageContent() {
  const profile = readUserProfile()
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true)

  const resolvedSections = accountSecuritySections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.id === 'username') return { ...item, value: profile.username }
      if (item.id === 'phone') return { ...item, value: maskPhone(profile.phone) }
      if (item.id === 'email') return { ...item, value: maskEmail(profile.email) }
      return item
    }),
  }))

  return (
    <SettingsPageShell title="Akun dan Keamanan" backTo="/settings">
      <div className="flex-1 pb-6 lg:max-w-2xl lg:pb-4">
        {resolvedSections.map((section) => (
          <SettingsSection key={section.id} title={section.title}>
            {section.items.map((item) => {
              if (item.to) {
                return (
                  <SettingsLinkRow
                    key={item.id}
                    label={item.label}
                    value={item.value}
                    description={item.description}
                    to={item.to}
                    badge={
                      item.id === 'login-history' ? (
                        <span className="size-2 rounded-full bg-destructive" />
                      ) : undefined
                    }
                  />
                )
              }

              return (
                <SettingsDisabledRow
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  description={item.description}
                  badge={
                    item.id === 'login-history' ? (
                      <span className="size-2 rounded-full bg-destructive" />
                    ) : undefined
                  }
                />
              )
            })}

            {section.id === 'account' && (
              <SettingsToggleRow
                label="Verifikasi Sidik Jari"
                description="Enela tidak menyimpan data Sidik Jari karena data hanya tersimpan dalam perangkatmu."
                checked={fingerprintEnabled}
                onCheckedChange={setFingerprintEnabled}
              />
            )}
          </SettingsSection>
        ))}
      </div>
    </SettingsPageShell>
  )
}
