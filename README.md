# Snaglist website

React 19, TypeScript, Vite and React Router 7 framework mode. Public marketing pages are rendered to HTML at build time. The contractor workflow under `/m/:token` remains a separate browser application using the existing API client.

## Develop and verify

Use Node 22.18 or later (Node 24 used for this implementation).

```sh
npm ci --include=dev
npm run dev
npm run typecheck
npm run build
npm test
npm run preview
```

The preview serves the built files on port 5173, with explicit redirects and 404s. It is a local verification server, not the production host. The production output directory is `build/client`.

## Deployment

The repository has an existing Vercel integration. `vercel.json` defines the proposed static routing; verify that the production domain still uses this project before releasing. This branch does not change production DNS, merge itself or add hosting services.

- Builds default to **noindex**. Set `INDEX_PUBLIC_SITE=true` on the production environment only when the release checks in `docs/website-release.md` have been completed. Vercel preview builds stay noindex even if that flag is set.
- Run a full `npm run build` when changing the indexing flag; do not reuse an earlier preview output.
- Production sitemap entries are generated from `app/content/pages.ts`. Preview sitemaps are empty. No artificial modification dates are added.
- `/magic-links` permanently redirects to `/contractor-link`. Other established URLs are retained pending search/traffic evidence.
- `/m/:token` uses the neutral SPA fallback with noindex, no-referrer and private/no-store headers. It is not pre-rendered or included in the sitemap.
- The existing Apple association file is preserved byte for byte.
- `VITE_API_URL` remains the existing contractor API origin override. Do not use customer links as preview fixtures or allow arbitrary preview origins in backend CORS.

## Content, brand and downloads

`app/content/pages.ts` owns the public page inventory and metadata. Public page copy lives in `app/routes/public.tsx`; shared components and tokens live in `app/components` and `app/styles.css`.

The supplied September v2 identity is the visual source: Marker `#D8321E`, Ink `#1A1D23`, Stone `#F7F8FA`, Plex Sans, the pin replacing the i's dot and the icon's grid at thirds. SVG wordmarks use outlined licensed Plex glyphs. Font licences are in `public/fonts/OFL.txt`. Photos and plans remain square; controls use a 6px radius.

`public/downloads` contains the Excel template, printable blank PDF plus example, and separate fictional worked example. These are practical templates, **not sample exports from the app**. `scripts/build-template-*` record their construction; those authoring dependencies are not required for the website build. The spreadsheet builder uses the Codex primary spreadsheet runtime from a temporary working directory. The PDF builder uses ReportLab and the licensed source fonts. Brand authoring uses fonttools and Sharp; QR generation uses qrcode. Only generated assets are served.

## Measurement

The update adds a small, sanitised `snaglist:marketing-event` integration boundary. It does **not** install a tracking SDK or send events to a server. Connect it to the verified existing measurement service after checking consent, schema and delivery. See `docs/website-release.md` for the event meanings and remaining checks.
