import type { ReactNode } from "react";
import { Wordmark } from "../app/components/Brand";
import { ProviderAddress, ProviderName } from "./LegalPlaceholder";

export const CURRENT_LEGAL_DATE = "24 September 2026";
export const Support = () => (
  <a href="mailto:support@usesnaglist.com">support@usesnaglist.com</a>
);
export const Operator = () => (
  <p>
    Snaglist is provided by <ProviderName /> (“Snaglist”, “we”, “us”, “our”),
    whose registered office is <ProviderAddress />. Contact <Support />.
  </p>
);

export function CurrentLegalLayout({
  kind,
  title,
  children,
}: {
  kind: "privacy" | "terms";
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="current-legal"
      data-legal-document={kind}
      data-service-phase="prelaunch"
    >
      <div className="policy-header">
        <Wordmark />
        <span>{title}</span>
      </div>
      <div className="current-legal-body">
        <h1>{title}</h1>
        <p className="legal-date" data-legal-version="">
          Last updated: {CURRENT_LEGAL_DATE}
        </p>
        <div className="legal-scope">
          <strong>Using Snaglist today</strong>
          <p>
            This notice covers the released app’s on-device features, this
            website and support. Portal sign-in, shared workspaces and
            Contractor links open with the iOS app update. Screens on this
            website preview that update; they do not mean online services are
            active.
          </p>
        </div>
        {children}
        <p className="legal-date">
          © {new Date().getFullYear()} Snaglist. All rights reserved.
        </p>
      </div>
    </div>
  );
}
