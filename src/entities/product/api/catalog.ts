import type { Product } from '../model/product'

// Foto stok Unsplash (bebas pakai, hotlink diizinkan).
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

// ponytail: katalog masih dummy; ganti isi ini dengan request asli saat backend siap.
export const products: Product[] = [
  {
    id: 1,
    title: 'Noir Absolu',
    brand: 'Enela Signature',
    volumeMl: 50,
    concentration: 'EDP',
    notes: 'Oud, Amber, Vanilla',
    fragranceNotes: {
      top: ['Oud', 'Saffron'],
      heart: ['Amber', 'Rose'],
      base: ['Vanilla', 'Musk'],
    },
    description:
      'Komposisi gelap dan mewah yang membuka dengan oud hangat, lalu mengalir ke amber dan vanilla yang memeluk kulit. Cocok untuk malam formal dan cuaca sejuk.',
    price: 485000,
    originalPrice: 650000,
    rating: 4.8,
    reviews: 214,
    img: photo('1587017539504-67cfbddac569'),
    inStock: true,
  },
  {
    id: 2,
    title: 'Rose Éternelle',
    brand: 'Maison Enela',
    volumeMl: 30,
    concentration: 'Parfum',
    notes: 'Damask Rose, Peony, Musk',
    fragranceNotes: {
      top: ['Peony', 'Bergamot'],
      heart: ['Damask Rose', 'Lily'],
      base: ['Musk', 'Cedar'],
    },
    description:
      'Mawar Damask yang lembut bertemu peony segar dan musk bersih. Aroma floral elegan untuk siang hingga sore — feminin tanpa berlebihan.',
    price: 720000,
    rating: 4.9,
    reviews: 168,
    img: photo('1594035910387-fea47794261f'),
    inStock: true,
  },
  {
    id: 3,
    title: 'Citrus Verrine',
    brand: 'Enela Fresh',
    volumeMl: 100,
    concentration: 'EDT',
    notes: 'Bergamot, Lemon, Neroli',
    fragranceNotes: {
      top: ['Bergamot', 'Lemon', 'Grapefruit'],
      heart: ['Neroli', 'Orange Blossom'],
      base: ['White Musk', 'Driftwood'],
    },
    description:
      'Ledakan citrus yang cerah dan ringan. Bergamot dan lemon memberi energi pagi, neroli menenangkan, lalu menutup dengan musk yang bersih.',
    price: 315000,
    originalPrice: 420000,
    rating: 4.6,
    reviews: 302,
    img: photo('1523293182086-7651a899d37f'),
    inStock: true,
  },
  {
    id: 4,
    title: 'Velvet Santal',
    brand: 'Enela Signature',
    volumeMl: 50,
    concentration: 'EDP',
    notes: 'Sandalwood, Cedar, Tonka',
    fragranceNotes: {
      top: ['Pink Pepper', 'Cardamom'],
      heart: ['Sandalwood', 'Cedar'],
      base: ['Tonka', 'Vanilla'],
    },
    description:
      'Kayu cendana yang lembut seperti beludru, diperkaya cedar dan tonka. Aroma creamy-woody yang unisex dan tahan lama di kulit.',
    price: 890000,
    rating: 4.7,
    reviews: 96,
    img: photo('1458538977777-0549b2370168'),
    inStock: true,
  },
  {
    id: 5,
    title: 'Aqua Marine',
    brand: 'Enela Sport',
    volumeMl: 75,
    concentration: 'EDT',
    notes: 'Sea Salt, Mint, Ambergris',
    fragranceNotes: {
      top: ['Mint', 'Sea Salt'],
      heart: ['Marine Accord', 'Jasmine'],
      base: ['Ambergris', 'Cedar'],
    },
    description:
      'Kesegaran laut yang aktif: mint dingin, garam laut, dan ambergris. Ideal untuk olahraga, traveling, atau hari panas.',
    price: 275000,
    originalPrice: 350000,
    rating: 4.5,
    reviews: 431,
    img: photo('1622618991746-fe6004db3a47'),
    inStock: true,
  },
  {
    id: 6,
    title: 'Jasmin Nocturne',
    brand: 'Maison Enela',
    volumeMl: 30,
    concentration: 'Parfum',
    notes: 'Jasmine, Tuberose, Benzoin',
    fragranceNotes: {
      top: ['Green Leaves', 'Bergamot'],
      heart: ['Jasmine', 'Tuberose'],
      base: ['Benzoin', 'Sandalwood'],
    },
    description:
      'Melati malam yang sensual dengan tuberose krem dan benzoin hangat. Intensitas parfum — beberapa semprot sudah cukup.',
    price: 655000,
    rating: 4.8,
    reviews: 121,
    img: photo('1547887537-6158d64c35b3'),
    inStock: true,
  },
  {
    id: 7,
    title: 'Amber Nuit',
    brand: 'Enela Signature',
    volumeMl: 50,
    concentration: 'EDP',
    notes: 'Amber, Saffron, Leather',
    fragranceNotes: {
      top: ['Saffron', 'Pink Pepper'],
      heart: ['Amber', 'Labdanum'],
      base: ['Leather', 'Patchouli'],
    },
    description:
      'Amber malam yang dalam dengan saffron dan leather. Signature scent untuk acara spesial — mewah, hangat, dan memorable.',
    price: 1120000,
    originalPrice: 1400000,
    rating: 4.9,
    reviews: 78,
    img: photo('1590736704728-f4730bb30770'),
    inStock: true,
  },
  {
    id: 8,
    title: 'Fleur Blanche',
    brand: 'Enela Atelier',
    volumeMl: 50,
    concentration: 'EDP',
    notes: 'Orange Blossom, Iris, Cotton',
    fragranceNotes: {
      top: ['Orange Blossom', 'Aldehydes'],
      heart: ['Iris', 'White Peony'],
      base: ['Cotton Musk', 'Soft Woods'],
    },
    description:
      'Bunga putih yang bersih seperti linen pagi. Orange blossom dan iris memberi kesan powdery-halus yang nyaman sepanjang hari.',
    price: 540000,
    rating: 4.6,
    reviews: 189,
    img: photo('1541643600914-78b084683601'),
    inStock: true,
  },
  {
    id: 9,
    title: 'Vetiver Brut',
    brand: 'Enela Homme',
    volumeMl: 100,
    concentration: 'EDT',
    notes: 'Vetiver, Grapefruit, Tobacco',
    fragranceNotes: {
      top: ['Grapefruit', 'Black Pepper'],
      heart: ['Vetiver', 'Geranium'],
      base: ['Tobacco', 'Oakmoss'],
    },
    description:
      'Vetiver kering yang maskulin, dibuka grapefruit pahit dan ditutup tobacco. Aroma tanah yang modern untuk kerja dan weekend.',
    price: 615000,
    originalPrice: 780000,
    rating: 4.7,
    reviews: 254,
    img: photo('1588514912908-8f5891714f8d'),
    inStock: true,
  },
  {
    id: 10,
    title: 'Vanille Poudrée',
    brand: 'Enela Atelier',
    volumeMl: 30,
    concentration: 'EDP',
    notes: 'Vanilla, Coconut, Sandalwood',
    fragranceNotes: {
      top: ['Coconut', 'Almond'],
      heart: ['Vanilla', 'Heliotrope'],
      base: ['Sandalwood', 'Soft Musk'],
    },
    description:
      'Vanilla bedak yang manis tanpa lebay — kelapa lembut dan sandalwood menjaga keseimbangan. Comfort scent yang addictive.',
    price: 430000,
    rating: 4.5,
    reviews: 167,
    img: photo('1615634260167-c8cdede054de'),
    inStock: true,
  },
  {
    id: 11,
    title: 'Cuir de Russie',
    brand: 'Enela Homme',
    volumeMl: 50,
    concentration: 'EDP',
    notes: 'Leather, Birch, Incense',
    fragranceNotes: {
      top: ['Birch Tar', 'Bergamot'],
      heart: ['Leather', 'Iris'],
      base: ['Incense', 'Amber'],
    },
    description:
      'Kulit Rusia klasik: birch asap, leather, dan incense. Character kuat untuk yang suka aroma vintage-modern.',
    price: 985000,
    rating: 4.8,
    reviews: 64,
    img: photo('1543422655-ac1c6ca993ed'),
    inStock: false,
  },
  {
    id: 12,
    title: 'Lavande Champêtre',
    brand: 'Enela Fresh',
    volumeMl: 100,
    concentration: 'EDT',
    notes: 'Lavender, Rosemary, Moss',
    fragranceNotes: {
      top: ['Lavender', 'Rosemary'],
      heart: ['Sage', 'Geranium'],
      base: ['Oakmoss', 'Vetiver'],
    },
    description:
      'Lavender pedesaan Prancis dengan rosemary herbal dan moss hijau. Segar, tenang, dan mudah dipakai setiap hari.',
    price: 265000,
    originalPrice: 340000,
    rating: 4.4,
    reviews: 388,
    img: photo('1610461888750-10bfc601b874'),
    inStock: true,
  },
]

export function getProductById(id: number) {
  return products.find((product) => product.id === id)
}

/** Produk terkait: prioritas brand sama, lalu isi sisa dari katalog. */
export function getRelatedProducts(productId: number, limit = 4) {
  const current = getProductById(productId)
  if (!current) return []

  const sameBrand = products.filter(
    (product) => product.id !== productId && product.brand === current.brand,
  )
  const others = products.filter(
    (product) =>
      product.id !== productId && product.brand !== current.brand,
  )

  return [...sameBrand, ...others].slice(0, limit)
}
