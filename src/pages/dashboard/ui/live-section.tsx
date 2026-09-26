import { ChevronRightIcon, PlayIcon } from 'lucide-react'

import { Badge } from '@/shared/ui'

import { liveStreams, videoClips } from '../model/dashboard-promo'

export function LiveSection() {
  return (
    <section className="min-w-0 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="grid min-w-0 grid-cols-2 divide-x divide-border">
        <div className="flex min-w-0 flex-col gap-2 p-2.5 sm:p-3">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium"
          >
            Enela Live
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </button>
          <div className="grid min-w-0 grid-cols-2 gap-1.5 sm:gap-2">
            {liveStreams.map((stream) => (
              <button
                key={stream.id}
                type="button"
                className="group relative min-w-0 overflow-hidden rounded-lg bg-muted/40 text-left"
              >
                <img
                  src={stream.img}
                  alt=""
                  className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <Badge
                  variant="destructive"
                  className="absolute top-1.5 left-1.5 gap-1 px-1.5 py-0 text-[10px]"
                >
                  <span className="size-1.5 rounded-full bg-background" />
                  LIVE
                </Badge>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/80 to-transparent p-1.5 pt-6">
                  <p className="line-clamp-2 text-[10px] leading-tight font-medium text-background sm:text-xs">
                    {stream.title}
                  </p>
                  <p className="text-[10px] text-background/80">
                    {stream.viewers} penonton
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 p-2.5 sm:p-3">
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium"
          >
            Enela Video
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </button>
          <div className="grid min-w-0 grid-cols-2 gap-1.5 sm:gap-2">
            {videoClips.map((clip) => (
              <button
                key={clip.id}
                type="button"
                className="group relative min-w-0 overflow-hidden rounded-lg bg-muted/40 text-left"
              >
                <img
                  src={clip.img}
                  alt=""
                  className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded bg-foreground/70 px-1 py-0.5 text-[10px] text-background">
                  <PlayIcon className="size-2.5 fill-current" />
                  {clip.views}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/80 to-transparent p-1.5 pt-6">
                  <p className="line-clamp-2 text-[10px] leading-tight font-medium text-background sm:text-xs">
                    {clip.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
