import React from 'react';

/**
 * A fact or decision the legal pages cannot state until Dan settles it (in several
 * cases with a lawyer). It renders visibly as "[DAN: …]" so a draft can never be
 * read as a finished policy.
 *
 * It also refuses to render in an indexable production build
 * (INDEX_PUBLIC_SITE=true): the prerender then fails instead of publishing a legal
 * page with an unresolved placeholder. `tests/legal.test.mjs` fails on any
 * placeholder in a preview build as well. Resolve a placeholder by replacing the
 * whole <Dan>…</Dan> element with the settled wording; do not weaken this guard.
 *
 * Facts that both legal pages state (the provider's identity, its address and the
 * publication date) are defined once, below, and used by both pages, so the privacy
 * policy and the terms cannot disagree. Resolve each by replacing the <Dan> element
 * inside it; both pages then change together.
 */
export const Dan: React.FC<{ children: string }> = ({ children }) => {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  if (env?.INDEX_PUBLIC_SITE === 'true') {
    throw new Error(`Unresolved legal placeholder in a production build: [DAN: ${children}]`);
  }
  return (
    <mark data-legal-placeholder="" className="bg-amber-100 text-[#1A1D23] px-1 rounded-sm">
      {`[DAN: ${children}]`}
    </mark>
  );
};

/** The date this legal version is published: the same on the privacy policy and the terms. */
export const LegalVersion: React.FC = () => (
  <Dan>date this version is published, the same on both legal pages</Dan>
);

/**
 * Who provides Snaglist, exactly as both pages must state it. Unverified: Dan's company
 * details have not been supplied, and the App Store seller is Dan's individual developer
 * account, so the provider named here must match the settled operating arrangement
 * (outputs/app-store-2026-09-23/legal/LEGAL-DECISIONS-FOR-DAN.md, items 1 and 2).
 */
export const ProviderName: React.FC = () => (
  <Dan>provider’s legal name, used on both pages: a company’s registered name and company number, or an individual’s full name, once the operating arrangement and its relation to the individual App Store seller are settled (decisions 1 and 2)</Dan>
);

/** A publishable geographic business address that is authorised for customer contact. */
export const ProviderAddress: React.FC = () => (
  <Dan>provider’s postal address: a geographic business address confirmed as usable for customer correspondence (decision 1)</Dan>
);
