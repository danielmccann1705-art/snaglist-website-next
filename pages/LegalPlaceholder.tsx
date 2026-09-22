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
