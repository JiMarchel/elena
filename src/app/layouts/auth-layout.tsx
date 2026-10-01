import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 shrink-0 items-center border-b px-4">
        <Link
          to="/"
          aria-label="Enela — kembali ke dashboard"
          className="flex items-center gap-2"
        >
          <img src="/enela.png" alt="" className="size-8 rounded-lg" />
          <span className="font-medium">Enela</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl">{children}</div>
      </main>
    </div>
  )
}
