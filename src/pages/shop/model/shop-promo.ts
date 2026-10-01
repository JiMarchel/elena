export type PromoBanner = {
  id: string
  title: string
  subtitle: string
  cta: string
  img: string
}

export type LiveStream = {
  id: string
  title: string
  viewers: string
  img: string
}

export type VideoClip = {
  id: string
  title: string
  views: string
  img: string
}

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

/** ponytail: ganti dengan CMS/API promo saat backend siap. */
export const promoBanners: PromoBanner[] = [
  {
    id: 'gajian',
    title: 'Enela Gajian Sale',
    subtitle: 'Diskon parfum s.d. 50% + voucher extra',
    cta: 'Belanja',
    img: photo('1594035910387-fea47794261f'),
  },
  {
    id: 'signature',
    title: 'Signature Week',
    subtitle: 'Koleksi Enela Signature mulai Rp485RB',
    cta: 'Lihat',
    img: photo('1587017539504-67cfbddac569'),
  },
  {
    id: 'member',
    title: 'Member Baru',
    subtitle: 'Extra 15% + gratis ongkir pertama',
    cta: 'Klaim',
    img: photo('1541643600914-78b084683601'),
  },
]

export const liveStreams: LiveStream[] = [
  {
    id: 'live-1',
    title: 'Launch Noir Absolu',
    viewers: '1,2RB',
    img: photo('1590736704728-f4730bb30770'),
  },
  {
    id: 'live-2',
    title: 'Flash Sale Parfum',
    viewers: '856',
    img: photo('1547887537-6158d64c35b3'),
  },
]

export const videoClips: VideoClip[] = [
  {
    id: 'vid-1',
    title: 'Cara semprot tahan lama',
    views: '8,2RB',
    img: photo('1615634260167-c8cdede054de'),
  },
  {
    id: 'vid-2',
    title: 'Unboxing Rose Éternelle',
    views: '16RB',
    img: photo('1523293182086-7651a899d37f'),
  },
]
