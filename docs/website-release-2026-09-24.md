# Website pre-launch release — 24 September 2026

Dan approved publication of the reviewed website and then explicitly asked for “Sign in coming soon” until the iOS update is live. This release publishes the design on the existing Cloudflare website Worker; it does not activate the app backend or manager portal.

## What changed

- Contractor link remains the lead product story. The three-step journey separates sending work, submitted evidence and a manager’s accepted closure.
- Real native screenshots retain their pixels inside CSS iPhone surrounds. The report section uses a real iPad PDF capture and explicitly labels its snag as awaiting review. Source dimensions, hashes and synthetic data provenance are in `app/content/screenshot-slots.ts`.
- Optional link-creation/browser screenshot panels were replaced with written explanations because no accurate current captures were available. No old permission screen or mock browser has been substituted. The registry records these layout decisions, rather than silently abandoning slots.
- Every public page carries the online-launch notice. Header/footer/portal sign-in entrances are noninteractive “Sign in — coming soon” text. Purchase sections also state that buying Pro does not activate online features today. Prices and Apple billing are unchanged.
- The published privacy/terms pages cover the released on-device app, website, support and subscriptions. They identify Reeve Technologies Ltd, company 17150847, registered office 66 Paul Street, London EC2A 4NA, United Kingdom, and support@usesnaglist.com. The individual App Store seller is not changed.
- Full online-service drafts are preserved as `pages/PrivacyOnlineDraft.tsx` and `pages/TermsOnlineDraft.tsx`, with their unresolved decisions and production-render refusal intact. Their detailed tests still render and check them independently. They are not public routes and are not imported by the shipped site.

## Evidence and limits

The released-app data-flow review used the established 1.2.0 baseline `d52f665`: `Snaglist/App/SnaglistApp.swift`, `AppDelegate.swift`, `Services/EventTracker.swift`, `MetricKitReporter.swift`, `SubscriptionManager.swift`, `PhotoStorageService.swift`, `FloorPlanStorageService.swift`, `SpeechRecognitionService.swift`, and `Views/Projects/ProjectFormView.swift`. This is source evidence, not a new inspection of the App Store binary. It found operational event/diagnostic delivery attempts in the older app; the notice therefore does not claim the older app has no telemetry. On-device records and user-directed exports, Apple/device backups, Maps, speech, notifications, RevenueCat and support processing are distinguished.

Legal references checked on 24 September:

- [Companies House record supplied by Dan](https://find-and-update.company-information.service.gov.uk/company/17150847). The duplicated “66” in the register’s address was normalised for display. No claim that the registered office is staffed or has a verified mail-forwarding contract.
- [ICO required privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) and [storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/): notice states purposes, rights, providers and retention criteria; it does not invent an automatic deletion schedule.
- Published provider terms: [Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [Google Workspace](https://cloud.google.com/terms/data-processing-addendum/), [RevenueCat](https://www.revenuecat.com/dpa). These establish their published terms, not a completed audit of account-specific contracting parties or data-transfer arrangements.

Fresh Cloudflare readback before release: website `snaglist-website-next` serves usesnaglist.com, www.usesnaglist.com and snaglist.dev. The prior active version is `9d781a76-40f0-42cc-8724-53a1bb834e81` at 100%, deployment `8abd6f0c-e4b2-4be3-8af7-60be93e1ca01`. Query-string redaction is on, invocation logs off, Logpush off and traces off. No analytics transport has been added.

The separate backend and portal were deployed **disabled** by Claude on 23 September; their existence is not a production activation. This supersedes older “no production Worker exists” notes but does not change this website’s pre-launch scope.

## Verification and release procedure

The preview build, typecheck and all **60 tests** passed. Checks cover routes/assets, Worker privacy/caching, accessible navigation behavior already exercised in the visual pass, exact sign-in availability copy, capture provenance/dimensions, current legal scope, retained online draft disclosures, and refusal of unresolved online legal placeholders in an indexable build. Browser evidence is retained in the coordination workspace’s `outputs/website-design-implementation-2026-09-23/` directory, including the 24 September publication subdirectory.

Freeze this branch’s exact source commit, run `INDEX_PUBLIC_SITE=true npm run release -- <proof-outside-build.json>`, and upload that checked output with its unchanged Worker routing. Read back the deployed version and verify the public pages, redirects, downloads and private fallbacks. Keep source/asset hashes, release receipt and live checks in the coordination workspace. Do not infer live success from a build or upload alone.

Rollback is a website-only deployment assigning 100% to prior version `9d781a76-40f0-42cc-8724-53a1bb834e81`. Do not change DNS, backend data or contractor tokens.

### Delivery correction during publication

The first live readback found all 12 screenshot variants returning 404: the older Worker allowed brand/fonts/downloads/assets but did not allow the new `/screenshots/` directory. The preview server served those files, so the defect escaped preview and the earlier unit fixtures. Traffic was restored to the preceding version while fixing it. The Worker now allows only flat PNG/WebP capture files in that directory. Two added tests exercise every registered capture's GET/HEAD response, exact bytes and media type, and reject scripts/documents/nested files. The corrected suite has 62 tests. The receipt records both the first activation/rollback and the corrected deployment; the first activation is not reported as successful acceptance.

## At the online app/portal launch

1. Complete production acceptance and obtain Dan’s approval of that distinct candidate.
2. Settle and reconcile the preserved online privacy/terms drafts against activated production: regions, provider contracts/transfers, support and backup retention, deletion operations, publication date and any optional business-law/liability choices. This website release is not online-service legal or App Store privacy sign-off.
3. Publish those settled policies and update their tests. The release test deliberately rejects turning on portal sign-in while the current pre-launch legal pages remain.
4. Switch `PORTAL_SIGN_IN_AVAILABLE`, verify the actual destination and account journey, remove pre-launch explanations and reconcile Store metadata/screenshots with released functionality.
