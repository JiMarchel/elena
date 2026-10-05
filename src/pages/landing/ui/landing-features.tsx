import { landingFeatures } from '../model/landing-content'

export function LandingFeatures() {
  return (
    <section id="fitur" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display mx-auto max-w-2xl text-center text-3xl leading-tight font-medium text-foreground sm:text-4xl">
          Mengapa Penawaran Kami
          <br />
          Terbaik di Industri
        </h2>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {landingFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-black/5 bg-[#fafafa] p-6 shadow-sm sm:p-7"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-foreground text-background">
                <feature.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
