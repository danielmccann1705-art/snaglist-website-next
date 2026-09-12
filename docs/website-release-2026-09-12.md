# Website restoration and Cloudflare release — 12 September 2026

This release restores the approved website redesign from the Snaglist Google Drive knowledge bank onto the existing website service. It does not release app 2.0, the manager portal, team subscriptions or a replacement backend.

## Source and authority

- Original website checkout: `snaglist_website`, clean `main` at `acdcdc26d12d3926e0a94d4abb5f7cdb487e66ce`.
- Isolated release branch: `release/website-usesnaglist`; original checkout and malformed duplicate refs preserved without modification. A HEAD-only Git bundle was used to create the isolated copy.
- Recovered Drive patch: `Snaglist_Website_Brand_SEO_Review_Patch_2026-09-07.patch`, file ID `1xgznSthiDBZh9p3WC9ryYq6BKRTs47mr`, SHA-256 `e2cf49e71f26c5c91acfefc3457532c599e981c7a59462a5e3b3431374bfef79`.
- Restored source tree before these changes: `3dc60b3a692e30e67f2562aad3537627aaaae02a`, exactly matching the Drive implementation handoff. Reapplied commits are `5a1bc06` and `0489eeb`; their commit IDs differ from the original patch authorship history.
- The supplied `Snaglistv2.zip` and current editable brand guide control the identity: Marker red, Ink, Stone, local IBM Plex fonts and the pin-over-i wordmark. Earlier schematic briefs are background references.
- Website release is authorised by Dan's “Proceed” following the diagnosis that the new domain still served the old website. Drive text is reference material, not independent authorisation.

## Changes

- Restored 27 pre-rendered public pages, mobile navigation, the illustrative construction record and ungated Excel/PDF downloads.
- Applied `usesnaglist.com`, `support@usesnaglist.com`, canonical metadata, sitemap and social/download branding.
- Removed unverified numeric Free allowances, unlimited Pro claims and trial promises. UK App Store prices were checked on 12 September: £14.99 monthly and £119.99 annually. Purchase-screen terms control.
- Added clear temporary online-service availability and device-record preservation guidance. A paid subscription is not presented as a solution to the interruption.
- Retained labelled fictional illustrations; these are not screenshots of released app 2.0 or proof of a working online journey.
- Corrected obsolete privacy operational claims. Controller/legal address, complete lawful bases, processors/transfers and retention/erasure schedule still need a separate factual/legal review; this release is not legal certification.
- Added explicit Cloudflare routing instead of a global SPA fallback. Existing API client and Apple association file remain unchanged.

## Routing and privacy

`ASSETS` serves `build/client` with `run_worker_first: true`, `html_handling: none` and `not_found_handling: none`. The Worker resolves the public route manifest, static assets and real 404 responses. Public legacy-host and trailing-slash redirects are permanent and drop query strings; `/magic-links` maps to `/contractor-link`.

Existing `/m/:token` paths on both website domains retain a neutral private SPA response, with no redirect, `noindex`, `no-store` and `no-referrer`. The Worker neither proxies API calls nor forwards the token, cookies or authentication headers into asset lookups. It does not log URLs or binding errors. Provider invocation URL logs and traces must remain off; ordinary runtime metrics are unaffected. `/auth`, `/api` and `/.well-known` are excluded from public redirects. The unchanged association file is served as JSON.

The preceding paragraph describes the Worker layer. The pre-existing zone rule `snaglist_www_to_apex` runs before it and redirects `www.usesnaglist.com` to the apex while preserving path/query. That rule and DNS are unchanged in this website release. Host-header simulations of the Worker do not test the zone rule. The legacy `.dev` zone has no dynamic-redirect entrypoint ruleset.

No customer links or records are test fixtures. Synthetic `/m/` HTTP requests verify the shell only; they do not establish PIN, upload, expiry, revocation or completion acceptance against production. Those tests belong to the backend recovery and unified release work.

## Build and verification

Use Node 22.18+ (24.11.1 used here). Run `npm ci --include=dev`, `npm run typecheck`, a fresh `INDEX_PUBLIC_SITE=true npm run build`, then `npm test`. Local previews default to noindex. Test the actual Cloudflare asset binding locally using the command in README and `scripts/check-cloudflare-http.mjs`.

The initial recovered build and ten existing tests passed. Added Worker tests cover public/private routes, safe asset requests, missing assets, methods, caching, MIME types, unchanged AASA, malformed paths and canonical redirects. Final counts, source/bundle/asset hashes and provider release IDs are recorded in the accompanying deployment evidence, rather than guessed in this source document.

Browser review uses the newly restored local website: desktop, 768px tablet, 390px and 320px narrow layouts; navigation, keyboard dismissal, the App Store QR disclosure, fictional Capture/Share/Review states and long policy pages. Actual captures and layout measurements are retained with the release evidence. This is not a full assistive-technology audit or a test of a live contractor journey.

Fresh public-domain inspection was blocked by the browsing tool with a non-retryable unsafe-URL response. It was not retried through another tool, alternate hostname or proxy. Provider deployment/domain inspection and local output checks must be reported separately from a fresh live-browser sign-off.

## Deployment and rollback

Existing service: `snaglist-website-next` in the existing Cloudflare account. Before this release, 100% of website traffic used version `95b27eb4-c4c3-447f-993e-96cef18a83c0` (6 March 2026), deployment `81b41ae7-ae9f-4cea-bfc8-2b34993221c4`. The September domain binding had not uploaded the redesign.

1. Freeze the reviewed source and record its commit. Build fresh for production. Hash every uploaded asset and bundle the Worker with its routing import.
2. Create a short-lived asset upload session for this existing Worker. Keep all upload receipts private; never commit them or put them in Drive.
3. Upload the verified assets and Worker as a new version, preserving the existing domain bindings. Record the version before assigning traffic.
4. Deploy that exact version at 100%; read back the active deployment and domain binding. Verify safe provider settings. Do not infer live browser success from an API deployment receipt.
5. If website behaviour regresses, create a deployment assigning 100% to `95b27eb4-c4c3-447f-993e-96cef18a83c0`. Do not delete versions, edit DNS, rotate contractor tokens, force-push or change backend records as part of rollback.

Do not enable new analytics transports, live portal links or new subscription products during this website restoration. Replace service-interruption guidance and illustrations only after the relevant real release is independently verified.
