import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { copyToClipboard } from '@/shared/lib/copy-to-clipboard'
import { Button, Input } from '@/shared/ui'

export function ReferralCopyField({
  label,
  value,
  copyLabel = 'Salin',
}: {
  label: string
  value: string
  copyLabel?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(value)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-2">
        <Input readOnly value={value} className="font-mono text-xs" />
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={handleCopy}
          aria-label={copyLabel}
        >
          {copied ? <CheckIcon className="text-emerald-600" /> : <CopyIcon />}
        </Button>
      </div>
      {copied ? (
        <p className="text-xs text-emerald-600">Tersalin ke clipboard.</p>
      ) : null}
    </div>
  )
}
