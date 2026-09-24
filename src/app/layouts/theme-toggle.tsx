import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@/shared/ui'

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Ganti tema"
      onClick={() => {
        const root = document.documentElement
        const dark = root.classList.toggle('dark')
        localStorage.setItem('theme', dark ? 'dark' : 'light')
      }}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </Button>
  )
}
