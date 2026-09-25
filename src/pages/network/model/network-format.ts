const joinDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatJoinDate(iso: string): string {
  return joinDateFormatter.format(new Date(iso))
}

const numberFormatter = new Intl.NumberFormat('id-ID')

export function formatCount(value: number): string {
  return numberFormatter.format(value)
}
