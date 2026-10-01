import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { cn } from 'cn'

import { useAuth } from '@/shared/auth'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui'

import type { BinaryPlacement } from '../model/register-form'
import {
  lookupSponsor,
  readRegisterForm,
  validateRegisterForm,
} from '../model/register-form'
import { PlacementPicker } from './placement-picker'
import { RegisterSection } from './register-section'

const textareaClassName =
  'min-h-20 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { ref, placement: placementFromUrl } = useSearch({
    from: '/_auth/register',
  })

  const [placement, setPlacement] = useState<BinaryPlacement | ''>(
    placementFromUrl ?? '',
  )
  const [referralInput, setReferralInput] = useState(ref ?? '')
  const [errors, setErrors] = useState<
    Partial<Record<string, string>>
  >({})
  const [pending, setPending] = useState(false)

  const sponsor = useMemo(
    () => lookupSponsor(referralInput),
    [referralInput],
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = readRegisterForm(new FormData(event.currentTarget))
    values.placement = placement

    const nextErrors = validateRegisterForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setPending(true)
    // ponytail: ganti dengan POST /auth/register saat backend siap.
    await new Promise((resolve) => setTimeout(resolve, 600))
    const ok = await login(values.email.trim(), values.password)
    setPending(false)

    if (!ok) {
      setErrors({ form: 'Pendaftaran gagal. Silakan coba lagi.' })
      return
    }

    navigate({ to: '/' })
  }

  return (
    <div className={cn('mx-auto flex w-full max-w-3xl flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold">Registrasi Member ENELA</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Lengkapi data diri, rekening, dan posisi binary untuk bergabung
                  ke jaringan affiliate.
                </p>
                {ref ? (
                  <Badge variant="secondary" className="mx-auto w-fit">
                    Referral: {ref}
                  </Badge>
                ) : null}
              </div>

              {errors.form ? (
                <FieldError errors={[{ message: errors.form }]} />
              ) : null}

              <RegisterSection
                title="Data Diri"
                description="Informasi identitas member affiliate"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="fullName">Nama Lengkap</FieldLabel>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Nama sesuai KTP"
                      required
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName ? (
                      <FieldError errors={[{ message: errors.fullName }]} />
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      placeholder="andipratama"
                      autoComplete="username"
                      required
                      aria-invalid={!!errors.username}
                    />
                    {errors.username ? (
                      <FieldError errors={[{ message: errors.username }]} />
                    ) : null}
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                      required
                      aria-invalid={!!errors.email}
                    />
                    {errors.email ? (
                      <FieldError errors={[{ message: errors.email }]} />
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Nomor WhatsApp</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="08123456789"
                      autoComplete="tel"
                      required
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone ? (
                      <FieldError errors={[{ message: errors.phone }]} />
                    ) : null}
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="nik">Nomor KTP / NIK</FieldLabel>
                  <Input
                    id="nik"
                    name="nik"
                    inputMode="numeric"
                    placeholder="16 digit NIK"
                    required
                    aria-invalid={!!errors.nik}
                  />
                  {errors.nik ? (
                    <FieldError errors={[{ message: errors.nik }]} />
                  ) : null}
                </Field>
              </RegisterSection>

              <RegisterSection
                title="Alamat"
                description="Alamat pengiriman dan korespondensi"
              >
                <Field>
                  <FieldLabel htmlFor="address">Alamat Lengkap</FieldLabel>
                  <textarea
                    id="address"
                    name="address"
                    className={textareaClassName}
                    placeholder="Jl. Contoh No. 123, RT/RW"
                    required
                    aria-invalid={!!errors.address}
                  />
                  {errors.address ? (
                    <FieldError errors={[{ message: errors.address }]} />
                  ) : null}
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field>
                    <FieldLabel htmlFor="city">Kota</FieldLabel>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Jakarta Selatan"
                      required
                      aria-invalid={!!errors.city}
                    />
                    {errors.city ? (
                      <FieldError errors={[{ message: errors.city }]} />
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="province">Provinsi</FieldLabel>
                    <Input
                      id="province"
                      name="province"
                      placeholder="DKI Jakarta"
                      required
                      aria-invalid={!!errors.province}
                    />
                    {errors.province ? (
                      <FieldError errors={[{ message: errors.province }]} />
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="postalCode">Kode Pos</FieldLabel>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      inputMode="numeric"
                      placeholder="12345"
                      required
                      aria-invalid={!!errors.postalCode}
                    />
                    {errors.postalCode ? (
                      <FieldError errors={[{ message: errors.postalCode }]} />
                    ) : null}
                  </Field>
                </div>
              </RegisterSection>

              <RegisterSection
                title="Rekening Bank / E-Wallet"
                description="Untuk pencairan bonus affiliate"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="bankAccount">
                      Nomor Rekening / E-Wallet
                    </FieldLabel>
                    <Input
                      id="bankAccount"
                      name="bankAccount"
                      placeholder="BCA · 1234567890"
                      required
                      aria-invalid={!!errors.bankAccount}
                    />
                    {errors.bankAccount ? (
                      <FieldError errors={[{ message: errors.bankAccount }]} />
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="bankAccountName">Nama Rekening</FieldLabel>
                    <Input
                      id="bankAccountName"
                      name="bankAccountName"
                      placeholder="Nama sesuai rekening"
                      required
                      aria-invalid={!!errors.bankAccountName}
                    />
                    {errors.bankAccountName ? (
                      <FieldError
                        errors={[{ message: errors.bankAccountName }]}
                      />
                    ) : null}
                  </Field>
                </div>
              </RegisterSection>

              <RegisterSection
                title="Jaringan & Placement Binary"
                description="Sponsor (genealogy) dan posisi kiri/kanan di pohon binary"
              >
                <Field>
                  <FieldLabel htmlFor="referralCode">
                    Kode Referral / Upline
                  </FieldLabel>
                  <Input
                    id="referralCode"
                    name="referralCode"
                    value={referralInput}
                    onChange={(event) => setReferralInput(event.target.value)}
                    placeholder="ANDI123"
                    className="uppercase"
                    required
                    aria-invalid={!!errors.referralCode}
                  />
                  {sponsor ? (
                    <FieldDescription>
                      Sponsor: {sponsor.name} (@{sponsor.username})
                    </FieldDescription>
                  ) : referralInput.trim() ? (
                    <FieldDescription className="text-destructive">
                      Kode tidak ditemukan. Coba ANDI123, BUDI456, atau ENELA01.
                    </FieldDescription>
                  ) : (
                    <FieldDescription>
                      Wajib diisi. Dapat dari link referral upline Anda.
                    </FieldDescription>
                  )}
                  {errors.referralCode ? (
                    <FieldError errors={[{ message: errors.referralCode }]} />
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel>Pilihan Posisi Binary</FieldLabel>
                  <PlacementPicker
                    value={placement}
                    onChange={setPlacement}
                    invalid={!!errors.placement}
                  />
                  <FieldDescription>
                    Sponsor dan posisi binary bisa berbeda jika slot langsung
                    upline sudah penuh (spillover).
                  </FieldDescription>
                  {errors.placement ? (
                    <FieldError errors={[{ message: errors.placement }]} />
                  ) : null}
                </Field>
              </RegisterSection>

              <RegisterSection
                title="Keamanan Akun"
                description="Kata sandi untuk login member area"
                showSeparator={false}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      aria-invalid={!!errors.password}
                    />
                    {errors.password ? (
                      <FieldError errors={[{ message: errors.password }]} />
                    ) : (
                      <FieldDescription>Minimal 8 karakter.</FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Konfirmasi Kata Sandi
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      aria-invalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword ? (
                      <FieldError
                        errors={[{ message: errors.confirmPassword }]}
                      />
                    ) : null}
                  </Field>
                </div>
              </RegisterSection>

              <Field>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? 'Mendaftarkan…' : 'Daftar Sekarang'}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Sudah punya akun? <Link to="/login">Masuk</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="text-center">
        Dengan mendaftar, Anda menyetujui{' '}
        <a href="#">Syarat Layanan</a> dan <a href="#">Kebijakan Privasi</a>{' '}
        ENELA Affiliate Program.
      </FieldDescription>
    </div>
  )
}
