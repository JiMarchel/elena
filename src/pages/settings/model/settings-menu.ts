export type SettingsMenuItem = {
  id: string
  label: string
  description?: string
  value?: string
  to?: string
  search?: Record<string, string>
  disabled?: boolean
}

export type SettingsMenuSection = {
  id: string
  title: string
  items: SettingsMenuItem[]
}

export const settingsMenuSections: SettingsMenuSection[] = [
  {
    id: 'account',
    title: 'Akun Saya',
    items: [
      {
        id: 'security',
        label: 'Keamanan & Akun',
        to: '/settings/account-security',
      },
      {
        id: 'addresses',
        label: 'Alamat Saya',
        to: '/checkout/addresses',
        search: { from: 'settings' },
      },
      {
        id: 'bank',
        label: 'Kartu / Rekening Bank',
        disabled: true,
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Pengaturan',
    items: [
      { id: 'chat', label: 'Pengaturan Chat', disabled: true },
      { id: 'orders', label: 'Pengaturan Pesanan', disabled: true },
      { id: 'notifications', label: 'Pengaturan Notifikasi', disabled: true },
      { id: 'privacy', label: 'Pengaturan Privasi', disabled: true },
      { id: 'blocked', label: 'Pengguna Diblokir', disabled: true },
      {
        id: 'language',
        label: 'Bahasa / Language',
        value: 'Bahasa Indonesia',
        disabled: true,
      },
    ],
  },
  {
    id: 'help',
    title: 'Bantuan',
    items: [
      { id: 'help-center', label: 'Pusat Bantuan', disabled: true },
      { id: 'community', label: 'Peraturan Komunitas', disabled: true },
      { id: 'policy', label: 'Kebijakan', disabled: true },
      { id: 'rate', label: 'Suka Enela? Nilai kami!', disabled: true },
      { id: 'info', label: 'Informasi', disabled: true },
    ],
  },
]

export const accountSecuritySections: SettingsMenuSection[] = [
  {
    id: 'account',
    title: 'Akun',
    items: [
      {
        id: 'profile',
        label: 'Profil Saya',
        to: '/settings/profile',
      },
      {
        id: 'username',
        label: 'Username',
        value: 'saputrabudi',
        disabled: true,
      },
      {
        id: 'phone',
        label: 'No. Handphone',
        value: '*****85',
        disabled: true,
      },
      {
        id: 'email',
        label: 'Email',
        value: 'l*******************1@gmail.com',
        disabled: true,
      },
      { id: 'social', label: 'Akun Media Sosial', disabled: true },
      { id: 'password', label: 'Ganti Password', disabled: true },
      { id: 'passkey', label: 'Passkey', value: '1 passkey', disabled: true },
    ],
  },
  {
    id: 'security',
    title: 'Keamanan',
    items: [
      {
        id: 'verification',
        label: 'Metode Verifikasi',
        description:
          'Aktifkan metode verifikasi yang lebih aman untuk menjaga keamanan akunmu.',
        disabled: true,
      },
      {
        id: 'activity',
        label: 'Periksa Aktivitas Akun',
        description:
          'Periksa aktivitas log in dan perubahan akun dalam 30 hari terakhir.',
        disabled: true,
      },
      {
        id: 'login-history',
        label: 'Riwayat Log In',
        description: 'Lihat perangkat yang pernah log in ke akun Enela-mu',
        disabled: true,
      },
    ],
  },
]
