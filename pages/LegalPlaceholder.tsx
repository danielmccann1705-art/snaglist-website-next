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
 * Dan supplied the company record for his chosen operator on 23 September 2026:
 * https://find-and-update.company-information.service.gov.uk/company/17150847
 * Checked against the public register. This does not change the individual App Store
 * seller or establish which legal person holds each service-provider agreement.
 */
export const ProviderName: React.FC = () => (
  <>Reeve Technologies Ltd (company number 17150847)</>
);

/** Registered office from the same record; not a claim about staffed premises or mail forwarding. */
export const ProviderAddress: React.FC = () => (
  <>66 Paul Street, London, EC2A 4NA, United Kingdom</>
);
