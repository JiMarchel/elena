import { Link } from '@tanstack/react-router'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from 'cn'

import { landingNavItems } from '../model/landing-nav'

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-[0.2em] text-foreground sm:text-2xl"
        >
          ENELA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {landingNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/shop"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
            aria-label="Cari produk"
          >
            <SearchIcon className="size-5" />
          </Link>
          <Link
            to="/cart"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground"
            aria-label="Keranjang"
          >
            <ShoppingBagIcon className="size-5" />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'border-t border-black/5 bg-white md:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {landingNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-black/5"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
