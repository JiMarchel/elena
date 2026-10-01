export type BinaryPlacement = 'left' | 'right'

export type RegisterFormValues = {
  fullName: string
  username: string
  email: string
  phone: string
  nik: string
  address: string
  city: string
  province: string
  postalCode: string
  bankAccount: string
  bankAccountName: string
  referralCode: string
  placement: BinaryPlacement | ''
  password: string
  confirmPassword: string
}

export type SponsorPreview = {
  code: string
  name: string
  username: string
}

/** Dummy sponsor — ganti dengan API lookup saat backend siap. */
const demoSponsors: Record<string, Omit<SponsorPreview, 'code'>> = {
  ANDI123: { name: 'Andi Pratama', username: 'andipratama' },
  BUDI456: { name: 'Budi Santoso', username: 'budisantoso' },
  ENELA01: { name: 'Enela Official', username: 'enelaofficial' },
}

function parsePlacement(value: FormDataEntryValue | null): BinaryPlacement | '' {
  if (value === 'left' || value === 'right') return value
  return ''
}

export function lookupSponsor(code: string): SponsorPreview | null {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return null
  if (!(normalized in demoSponsors)) return null
  return { code: normalized, ...demoSponsors[normalized] }
}

export function validateRegisterForm(
  values: RegisterFormValues,
): Partial<Record<keyof RegisterFormValues | 'form', string>> {
  const errors: Partial<Record<keyof RegisterFormValues | 'form', string>> = {}

  if (!values.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.'
  if (!values.username.trim()) {
    errors.username = 'Username wajib diisi.'
  } else if (!/^[a-z0-9_]{3,20}$/i.test(values.username.trim())) {
    errors.username = 'Username 3–20 karakter, huruf/angka/underscore.'
  }
  if (!values.email.trim()) {
    errors.email = 'Email wajib diisi.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Format email tidak valid.'
  }
  if (!values.phone.trim()) {
    errors.phone = 'Nomor WhatsApp wajib diisi.'
  } else if (!/^(\+62|62|0)\d{8,13}$/.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Nomor WhatsApp tidak valid.'
  }
  if (!values.nik.trim()) {
    errors.nik = 'Nomor KTP/NIK wajib diisi.'
  } else if (!/^\d{16}$/.test(values.nik.replace(/\s/g, ''))) {
    errors.nik = 'NIK harus 16 digit angka.'
  }
  if (!values.address.trim()) errors.address = 'Alamat wajib diisi.'
  if (!values.city.trim()) errors.city = 'Kota wajib diisi.'
  if (!values.province.trim()) errors.province = 'Provinsi wajib diisi.'
  if (!values.postalCode.trim()) errors.postalCode = 'Kode pos wajib diisi.'
  if (!values.bankAccount.trim()) {
    errors.bankAccount = 'Rekening bank/e-wallet wajib diisi.'
  }
  if (!values.bankAccountName.trim()) {
    errors.bankAccountName = 'Nama rekening wajib diisi.'
  }
  if (!values.referralCode.trim()) {
    errors.referralCode = 'Kode referral/upline wajib diisi.'
  } else if (!lookupSponsor(values.referralCode)) {
    errors.referralCode = 'Kode referral tidak ditemukan.'
  }
  if (!values.placement) {
    errors.placement = 'Pilih posisi binary Left atau Right.'
  }
  if (!values.password) {
    errors.password = 'Kata sandi wajib diisi.'
  } else if (values.password.length < 8) {
    errors.password = 'Minimal 8 karakter.'
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok.'
  }

  return errors
}

export function readRegisterForm(form: FormData): RegisterFormValues {
  return {
    fullName: String(form.get('fullName') ?? ''),
    username: String(form.get('username') ?? ''),
    email: String(form.get('email') ?? ''),
    phone: String(form.get('phone') ?? ''),
    nik: String(form.get('nik') ?? ''),
    address: String(form.get('address') ?? ''),
    city: String(form.get('city') ?? ''),
    province: String(form.get('province') ?? ''),
    postalCode: String(form.get('postalCode') ?? ''),
    bankAccount: String(form.get('bankAccount') ?? ''),
    bankAccountName: String(form.get('bankAccountName') ?? ''),
    referralCode: String(form.get('referralCode') ?? ''),
    placement: parsePlacement(form.get('placement')),
    password: String(form.get('password') ?? ''),
    confirmPassword: String(form.get('confirmPassword') ?? ''),
  }
}
