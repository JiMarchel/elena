import { RequireAuth } from '@/shared/auth'

import { settingsMenuSections } from '../model/settings-menu'
import {
  SettingsButtonRow,
  SettingsDisabledRow,
  SettingsLinkRow,
  SettingsPageShell,
  SettingsSection,
} from './settings-list'

export function SettingsPage() {
  return (
    <RequireAuth
      title="Masuk untuk pengaturan"
      description="Pengaturan akun hanya tersedia setelah Anda masuk ke Enela."
    >
      <SettingsPageContent />
    </RequireAuth>
  )
}

function SettingsPageContent() {
  return (
    <SettingsPageShell title="Pengaturan Akun" backTo="/">
      <div className="flex-1 pb-6 lg:pb-4">
        <div className="space-y-2 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
          {settingsMenuSections.map((section) => (
            <SettingsSection key={section.id} title={section.title}>
              {section.items.map((item) => {
                if (item.to) {
                  return (
                  <SettingsLinkRow
                    key={item.id}
                    label={item.label}
                    value={item.value}
                    to={item.to}
                    search={item.search}
                  />
                  )
                }

                if (item.disabled) {
                  return (
                    <SettingsDisabledRow
                      key={item.id}
                      label={item.label}
                      value={item.value}
                      description={item.description}
                    />
                  )
                }

                return (
                  <SettingsButtonRow
                    key={item.id}
                    label={item.label}
                    value={item.value}
                    description={item.description}
                  />
                )
              })}
            </SettingsSection>
          ))}
        </div>
      </div>
    </SettingsPageShell>
  )
}
