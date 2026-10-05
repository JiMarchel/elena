import { useState, type FormEvent } from 'react'

import { Button, Input } from '@/shared/ui'

export function LandingNewsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

  return (
    <section id="kontak" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl bg-[#f3f3f3] lg:grid-cols-[1fr_1.2fr]">
          <div className="relative hidden min-h-[220px] lg:block">
            <img
              src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80"
              alt="Koleksi parfum Enela"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
            <h2 className="font-display text-3xl font-medium text-foreground">
              Hubungi Kami
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Dapatkan info rilis parfum baru, promo affiliate, dan tips memilih
              wewangian signature langsung ke email Anda.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-2 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Alamat email Anda"
                className="h-11 flex-1 rounded-full border-black/10 bg-white px-5"
              />
              <Button
                type="submit"
                className="h-11 rounded-full px-6"
                disabled={sent}
              >
                {sent ? 'Terdaftar' : 'Berlangganan'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
