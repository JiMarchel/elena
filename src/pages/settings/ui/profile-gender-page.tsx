import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'
import { cn } from 'cn'

import { RequireAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'

import { genderOptions } from '../model/profile'
import type { Gender } from '../model/profile'
import { readUserProfile, updateUserProfile } from '../model/profile-storage'
import { SettingsPageShell, SettingsSection } from './settings-list'

export function ProfileGenderPage() {
  return (
    <RequireAuth
      title="Masuk untuk mengubah jenis kelamin"
      description="Data profil hanya dapat diubah setelah Anda masuk."
    >
      <ProfileGenderPageContent />
    </RequireAuth>
  )
}

function ProfileGenderPageContent() {
  const navigate = useNavigate()
  const [gender, setGender] = useState<Gender>(() => readUserProfile().gender)

  const handleSave = () => {
    updateUserProfile({ gender })
    navigate({ to: '/settings/profile' })
  }

  return (
    <SettingsPageShell title="Jenis Kelamin" backTo="/settings/profile">
      <div className="flex flex-1 flex-col lg:max-w-2xl">
        <SettingsSection title="Pilih jenis kelamin">
          <ul>
            {genderOptions.map((option) => {
              const selected = gender === option.value
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => setGender(option.value)}
                    className="flex w-full min-h-12 items-center justify-between gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/40 sm:px-4"
                  >
                    <span className="text-sm">{option.label}</span>
                    <span
                      className={cn(
                        'flex size-5 items-center justify-center rounded-full border-2',
                        selected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground/40',
                      )}
                    >
                      {selected && <CheckIcon className="size-3" strokeWidth={3} />}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </SettingsSection>

        <div className="mt-auto px-3 py-4 sm:px-4">
          <Button size="lg" className="w-full" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </SettingsPageShell>
  )
}
