import type { FragranceNotes } from '@/entities/product'
import { Badge } from '@/shared/ui'

const layers: {
  key: keyof FragranceNotes
  label: string
  hint: string
}[] = [
  { key: 'top', label: 'Top notes', hint: 'Kesan pertama' },
  { key: 'heart', label: 'Heart notes', hint: 'Karakter utama' },
  { key: 'base', label: 'Base notes', hint: 'Jejak di kulit' },
]

export function FragrancePyramid({ notes }: { notes: FragranceNotes }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-medium">Piramida aroma</h2>
        <p className="text-sm text-muted-foreground">
          Bagaimana wewangian ini berkembang dari semprotan pertama hingga sisa
          di kulit
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {layers.map((layer) => (
          <div key={layer.key} className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium">{layer.label}</span>
              <span className="text-xs text-muted-foreground">{layer.hint}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {notes[layer.key].map((note) => (
                <Badge key={note} variant="secondary">
                  {note}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
