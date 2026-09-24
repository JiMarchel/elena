# Enela — agent notes

Vite + React 19 + TanStack Router + Tailwind v4 + shadcn/ui (Base UI, preset `base-nova`).
Package manager: **bun**. Copy UI pakai bahasa Indonesia.

## Arsitektur: Feature-Sliced Design (FSD) v2.1

Kode aplikasi ada di `src/`, terbagi per layer. Import hanya boleh ke layer di bawahnya:
`app → pages → widgets → features → entities → shared`

- `src/app/` — init, provider, router, entrypoint, style global, layout app-wide (`layouts/`)
- `src/pages/<slice>/` — komposisi per route; segmen `ui/`, `model/`, `api/`; diekspor lewat `index.ts`
- `src/shared/` — infrastruktur tanpa business logic. Tanpa slice, per segmen + `index.ts`:
  - `ui/` — UI kit shadcn
  - `lib/` — util (`formatIDR`, `useIsMobile`)
- `src/routes/` — adapter routing TanStack Router. Isinya hanya wrapper tipis:
  `createFileRoute('/')({ component: SomePage })` yang meng-import dari `@/pages/<slice>`.

`widgets/` sengaja tidak dipakai (discouraged di FSD v2.1). `features/` dan `entities/` belum
ada — jangan buat sebelum ada kode yang **benar-benar** dipakai di 2+ tempat. Kalau ragu,
taruh di `pages/`.

### Aturan wajib

1. Import hanya ke layer lebih bawah. Cross-import antar slice se-layer dilarang.
2. Setiap slice punya `index.ts` sebagai public API; pihak luar wajib import lewat situ.
3. Nama file berbasis domain (`model/product.ts`), bukan peran teknis (`types.ts`, `utils.ts`, `helpers.ts`).
4. Tidak ada business logic di `shared/`.

## shadcn/ui

Alias di `components.json` sudah diarahkan ke FSD. Selalu pakai package runner bun:

```bash
bunx --bun shadcn@latest add <component>
```

Komponen masuk ke `src/shared/ui/`, lalu tambahkan re-export-nya di `src/shared/ui/index.ts`.
Antar-file di dalam `src/shared/ui/` saling import lewat path file (`@/shared/ui/button`),
**jangan** lewat barrel — itu bikin circular import.

## SEO

Domain produksi belum ada, jadi semua URL absolut memakai placeholder
`https://enela.example`. Kalau ganti domain, ubah di **3 file** berikut (semua sudah
ditandai komentar `TODO(SEO)`):

- `index.html` — canonical, `og:url`, `og:image`, `twitter:image`
- `public/robots.txt` — baris `Sitemap:`
- `public/sitemap.xml` — tag `loc`

Metadata lain (title, description, OG/Twitter, favicon dari `public/enela.png`) juga di
`index.html`. Ini SPA murni: crawler hanya melihat HTML statis di `index.html` lalu menunggu JS.
Judul/description per-route belum dinamis — butuh langkah prerender kalau mau dinaikkan.

## Konvensi kode

- Path alias: `@/*` → `src/*` (tsconfig + `resolve.tsconfigPaths` di vite, jadi cukup satu alias).
- Prettier: tanpa semicolon, single quote, trailing comma.
- Verifikasi sebelum selesai: `bunx --bun tsc --noEmit`, `bun run build`, `bunx --bun eslint src`.
