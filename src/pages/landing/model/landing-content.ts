import {
  BadgeCheckIcon,
  PackageIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react'

export type LandingFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export const landingFeatures: LandingFeature[] = [
  {
    icon: PackageIcon,
    title: 'Pemesanan Mudah',
    description:
      'Checkout cepat, voucher otomatis, dan lacak pesanan parfum original langsung dari aplikasi Enela.',
  },
  {
    icon: BadgeCheckIcon,
    title: 'Kualitas Original',
    description:
      'Setiap botol diverifikasi keasliannya — EDP, EDT, dan parfum murni dari brand terpercaya.',
  },
  {
    icon: SparklesIcon,
    title: 'Aroma Signature',
    description:
      'Kurasi notes dari citrus segar hingga oud mewah — temukan wewangian yang cocok dengan karakter Anda.',
  },
]

export type LandingWhyUsBlock = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  reverse?: boolean
}

export const landingWhyUs: LandingWhyUsBlock[] = [
  {
    id: 'quality',
    title: 'Kualitas Terjamin',
    description:
      'Enela hanya menjual parfum original dengan batch dan konsentrasi yang jelas di setiap label. Dari Noir Absolu yang gelap hingga Citrus Verrine yang cerah — semua botol melalui kontrol kualitas sebelum dikirim ke Anda.',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Botol parfum Rose Éternelle',
  },
  {
    id: 'style',
    title: 'Gaya untuk Setiap Momen',
    description:
      'Office-friendly EDT, parfum malam yang intens, atau body mist ringan untuk cuaca tropis — koleksi Enela dirancang agar Anda bisa berganti aroma sesuai acara tanpa kompromi.',
    image:
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Parfum floral Jasmin Nocturne',
    reverse: true,
  },
]

export const landingBrandLogos = [
  'Enela Signature',
  'Maison Enela',
  'Enela Fresh',
  'Enela Atelier',
  'Enela Homme',
  'Enela Sport',
] as const

export type LandingCategory =
  | 'populer'
  | 'edp'
  | 'edt'
  | 'parfum'
  | 'fresh'
  | 'signature'
  | 'all'

export const landingCategories: { id: LandingCategory; label: string }[] = [
  { id: 'populer', label: 'Populer' },
  { id: 'edp', label: 'EDP' },
  { id: 'edt', label: 'EDT' },
  { id: 'parfum', label: 'Parfum' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'signature', label: 'Signature' },
  { id: 'all', label: 'Lihat Semua' },
]
