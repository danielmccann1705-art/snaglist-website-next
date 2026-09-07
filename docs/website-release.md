# Website release notes and checks

Prepared 7 September 2026. Review branch: `codex/website-brand-seo-v2`.

## Current review status

Implementation is committed locally. Upload through the connected GitHub integration returned HTTP 403, `Resource not accessible by integration`; the terminal has no authenticated GitHub write access. No remote branch, pull request or hosted preview has been created, and production is unchanged.

Type checking, the production build and all 10 automated checks passed. Local HTTP checks confirmed public 200 responses, permanent redirects, private fallback headers, real 404 responses and PDF delivery. The generated wordmark, social card and template pages were visually inspected. Browser inspection of the website itself remains outstanding because the cloud browser blocked the workspace preview address. This is not a completed mobile/accessibility or live contractor integration sign-off.

## Implemented

- New v2 wordmark, icon, local Plex fonts and brand tokens.
- Live UK App Store links, correct £14.99 monthly / £119.99 annual Pro prices, removal of simulated waitlist, Team and unsupported trial/speed claims.
- 27 public pages rendered at build time, unique metadata, canonical URLs, real navigation, controlled sitemap and explicit 404 handling.
- New `/contractor-link` and `/snag-list-template`; one permanent redirect from `/magic-links`. Established persona URLs remain pending evidence-based consolidation.
- Editable Excel template and printable PDFs, ungated and using fictional examples.
- Contractor API client and Apple association file unchanged. Contractor workflow loaded separately. Visual updates and a post-submission acquisition CTA; no sticky acquisition overlay.
- Public event hooks with no raw URL, query, token or customer data collection.

## Measurement integration

| Event                      | Meaning                                          | Current delivery          |
| -------------------------- | ------------------------------------------------ | ------------------------- |
| `app_store_click`          | Outbound link clicked; not an install            | Browser custom event only |
| `template_download_click`  | Download link clicked; not confirmed save        | Browser custom event only |
| `workflow_step_viewed`     | Illustrated step selected; not a video view      | Browser custom event only |
| `contractor_get_app_click` | Get Snaglist clicked after completion submission | Browser custom event only |

The existing app documentation describes `POST /api/v1/events`, RevenueCat and onboarding events. The connected backend checkout did not contain that generic event controller; its deployment may differ. Verify the actual deployed app/backend and existing provider before adding any transport. Do not equate an onboarding click event with a link actually delivered, or a paywall success event with a paid subscriber.

An adapter must accept only the defined event name and allowlisted properties, respect any applicable consent requirement and exclude development traffic. No session replay, third-party pixel or personal identifier is introduced here. Confirm events arrive in the existing dashboard before spending on acquisition.

## Release dependencies

1. **Real product proof:** replace the clearly labelled illustrative record with current reskinned app captures, a real synthetic contractor-browser capture and a real anonymised app-export PDF. An approved brand canvas is not a released-product screenshot. No video placeholder or invented usage proof is published by this branch.
2. **Entitlements:** September brief says Free = 1 project / 20 snags / 5 contractor links monthly. An older engineering guide describes different allowances. Verify the currently shipped Free and Pro gates, plan access and PDF export before publishing the proposed pricing copy. No trial is promised.
3. **Contractor integration:** test a synthetic, expiring link in the actual deployment with no PIN and with PIN; test invalid/expired/revoked links, view-only access, photo upload failures, completion submission and manager review. Confirm that preview CORS is deliberately configured. Do not test with customer data.
4. **Host:** confirm `snaglist.dev` → hosting project → release commit. Vercel is observed in GitHub status, while a historical Cloudflare branch also exists. If production is Cloudflare, use the equivalent explicit static/public and private fallback routing there; do not copy a catch-all SPA rewrite.
5. **Legal:** existing policy substance is preserved. Review the historical 2025 dates, waitlist clauses, actual providers, retention and cookie statements against current operations. Identity/colour/feature terminology changes do not constitute a new legal review.
6. **Search and claims:** inspect Search Console and analytics before merging/retiring established URLs. Competitor pages now provide a transparent buying checklist without unverified prices or absolute feature claims. Substantiate competitor editions and capabilities before turning them into a definitive feature comparison.
7. **Indexing:** after the above, enable `INDEX_PUBLIC_SITE=true` only for production, build fresh, verify public 200s/canonicals/sitemap, one-hop redirects, real unknown-path 404s and private noindex/no-store headers at the actual host. Submit the production sitemap in Search Console.
8. **Review:** check desktop, 390px mobile, keyboard menu, focus, reduced motion, download behaviour and supported iOS devices. Lab results are not field Core Web Vitals or a ranking guarantee.

## Sources

- Product and UK price: https://apps.apple.com/gb/app/snaglist/id6758858102 (checked 7 September 2026).
- Subscription help: https://support.apple.com/en-gb/118428
- Pre-rendering: https://reactrouter.com/how-to/pre-rendering
- Crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Index controls: https://developers.google.com/search/docs/crawling-indexing/block-indexing

## Rollback

Keep the previous successful deployment available. Release only the reviewed commit; if the contractor workflow regresses, restore the preceding deployment and its routing configuration. Do not remove or rotate contractor tokens as part of a website rollback. Do not force-push main.
