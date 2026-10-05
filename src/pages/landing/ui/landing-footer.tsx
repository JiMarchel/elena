import { Link } from '@tanstack/react-router'

import { landingFooterLinks } from '../model/landing-nav'

export function LandingFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-[0.2em] text-foreground"
        >
          ENELA
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {landingFooterLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SocialLink href="https://facebook.com" label="Facebook">
            f
          </SocialLink>
          <SocialLink href="https://instagram.com" label="Instagram">
            ig
          </SocialLink>
          <SocialLink href="https://twitter.com" label="Twitter">
            x
          </SocialLink>
        </div>
      </div>

      <div className="bg-foreground py-4 text-center text-xs text-background/80">
        © {new Date().getFullYear()} Enela. Marketplace parfum original &
        affiliate program.
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-foreground/70 uppercase transition-colors hover:bg-black/5 hover:text-foreground"
    >
      {children}
    </a>
  )
}
