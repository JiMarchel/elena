export type RegionDistrict = {
  name: string
  postalCode: string
}

export type RegionCity = {
  name: string
  districts: RegionDistrict[]
}

export type RegionProvince = {
  name: string
  cities: RegionCity[]
}

export const regionProvinces: RegionProvince[] = [
  {
    name: 'BALI',
    cities: [
      {
        name: 'KAB. BADUNG',
        districts: [
          { name: 'KUTA', postalCode: '80361' },
          { name: 'SEMINYAK', postalCode: '80361' },
        ],
      },
    ],
  },
  {
    name: 'DKI JAKARTA',
    cities: [
      {
        name: 'JAKARTA SELATAN',
        districts: [
          { name: 'KEBAYORAN BARU', postalCode: '12120' },
          { name: 'PANCORAN', postalCode: '12780' },
        ],
      },
    ],
  },
  {
    name: 'JAWA BARAT',
    cities: [
      {
        name: 'KAB. BANDUNG',
        districts: [
          { name: 'CIPARAY', postalCode: '40381' },
          { name: 'BALEENDAH', postalCode: '40375' },
        ],
      },
      {
        name: 'KOTA BANDUNG',
        districts: [
          { name: 'COBLONG', postalCode: '40131' },
          { name: 'REGOL', postalCode: '40252' },
        ],
      },
    ],
  },
  {
    name: 'JAWA TIMUR',
    cities: [
      {
        name: 'KAB. SIDOARJO',
        districts: [
          { name: 'CANDI', postalCode: '61271' },
          { name: 'SIDOARJO', postalCode: '61214' },
        ],
      },
      {
        name: 'KOTA SURABAYA',
        districts: [
          { name: 'GUBENG', postalCode: '60281' },
          { name: 'RUNGKUT', postalCode: '60293' },
        ],
      },
    ],
  },
  {
    name: 'BANTEN',
    cities: [
      {
        name: 'KOTA TANGERANG SELATAN',
        districts: [
          { name: 'SERPONG', postalCode: '15310' },
          { name: 'CIPUTAT', postalCode: '15411' },
        ],
      },
    ],
  },
]

export function getProvinceNames() {
  return regionProvinces.map((province) => province.name)
}

export function getCities(provinceName: string) {
  return (
    regionProvinces.find((province) => province.name === provinceName)?.cities ??
    []
  )
}

export function getDistricts(provinceName: string, cityName: string) {
  const cities = getCities(provinceName)
  return (
    cities.find((city) => city.name === cityName)?.districts ?? []
  )
}

export function formatRegionSummary(
  district: string,
  city: string,
  province: string,
  postalCode: string,
) {
  return `${district.toUpperCase()}, ${city.toUpperCase()}, ${province.toUpperCase()}, ID ${postalCode}`
}

export function groupByFirstLetter(items: string[]) {
  const groups = new Map<string, string[]>()

  for (const item of items) {
    const letter = item.charAt(0).toUpperCase()
    const list = groups.get(letter) ?? []
    list.push(item)
    groups.set(letter, list)
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, values]) => ({
      letter,
      values: values.sort((a, b) => a.localeCompare(b)),
    }))
}
