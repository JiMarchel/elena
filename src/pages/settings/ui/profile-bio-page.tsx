import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { RequireAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'

import { readUserProfile, updateUserProfile } from '../model/profile-storage'
import { SettingsPageShell } from './settings-list'

const MAX_BIO_LENGTH = 160

export function ProfileBioPage() {
  return (
    <RequireAuth
      title="Masuk untuk mengubah bio"
      description="Bio hanya dapat diubah setelah Anda masuk."
    >
      <ProfileBioPageContent />
    </RequireAuth>
  )
}

function ProfileBioPageContent() {
  const navigate = useNavigate()
  const [bio, setBio] = useState(() => readUserProfile().bio)

  const handleSave = () => {
    updateUserProfile({ bio: bio.trim() })
    navigate({ to: '/settings/profile' })
  }

  return (
    <SettingsPageShell title="Bio" backTo="/settings/profile">
      <div className="flex flex-1 flex-col gap-4 px-3 py-4 sm:px-4 lg:max-w-2xl">
        <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <p className="mb-3 text-xs text-muted-foreground">
            Ceritakan sedikit tentang diri Anda. Bio akan ditampilkan di profil
            publik Enela Anda.
          </p>
          <textarea
            value={bio}
            onChange={(event) =>
              setBio(event.target.value.slice(0, MAX_BIO_LENGTH))
            }
            placeholder="Tulis bio singkat tentang minat parfum, koleksi favorit, atau tagline pribadi…"
            className="min-h-36 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Maks. {MAX_BIO_LENGTH} karakter</span>
            <span>
              {bio.length}/{MAX_BIO_LENGTH}
            </span>
          </div>
        </div>

        <div className="mt-auto lg:static">
          <Button size="lg" className="w-full" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </SettingsPageShell>
  )
}
